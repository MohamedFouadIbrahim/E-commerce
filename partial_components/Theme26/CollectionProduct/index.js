import React, { PureComponent } from 'react'
import { View } from 'react-native';
import { connect } from 'react-redux';
import CustomTouchable from '../../../partial_components/Common/CustomTouchable';
import FontedText from '../../Common/FontedText';
import RemoteImage from '../../Common/RemoteImage';
import PriceText from '../../Common/PriceText';

export const imageHeight = 150

class CollectionProduct extends PureComponent {
	render() {
		const {
			item,
			pagePadding,
			navigation,
			pushNavigation,
			textColor1,
			textColor2,
		} = this.props

		const {
			Qty,
			Product,
		} = item

		const {
			Id,
			Icon: { ImageUrl },
			Name,
			Price,
			SalePrice,
		} = Product

		return (
			<CustomTouchable
				onPress={() => {
					if (pushNavigation) {
						navigation.push('Product', {
							screen: 'Product',
							params: { Id },
						})
					}
					else {
						navigation.navigate('Product', {
							screen: 'Product',
							params: { Id },
						})
					}
				}}
				style={{
					flexDirection: 'row',
					alignItems: 'center',
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
						flexDirection: 'row',
						justifyContent: 'space-between',
						alignItems: 'center',
						paddingLeft: pagePadding,
					}}>
					<View
						style={{
							flex: 3,
						}}>
						<FontedText style={{ color: textColor1, fontSize: 16, }}>{Name}</FontedText>
						<PriceText style={{ color: textColor2, fontSize: 16, }}>{SalePrice || Price}</PriceText>
					</View>

					<View
						style={{
							flex: 1,
							paddingLeft: pagePadding,
							flexDirection: 'row',
							alignItems: 'center',
						}}>
						<FontedText style={{ color: textColor1, fontSize: 16, }}>x</FontedText>
						<FontedText style={{ color: textColor1, fontSize: 23, }}>{Qty}</FontedText>
					</View>
				</View>
			</CustomTouchable>
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

export default connect(mapStateToProps)(CollectionProduct)