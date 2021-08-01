import React, { Component } from 'react'
import { View, FlatList, ScrollView, Animated } from 'react-native'
import LazyContainer from '../../../partial_components/Common/LazyContainer';
import CustomHeader from '../../../partial_components/Common/CustomHeader';
import FontedText from '../../../partial_components/Common/FontedText';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Feather from 'react-native-vector-icons/Feather';
import TranslatedText from '../../../partial_components/Common/TranslatedText';
import { SelectEntity } from '../../../utils/EntitySelector';
import CustomButton from '../../../partial_components/Common/CustomButton';
import RoundedInput from '../../../partial_components/Theme26/RoundedInput';
import RowProduct from '../../../partial_components/Theme26/RowProduct';
import ItemSeparator from '../../../partial_components/Common/ItemSeparator';
import { STRING_LENGTH_LONG } from '../../../constants/Config';
import CustomTouchable from '../../../partial_components/Common/CustomTouchable';
import ProductOptionsList from '../../../partial_components/Common/ProductOptionsList';
import { greenColor, redColor } from '../../../constants/Theme26/Colors';
import PriceText from '../../../partial_components/Common/PriceText';
import CheckoutMethodSelector from './CheckoutMethodSelector';
import CheckoutAddressSelector from './CheckoutAddressSelector';
import PriceTextContainer from '../../../partial_components/Common/PriceTextContainer';
import CheckoutCourierSelector from './CheckoutCourierSelector';
import NotifationMessage from '../../../partial_components/Common/NotificationMessage';
import { ExternalTranslate } from '../../../utils/Translate';
import ScrollingBackground from '../../../partial_components/Theme26/ScrollingImage';
import { paymentLogos } from "../../../constants/Theme26/PaymentLogos"
import { connect } from 'react-redux';
import PopupsSlider from '../../../partial_components/Theme26/PopupsSlider';

class Checkout extends Component {

	constructor(props) {
		super(props)

		this.state = {
			lockSubmit: false,
			reset: false
		}
		this.lockSubmit = false

	}
	renderItem = ({ item }) => {
		return (
			<RowProduct
				item={item} />
		)
	}

	renderAddressSelector = () => {

		const {
			largePagePadding,
			SelectedAddress,
			SelectedPayment,
			onChangeAddress,
			iconColor1,
			Address,
			onDeleteAddress,
			submitLocked
		} = this.props
		return (

			<View
				style={{
					paddingHorizontal: largePagePadding,
				}}>
				<CheckoutAddressSelector
					navigation={this.props.navigation}
					title="Address"
					data={Address}
					url="Address/ListSimple"
					address={SelectedAddress}
					loading={submitLocked}
					value={SelectedAddress}
					onPressToMange={() => {
						this.props.navigation.navigate('Addresses')
					}}
					onPressAddAddress={() => {
						this.props.navigation.navigate('Addres', {
							onChildChange: this.props.reloadAddresses,
						})
					}}
					onEdit={(item) => {
						this.props.navigation.navigate('Addres', {
							onChildChange: this.props.reloadAddresses,
							AdressID: item.Id
						})
					}}
					onDelete={(item) => {
						onDeleteAddress(item.Id)
					}}
					onChange={onChangeAddress}
					icon={<FontAwesome name={'home'} size={22} color={iconColor1} />} />
			</View>
		)
	}

