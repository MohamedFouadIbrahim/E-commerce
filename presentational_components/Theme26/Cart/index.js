import React, { Component } from 'react'
import { View } from 'react-native'
import LazyContainer from '../../../partial_components/Common/LazyContainer';
import CustomHeader from '../../../partial_components/Common/CustomHeader';
import RemoteDataContainer from '../../../partial_components/Common/RemoteDataContainer';
import PaddingCalculator from '../../../partial_components/Common/RemoteDataContainer/Helper'
import RemoteImage from '../../../partial_components/Common/RemoteImage';
import PopupsSlider from '../../../partial_components/Theme26/PopupsSlider';
import CustomButton from '../../../partial_components/Common/CustomButton';
import CartItem from './CartItem';
import TranslatedText from '../../../partial_components/Common/TranslatedText';
import PriceText from '../../../partial_components/Common/PriceText';
import NotifationMessage from '../../../partial_components/Common/NotificationMessage';
import { ExternalTranslate } from '../../../utils/Translate';
import { PopupsListProps } from '../../../utils/PopupsSliderList';

export default class Cart extends Component {
	renderItem = ({ item, index }) => {
		return (
			<View
				style={{
					paddingHorizontal: this.PaddingObj.ItemMarginHorizontal,
				}}
			>
				<CartItem
					navigation={this.props.navigation}
					index={index}
					item={item}
					onDeleteCart={this.props.deleteCart}
					onIncrementQuantity={this.props.onIncrementQuantity}
					onDecrementQuantity={this.props.onDecrementQuantity} />
			</View>
		)
	}

	renderFooter = () => {
		const {
			pagePadding,
			bgColor2,
			SellEligibility,
			Summary
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

		const showSucessFreeShipingLimitation = () => {
			const {
				Summary
			} = this.props

			if (Summary.OrderFreeShippingLimit && Summary.OrderFreeShippingLimit <= Summary.subTotal) {
				return true
			} else {
				return false
			}
		}

		return (
			<View>

				{SellEligibility ? <NotifationMessage type='Erorr' message={SellEligibility.ErrorMessage} shown={!SellEligibility.IsEligible} /> : null}
				{Summary && this.props.data && this.props.data.length > 0 && Summary.OrderFreeShippingLimit ? <NotifationMessage type='Info' message={`${ExternalTranslate('FreeShippingWhen')}${Summary.OrderFreeShippingLimit}${this.props.Currency.Name}${ExternalTranslate('AddMoreValue')}${parseFloat(String(Summary.OrderFreeShippingLimit - Summary.subTotal))}${this.props.Currency.Name}${ExternalTranslate('ToContinuewithOffer')}`} shown={Summary.OrderFreeShippingLimit > Summary.subTotal} /> : null}
				{Summary && this.props.data && this.props.data.length > 0 && Summary.OrderFreeShippingLimit ? <NotifationMessage type='Sucsess' message={`${ExternalTranslate('FreeShippingApplied')}`} shown={Summary.OrderFreeShippingLimit <= Summary.subTotal} /> : null}
				{Summary && this.props.data && this.props.data.length > 0 ? <NotifationMessage type='Erorr' message={`${ExternalTranslate('OrderMinValue')}${Summary.OrderMinValue}${this.props.Currency.Name}${ExternalTranslate('OrMore')} ${ExternalTranslate('AddMoreValue')}${parseFloat(String(Summary.OrderMinValue - Summary.subTotal))}${this.props.Currency.Name}${ExternalTranslate('ToContinue')}`} shown={Summary.OrderMinValue > Summary.subTotal} /> : null}
				{Summary && this.props.data && this.props.data.length > 0 ? <NotifationMessage type='Erorr' message={`${ExternalTranslate('OrderMaxValue')}${Summary.OrderMaxValue}${this.props.Currency.Name}${ExternalTranslate('OrLess')} ${ExternalTranslate('RemoveMoreValue')}${parseFloat(String(Summary.subTotal - Summary.OrderMaxValue))}${this.props.Currency.Name}${ExternalTranslate('ToContinue')}`} shown={showOrderMaxValueErorrMsg()} /> : null}

				{this.props.data && this.props.data.length == 0 ? null : <View
					style={{
						backgroundColor: bgColor2,
						padding: pagePadding,
						flexDirection: 'row',
						justifyContent: 'space-between',
						alignItems: 'center',
					}}>
					<View
						style={{
							flexDirection: 'row',
							alignItems: 'center',
						}}>
						{this.props.didFetchData && this.props.data && this.props.data.length >= 1 ? <RemoteImage
							dimension={250}
							style={{
								width: 40,
								height: 40,
								borderRadius: 10,
							}}
							uri={this.props.data[0].Product.Icon.ImageUrl} /> : null}

						{this.props.data && this.props.data.length > 1 ? <RemoteImage
							dimension={250}
							style={{
								width: 40,
								height: 40,
								borderRadius: 10,
								marginLeft: pagePadding,
							}}
							uri={this.props.data[1].Product.Icon.ImageUrl} /> : null}

						{this.props.didFetchData && this.props.data && this.props.data.length >= 1 && this.props?.Summary?.subTotal ? <View
							style={{
								justifyContent: 'center',
								marginLeft: pagePadding,
							}}>
							<TranslatedText style={{ fontSize: 14, }} text='CartSubtotal' />
							<PriceText style={{ fontSize: 14, }}>{this.props?.Summary?.subTotal}</PriceText>
						</View> : null}
					</View>

					<CustomButton
						onPress={this.props.navigateToCheckout}
						disabled={!this.props.didFetchData}
						style={{
							marginHorizontal: pagePadding,
							marginVertical: pagePadding,
							paddingHorizontal: 30,
						}}
						loading={!this.props.didFetchData}
						title="Checkout" />
				</View>}
			</View>

		)

	}

	renderFlatListSeparator = () => {
		const {
			largePagePadding,
		} = this.props

		return (
			<View style={{ height: largePagePadding, backgroundColor: 'transparent' }} />
		)
	}

	render() {
		const {
			largePagePadding,
			onDataFetched,
			data,
			triggerRefresh,
			mainScreen,
			pagePadding,
			CartBottomPopups = [],
			CartTopPopups = []
		} = this.props

		this.PaddingObj = PaddingCalculator(1);

		return (
			<LazyContainer>
				<CustomHeader
					navigation={this.props.navigation}
					mainScreen={mainScreen}
					title={"Cart"}
					leftComponent="drawer" />

				<RemoteDataContainer
					url={"Cart/Index"}
					cacheName={"cart"}
					onDataFetched={onDataFetched}
					updatedData={data}
					triggerRefresh={triggerRefresh}
					keyExtractor={({ Id }) => `${Id}`}
					contentContainerStyle={{
					}}
					pagination={false}
					ItemSeparatorComponent={this.renderFlatListSeparator}
					renderItem={this.renderItem}
					ListEmptyComponent={
						<View
							style={{
								flex: 1,
								justifyContent: 'center',
								alignItems: 'center',
								marginTop: 60,
								paddingHorizontal: 30,
							}}>
							<TranslatedText style={{ fontSize: 22, marginTop: 15 }} text="CartIsEmpty" />
						</View>
					}
					{...PopupsListProps(CartTopPopups, CartBottomPopups, true, true, 'TopPopups', 'BottomPopups', {
						navigation: this.props.navigation,
					}, {
						navigation: this.props.navigation,
					})}
				/>

				{this.renderFooter()}
			</LazyContainer>
		)
	}
}