import React, { PureComponent } from 'react'
import {  View } from 'react-native'
import { connect } from 'react-redux'
import FontedText from '../../../partial_components/Common/FontedText';
import Ionicons from 'react-native-vector-icons/Ionicons'
import RemoteImage from '../../../partial_components/Common/RemoteImage';
import CustomTouchable from '../../../partial_components/Common/CustomTouchable';
import PriceText from '../../../partial_components/Common/PriceText';

class CartItem extends PureComponent {
	render() {
		const {
			pagePadding,
			item,
			index,
			navigation,
			onIncrementQuantity,
			onDecrementQuantity,
			onDeleteCart,
			bgColor2,
			textColor2,
		} = this.props

		const { Product, Qty, UnitPrice } = item
		const { Id: ProductId, Name, ShortDescription, Icon: { ImageUrl }, ProductMinQty } = Product

		const shouldDelete = Qty <= ProductMinQty
		
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
					borderRadius: 2,
					flexDirection: 'row',
					justifyContent: 'space-between',
					marginHorizontal: pagePadding
				}}>
				<View style={{ flexDirection: 'row', flex: 1, }}>
					<RemoteImage
						dimension={250}
						resizeMode='cover'
						style={{ width: 120, height: 120 }}
						uri={ImageUrl}
					/>

					<View style={{ justifyContent: 'center', paddingHorizontal: pagePadding }}>
						<FontedText style={{ fontSize: 15 }}>{Name}</FontedText>
						<FontedText style={{ color: textColor2, fontSize: 15, marginBottom: 5, marginTop: -2 }}>{ShortDescription}</FontedText>
						<PriceText contentContainerStyle={{ marginBottom: 9 }} style={{ fontSize: 15 }}>{UnitPrice}</PriceText>
					</View>
				</View>

				<View
					style={{
					}}>
					<CustomTouchable
						onPress={() => {
							if (shouldDelete) {
								onDeleteCart(item)
							}
							else {
								onDecrementQuantity(item, index)
							}
						}}
						style={{ backgroundColor: bgColor2, alignItems: 'center', padding: 8 }}>
						<Ionicons name='md-remove' size={19} color={textColor2} />
					</CustomTouchable>

					<FontedText style={{ color: textColor2, padding: 8, textAlign: 'center' }}>{Qty}</FontedText>

					<CustomTouchable
						onPress={() => { onIncrementQuantity(item, index) }}
						style={{ backgroundColor: bgColor2, alignItems: 'center', padding: 8 }}>
						<Ionicons name='md-add' size={19} color={textColor2} />
					</CustomTouchable>
				</View>
			</CustomTouchable>
		)
	}
}

const mapStateToProps = ({
	runtime_config: {
		runtime_config: {
			colors,
			styles,
		},
	},
}) => ({
	...styles,
	...colors,
})

export default connect(mapStateToProps)(CartItem)