import React, { Component } from 'react';
import { withLocalize } from 'react-localize-redux';
import { ScrollView, View, FlatList, Linking, Clipboard } from 'react-native';
import AutoHeightWebView from 'react-native-autoheight-webview';
import CountDown from 'react-native-countdown-component';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';
import { screenWidth } from '../../../constants/Metrics.js';
import { shadowStyle2, shadowStyle3 } from '../../../constants/Style';
import { redColor } from '../../../constants/Theme26/Colors';
import CustomHeader from '../../../partial_components/Common/CustomHeader';
import CustomTouchable from '../../../partial_components/Common/CustomTouchable';
import FontedText from '../../../partial_components/Common/FontedText';
import TranslatedText from '../../../partial_components/Common/TranslatedText';
import CircularImage from '../../../partial_components/Common/CircularImage';
import LazyContainer from '../../../partial_components/Common/LazyContainer';
import SettingsItem from '../../../partial_components/Common/Settings/SettingsItem.js';
import SettingsSeparator from '../../../partial_components/Common/Settings/SettingsSeparator.js';
import SettingsTitle from '../../../partial_components/Common/Settings/SettingsTitle';
import TouchableIcon from '../../../partial_components/Common/TouchableIcon';
import { LongToast } from '../../../utils/Toast';
import PriceText from '../../../partial_components/Common/PriceText/index.js';
import ProductOptionLabel from '../../../partial_components/Common/ProductOptionLabel/index.js';
import PopupsSlider from '../../../partial_components/Theme26/PopupsSlider/index.js';

class Order extends Component {
	constructor() {
		super()

		this.state = {
			didFetchData: false,
			isPriceCollapsed: false,
			priceEditorShown: false,
			isPriceCollapsed: false
		}
	}

	componentDidMount() {
		this.setState({ ...this.props, didFetchData: true })
	}

