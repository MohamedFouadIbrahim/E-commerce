import React, { Component } from 'react'
import { connect } from 'react-redux'
import { SetCartItemQuantity, DeleteCartItem } from '../../services/CartService'
import { LongToast } from '../../utils/Toast'
import { ValidateQuantityIncrement, ValidateQuantityDecrement } from '../../utils/Cart'

class Cart extends Component {
	constructor(props) {
		super(props)

		this.state = {
			triggerRefresh: false,
			didFetchData: false,
		}

		this.quantityUpdateTimer = -1
		this.lastQuantityUpdatedItem = -1
		this.lockQuantityChange = false
		this.autoNavigatedToCheckout = false
		this.forceNavigateToCheckout = this.props.route.params?.NavigateToCheckout == true ? true : false
	}

	componentDidMount() {
		this.unsubscribeFocusListener = this.props.navigation.addListener('focus', () => {
			this.setState({ triggerRefresh: !this.state.triggerRefresh })
		});
	}

	componentWillUnmount() {
		this.unsubscribeFocusListener && this.unsubscribeFocusListener()
	}

	onDataFetched = (data, { Summary, Address, PaymentMethods, ShippingMethods, Options, SellEligibility, ...resData }) => {
		this.setState({ didFetchData: false })
		const {
			SkipCartToCheckout,
		} = this.props

		const {
			CartBottomPopups,
			CartTopPopups,
			CheckoutTopPopups = [],
			CheckoutMiddlePopups = [],
			CheckoutBottomPopups = []
		} = { ...resData }

		this.setState({
			data,
			Summary,
			Address,
			PaymentMethods,
			ShippingMethods,
			Options,
			SellEligibility,
			CartBottomPopups: CartBottomPopups && CartBottomPopups.length > 0 ? CartBottomPopups : [],
			CartTopPopups: CartTopPopups && CartTopPopups.length > 0 ? CartTopPopups : [],
			CheckoutTopPopups: CheckoutTopPopups && CheckoutTopPopups.length > 0 ? CheckoutTopPopups : [],
			CheckoutMiddlePopups: CheckoutMiddlePopups && CheckoutMiddlePopups.length > 0 ? CheckoutMiddlePopups : [],
			CheckoutBottomPopups: CheckoutBottomPopups && CheckoutBottomPopups.length > 0 ? CheckoutBottomPopups : [],
			didFetchData: true,
		}, () => {
			if (SkipCartToCheckout.Value && !this.autoNavigatedToCheckout && data.length) {
				this.autoNavigatedToCheckout = true
				this.navigateToCheckout()
			} else if (this.forceNavigateToCheckout && data.length > 0) {
				this.navigateToCheckout()
			}
		})
	}

	navigateToCheckout = () => {
		const {
			RequireRegisterToPlaceOrder,
			is_logged_in,
		} = this.props

		if (!is_logged_in && RequireRegisterToPlaceOrder.Value) {
			const {
				setSignupRequired,
				setIsGuest,
			} = this.props

			LongToast("MustSignupToPlaceOrder")
			setSignupRequired(true)
			setIsGuest(false)
		}
		else {
			const {
				data: Items,
				Summary,
				Address,
				PaymentMethods,
				ShippingMethods,
				Options,
				SellEligibility,
				CheckoutTopPopups,
				CheckoutMiddlePopups,
				CheckoutBottomPopups,
			} = this.state

			const navigationParams = {
				data: {
					Items,
					Summary,
					Address,
					PaymentMethods,
					ShippingMethods,
					Options,
					SellEligibility,
					CheckoutTopPopups,
					CheckoutMiddlePopups,
					CheckoutBottomPopups
				}
			}

			this.props.navigation.navigate("Checkout", navigationParams)
			this.forceNavigateToCheckout = false
		}
	}

