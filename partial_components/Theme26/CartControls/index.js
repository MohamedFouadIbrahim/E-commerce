import React, { PureComponent } from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'
import Ionicons from 'react-native-vector-icons/Ionicons'
import CustomTouchable from '../../../partial_components/Common/CustomTouchable';
import FontedText from '../../Common/FontedText';
import { ValidateQuantityIncrement, ValidateQuantityDecrement } from '../../../utils/Cart';
import { SetCartItemQuantity } from '../../../services/CartService';
import { LongToast } from '../../../utils/Toast';
import { IsProductCheckoutEligible } from '../../../utils/Product';

class CartControls extends PureComponent {
	constructor() {
		super()

		this.quantityUpdateTimer = -1
	}

	setQuantity = (quantity) => {
		const {
			onQuantityChange,
			item,
		} = this.props

		onQuantityChange && onQuantityChange(quantity)

		if (this.quantityUpdateTimer !== -1) {
			clearTimeout(this.quantityUpdateTimer)

			this.quantityUpdateTimer = -1
		}

		this.quantityUpdateTimer = setTimeout(() => {
			const { Id } = item

			SetCartItemQuantity(0, Id, quantity,[], () => {
				this.quantityUpdateTimer = -1
			})
		}, 500)
	}

	onIncrementQuantity = () => {
		const {
			Quantity,
			item,
		} = this.props

		if (IsProductCheckoutEligible(item)) {
			const {
				ProductMaxQty,
				ProductStepQty
			} = item

			ValidateQuantityIncrement(Quantity, ProductMaxQty, valid => {
				if (valid) {
					this.setQuantity(Quantity + ProductStepQty)
				}
				else {
					LongToast("ReachedMaxQuantity")
				}
			})
		}
		else {
			LongToast("CantAddToCart")
		}
	}

	onDecrementQuantity = () => {
		const {
			Quantity,
			item,
		} = this.props

		if (IsProductCheckoutEligible(item)) {
			const {
				ProductMinQty,
				ProductStepQty
			} = item

			ValidateQuantityDecrement(Quantity, ProductMinQty, valid => {
				if (valid) {
					this.setQuantity(Quantity - ProductStepQty)
				}
				else {
					this.setQuantity(0)
				}
			})
		}
		else {
			LongToast("CantAddToCart")
		}
	}

	render() {
		const {
			bgColor2,
			textColor2,
			smallBorderRadius,
			style,
			Quantity,
			size
		} = this.props

		return (
			<View
				style={[{
					flexDirection: 'row',
					justifyContent: 'space-between',
					alignItems: 'center',
				}, style]}>
				<CustomTouchable
					onPress={this.onDecrementQuantity}
					style={{
						backgroundColor: bgColor2,
						justifyContent: 'center',
						alignItems: 'center',
						paddingHorizontal: size && size != 19 ? 9 : 12,
						paddingVertical: 5,
						borderRadius: smallBorderRadius,
					}}>
					<Ionicons name={'md-remove'} color={textColor2} size={size || 19} />
				</CustomTouchable>

				<View
					style={{
						justifyContent: 'center',
						alignItems: 'center',
						paddingHorizontal: size && size != 19 ? 9 : 12,
						paddingVertical: 5,
						borderRadius: smallBorderRadius,
					}}>
					<FontedText style={{ fontSize: 16, }}>{Quantity}</FontedText>
				</View>

				<CustomTouchable
					onPress={this.onIncrementQuantity}
					style={{
						backgroundColor: bgColor2,
						justifyContent: 'center',
						alignItems: 'center',
						paddingHorizontal: size && size != 19 ? 9 : 12,
						paddingVertical: 5,
						borderRadius: smallBorderRadius,
					}}>
					<Ionicons name={'md-add'} color={textColor2} size={size || 19} />
				</CustomTouchable>
			</View>
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
	...colors,
	...styles,
})


export default connect(mapStateToProps)(CartControls)