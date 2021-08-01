import React, { Component } from 'react'
import {  View, FlatList, ScrollView } from 'react-native'
import LazyContainer from '../../../partial_components/Common/LazyContainer';
import CustomHeader from '../../../partial_components/Common/CustomHeader';
import FontedText from '../../../partial_components/Common/FontedText';
import Ionicons from 'react-native-vector-icons/Ionicons'
import TranslatedText from '../../../partial_components/Common/TranslatedText';
import { SelectEntity } from '../../../utils/EntitySelector';
import CustomButton from '../../../partial_components/Theme7/CustomButton';
import ArrowItem from '../../../partial_components/Common/ArrowItem';
import { TrimText } from '../../../utils/Text';
import RemoteImage from '../../../partial_components/Common/RemoteImage';
import CustomInput from '../../../partial_components/Theme7/CustomInput';
import { STRING_LENGTH_LONG } from '../../../constants/Config';
import CustomTouchable from '../../../partial_components/Common/CustomTouchable';
import PriceText from '../../../partial_components/Common/PriceText';

export default class Checkout extends Component {
	renderItem = ({ item }) => {
		const { Product, TotalPrice, Qty } = item
		const { Name, ShortDescription, Icon: { ImageUrl } } = Product
		const { pagePadding, textColor2 } = this.props

		return (
			<CustomTouchable
				style={{
					flexDirection: 'row',
					justifyContent: 'space-between',
				}}>
				<View 
					style={{ 
						flex: 3, 
						flexDirection: 'row',
						paddingRight: pagePadding,
					}}>
					<RemoteImage
						dimension={250}
						resizeMode='cover'
						style={{ width: 70, height: 70 }}
						uri={ImageUrl}
					/>

					<View style={{ justifyContent: 'center', paddingHorizontal: pagePadding }}>
						<FontedText style={{ fontSize: 15 }}>{Name}</FontedText>
						<FontedText style={{ color: textColor2, fontSize: 15 }}>{ShortDescription}</FontedText>
					</View>
				</View>

				<View 
					style={{ 
						flex: 1, 
						justifyContent: 'center',
						alignItems: 'flex-end',
						paddingLeft: pagePadding 
					}}>
					<PriceText style={{ fontSize: 17 }}>{TotalPrice}</PriceText>
					<FontedText style={{ fontSize: 15 }}>{Qty}</FontedText>
				</View>
			</CustomTouchable>
		)
	}

	renderAddress = () => {
		const {
			mainColor,
			SelectedAddress,
			onChangeAddress,
		} = this.props

		return (
			<View
				style={{

				}}>
				<ArrowItem
					onPress={() => {
						SelectEntity(this.props.navigation, data => {
							onChangeAddress(data)
						}, 'Address/ListSimple', null, false, 1)
					}}
					title={'Address'}
					info={SelectedAddress ? TrimText(SelectedAddress.Name, 16) : null} />

				<CustomTouchable
					onPress={() => {
						this.props.navigation.navigate('Address', {
							onChildChange: this.props.reloadAddresses,
						})
					}}
					style={{
						flexDirection: 'row',
						alignItems: 'center',
					}}>
					<Ionicons name={`ios-add`} size={25} color={mainColor} />
					<TranslatedText style={{ color: mainColor, marginLeft: 5, }} text={'NewAddress'} />
				</CustomTouchable>
			</View>
		)
	}

	renderPayment = () => {
		const {
			SelectedAddress,
			SelectedPayment,
			onChangePayment,
		} = this.props

		if (SelectedAddress) {
			return (
				<ArrowItem
					onPress={() => {
						SelectEntity(this.props.navigation, data => {
							onChangePayment(data)
						}, 'Cart/PaymentMethods', `ShippingAddress=${SelectedAddress.Id}`, false, 1)
					}}
					title={'Payment'}
					info={SelectedPayment ? `${SelectedPayment.Name} (${SelectedPayment.Cost})` : null} />
			)
		}
	}

	renderShipping = () => {
		const {
			SelectedAddress,
			SelectedShipping,
			onChangeShipping,
		} = this.props

		if (SelectedAddress) {
			return (
				<ArrowItem
					onPress={() => {
						SelectEntity(this.props.navigation, data => {
							onChangeShipping(data)
						}, 'Cart/ShippingMethods', `ShippingAddress=${SelectedAddress.Id}`, false, 1)
					}}
					title={'Shipping'}
					info={SelectedShipping ? `${SelectedShipping.Name} (${SelectedShipping.Cost})` : null} />
			)
		}
	}

