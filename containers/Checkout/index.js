import React, { Component } from 'react'
import { connect } from 'react-redux'
import { MakeOrder } from '../../services/OrderServices';
import { DeleteAdress } from '../../services/CustomerService';
import { LongToast } from '../../utils/Toast';
import { withLocalize } from 'react-localize-redux';
import { GetOptionsPostModel } from '../../utils/Product';
import ScreenLoadingIndicator from '../../partial_components/Common/ScreenLoadingIndicator';
import { GetCart } from '../../services/CartService';

class Checkout extends Component {

	constructor(props) {
		super(props)

		this.lockSubmit = false
		this.disableCheckout = false

		const {
			CheckoutStyle,
		} = this.props

		const disableAutoSelection = CheckoutStyle.Value === 3 || CheckoutStyle.Value == 5
		this.disablePaymentAutoSelection = disableAutoSelection
		this.disableShippingAutoSelection = disableAutoSelection
		this.disableAddressAutoSelection = disableAutoSelection
		this.disableWarehousesAutoSelection = disableAutoSelection
		this.forceNavigationToAddNewAddress = this.props.SelectAddressBeforeCheckout.Value

		const data = this.props.route.params?.data

		const {
			Address,
			PaymentMethods,
			ShippingMethods,
			Summary,
			Summary: {
				ErrorShippingMessage,
			},
			Options,
			SellEligibility,
		} = data

		this.validateCheckout(Address, PaymentMethods, ShippingMethods)

		this.state = {
			data: {
				...data,
				...this.getSelectedProps(Address, PaymentMethods, ShippingMethods),
				Summary,
				disableCheckout: ErrorShippingMessage && ErrorShippingMessage.length ? true : false,
				AllWarehouses: []
			},
			voucher: null,
			note: null,
			Options,
			isSubmitLocked: false,
			SellEligibility,
			didFetchData: this.disableCheckout
		}
	}

	navigateToAddNewAddress = () => {
		const data = this.props.route.params?.data


		const AddresNavigationCondtiton = (this.forceNavigationToAddNewAddress && !data.Address.length)
		if (AddresNavigationCondtiton) {
			this.props.navigation.navigate('Addres', { navigateToCheckOut: true, reloadCheckout: this.reloadCheckout, AddresNavigationCondtiton })
		}

	}

	navigateToShippingSelector = () => {
		const data = this.props.route.params?.data

		const AddresNavigationCondtiton = (this.forceNavigationToAddNewAddress && !data.Address.length)

		if (this.props.SelectCourierBeforeCheckout.Value) {

			this.props.navigation.navigate('Courier', {
				data: this.state.data,
				onChangeShipping: this.onChangeShipping,
				isNavigateToNewAddress: AddresNavigationCondtiton,
				navigateToAddNewAddress: this.navigateToAddNewAddress
			})

		} else if (AddresNavigationCondtiton) {

			this.navigateToAddNewAddress()

		}

	}

	componentDidMount() {
		if (!this.disableCheckout) {
			this.reloadCheckout()
		}
		this.unsubscribeFocusListener = this.props.navigation.addListener('focus', () => {
			this.reloadCheckout()
		});
		this.navigateToShippingSelector()
	}

	componentWillUnmount() {
		this.unsubscribeFocusListener && this.unsubscribeFocusListener()
	}

	getSelectedProps = (addresses, payment_methods, shipping_methods) => {

		let SelectedPayment, SelectedShipping, SelectedAddress
		// let SelectedWarehouse = {}

		if (!this.disablePaymentAutoSelection || payment_methods.length <= 1) {
			SelectedPayment = payment_methods[0]
		}

		if (!this.disableShippingAutoSelection || shipping_methods.length <= 1) {
			SelectedShipping = shipping_methods[0]
		}

		if (!this.disableAddressAutoSelection) {
			SelectedAddress = addresses[0]
		}

		return {
			SelectedAddress,
			SelectedPayment,
			SelectedShipping,
		}
	}