	renderAddress = () => {
		const {
			mainColor,
			largePagePadding,
			SelectedAddress,
			onChangeAddress,
			textColor1,
			textColor2,
			iconColor1,
		} = this.props

		return (
			<View
				style={{
					paddingHorizontal: largePagePadding,
				}}>
				<View
					style={{
						flexDirection: 'row',
						justifyContent: 'space-between',
						alignItems: 'center',
					}}>
					<TranslatedText style={{ color: textColor1, fontSize: 24, fontWeight: 'bold', }} text="Address" />

					<View
						style={{
							flexDirection: 'row',
						}}>
						{SelectedAddress ? <View style={{ flexDirection: 'row' }}>
							<CustomTouchable
								onPress={() => {
									SelectEntity(this.props.navigation, onChangeAddress, 'Address/ListSimple', null, false, 1)
								}}
								style={{
									justifyContent: 'center',
									alignItems: 'center',
									flexDirection: 'row'
								}}>
								<TranslatedText style={{ color: mainColor, fontSize: 16, marginHorizontal: 5 }} text="Search" />
								<Ionicons
									name={'ios-search'}
									size={16}
									color={mainColor} />
							</CustomTouchable>

							<CustomTouchable
								onPress={() => {
									this.props.navigation.navigate('Addresses', {
										onChildChange: this.props.reloadAddresses,
									})
								}}
								style={{
									justifyContent: 'center',
									alignItems: 'center',
									paddingLeft: 5,
									marginLeft: 10,
									flexDirection: 'row',
								}}>
								<TranslatedText style={{ color: mainColor, fontSize: 16, marginHorizontal: 5, }} text="Edit" />
								<Feather name={`edit`} size={15} color={mainColor} />
							</CustomTouchable>
						</View> : null}


						{!SelectedAddress ? <CustomTouchable
							onPress={() => {
								this.props.navigation.navigate('Addres', {
									onChildChange: this.props.reloadAddresses,
								})
							}}
							style={{
								justifyContent: 'center',
								alignItems: 'center',
								paddingLeft: 5,
								marginLeft: 10,
								flexDirection: 'row',
							}}>
							<TranslatedText style={{ color: mainColor, fontSize: 16, marginHorizontal: 10, }} text="AddAddress" />
							<Ionicons name={`ios-add`} size={25} color={mainColor} />
						</CustomTouchable> : null}
					</View>
				</View>

				{SelectedAddress ? <View
					style={{
						flexDirection: 'row',
						marginTop: 5,
						alignItems: 'center'
					}}>
					<FontAwesome name={'home'} size={22} color={iconColor1} />
					<FontedText style={{ color: textColor2, fontSize: 19, marginLeft: 10, }}>{SelectedAddress.Name}</FontedText>
				</View> : null}

				{SelectedAddress ? <View style={{ flexDirection: 'row' }} >
					<FontedText style={{ color: textColor2, fontSize: 19, marginLeft: 30, }}>{SelectedAddress.Country.Name}</FontedText>
					{SelectedAddress.City ? <FontedText style={{ color: textColor2, fontSize: 19, marginLeft: 10 }}>{SelectedAddress.City.Name}</FontedText> : null}
				</View> : null}
			</View>
		)
	}

	renderPayment = () => {
		const {
			largePagePadding,
			SelectedAddress,
			SelectedPayment,
			onChangePayment,
			iconColor1,
			hidePaymentMethod,
			PaymentMethods,
		} = this.props

		if (!hidePaymentMethod) {
			return (
				<View
					style={{
						paddingHorizontal: largePagePadding,
					}}>
					<CheckoutMethodSelector
						navigation={this.props.navigation}
						title="Payment"
						data={PaymentMethods}
						url="Cart/PaymentMethods"
						address={SelectedAddress}
						value={SelectedPayment}
						onChange={(item) => {
							onChangePayment(item)
							this.reloadProductOptions()
						}}
						icon={<FontAwesome name={'credit-card-alt'} size={22} color={iconColor1} />} />

					<ItemSeparator style={{ marginVertical: largePagePadding, }} />
				</View>
			)
		}
	}

	reloadProductOptions = () => {
		this.setState({ reset: true }, () => {
			this.setState({ reset: false })
		})
	}

	renderShipping = () => {
		const {
			largePagePadding,
			SelectedAddress,
			SelectedShipping,
			onChangeShipping,
			iconColor1,
			hideShippingMethod,
			ShippingMethods,
		} = this.props

		if (!hideShippingMethod) {
			return (
				<View
					style={{
						paddingHorizontal: largePagePadding,
					}}>
					<CheckoutMethodSelector
						navigation={this.props.navigation}
						title="Shipping"
						data={ShippingMethods}
						url="Cart/ShippingMethods"
						address={SelectedAddress}
						value={SelectedShipping}
						onChange={(item) => {
							onChangeShipping(item)
							this.reloadProductOptions()
						}}
						icon={<FontAwesome name={'truck'} size={22} color={iconColor1} />} />

					<ItemSeparator style={{ marginVertical: largePagePadding, }} />
				</View>
			)
		}
	}

