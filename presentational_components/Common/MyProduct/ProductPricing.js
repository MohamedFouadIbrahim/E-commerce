import React, { Component } from 'react'
import { ScrollView, View, ActivityIndicator, I18nManager, TextInput, Text, FlatList, Platform, KeyboardAvoidingView } from 'react-native'
import LazyContainer from '../../../partial_components/Common/LazyContainer'
import ItemSeparator from '../../../partial_components/Common/ItemSeparator';
import Ionicons from 'react-native-vector-icons/Ionicons'
import TranslatedText from '../../../partial_components/Common/TranslatedText';
import { withLocalize } from 'react-localize-redux';
import { screenHeight, screenWidth } from '../../../constants/Metrics.js';
import {
	GetProductPricing,
	EditProductPricing
} from '../../../services/ProductService.js';

import { EventRegister } from 'react-native-event-listeners'
import DateTimePicker from "react-native-modal-datetime-picker";
import Modal from "react-native-modal";
import { formatDate, formatTime } from '../../../utils/Date';
import HorizontalInput from '../../../partial_components/Common/HorizontalInput';
import RoundedInput from '../../../partial_components/Theme26/RoundedInput';
import FontedText from '../../../partial_components/Common/FontedText';
import CustomTouchable from '../../../partial_components/Common/CustomTouchable';
import { LongToast } from '../../../utils/Toast';
import PriceText from '../../../partial_components/Common/PriceText';
import RoundedSelector from '../../../partial_components/Common/RoundedSelector';

class ProductPricing extends Component {
	constructor(props) {
		super(props)
		this.state = {
			didFetchData: false,
			isDateTimePickerVisible: false,
			PricingHistory: [],
			isPriceModalVisible: false,
			stepPrice: null,
			LowStep: null,
			HighStep: null,
			priceStepErr: null,
			buttonLoading: false,
			showCustomSelectorForDeleteref: false,
			Loading: false,
			EditMode: false
		}

		this.listener = EventRegister.addEventListener('currentPost', (currentPost) => {
			// if (currentPost == '1') {
			// 	this.submitPricing()
			// }
			this.submitPricing()

		})
	}

	componentDidMount() {
		// this.fetchPricingHistory()
		this.fetchProductPricing()
	}

	fetchProductPricing = () => {
		this.cancelFetchDataGetProductPricing = GetProductPricing(this.props.ProductId, res => {
			this.setState({
				...res.data,
				didFetchData: true,
			})
		}, err => {
		})
	}

	fetchPricingHistory = () => {
		// this.cancelFetchDataGetProductPricingHistory = GetProductPricingHistory(this.props.ProductId, res => {
		// 	this.setState({ PricingHistory: res.data })
		// })
	}

	componentWillUnmount() {
		// EventRegister.removeEventListener(this.listener)
		this.cancelFetchData && this.cancelFetchData()
		this.cancelFetchDataGetProductPricingHistory && this.cancelFetchDataGetProductPricingHistory()
		this.cancelFetchDataGetProductPricing && this.cancelFetchDataGetProductPricing()
		this.cancelFetchDataAddProductPriceStep && this.cancelFetchDataAddProductPriceStep()
	}

	handleDatePicked = date => {
		this.setState({ SaleExpirationDate: date.toISOString(), isDateTimePickerVisible: false })
	};

	submitPricing = () => {
		const { Price, RealPrice, MaxPurchaseCount, SalePrice, SaleExpirationDate, Tax } = this.state
		const { ProductId } = this.props
		if (!Price) {
			LongToast('pleaseenteraprice')
		} else {
			EventRegister.emit('submitting', true)
			EditProductPricing({
				Id: ProductId,
				Price,
				RealPrice,
				MaxPurchaseCount,
				SalePrice,
				SaleExpirationDate,
				Tax
			}, res => {
				LongToast('dataSaved')
				EventRegister.emit('submitting', false)
			}, err => {
				EventRegister.emit('submitting', false)
			})
		}
	}