	getWarehouseFormShpingMethod = (SelectedShipping) => {

		if (SelectedShipping && SelectedShipping.Warehouses && SelectedShipping.Warehouses.length > 0 && SelectedShipping.AskForWarehouse) {

			this.setState({ data: { ...this.state.data, AllWarehouses: SelectedShipping.Warehouses } }, () => {
				if ((SelectedShipping.Warehouses.length <= 1 || !this.disableWarehousesAutoSelection) && !this.state.data.SelectedWarehouse) {
					this.onChangeShipping(SelectedShipping, SelectedShipping.Warehouses[0])
				}
			})

		} else {
			this.setState({ data: { ...this.state.data, AllWarehouses: [] } })
		}

	}

	validateCheckout = (addresses, payment_methods, shipping_methods) => {
		if (!addresses.length) {
			this.disableCheckout = true
		}

		if (!payment_methods.length) {
			this.disableCheckout = true
			LongToast('NoPaymentMethod')
		}

		if (!shipping_methods.length) {
			this.disableCheckout = true
			LongToast('NoShippingMethod')
		}

		return !this.disableCheckout
	}

	reloadCheckout = (address_id, payment_id, shipping_id, disable_compare, Warehouse_id) => {
		LongToast("PleaseWaitCheckout")

		const {
			voucher,
			data,
		} = this.state

		const {
			SelectedAddress,
			SelectedShipping,
			SelectedPayment,
		} = data

		const sentAddressId = address_id ? address_id : (SelectedAddress ? SelectedAddress.Id : null)
		const sentPaymentId = payment_id ? payment_id : (SelectedPayment ? SelectedPayment.Id : null)
		const sentShippingId = shipping_id ? shipping_id : (SelectedShipping ? SelectedShipping.Id : null)
		const WarehouseId = Warehouse_id ? Warehouse_id : null
		GetCart(
			sentAddressId,
			sentPaymentId,
			sentShippingId,
			WarehouseId,
			voucher,
			res => {
				const {
					Address,
					PaymentMethods,
					ShippingMethods,
					Summary,
					Summary: {
						ErrorShippingMessage,
					},
					SellEligibility
				} = res.data

				let {
					SelectedAddress: New_SelectedAddress,
					SelectedPayment: New_SelectedPayment,
					SelectedShipping: New_SelectedShipping,
					// SelectedWarehouse: New_SelectedWarehouse
				} = this.getSelectedProps(Address, PaymentMethods, ShippingMethods)

				New_SelectedAddress = SelectedAddress ? (Address.find(item => item.Id === SelectedAddress.Id) || New_SelectedAddress) : New_SelectedAddress
				New_SelectedPayment = SelectedPayment ? (PaymentMethods.find(item => item.Id === SelectedPayment.Id) || New_SelectedPayment) : New_SelectedPayment
				New_SelectedShipping = SelectedShipping ? (ShippingMethods.find(item => item.Id === SelectedShipping.Id) || New_SelectedShipping) : New_SelectedShipping

				this.getWarehouseFormShpingMethod(New_SelectedShipping)

				const checkoutValidation = this.validateCheckout(Address, PaymentMethods, ShippingMethods)

				if (checkoutValidation && !disable_compare && ((!sentPaymentId && New_SelectedPayment) || (!sentShippingId && New_SelectedShipping))) {
					this.reloadCheckout(
						New_SelectedAddress ? New_SelectedAddress.Id : null,
						New_SelectedPayment ? New_SelectedPayment.Id : null,
						New_SelectedPayment ? New_SelectedPayment.Id : null,
						true,
					)
				}
				else {
					this.setState({
						data: {
							...data,
							SelectedAddress: New_SelectedAddress,
							SelectedShipping: New_SelectedShipping,
							SelectedPayment: New_SelectedPayment,
							Address,
							PaymentMethods,
							ShippingMethods,
							Summary,
							SellEligibility,
							disableCheckout: ErrorShippingMessage && ErrorShippingMessage.length ? true : false
						},
						// Options: res.data.Options,
						didFetchData: true,
					})
				}
			})
	}