	renderSummary = () => {
		const {
			pagePadding,
			bgColor1,
			bgColor2,
			textColor1,
			textColor2,
			Summary: {
				subTotal,
				shipping,
				Discount,
				Tax,
				Total,
			},
		} = this.props

		return (
			<View>
				<View
					style={{
						backgroundColor: bgColor1,
						flexDirection: 'row',
						justifyContent: 'space-between',
						borderTopColor: bgColor2,
						borderTopWidth: 1,
						padding: pagePadding
					}}>
					<TranslatedText style={{ color: textColor2 }} text="Subtotal" />
					<PriceText style={{ fontSize: 18 }}>{subTotal}</PriceText>
				</View>

				{shipping > 0 && <View
					style={{
						backgroundColor: bgColor1,
						flexDirection: 'row',
						justifyContent: 'space-between',
						borderTopColor: bgColor2,
						borderTopWidth: 1,
						padding: pagePadding
					}}>
					<TranslatedText style={{ color: textColor2 }} text="Shipping" />
					<PriceText style={{ fontSize: 18 }}>{shipping}</PriceText>
				</View>}

				{Discount > 0 && <View
					style={{
						backgroundColor: bgColor1,
						flexDirection: 'row',
						justifyContent: 'space-between',
						borderTopColor: bgColor2,
						borderTopWidth: 1,
						padding: pagePadding
					}}>
					<TranslatedText style={{ color: textColor2 }} text="Discount" />
					<PriceText style={{ fontSize: 18 }}>{Discount}</PriceText>
				</View>}

				{Tax > 0 && <View
					style={{
						backgroundColor: bgColor1,
						flexDirection: 'row',
						justifyContent: 'space-between',
						borderTopColor: bgColor2,
						borderTopWidth: 1,
						padding: pagePadding
					}}>
					<TranslatedText style={{ color: textColor2 }} text="Tax" />
					<PriceText style={{ fontSize: 18 }}>{Tax}</PriceText>
				</View>}

				<View
					style={{
						backgroundColor: bgColor1,
						flexDirection: 'row',
						justifyContent: 'space-between',
						borderTopColor: bgColor2,
						borderTopWidth: 1,
						borderBottomColor: bgColor2,
						borderBottomWidth: 1,
						padding: pagePadding
					}}>
					<TranslatedText style={{ color: textColor1 }} text="Total" />
					<PriceText style={{ fontSize: 18 }}>{Total}</PriceText>
				</View>
			</View>
		)
	}

	renderVoucherInput = () => {
		const {
			largePagePadding,
			onInputVoucher,
			voucher,
		} = this.props

		return (
			<View
				style={{
					paddingBottom: largePagePadding,
				}}>
				<CustomInput
					containerStyle={{
						marginTop: largePagePadding,
						marginHorizontal: largePagePadding,
					}}
					value={voucher}
					onChangeText={onInputVoucher}
					placeholder='TypeVoucherHere' />
			</View>
		)
	}

	renderNoteInput = () => {
		const {
			largePagePadding,
			onInputNote,
			note,
		} = this.props

		return (
			<View
				style={{
					paddingBottom: largePagePadding,
				}}>
				<CustomInput
					containerStyle={{
						marginTop: largePagePadding,
						marginHorizontal: largePagePadding,
					}}
					numberOfLines={2}
					multiline={true}
					maxLength={STRING_LENGTH_LONG}
					value={note}
					onChangeText={onInputNote}
					placeholder='TypeNoteHere' />
			</View>
		)
	}

	render() {
		const {
			largePagePadding,
			pagePadding,
			Items,
			submit,
			submitLocked,
			bgColor1,
			bgColor2,
		} = this.props

		return (
			<LazyContainer>
				<CustomHeader
					navigation={this.props.navigation}
					title={"Checkout"}
					leftComponent="back" />

				<ScrollView
					contentContainerStyle={{
						paddingVertical: largePagePadding,
					}}>
					<View
						style={{
							backgroundColor: bgColor1,
							marginHorizontal: largePagePadding,
							padding: pagePadding,
						}}>
						{this.renderAddress()}
						{this.renderPayment()}
						{this.renderShipping()}
					</View>

					<FlatList
						style={{ flex: 1 }}
						contentContainerStyle={{ 
							backgroundColor: bgColor1, 
							margin: largePagePadding, 
							padding: largePagePadding 
						}}
						ItemSeparatorComponent={
							() => <View style={{ height: 1, marginVertical: largePagePadding, backgroundColor: bgColor2 }}></View>
						}
						keyExtractor={item => `${item.Id}`}
						data={Items}
						renderItem={this.renderItem} />

					{this.renderSummary()}
					{this.renderNoteInput()}
					{this.renderVoucherInput()}

					<CustomButton
						style={{
							marginTop: largePagePadding,
							marginHorizontal: largePagePadding,
						}}
						onPress={submit}
						loading={submitLocked}
						title="Order" />
				</ScrollView>
			</LazyContainer>
		)
	}
}