	setQuantity = (item, index, quantity) => {
		if (this.lockQuantityChange) {
			return
		}

		const ItemOption = item.Options.map(ele => ({ ...ele, ProductOptionId: ele.Id }))
		this.lockQuantityChange = true

		const { Id, Product: { Id: ProductId } } = item

		let updatedItems = this.state.data

		updatedItems[index] = {
			...updatedItems[index],
			Qty: quantity,
		}

		this.setState({
			data: updatedItems
		}, () => {
			this.lockQuantityChange = false
		})

		if (this.quantityUpdateTimer !== -1 && this.lastQuantityUpdatedItem === Id) {
			clearTimeout(this.quantityUpdateTimer)

			this.quantityUpdateTimer = -1
			this.lastQuantityUpdatedItem = -1
		}

		this.lastQuantityUpdatedItem = Id

		this.quantityUpdateTimer = setTimeout(() => {

			SetCartItemQuantity(Id, ProductId, quantity, ItemOption, () => {
				this.quantityUpdateTimer = -1
				this.lastQuantityUpdatedItem = -1

				this.setState({ triggerRefresh: !this.state.triggerRefresh })
			})
		}, 500)
	}

	onIncrementQuantity = (item, index) => {
		const { Qty, Product } = item
		const { ProductMaxQty, ProductStepQty } = Product

		ValidateQuantityIncrement(Qty, ProductMaxQty, valid => {
			if (valid) {
				this.setQuantity(item, index, item.Qty + ProductStepQty)
			}
			else {
				LongToast("ReachedMaxQuantity")
			}
		})
	}

	onDecrementQuantity = (item, index) => {
		const { Qty, Product } = item
		const { ProductMinQty, ProductStepQty } = Product

		ValidateQuantityDecrement(Qty, ProductMinQty, valid => {
			if (valid) {
				this.setQuantity(item, index, item.Qty - ProductStepQty)
			}
			else {
				LongToast("ReachedMinQuantity")
			}
		})
	}

	deleteCart = (item) => {
		const { Id } = item

		DeleteCartItem(Id, () => {
			this.setState({
				data: this.state.data.filter(filterItem => filterItem.Id !== Id),
				triggerRefresh: !this.state.triggerRefresh,
			})
		})
	}

	render() {
		const {
			didFetchData,
		} = this.state

		let PresentationalComponent = null

		const {
			store_theme_id,
			...restProps
		} = this.props

		switch (store_theme_id) {
			case 7:
				PresentationalComponent = require('../../presentational_components/Theme7/Cart').default
				break;
			case 26:
				PresentationalComponent = require('../../presentational_components/Theme26/Cart').default
				break;
			default:
				PresentationalComponent = require('../../presentational_components/Theme7/Cart').default
				break;
		}

		return (
			<PresentationalComponent
				mainScreen={true}
				onDataFetched={this.onDataFetched}
				onIncrementQuantity={this.onIncrementQuantity}
				onDecrementQuantity={this.onDecrementQuantity}
				deleteCart={this.deleteCart}
				navigateToCheckout={this.navigateToCheckout}
				triggerRefresh={this.state.triggerRefresh}
				data={this.state.data}
				Summary={this.state.Summary}
				Address={this.state.Address}
				SellEligibility={this.state.SellEligibility}
				PaymentMethods={this.state.PaymentMethods}
				ShippingMethods={this.state.ShippingMethods}
				CartBottomPopups={this.state.CartBottomPopups}
				CartTopPopups={this.state.CartTopPopups}
				didFetchData={didFetchData}
				{...restProps} />
		)
	}
}

const mapStateToProps = ({
	login: {
		Currency,
		is_logged_in,
	},
	runtime_config: {
		runtime_config: {
			screens: {
				Cart_Index_06_1: {
					SkipCartToCheckout,
					RequireRegisterToPlaceOrder,
				}
			},
			themes: {
				store_theme_id,
			},
			colors,
			styles,
		},
	},
}) => ({
	Currency,
	is_logged_in,
	SkipCartToCheckout,
	RequireRegisterToPlaceOrder,
	store_theme_id,
	...colors,
	...styles,
})

function mergeProps(stateProps, { dispatch }, ownProps) {
	const {
		actions: {
			setSignupRequired,
			setIsGuest,
		}
	} = require('../../redux/LoginRedux.js');

	return {
		...ownProps,
		...stateProps,
		setSignupRequired: (required_signup) => setSignupRequired(dispatch, required_signup),
		setIsGuest: (is_guest) => setIsGuest(dispatch, is_guest),
	};
}

export default connect(mapStateToProps, undefined, mergeProps)(Cart)