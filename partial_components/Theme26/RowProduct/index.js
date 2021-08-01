import React, { PureComponent } from 'react';
import { View, FlatList } from 'react-native';
import { connect } from 'react-redux';
import FontedText from '../../Common/FontedText';
import RemoteImage from '../../Common/RemoteImage';
import PriceText from '../../Common/PriceText';
import { redColor } from '../../../constants/Theme26/Colors';
import ProductOptionLabel from '../../../partial_components/Common/ProductOptionLabel';

class RowProduct extends PureComponent {
	renderPrice = () => {
		const {
			item,
		} = this.props

		const {
			TotalPrice,
		} = item

		if (TotalPrice) {
			const {
				TotalSalePrice,
				Qty
			} = item

			if (TotalSalePrice) {
				return (
					<View
						style={{
							flexDirection: 'row',
							justifyContent: 'flex-end',
							alignItems: 'center'
						}}>
						<PriceText style={{ fontSize: 16, fontWeight: 'bold', marginRight: 3, }}>{TotalSalePrice}</PriceText>
						<PriceText style={{ fontSize: 16, fontWeight: 'bold', color: redColor, textDecorationLine: 'line-through', textDecorationStyle: 'solid', }}>{TotalPrice}</PriceText>
						{Qty > 1 && <FontedText style={{ fontSize: 16, marginLeft: 5 }}>({Qty})</FontedText>}
					</View>
				)
			}
			else {
				return (
					<View
						style={{
							flexDirection: 'row',
							justifyContent: 'flex-end',
							alignItems: 'center'
						}}>
						<PriceText style={{ fontSize: 16, fontWeight: 'bold' }}>{TotalPrice}</PriceText>
						{Qty > 1 && <FontedText style={{ fontSize: 16, marginLeft: 5 }}>({Qty})</FontedText>}
					</View>
				)
			}
		}
	}

	renderOption = (item, index) => {
		return (
			<ProductOptionLabel
				key={index}
				item={item} />
		)
	}


	renderOptions = () => {

		const {
			item: {
				Options
			}
		} = this.props

		if (Options.length > 0) {
			return (
				<View
					style={{
						marginTop: 5,
						flexDirection: 'row',
						alignItems: 'center',
						flexWrap: 'wrap',
					}}>
					{Options.map(this.renderOption)}
				</View>
			)
		}

	}
	render() {
		const {
			item,
			pagePadding,
			textColor1,
			textColor2,

		} = this.props

		const {
			Product,
		} = item

		const {
			Icon: { ImageUrl },
			Name,
			ShortDescription,
		} = Product

		return (
			<View
				style={{
					flexDirection: 'row',
					// alignItems: 'center'
				}}>
				<RemoteImage
					dimension={250}
					style={{
						width: 50,
						height: 50,
						borderRadius: 25,
					}}
					uri={ImageUrl} />

				<View
					style={{
						flex: 1,
						paddingLeft: pagePadding,
					}}>
					<FontedText
						numberOfLines={1}
						ellipsizeMode="middle"
						style={{
							color: textColor1,
							fontSize: 16,
						}}>{Name}</FontedText>

					{ShortDescription ? <FontedText
						numberOfLines={1}
						ellipsizeMode="middle"
						style={{
							color: textColor2,
							fontSize: 16,
						}}>{ShortDescription}</FontedText> : null}
					{this.renderOptions()}
					{this.renderPrice()}

				</View>
			</View>
		)
	}
}

const mapStateToProps = ({
	runtime_config: {
		runtime_config: {
			styles,
			colors,
		},
	},
}) => ({
	...styles,
	...colors,
})

export default connect(mapStateToProps)(RowProduct)