	renderProductOptions = () => {
		const { OrderOptions, Options } = this.state
		const { largePagePadding, pagePadding, textColor2 } = this.props

		return (
			<FlatList
				data={Options}
				contentContainerStyle={{
					padding: pagePadding,
					paddingHorizontal: largePagePadding
				}}
				numColumns={3}
				columnWrapperStyle={{
					flexWrap: 'wrap'
				}}
				keyExtractor={({ Id }) => String(Id)}
				renderItem={({ item, index }) => {

					const {
						Type,
						ExtraDetails1,
						ExtraDetails2
					} = item

					return (
						<CustomTouchable
							activeOpacity={item.Type.Id == 4 ? 0.2 : 1}
							onPress={() => {
								if (Type.Id == 4 && ExtraDetails1 && ExtraDetails1 != '' && ExtraDetails2 && ExtraDetails2 != '') {

									Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${ExtraDetails1},${ExtraDetails2}`);

								} else {
									if (ExtraDetails1 && ExtraDetails1 != '') {
										Clipboard.setString(ExtraDetails1)
										LongToast('Copied')
									}
								}
							}}
							key={index}
						>
							< ProductOptionLabel item={item} key={index} />
						</CustomTouchable>)

					// const { ProductOptionId, ProductOptionGroup, ProductOptionGroupMember, ExtraDetails1, ExtraDetails2, ExtraDetails3 } = item
					// return (
					// 	<View key={String(ProductOptionId)} style={{
					// 		paddingHorizontal: largePagePadding,
					// 		paddingVertical: pagePadding
					// 	}} >
					// 		{ProductOptionGroup && ProductOptionGroupMember && <FontedText style={{ textAlign: 'left' }}>{`${ProductOptionGroup.Name} : ${ProductOptionGroupMember.Name}`}</FontedText>}
					// 		{ExtraDetails1 ? <FontedText style={{ color: textColor2, textAlign: 'left' }}>{ExtraDetails1}</FontedText> : null}
					// 		{ExtraDetails2 ? <FontedText style={{ color: textColor2, textAlign: 'left' }}>{ExtraDetails2}</FontedText> : null}
					// 		{ExtraDetails3 ? <FontedText style={{ color: textColor2, textAlign: 'left' }}>{ExtraDetails3}</FontedText> : null}
					// 	</View>
					// )
				}}
			/>
		)
	}

	renderFooter = () => {
		if (!this.state.didFetchData) {
			return null
		}
		const { SubTotal, Tax, Shipping, Disocunt: Discount, ProcessingFees } = this.state.pricing
		const { Total } = this.state.pricing
		const {
			translate,
			pagePadding,
			textColor2,
			bgColor1,
			bgColor2,
			iconColor1,
		} = this.props

		if (this.state.isPriceCollapsed) {
			return (
				<CustomTouchable
					style={{
						backgroundColor: bgColor1,
						...shadowStyle3,
					}}
					onPress={() => {
						this.setState({ isPriceCollapsed: false })
					}}>
					<View
						style={{
							justifyContent: 'space-between',
							flexDirection: 'row',
							alignItems: 'center',
							padding: pagePadding
						}}>
						<FontedText style={{ color: textColor2, fontSize: 14, }}>{translate('FullPrice')}</FontedText>
						<PriceText style={{ color: textColor2, fontSize: 14, }}>{Total}</PriceText>
					</View>

					<SettingsSeparator color={bgColor2} />

					<View
						style={{
							justifyContent: 'space-between',
							flexDirection: 'row',
							alignItems: 'center',
							padding: pagePadding
						}}>
						<FontedText style={{ color: textColor2, fontSize: 14, }}>{translate('Subtotal')}</FontedText>
						<PriceText style={{ color: textColor2, fontSize: 14, }}>{SubTotal}</PriceText>
					</View>

					<SettingsSeparator color={bgColor2} />

					<View
						style={{
							justifyContent: 'space-between',
							flexDirection: 'row',
							alignItems: 'center',
							padding: pagePadding

						}}>
						<FontedText style={{ color: textColor2, fontSize: 14, }}>{translate('Tax')}</FontedText>
						<PriceText style={{ color: textColor2, fontSize: 14, }}>{Tax}</PriceText>
					</View>

					<SettingsSeparator color={bgColor2} />

					<View
						style={{
							justifyContent: 'space-between',
							flexDirection: 'row',
							alignItems: 'center',
							padding: pagePadding

						}}>
						<FontedText style={{ color: textColor2, fontSize: 14, }}>{translate('Shipping')}</FontedText>
						<PriceText style={{ color: textColor2, fontSize: 14, }}>{Shipping}</PriceText>
					</View>

					<SettingsSeparator color={bgColor2} />

					<View
						style={{
							justifyContent: 'space-between',
							flexDirection: 'row',
							alignItems: 'center',
							padding: pagePadding

						}}>
						<FontedText style={{ color: textColor2, fontSize: 14, }}>{translate('ProcessingFees')}</FontedText>
						<PriceText style={{ color: textColor2, fontSize: 14, }}>{ProcessingFees}</PriceText>
					</View>

				</CustomTouchable>
			)
		}
		else {
			return (
				<View
					style={{
						backgroundColor: bgColor1,
						flexDirection: 'row',
						justifyContent: 'space-between',
						...shadowStyle3,
					}}>
					<View
						style={{
							justifyContent: 'space-between',
							flexDirection: 'row',
							alignItems: 'center',
							padding: pagePadding
						}}>
						<FontedText style={{ color: textColor2, fontSize: 14, }}>{translate('FullPrice')}</FontedText>
						<PriceText contentContainerStyle={{ marginLeft: 20 }} style={{ color: textColor2, fontSize: 14, }}>{Total}</PriceText>
					</View>
					<View
						style={{
							flexDirection: 'row',
							alignItems: 'center',
							paddingHorizontal: 10,
						}}>

						<CustomTouchable
							onPress={() => {
								this.setState({ isPriceCollapsed: true })
							}}
							style={{
								paddingVertical: 2,
								paddingHorizontal: 10,
								marginLeft: 5,
							}}>
							<Ionicons name='ios-arrow-up' color={iconColor1} size={24} />
						</CustomTouchable>
					</View>
				</View>
			)
		}
	}

	renderOrderItemList = () => {
		const { didFetchData } = this.state
		const { Items } = this.props
		if (didFetchData) {
			return (
				<FlatList
					data={Items.Data}
					keyExtractor={({ OrderLineId }) => String(OrderLineId)}
					renderItem={this.renderOrderItems}
				/>
			)
		}
	}

	renderOption = ({ item, inedx }) => {

		const {
			Type,
			ExtraDetails1,
			ExtraDetails2
		} = item

		return (
			<CustomTouchable
				activeOpacity={Type.Id == 4 ? 0.2 : 1}
				onPress={() => {
					if (Type.Id == 4 && ExtraDetails1 && ExtraDetails1 != '' && ExtraDetails2 && ExtraDetails2 != '') {

						Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${ExtraDetails1},${ExtraDetails2}`);

					} else {
						if (ExtraDetails1 && ExtraDetails1 != '') {
							Clipboard.setString(ExtraDetails1)
							LongToast('Copied')
						}
					}
				}}
				key={inedx}
			>
				<ProductOptionLabel item={item} key={inedx} />
			</CustomTouchable>
		)
	}

	renderOrderItems = ({ item, index }) => {
		const {
			OrderLineId,
			Product: {
				Name,
				Icon: {
					ImageUrl,
				},
			},
			Qty,
			UnitPrice,
			ExtraDetails1,
			ExtraDetails2,
			ExtraDetails3,
			// Options,
			options,
			Note
		} = item
		const { largePagePadding, pagePadding, textColor2 } = this.props

		return (
			<View>
				<View
					style={{
						backgroundColor: 'white',
						flexDirection: 'row',
						justifyContent: 'space-between',
						paddingHorizontal: largePagePadding,
						paddingVertical: pagePadding,
					}}>
					<View
						style={{
							flex: 1,
							flexDirection: 'row',
						}}>
						<CircularImage
							uri={ImageUrl} id={index} />

						<View
							style={{
								flex: 1,
								paddingLeft: largePagePadding,
							}}>
							<FontedText style={{ color: 'black', textAlign: 'left' }}>{Name}</FontedText>
							<PriceText contentContainerStyle={{ marginTop: 5, }} style={{ color: textColor2, textAlign: 'left', }}>{UnitPrice}</PriceText>
							{Note !== null && Note !== '' ?
								<View style={{ flexDirection: 'row', marginTop: 5, alignContent: 'center' }} >
									<FontedText style={{ color: textColor2, textAlign: 'left', }}>{this.props.translate('OrderNote')}</FontedText>
									<FontedText style={{ color: textColor2, textAlign: 'left', }}>{Note}</FontedText>
								</View>
								: null}
							{ExtraDetails1 && ExtraDetails1 !== '' && <FontedText style={{ color: textColor2, textAlign: 'left', marginTop: 5, }}>{ExtraDetails1}</FontedText>}
							{ExtraDetails2 && ExtraDetails2 !== '' && <FontedText style={{ color: textColor2, textAlign: 'left', marginTop: 5, }}>{ExtraDetails2}</FontedText>}
							{ExtraDetails3 && ExtraDetails3 !== '' && <FontedText style={{ color: textColor2, textAlign: 'left', marginTop: 5, }}>{ExtraDetails3}</FontedText>}

							<FlatList
								data={options}
								contentContainerStyle={{
									padding: pagePadding
								}}
								numColumns={3}
								columnWrapperStyle={{
									flexWrap: 'wrap'
								}}
								keyExtractor={({ Id }) => String(Id)}
								renderItem={this.renderOption}
							/>
						</View>
					</View>

					<View
						style={{
							justifyContent: 'center',
							alignItems: 'flex-end',
							paddingLeft: 30,
						}}>
						<View
							style={{
								justifyContent: 'center',
								alignItems: 'center',
								width: 38,
								height: 38,
								borderRadius: 19,
							}}>
							<FontedText style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'right' }}>{Qty}</FontedText>
						</View>
					</View>
				</View>
			</View>
		)
	}
	renerCounter = () => {
		const { iconColor1, OrderCreatedFromInMins, bgColor1, textColor1, Status } = this.props

		const Timenow = this.props.TimeToCancleOrder.Value - OrderCreatedFromInMins

		return (
			<View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }} >


