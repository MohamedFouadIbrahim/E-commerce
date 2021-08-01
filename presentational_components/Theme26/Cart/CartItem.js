import React, { PureComponent } from 'react'
import { View, I18nManager } from 'react-native'
import { connect } from 'react-redux'
import FontedText from '../../../partial_components/Common/FontedText';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Ionicons from 'react-native-vector-icons/Ionicons'
import RemoteImage from '../../../partial_components/Common/RemoteImage';
import { shadowStyle2 } from '../../../constants/Style';
import { redColor } from '../../../constants/Theme26/Colors';
import CustomTouchable from '../../../partial_components/Common/CustomTouchable';
import PriceText from '../../../partial_components/Common/PriceText';
import ProductOptionLabel from '../../../partial_components/Common/ProductOptionLabel';

class CartItem extends PureComponent {
	renderOption = (item, index) => {
		return (
			<ProductOptionLabel
				key={index}
				item={item} />
		)
	}

	render() {
		const {
			smallBorderRadius,
			item,
			index,
			navigation,
			onIncrementQuantity,
			onDecrementQuantity,
			onDeleteCart,
			textColor2,
			bgColor1,
			bgColor2,
			mainColorText,
			store_type,
			pagePadding,
			largePagePadding,
		} = this.props

		const {
			Product,
			Qty,
			UnitPrice,
			UnitSalePrice,
			SubStore,
			Options,
		} = item

		const {
			Id,
			Name,
			Icon: { ImageUrl }
		} = Product

		return (
			<CustomTouchable
				onPress={() => {
					navigation.navigate('Product', {
						screen: 'Product',
						params: { Id },
					})
				}}
				style={{
					flexDirection: 'row',
				}}>
				<View
					style={{
						width: 110,
						height: 110,
						backgroundColor: bgColor1,
						borderRadius: smallBorderRadius,
						...shadowStyle2
					}}>
					<RemoteImage
						dimension={250}
						style={{
							width: 110,
							height: 110,
							borderRadius: smallBorderRadius,
						}}
						uri={ImageUrl} />
				</View>

				<View
					style={{
						flex: 1,
						justifyContent: 'center',
						paddingLeft: largePagePadding,
					}}>
					<FontedText style={{ fontSize: 16, }}>{Name}</FontedText>

					{SubStore && store_type == 3 && <FontedText style={{ color: textColor2, fontSize: 12, fontWeight: 'bold' }}>{SubStore.Name}</FontedText>}

					{Options.length > 0 && <View
						style={{
							marginTop: 5,
							flexDirection: 'row',
							alignItems: 'center',
							flexWrap: 'wrap',
						}}>
						{Options.map(this.renderOption)}
					</View>}

					{UnitSalePrice ?
						<View
							style={{
								marginTop: pagePadding,
								flexDirection: 'row',
								alignItems: 'center',
							}}>
							<PriceText style={{ fontSize: 22, fontWeight: 'bold', marginRight: 3, }}>{UnitSalePrice}</PriceText>
							<PriceText style={{ fontSize: 16, fontWeight: 'bold', color: redColor, textDecorationLine: 'line-through', textDecorationStyle: 'solid', }}>{UnitPrice}</PriceText>
						</View>
						:
						<View
							style={{
								marginTop: pagePadding,
								flexDirection: 'row',
								alignItems: 'center',
							}}>
							<PriceText style={{ fontSize: 22, fontWeight: 'bold', }}>{UnitPrice}</PriceText>
						</View>
					}
					<View
						style={{
							marginTop: 3,
							flexDirection: 'row',
							justifyContent: 'space-between',
							alignItems: 'flex-end',
						}}>
						<View
							style={{
								flexDirection: 'row',
								alignItems: 'center',
							}}>
							<CustomTouchable
								onPress={() => {
									onDecrementQuantity(item, index)
								}}
								style={{
									backgroundColor: bgColor2,
									justifyContent: 'center',
									alignItems: 'center',
									paddingHorizontal: 12,
									paddingVertical: 5,
									borderRadius: smallBorderRadius,
								}}>
								<Ionicons name={I18nManager.isRTL ? "ios-arrow-forward" : "ios-arrow-back"} color={mainColorText} size={21} />
							</CustomTouchable>

							<View
								style={{
									justifyContent: 'center',
									alignItems: 'center',
									paddingHorizontal: 12,
									paddingVertical: 5,
									borderRadius: smallBorderRadius,
								}}>
								<FontedText style={{ fontSize: 18, }}>{Qty}</FontedText>
							</View>

							<CustomTouchable
								onPress={() => {
									onIncrementQuantity(item, index)
								}}
								style={{
									backgroundColor: bgColor2,
									justifyContent: 'center',
									alignItems: 'center',
									paddingHorizontal: 12,
									paddingVertical: 5,
									borderRadius: smallBorderRadius,
								}}>
								<Ionicons name={I18nManager.isRTL ? "ios-arrow-back" : "ios-arrow-forward"} color={mainColorText} size={21} />
							</CustomTouchable>
						</View>

						<CustomTouchable
							onPress={() => { onDeleteCart(item) }}
							style={{
								justifyContent: 'center',
								alignItems: 'center',
								marginBottom: 8
							}}>
							<FontAwesome name="trash" color={redColor} size={22} />
						</CustomTouchable>
					</View>
				</View>
			</CustomTouchable >
		)
	}
}

const mapStateToProps = ({
	login: {
		store_type
	},
	runtime_config: {
		runtime_config: {
			colors,
			styles,
		},
	},
}) => ({
	store_type,
	...styles,
	...colors,
})

export default connect(mapStateToProps)(CartItem)