	submitVoucher = () => {
		const {
			Summary: {
				VoucherApplied,
			},
		} = this.state.data

		if (VoucherApplied) {
			this.setState({
				voucher: null,
			}, () => {
				this.reloadCheckout()
			})
		}
		else {
			this.reloadCheckout()
		}
	}

	onInputVoucher = (voucher, callback) => {
		let Trimedvoucher = voucher.trim()
		this.setState({
			voucher: Trimedvoucher,
		}, () => callback && callback())
	}

	onInputNote = (note) => {
		this.setState({
			note,
		})
	}

	submit = () => {
		if (this.lockSubmit) {
			return
		}

		const {
			SelectedAddress,
			SelectedPayment,
			SelectedShipping,
			disableCheckout,
			SelectedWarehouse
		} = this.state.data

		if (disableCheckout) {
			return
		}

		if (!SelectedAddress && (SelectedShipping && SelectedShipping.IsAddressRequired)) {
			LongToast('PleaseSelectAddress')
			return
		}

		if (!SelectedPayment) {
			LongToast('PleaseSelectPayment')
			return
		}

		if (!SelectedShipping) {
			LongToast('PleaseSelectShipping')
			return
		}

		if (SelectedShipping && SelectedShipping.AskForWarehouse && !SelectedWarehouse) {
			LongToast('PleaseSelectWarehouse')
			return
		}

		const {
			voucher,
			note,
			Options,
			data,
		} = this.state

		GetOptionsPostModel(Options, true, ({ model }) => {
			this.setState({ isSubmitLocked: true, required: null })
			this.lockSubmit = true

			const {
				Summary: {
					VoucherApplied,
				},
			} = data

			const sentVoucher = VoucherApplied ? voucher : null

			MakeOrder(
				SelectedAddress ? SelectedAddress.Id : null,
				SelectedPayment.Id, SelectedShipping.Id,
				SelectedWarehouse && SelectedShipping.AskForWarehouse ? SelectedWarehouse.Id : null,
				sentVoucher, note, model, res => {
					if (res.data.RedirectTo === "v1/Cart/success") {
						LongToast("PlacedOrder")
						this.props.setCartCount(0)
						this.props.navigation.navigate("Cart")
						this.props.navigation.navigate("Orders")
					}
					else if (res.data.RedirectTo === "v1/Cart/fail") {
						LongToast("FailedOrder")
					}
					else {
						this.props.navigation.navigate("AfterOrder", { RedirectTo: res.data.RedirectTo })
					}

					this.setState({ isSubmitLocked: false, voucher: null, note: null })
					this.lockSubmit = false
				}, err => {
					this.setState({ isSubmitLocked: false })
					this.lockSubmit = false
				})
		}, ({ required }) => {
			const { translate } = this.props
			this.setState({ required })
			LongToast(`${translate("RequiredOptions")}: ${required.join(", ")}`, false)
		})
	}

	reloadAddresses = (item) => {
		this.onChangeAddress(item)
	}

	onChangeAddress = (item) => {
		this.setState({
			data: {
				...this.state.data,
				SelectedAddress: item
			}
		}, () => {
			this.disableAddressAutoSelection = false
			this.reloadCheckout(item.Id)
		})
	}

	onChangePayment = (item) => {
		this.setState({
			data: {
				...this.state.data,
				SelectedPayment: item,
			}
		}, () => {
			this.disablePaymentAutoSelection = false
			this.reloadCheckout(null, item.Id)
		})
	}

	onChangeShipping = (item, warehose = null) => {
		this.setState({
			data: {
				...this.state.data,
				SelectedShipping: item,
				SelectedWarehouse: warehose
			},

		}, () => {

			this.disableShippingAutoSelection = false
			const warehoseFilter = warehose ? warehose.Id : null
			this.reloadCheckout(null, null, item.Id, undefined, warehoseFilter)
		})

	}

	onOptionChange = (item, items) => {
		this.setState({
			Options: this.state.Options.map(mapItem => ({
				...mapItem,
				Members: item.Id === mapItem.Id ? items : mapItem.Members
			})),
			required: this.state.required ? this.state.required.filter(a => a != item.Name) : null,
		})
	}