				<CountDown
					until={Status.Id == 9 ? 0 : Timenow * 60}
					timeToShow={['H', 'M', 'S']}
					timeLabels={{
						d: null,
						h: null,
						m: null,
						s: null
					}}
					size={10}
					digitStyle={{ backgroundColor: bgColor1 }}
					digitTxtStyle={{ color: textColor1 }}
					showSeparator={true}
				/>

				<MaterialCommunityIcons name='timer' style={{ marginHorizontal: 5 }} color={iconColor1} size={22} />
			</View>
		)
	}

	render() {
		const {
			iconColor1,
			canCancelOrder,
			onCancelOrder,
			Status,
			pagePadding,
			largePagePadding,
			TopPopups = [],
			BottomPopups = []
		} = this.props

		return (
			<LazyContainer style={{ flex: 1 }}>
				<CustomHeader
					title={"Order"}
					navigation={this.props.navigation}
					leftComponent="back"
					rightComponent={
						<TouchableIcon
							onPress={() => {
								const { summary } = this.state
								this.props.navigation.navigate('OrderDetails', {
									Id: this.props.Id,
									summary
								})
							}}>
							<Ionicons
								name={`ios-information-circle-outline`}
								size={24}
								color={iconColor1} />
						</TouchableIcon>
					} />

				<ScrollView
					contentContainerStyle={{
					}}>

					<PopupsSlider
						contentContainerStyle={{
							paddingVertical: pagePadding,
						}}
						images={TopPopups}
						name={'TopPopupsOrder'}
						navigation={this.props.navigation}
					/>

					{this.props.Items &&
						<View>
							<SettingsTitle textStyle={{ fontWeight: 'bold' }} title={"Items"} />
							{this.renderOrderItemList()}
						</View>}

					{this.state.OrderOptions && this.state.OrderOptions.length ?

						<View>
							<SettingsTitle textStyle={{ fontWeight: 'bold' }} title={"Options"} />
							{this.renderProductOptions()}
						</View> : null}

					<View style={{ marginTop: 10 }}  >
						<SettingsTitle
							textStyle={{ fontWeight: 'bold' }}
							title={"More"} />
					</View>

					<SettingsSeparator />

					<SettingsItem
						onPress={() => {
							this.props.navigation.navigate('OrderItems', {
								Id: this.props.Id,
								onChildChange: this.onChildChange,
							})
						}}
						info="Items" />

					<SettingsSeparator />

					<SettingsItem
						onPress={() => {
							this.props.navigation.navigate('OrderTrackingHistory', {
								Id: this.props.Id
							})
						}}
						info="TrackingHistory" />

					<SettingsSeparator />

					<SettingsItem
						onPress={() => {
							this.props.navigation.navigate('OrderItemReview', {
								Id: this.props.Id
							})
						}}
						info="OrderReview" />

					<SettingsSeparator />

					<SettingsItem
						onPress={() => {
							const { IsUnifiedInbox } = this.props

							if (IsUnifiedInbox.Value == true) { // navigate To Support

								this.props.navigation.navigate('Support')

							} else {

								this.props.navigation.navigate('OrderChat', {
									orderId: this.props.Id,
									CustomerId: this.state.Customer.Id,
								})
							}
						}}
						info="Chat" />

					<SettingsSeparator />

					<View style={{ opacity: canCancelOrder && (Status.Id == 1 || Status.Id == 2 || Status.Id == 3 || Status.Id == 4) ? 1 : 0.4 }} >
						<SettingsItem
							onPress={() => {
								if (canCancelOrder && (Status.Id == 1 || Status.Id == 2 || Status.Id == 3 || Status.Id == 4)) {
									onCancelOrder && onCancelOrder()
								}
							}}
							info="CancelOrder"
							infoStyle={{ color: redColor, fontSize: 15 }}
							leftComponent={<FontAwesome name="trash" color={iconColor1} size={22} />}
							rightComponent={this.renerCounter()}
						/>
					</View>


					<PopupsSlider
						contentContainerStyle={{
							paddingBottom: largePagePadding,
						}}
						images={BottomPopups}
						name={'BottomPopupsOrder'}
						navigation={this.props.navigation}
					/>
				</ScrollView>

				{this.renderFooter()}

			</LazyContainer>
		)
	}
}

const mapStateToProps = ({
	runtime_config: {
		runtime_config: {
			styles,
			colors,
		},
	},
}) => ({
	...styles,
	...colors,
})


export default connect(mapStateToProps)(withLocalize(Order))