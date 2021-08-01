import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { AddCartItem } from '../../../services/CartService';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import CustomTouchable from '../../../partial_components/Common/CustomTouchable';
import { IsProductCheckoutEligible } from '../../../utils/Product';
import { LongToast } from '../../../utils/Toast';

class CartButton extends PureComponent {
	constructor(props) {
		super(props)

		const {
			item,
			mainColor,
			bgColor2,
		} = this.props

		this.canAddToCart = IsProductCheckoutEligible(item)

		if (this.canAddToCart) {
			this.buttonColor = mainColor
		}
		else {
			this.buttonColor = bgColor2
		}
	}

	addToCart = () => {
		const {
			onAddedToCart,
		} = this.props

		const {
			Id,
			ProductMinQty,
			hasRequiredProductOptions,
		} = this.props.item

		const {
			canAddToCart
		} = this

		if (canAddToCart) {
			if (hasRequiredProductOptions) {
				this.props.navigation.navigate("ProductOptions", {
					Id,
					Quantity: ProductMinQty,
					onAddToCart: () => { onAddedToCart && onAddedToCart() }
				})
			}
			else {
				AddCartItem(Id, ProductMinQty, null, () => {
					onAddedToCart && onAddedToCart()
				})
			}
		}
		else {
			LongToast("CantAddToCart")
		}
	}

	goToCart = () => {
		this.props.navigation.navigate("Cart")
	}

	render() {
		const {
			isAddedToCart,
			size
		} = this.props

		const {
			buttonColor,
		} = this

		if (isAddedToCart) {
			return (
				<CustomTouchable
					onPress={this.goToCart}>
					<MaterialCommunityIcons name='cart-arrow-right' size={size || 32} color={buttonColor} />
				</CustomTouchable>
			)
		}
		else {
			return (
				<CustomTouchable
					onPress={this.addToCart}>
					<MaterialCommunityIcons name='plus-circle' size={size || 32} color={buttonColor} />
				</CustomTouchable>
			)
		}
	}
}

const mapStateToProps = ({
	runtime_config: {
		runtime_config: {
			colors: {
				mainColor,
				bgColor2,
			},
		},
	},
}) => ({
	mainColor,
	bgColor2,
})


export default connect(mapStateToProps)(CartButton)