	openQRCodeReader = () => {
		this.props.navigation.navigate("QRCodeReader", {
			callback: this.onReadQRCode
		})
	}

	onReadQRCode = (data) => {
		this.onInputVoucher(data, () => {
			this.submitVoucher()
		})
	}

	onDeleteAddress = (Id) => {

		if (this.isSubmitLocked) {
			return
		}

		this.isSubmitLocked = true
		this.setState({ isSubmitLocked: true })

		DeleteAdress(Id, res => {
			this.isSubmitLocked = false
			this.setState({
				isSubmitLocked: false,
				data: {
					...this.state.data,
					Address: this.state.data.Address.filter(item => item.Id != Id)
				}
			}, () => {

				if (!this.state.data.Address.length) {
					this.setState({
						data: {
							...this.state.data,
							SelectedAddress: null
						}
					})
					// this.reloadCheckout(null)

				} else if (Id == this.state.data.SelectedAddress.Id && this.state.data.Address.length) {
					this.setState({
						data: {
							...this.state.data,
							SelectedAddress: this.state.data.Address[0]
						}
					})
					this.onChangeAddress(this.state.data.Address[0])
				} else {

					this.onChangeAddress(this.state.data.SelectedAddress.Id)

				}
			})
			LongToast('dataDeleted')

		}, err => {
			this.isSubmitLocked = false
			this.setState({ isSubmitLocked: false })
		})
	}

	render() {
		if (this.state.didFetchData) {
			let PresentationalComponent = null

			const {
				store_theme_id,
				...restProps
			} = this.props

			switch (store_theme_id) {
				case 7:
					PresentationalComponent = require('../../presentational_components/Theme7/Checkout').default
					break;
				case 26:
					PresentationalComponent = require('../../presentational_components/Theme26/Checkout').default
					break;
				default:
					PresentationalComponent = require('../../presentational_components/Theme7/Checkout').default
					break;
			}

			const {
				data,
				voucher,
				note,
				Options,
			} = this.state


			return (
				<PresentationalComponent
					{...data}
					{...restProps}
					hidePaymentMethod={data.PaymentMethods.length < 2 ? true : false}
					hideShippingMethod={data.ShippingMethods.length < 2 ? true : false}
					submit={this.submit}
					onDeleteAddress={this.onDeleteAddress}
					reloadAddresses={this.reloadAddresses}
					onChangeAddress={this.onChangeAddress}
					onChangePayment={this.onChangePayment}
					onChangeShipping={this.onChangeShipping}
					voucher={voucher}
					submitVoucher={this.submitVoucher}
					onInputVoucher={this.onInputVoucher}
					note={note}
					onOptionChange={this.onOptionChange}
					openQRCodeReader={this.openQRCodeReader}
					Options={Options}
					onInputNote={this.onInputNote}
					submitLocked={this.state.isSubmitLocked}
					required={this.state.required}
					SelectedWarehouse={this.state.data.SelectedWarehouse}
				/>
			)
		}
		else {
			return (
				<ScreenLoadingIndicator />
			)
		}
	}
}

const mapStateToProps = ({
	login: {
		Currency,
	},
	runtime_config: {
		runtime_config: {
			screens: {
				Cart_Index_06_1: {
					CheckoutStyle,
					SelectAddressBeforeCheckout,
					SelectCourierBeforeCheckout,
					ShowVoucher,
					ShowNote,
					ShowPolicies,
				},
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
	CheckoutStyle,
	ShowVoucher,
	ShowNote,
	SelectCourierBeforeCheckout,
	SelectAddressBeforeCheckout,
	store_theme_id,
	...colors,
	...styles,
	ShowPolicies,
})

function mergeProps(stateProps, { dispatch }, ownProps) {
	const {
		actions: {
			setCartCount,
		}
	} = require('../../redux/BadgesRedux');

	return {
		...ownProps,
		...stateProps,
		setCartCount: (cart_count) => setCartCount(dispatch, cart_count),
	};
}

export default connect(mapStateToProps, undefined, mergeProps)(withLocalize(Checkout))