	renderSummary = () => {
		const {
			largePagePadding,
			Summary: {
				subTotal,
				shipping,
				Discount,
				Balance,
				Tax,
				Total,
			},
			textColor1,
			textColor2,
			bgColor2,
		} = this.props

		return (
			<View>
				<TranslatedText style={{ color: textColor1, fontSize: 24, fontWeight: 'bold', marginHorizontal: largePagePadding, marginTop: 5 }} text="Information" />

				<View
					style={{
						paddingVertical: 15,
						paddingHorizontal: largePagePadding,
						flexDirection: 'row',
						justifyContent: 'space-between',
						alignItems: 'center',
						borderBottomColor: bgColor2,
						borderBottomWidth: 1,
					}}>
					<TranslatedText style={{ fontSize: 18, }} text="Subtotal" />
					<PriceText style={{ color: textColor2, fontSize: 17, }}>{subTotal}</PriceText>
				</View>

				{shipping > 0 ? <View
					style={{
						paddingVertical: 15,
						paddingHorizontal: largePagePadding,
						flexDirection: 'row',
						justifyContent: 'space-between',
						alignItems: 'center',
						borderBottomColor: bgColor2,
						borderBottomWidth: 1,
					}}>
					<TranslatedText style={{ fontSize: 18, }} text="Shipping" />
					<PriceText style={{ color: textColor2, fontSize: 17, }}>{shipping}</PriceText>
				</View> : null}

				{Discount > 0 ? <View
					style={{
						paddingVertical: 15,
						paddingHorizontal: largePagePadding,
						flexDirection: 'row',
						justifyContent: 'space-between',
						alignItems: 'center',
						borderBottomColor: bgColor2,
						borderBottomWidth: 1,
					}}>
					<TranslatedText style={{ fontSize: 18, }} text="Discount" />
					<PriceText style={{ color: textColor2, fontSize: 17, }}>{Discount}</PriceText>
				</View> : null}

				{Balance > 0 ? <View
					style={{
						paddingVertical: 15,
						paddingHorizontal: largePagePadding,
						flexDirection: 'row',
						justifyContent: 'space-between',
						alignItems: 'center',
						borderBottomColor: bgColor2,
						borderBottomWidth: 1,
					}}>
					<TranslatedText style={{ fontSize: 18, }} text="Balance" />

					<PriceTextContainer>
						<FontedText style={{ color: textColor2, fontSize: 17, }}>-</FontedText>
						<PriceText style={{ color: textColor2, fontSize: 17, }}>{Balance}</PriceText>
					</PriceTextContainer>
				</View> : null}

				{Tax > 0 ? <View
					style={{
						paddingVertical: 15,
						paddingHorizontal: largePagePadding,
						flexDirection: 'row',
						justifyContent: 'space-between',
						alignItems: 'center',
						borderBottomColor: bgColor2,
						borderBottomWidth: 1,
					}}>
					<TranslatedText style={{ fontSize: 18, }} text="Tax" />
					<PriceText style={{ color: textColor2, fontSize: 17, }}>{Tax}</PriceText>
				</View> : null}

				<View
					style={{
						paddingVertical: 15,
						paddingHorizontal: largePagePadding,
						flexDirection: 'row',
						justifyContent: 'space-between',
						alignItems: 'center',
						borderBottomColor: bgColor2,
						borderBottomWidth: 1,
					}}>
					<TranslatedText style={{ fontSize: 18, }} text="Total" />
					<PriceText style={{ fontSize: 17, }}>{Total}</PriceText>
				</View>
			</View>
		)
	}

	renderVoucherInput = () => {
		const {
			largePagePadding,
			pagePadding,
			onInputVoucher,
			voucher,
			submitVoucher,
			openQRCodeReader,
			bgColor2,
			textColor2,
			borderRadius,
			Summary: {
				VoucherApplied,
				VoucherMessage,
			},
		} = this.props

		return (
			<View
				style={{
					marginVertical: pagePadding,
					marginHorizontal: largePagePadding,
				}}>
				<View
					style={{
						flexDirection: 'row',
						alignItems: 'flex-end',
					}}>
					<RoundedInput
						containerStyle={{
							flex: 1,
						}}
						editable={!VoucherApplied}
						value={voucher}
						onChangeText={onInputVoucher}
						title="Voucher"
						onBlur={() => {
							submitVoucher()
						}}
						placeholder="TypeVoucherHere" />

					<CustomButton
						onPress={submitVoucher}
						style={{
							height: 45,
							borderRadius,
							marginLeft: largePagePadding,
						}}
						backgroundColor={bgColor2}
						color={textColor2}
						loading={false}
						title={VoucherApplied ? "Clear" : "Apply"} />

					{!VoucherApplied ? <CustomTouchable
						onPress={openQRCodeReader}
						style={{
							height: 45,
							borderRadius,
							marginLeft: pagePadding,
							backgroundColor: bgColor2,
							justifyContent: 'center',
							alignItems: 'center',
							paddingHorizontal: pagePadding,
						}}>
						<MaterialCommunityIcons
							name={'qrcode-scan'}
							size={17}
							color={textColor2} />
					</CustomTouchable> : null}
				</View>

				{
					VoucherMessage && VoucherMessage.length ? <FontedText
						style={{
							color: VoucherApplied ? greenColor : redColor,
							fontSize: 14,
							marginTop: 5,
						}}>{VoucherMessage}</FontedText> : null
				}
			</View >
		)
	}