	renderContent = () => {
		const {
			product,
			translate,
		} = this.props;

		if (this.state.didFetchData) {
			return (
				<ScrollView contentContainerStyle={Platform.OS == 'ios' ? { height: screenHeight, paddingHorizontal: 20 } : { paddingHorizontal: 20 }}>

					<RoundedInput
						title='Price'
						placeholder='Price'
						keyboardType="numeric"
						value={this.state.Price ? String(this.state.Price) : null}
						onChangeText={(Price) => { this.setState({ Price }) }} />

					<RoundedInput
						keyboardType="numeric"
						title='RealPrice'
						placeholder='RealPrice'
						value={this.state.RealPrice ? String(this.state.RealPrice) : null}
						onChangeText={(RealPrice) => { this.setState({ RealPrice }) }} />

					<RoundedInput
						keyboardType="numeric"
						title='SalePrice'
						placeholder='SalePrice'
						value={this.state.SalePrice ? String(this.state.SalePrice) : null}
						onChangeText={(SalePrice) => { this.setState({ SalePrice }) }} />

					<RoundedSelector
						onPress={() => this.setState({ isDateTimePickerVisible: true })}
						title='SaleExpirationDate'
						value={this.state.SaleExpirationDate ? `${formatDate(this.state.SaleExpirationDate)} - ${formatTime(this.state.SaleExpirationDate)}` : translate('notselected')}
						containerStyle={{ marginTop: 20 }}
						trimText={false}
					/>
					<DateTimePicker
						isVisible={this.state.isDateTimePickerVisible}
						onConfirm={this.handleDatePicked}
						is24Hour={true}
						mode='datetime'
						onCancel={() => this.setState({ isDateTimePickerVisible: false })}
					/>
					{/* <CustomTouchable
						onPress={() => this.setState({ isDateTimePickerVisible: true })}
						style={{
							justifyContent: 'center',
							alignItems: 'center',
							flexDirection: 'row',
							paddingVertical: 15,
							paddingHorizontal: 20,
						}}>
						<DateTimePicker
							isVisible={this.state.isDateTimePickerVisible}
							onConfirm={this.handleDatePicked}
							is24Hour={true}
							mode='datetime'
							onCancel={() => this.setState({ isDateTimePickerVisible: false })}
						/>
						<TranslatedText
							style={{
								justifyContent: 'center',
								flex: 2,
							}}
							text={"SaleExpirationDate"} />

						<FontedText style={{
							flex: 5,
							justifyContent: 'center',
							paddingLeft: 70,
						}}>{this.state.SaleExpirationDate ? `${formatDate(this.state.SaleExpirationDate)} - ${formatTime(this.state.SaleExpirationDate)}` : translate('notselected')}</FontedText>
					</CustomTouchable> */}


					<RoundedInput
						keyboardType="numeric"
						title='Tax'
						placeholder='Tax'
						value={this.state.Tax ? String(this.state.Tax) : null}
						onChangeText={(Tax) => { this.setState({ Tax }) }} />


					<RoundedInput
						keyboardType="numeric"
						title='MaxPurchaseCount'
						placeholder='MaxPurchaseCount'
						value={this.state.MaxPurchaseCount ? String(this.state.MaxPurchaseCount) : null}
						onChangeText={(MaxPurchaseCount) => { this.setState({ MaxPurchaseCount }) }} />


					<FlatList
						data={this.state.priceSteps}
						extraData={this.state}
						keyExtractor={(item) => String(item.Id)}
						ItemSeparatorComponent={() => <ItemSeparator />}
						renderItem={({ item }) => (
							<CustomTouchable
								onPress={() => {
									this.setState({
										LowStep: parseInt(item.LowStepQty, 10),
										HighStep: parseInt(item.HighStepQty, 10),
										stepPrice: parseInt(item.Price, 10),
										Id: item.Id
									}, () => {
										this.setState({ isPriceModalVisible: true })
									})

								}}
								onLongPress={() => {
									this.DeleteOrEditId = item.Id
									this.setState({ showCustomSelectorForDeleteref: true })
								}}
							>
								<View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 20 }}>
									<View style={{ flexDirection: 'row', alignItems: 'center' }}>
										<Text>{item.LowStepQty}</Text>
										<Ionicons name={I18nManager.isRTL ? 'ios-arrow-round-back' : 'ios-arrow-round-forward'} size={20} style={{ marginHorizontal: 10 }} />
										<Text>{item.HighStepQty}</Text>
									</View>

									<PriceText>{item.Price}</PriceText>
								</View>
							</CustomTouchable>
						)}
					/>

					{
						this.state.PricingHistory.length > 0 ?
							<>
								<TranslatedText style={{ paddingTop: 60, fontWeight: 'bold' }} text={"PricingHistory"} />

								<FlatList
									data={this.state.PricingHistory}
									extraData={this.state}
									keyExtractor={(item) => String(item.Id)}
									ItemSeparatorComponent={() => <ItemSeparator />}
									renderItem={({ item }) => (
										<View style={{ padding: 20 }}>
											<View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', }}>
												<View style={{ flexDirection: 'row', alignItems: 'center' }}>
													<Text>{item.OldPrice}</Text>
													<Ionicons name={I18nManager.isRTL ? 'ios-arrow-round-back' : 'ios-arrow-round-forward'} size={20} style={{ marginHorizontal: 10 }} />
													<Text>{item.NewPrice}</Text>
												</View>

												<FontedText style={{}}>{item.CreatedUtc}</FontedText>
											</View>
											{item.ProductOption ? <FontedText style={{}}>{item.ProductOption.Name}</FontedText> : null}
										</View>
									)}
								/>
							</>
							: null
					}

				</ScrollView>
			)
		} else {
			return (
				<View style={{ flex: 1, minHeight: screenHeight / 2, alignItems: 'center', justifyContent: 'center' }}>
					<ActivityIndicator />
				</View>
			)
		}
	}

	render() {
		return (
			<LazyContainer>
				{
					Platform.OS == 'ios' ?

						<KeyboardAvoidingView behavior='padding' enabled
							style={{ flex: 1, }}
							// shouldRasterizeIOS
							keyboardVerticalOffset={120}
						>
							{this.renderContent()}
						</KeyboardAvoidingView> :

						this.renderContent()

				}
			</LazyContainer>
		)
	}
}

export default withLocalize(ProductPricing)