	renderNoteInput = () => {
		const {
			largePagePadding,
			onInputNote,
			note,
		} = this.props

		return (
			<RoundedInput
				containerStyle={{
					// marginTop: largePagePadding,
					marginHorizontal: largePagePadding,
				}}
				numberOfLines={2}
				multiline={true}
				maxLength={STRING_LENGTH_LONG}
				value={note}
				onChangeText={onInputNote}
				title="Note"
				placeholder="TypeNoteHere" />
		)
	}

	renderOption = (item, index) => {
		const {
			Members,
			Name,
			Type,
			AllowMultiple
		} = item

		const {
			largePagePadding,
			pagePadding,
			onOptionChange,
			textColor1,
			required,
		} = this.props

		const {
			reset
		} = this.state
		return (
			<View
				key={index}
				style={{
					marginBottom: pagePadding,
				}}>

				<View style={{ flexDirection: 'row', alignItems: 'center' }} onLayout={(e) => {
					this.setState({
						y: e.nativeEvent.layout.y
					})
				}}  >

					{required && required.length > 0 && required.includes(Name) ? <AntDesign name='exclamationcircleo' color={redColor} style={{ marginLeft: largePagePadding, bottom: -1 }} size={15} /> : null}

					<FontedText
						style={{
							color: required && required.length > 0 && required.includes(Name) ? redColor : textColor1,
							fontSize: 16,
							fontWeight: 'bold',
							marginHorizontal: required && required.length > 0 && required.includes(Name) ? pagePadding / 2 : largePagePadding,
						}}>{Name}</FontedText>

				</View>


				<ProductOptionsList
					reset={reset}
					style={{
						marginTop: 5,
						marginHorizontal: largePagePadding,
					}}
					disabledRefresh={true}
					type={Type.Id}
					navigation={this.props.navigation}
					selection={AllowMultiple ? 2 : 1}
					onSelect={(items) => {
						onOptionChange(item, items)
					}}
					data={Members} />
			</View>
		)
	}

	renderOptions = () => {
		const {
			Options,
			largePagePadding,
		} = this.props

		if (Options && Options.length > 0) {
			return (
				<View
					style={{
						marginTop: largePagePadding,
					}}
					onLayout={(e) => {
						const { nativeEvent: {
							layout: {
								y
							}
						} } = e
						this.setState({ OptionsPosy: y })
					}}
				>
					{Options.map(this.renderOption)}
				</View>
			)
		}
	}

	renderTermsAndCondition = () => {
		const { pagePadding, ShowPolicies, largePagePadding } = this.props
		if (ShowPolicies.Value == true) {
			return (
				<CustomTouchable onPress={() => {
					this.props.navigation.navigate('TermsOfService')
				}}  >
					<TranslatedText style={{ fontSize: 12, lineHeight: pagePadding * 2, paddingHorizontal: pagePadding, marginHorizontal: largePagePadding, paddingVertical: 12 }} text={'TermsAndConditionsInCheckout'} />
				</CustomTouchable>
			)
		}
		return null
	}


	renderScrollingImages = () => {
		if (this.props.PaymentsLogosTheme.Value == 'light') {
			return (
				<View style={{ marginTop: 40 }}>
					<View style={{

						alignItems: "center",
						justifyContent: "center",
						width: 20,
						height: 20,
					}}>
						<ScrollingBackground
							style={{ backgroundColor: "#FFFFFF" }}
							speed={15}
							direction={"right"}
							spacing={0}
							images={[paymentLogos['light_payment_1'], paymentLogos['light_payment_2'],
							paymentLogos['light_payment_3'], paymentLogos['light_payment_4'],
							paymentLogos['light_payment_5'], paymentLogos['light_payment_6'],
							paymentLogos['light_payment_7'], paymentLogos['light_payment_8']]}
						/>
					</View>
				</View>

			)
		}


		else if (this.props.PaymentsLogosTheme.Value == 'dark') {
			return (
				<View style={{ marginTop: 40 }}>
					<View style={{

						alignItems: "center",
						justifyContent: "center",
						width: 20,
						height: 20,
					}}>
						<ScrollingBackground
							style={{ backgroundColor: "#FFFFFF" }}
							speed={15}
							direction={"right"}
							spacing={0}
							images={[paymentLogos['payment_1'], paymentLogos['payment_2'],
							paymentLogos['payment_3'], paymentLogos['payment_4'],
							paymentLogos['payment_5'], paymentLogos['payment_6'],
							paymentLogos['payment_7'], paymentLogos['payment_8']]}
						/>
					</View>
				</View>

			)
		}

		else { return null; }
	}

	render() {
		const {
			largePagePadding,
			Items,
			submit,
			submitLocked,
			textColor1,
			textColor2,
			bgColor2,
			mainColor,
			mainColorText,
			disableCheckout,
			ShowVoucher,
			ShowNote,
			Summary: {
				ErrorShippingMessage,
			},
			Summary,
			SelectedShipping,
			required,
			onChangeShipping,
			SelectedWarehouse,
			SellEligibility,
			iconColor1,
			CheckoutStyle,
			CheckoutTopPopups = [],
			CheckoutMiddlePopups = [],
			CheckoutBottomPopups = [],
			pagePadding
		} = this.props

		const IsCheckoutDisable = () => {

			const {
				SellEligibility,
				Summary
			} = this.props

			if (SellEligibility && !SellEligibility.IsEligible) {
				return true
			} else if (Summary && Summary.OrderMinValue && Summary.OrderMinValue > Summary.subTotal) {
				return true
			} else if (Summary && Summary.OrderMaxValue && Summary.OrderMaxValue < Summary.subTotal) {
				return true
			}
			else {
				return false
			}
		}

		const showOrderMinValueErorrMsg = () => {

			const {
				Summary
			} = this.props

			if (Summary.OrderMinValue && Summary.OrderMinValue > Summary.subTotal) {
				return true
			} else {
				return false
			}
		}

		const showOrderMaxValueErorrMsg = () => {

			const {
				Summary
			} = this.props


			if (Summary.OrderMaxValue && Summary.OrderMaxValue < Summary.subTotal) {
				return true
			} else {
				return false
			}
		}

		const ShowFreeShipingDiscount = () => {

			const {
				Summary
			} = this.props

			if (Summary.OrderFreeShippingLimit && Summary.OrderFreeShippingLimit > Summary.subTotal) {
				return true
			} else {
				return false
			}
		}

		showSucessFreeShipingLimitation = () => {
			const {
				Summary
			} = this.props

			if (Summary.OrderFreeShippingLimit && Summary.OrderFreeShippingLimit <= Summary.subTotal) {
				return true
			} else {
				return false
			}
		}

		if (required && required.length > 0 && this.ScrollView) {
			this.ScrollView.scrollTo({
				y: this.state.OptionsPosy
			})
		}

		return (
			<LazyContainer>
				<CustomHeader
					title={"Checkout"}
					navigation={this.props.navigation}
					leftComponent="back" />

				<ScrollView
					ref={e => this.ScrollView = e}>

					<View
						style={{ paddingVertical: pagePadding }}>

						<PopupsSlider
							contentContainerStyle={{
								paddingBottom: largePagePadding
							}}
							name='CheckoutTopPopups'
							images={CheckoutTopPopups}
							navigation={this.props.navigation}
						/>
						{SelectedShipping && SelectedShipping.IsAddressRequired ?
							<>
								{this.renderAddressSelector()}
								<ItemSeparator style={{ margin: largePagePadding, }} />
							</> : null
						}

						{this.renderPayment()}
						{this.renderShipping()}

						<CheckoutCourierSelector
							icon={<FontAwesome name={'home'} size={22} color={iconColor1} />}
							navigation={this.props.navigation}
							SelectedShipping={SelectedShipping ? SelectedShipping : []}
							onChangeShipping={onChangeShipping}
							SelectedWarehouse={SelectedWarehouse}
						/>
						{(SelectedShipping && !SelectedShipping.AskForWarehouse) || (SelectedShipping && SelectedShipping.Warehouses && SelectedShipping.Warehouses.length <= 1) ? null :
							<ItemSeparator style={{ margin: largePagePadding, }} />
						}

						<TranslatedText style={{ color: textColor1, fontSize: 24, fontWeight: 'bold', marginHorizontal: largePagePadding, }} text="Items" />

						<FlatList
							contentContainerStyle={{
								padding: largePagePadding,
							}}
							ItemSeparatorComponent={
								() => <View style={{ height: largePagePadding, backgroundColor: 'transparent' }} />
							}
							keyExtractor={item => `${item.Id}`}
							data={Items}
							renderItem={this.renderItem} />

						<ItemSeparator style={{ marginHorizontal: largePagePadding, marginTop: 10 }} />

						<PopupsSlider
							contentContainerStyle={{
								paddingBottom: largePagePadding
							}}
							name='CheckoutMiddlePopups'
							images={CheckoutMiddlePopups}
							navigation={this.props.navigation}
						/>

						{this.renderOptions()}
						{ShowNote.Value ? this.renderNoteInput() : null}
						{ShowVoucher.Value ? this.renderVoucherInput() : null}
						{this.renderSummary()}

						<View style={{ marginTop: largePagePadding }}>
							<View>
								{disableCheckout ? <NotifationMessage type={'Erorr'} message={ErrorShippingMessage} shown={disableCheckout} /> : null}
								{SellEligibility ? <NotifationMessage type={'Erorr'} message={SellEligibility.ErrorMessage} shown={!SellEligibility.IsEligible} /> : null}

								{Summary && Summary.OrderFreeShippingLimit ? <NotifationMessage type='Info' message={`${ExternalTranslate('FreeShippingWhen')}${Summary.OrderFreeShippingLimit}${this.props.Currency.Name}${ExternalTranslate('AddMoreValue')}${parseFloat(String(Summary.OrderFreeShippingLimit - Summary.subTotal))}${this.props.Currency.Name}${ExternalTranslate('ToContinuewithOffer')}`} shown={Summary.OrderFreeShippingLimit > Summary.subTotal} /> : null}
								{Summary && Summary.OrderFreeShippingLimit ? <NotifationMessage type='Sucsess' message={`${ExternalTranslate('FreeShippingApplied')}`} shown={Summary.OrderFreeShippingLimit <= Summary.subTotal} /> : null}

								{Summary ? <NotifationMessage type='Erorr' message={`${ExternalTranslate('OrderMinValue')}${Summary.OrderMinValue}${this.props.Currency.Name}${ExternalTranslate('OrMore')} ${ExternalTranslate('AddMoreValue')}${parseFloat(String(Summary.OrderMinValue - Summary.subTotal))}${this.props.Currency.Name}${ExternalTranslate('ToContinue')}`} shown={Summary.OrderMinValue > Summary.subTotal} /> : null}
								{Summary ? <NotifationMessage type='Erorr' message={`${ExternalTranslate('OrderMaxValue')}${Summary.OrderMaxValue}${this.props.Currency.Name}${ExternalTranslate('OrLess')} ${ExternalTranslate('RemoveMoreValue')}${parseFloat(String(Summary.subTotal - Summary.OrderMaxValue))}${this.props.Currency.Name}${ExternalTranslate('ToContinue')}`} shown={showOrderMaxValueErorrMsg()} /> : null}
								{Summary ? <NotifationMessage type='Info' message={`${ExternalTranslate('EstimatedShippingMsg')} ${Summary.EstimatedShippingMsg}`} shown={Summary.EstimatedShippingMsg && Summary.EstimatedShippingMsg != null && Summary.EstimatedShippingMsg != ''} /> : null}

								{/* place order button */}
								<View style={{ marginHorizontal: largePagePadding, }}>
									<CustomButton
										disabled={(SellEligibility && !SellEligibility.IsEligible) || Summary.OrderMinValue > Summary.subTotal}
										backgroundColor={disableCheckout ? bgColor2 : mainColor}
										color={disableCheckout ? textColor2 : mainColorText}
										onPress={submit}
										fullWidth={false}
										loading={submitLocked}
										title="Order" />
								</View>
								{this.renderTermsAndCondition()}
							</View>
						</View>
						<PopupsSlider
							contentContainerStyle={{
								paddingVertical: largePagePadding
							}}
							name='CheckoutBottomPopups'
							images={CheckoutBottomPopups}
							navigation={this.props.navigation}
						/>
						{this.renderScrollingImages()}
					</View>
				</ScrollView>
			</LazyContainer>
		)
	}
}

const mapStateToProps = ({

	runtime_config: {
		runtime_config: {
			screens: {
				Cart_Index_06_1: {
					PaymentsLogosTheme
				}
			},
		},
	},
}) => ({
	PaymentsLogosTheme
})
export default connect(mapStateToProps)(Checkout)