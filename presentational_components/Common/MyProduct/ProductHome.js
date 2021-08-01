import React, { Component } from 'react';
import { withLocalize } from 'react-localize-redux';
import { ActivityIndicator, I18nManager, ScrollView, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { screenHeight, screenWidth } from '../../../constants/Metrics.js';
import CircularImage from '../../../partial_components/Common/CircularImage';
import CustomSelector from '../../../partial_components/Common/CustomSelector';
import CustomTouchable from '../../../partial_components/Common/CustomTouchable';
import FontedText from '../../../partial_components/Common/FontedText';
import ItemSeparator from '../../../partial_components/Common/ItemSeparator';
import LazyContainer from '../../../partial_components/Common/LazyContainer';
import RemoteImageBackground from '../../../partial_components/Common/RemoteImageBackground';
import TranslatedText from '../../../partial_components/Common/TranslatedText';
import { EditProductStatus, EditProductVisibility, GetProductHome, GetProductValidityExtend, GetProductStatusList, GetProductVisibilityList } from '../../../services/ProductService.js';
import { numeral } from '../../../utils/numeral';
import PriceText from '../../../partial_components/Common/PriceText/index.js';
import { formatDate } from '../../../utils/Date.js';
import CustomModal from '../../../partial_components/Common/CustomModal/index.js';
import CustomButton from '../../../partial_components/Theme7/CustomButton/index.js';

class productHome extends Component {
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
			ProductOptions: [],
			showModal: false
		}
		// this.ProductVisibilityRef = React.createRef();
		// this.ProductStatusRef = React.createRef();
		this.ProductVisibilityRef = React.createRef()
		this.ProductStatusRef = React.createRef()
	}

	componentDidMount() {
		this.fetchFilters();
	}


	fetchFilters = () => {

		GetProductStatusList(resStatus => {

			GetProductVisibilityList(resVisability => {

				this.setState({
					ProductVisibility: resVisability.data,
					ProductStatus: resStatus.data.filter(item => item.Id != 3 && item.Id != 8),
					FillterFitched: true
				})

			})

		})



		this.fetchContent()

	}


	fetchContent = () => {
		this.cancelFetchDataGetProductHome = GetProductHome(this.props.ProductId, res => {
			// console.log('ff', res.data)
			this.setState({ productHome: res.data, didFetchData: true, selectedStatus: res.data.Status, selectedVisibility: res.data.Visibility })
		})
	}

	componentWillUnmount() {
		this.cancelFetchDataDeleteProductPriceStep && this.cancelFetchDataDeleteProductPriceStep()
		this.cancelFetchDataGetProductHome && this.cancelFetchDataGetProductHome()
		this.cancelFetchDatagetFilters && this.cancelFetchDatagetFilters()

	}

	handleDatePicked = date => {
		this.setState({ SaleExpirationDate: date.toISOString(), isDateTimePickerVisible: false })
	};


	renderImage = () => {
		const imageSize = 90
		const { ImageUrl } = this.state.productHome.Image

		return (
			<View
				style={{
					alignSelf: 'center',
					justifyContent: 'center',
					alignItems: 'center',
				}}>
				<CircularImage
					uri={ImageUrl}
					size={imageSize} />
			</View>
		)
	}

	onValidityExtendRequestPress = () => {
		GetProductValidityExtend(this.props.ProductId, res => {
			this.fetchContent()
		})
	}

	renderValidityExtendRequestModal = () => {
		return (
			<CustomModal visible={this.state.showModal} title={''} closeButton={true} onClose={() => { this.setState({ showModal: false }) }} >
				<View>
					<TranslatedText text={'ValidityExtendText'} />
				</View>
				<CustomButton style={{ marginVertical: this.props.largePagePadding, borderRadius: this.props.borderRadius }} title='Confirm' onPress={() => {
					this.setState({ showModal: false }, this.onValidityExtendRequestPress)
				}} />
			</CustomModal>
		)
	}
	renderContent = () => {
		const { translate } = this.props
		const { largePagePadding, largeBorderRadius, pagePadding } = this.props
		if (!this.state.didFetchData) {
			return null
		}
		if (this.state.didFetchData) {
			const { product } = this.props;
			const { filters, selectedStatus, selectedVisibility } = this.state

			return (
				<ScrollView style={{ flex: 1, }}>
					<RemoteImageBackground
						dimension={720}
						wide={true}
						blurRadius={5}
						style={{ flex: 1, }}
						uri={this.state.productHome.Image.ImageUrl}>
						<LinearGradient
							colors={['rgba(0, 0, 0, .1)', 'rgba(0, 0, 0, .6)', 'rgba(0, 0, 0, 1)']}
							style={{
								flex: 1,
								paddingVertical: largePagePadding,
								justifyContent: 'center',
								alignItems: 'center',
							}}>
							{this.renderImage()}

							<View style={{ justifyContent: 'center', alignItems: 'center', marginTop: largePagePadding }}>
								<FontedText style={{ fontSize: 20, textAlign: 'center', fontWeight: 'bold', color: this.state.productHome.Image.TextColor }}>{product.Name}</FontedText>

								<View style={{ flexDirection: 'row', justifyContent: 'space-between', width: screenWidth, marginTop: 20 }}>
									<View style={{ textAlign: 'center', justifyContent: 'center', borderRadius: 10, paddingHorizontal: 13, paddingVertical: 9 }}>
										<FontedText style={{ textAlign: 'center', color: this.state.productHome.Image.TextColor }}>{translate('Price')}</FontedText>
										<PriceText style={{ textAlign: 'center', color: this.state.productHome.Image.TextColor }}>{numeral(product.Price)}</PriceText>
									</View>
									<View style={{ textAlign: 'center', justifyContent: 'center', borderRadius: 10, paddingHorizontal: 13, paddingVertical: 9 }}>
										<FontedText style={{ textAlign: 'center', color: this.state.productHome.Image.TextColor }}>{translate('Orders')}</FontedText>
										<FontedText style={{ textAlign: 'center', color: this.state.productHome.Image.TextColor }}>{numeral(product.OrdersCount)}</FontedText>
									</View>
									<View style={{ textAlign: 'center', justifyContent: 'center', borderRadius: 10, paddingHorizontal: 13, paddingVertical: 9 }}>
										<FontedText style={{ textAlign: 'center', color: this.state.productHome.Image.TextColor }}>{translate('Rating')}</FontedText>
										<FontedText style={{ textAlign: 'center', color: this.state.productHome.Image.TextColor }}>{numeral(product.Rating)}</FontedText>
									</View>
									<View style={{ textAlign: 'center', justifyContent: 'center', borderRadius: 10, paddingHorizontal: 13, paddingVertical: 9 }}>
										<FontedText style={{ textAlign: 'center', color: this.state.productHome.Image.TextColor }}>{translate('Questions')}</FontedText>
										<FontedText style={{ textAlign: 'center', color: this.state.productHome.Image.TextColor }}>{`${product.QuestionsNeedAttentionCount} (${numeral(product.QuestionsCount)})`}</FontedText>
									</View>
								</View>
							</View>
						</LinearGradient>
					</RemoteImageBackground>

					<View style={{ position: 'absolute', zIndex: 3, top: 20, width: screenWidth - pagePadding * 2, left: pagePadding, right: pagePadding, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', }}>
						{selectedStatus.Id != 8 ? <CustomTouchable
							onPress={() => {
								this.ProductStatusRef.current.show()
							}}
							style={{
								flexDirection: 'row',
								justifyContent: 'center',
								alignItems: 'center',
								paddingHorizontal: 10,
								paddingVertical: 6,
								backgroundColor: this.props.mainColor,
								borderRadius: largeBorderRadius,
							}}>
							<FontedText style={{ color: this.props.mainColorText, fontSize: 11, }}>{selectedStatus ? selectedStatus.Name.slice(0, 10) : null}</FontedText>

							<Ionicons
								name={"md-arrow-dropdown"}
								size={18}
								color={this.props.mainColorText}
								style={{
									marginLeft: 5,
								}} />
						</CustomTouchable> : <View />}

						<CustomTouchable
							onPress={() => {
								this.ProductVisibilityRef.current.show()
							}}
							style={{
								flexDirection: 'row',
								justifyContent: 'center',
								alignItems: 'center',
								paddingHorizontal: 10,
								paddingVertical: 6,
								backgroundColor: this.props.mainColor,
								borderRadius: largeBorderRadius,
							}}>
							<FontedText style={{ color: this.props.mainColorText, fontSize: 11, }}>{selectedVisibility ? selectedVisibility.Name.slice(0, 10) : null}</FontedText>

							<Ionicons
								name={"md-arrow-dropdown"}
								size={18}
								color={this.props.mainColorText}
								style={{
									marginLeft: 5,
								}} />
						</CustomTouchable>
					</View>


					<View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', height: screenHeight / 4 }}>
						<View style={{ flexDirection: 'column', paddingLeft: screenWidth / 4, justifyContent: 'center', alignItems: 'center' }}>
							<AntDesign name='like1' size={40} color={this.props.iconColor1} />
							<FontedText style={{ fontSize: 18, }}>{this.state.productHome.LikesCount}</FontedText>
						</View>
						<View style={{ flexDirection: 'column', paddingRight: screenWidth / 4, justifyContent: 'center', alignItems: 'center' }}>
							<AntDesign name='profile' size={40} color={this.props.iconColor1} />
							<FontedText style={{ fontSize: 18, }}>{this.state.productHome.OrdersCount}</FontedText>
						</View>
					</View>
					<View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 15, }}>
						<View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
							<View style={{ marginRight: 10, backgroundColor: this.props.bgColor2, padding: 5, borderRadius: 8 }}>
								<FontedText style={{ fontSize: 13 }}>{this.state.productHome.QuestionsCount}</FontedText>
							</View>
							<TranslatedText style={{}} text={'Questions'} />
						</View>
						<Ionicons name={I18nManager.isRTL ? 'ios-arrow-back' : 'ios-arrow-forward'} size={18} color={this.props.iconColor1} />
					</View>
					<ItemSeparator />
					<View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 15, }}>
						<View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
							<View style={{ marginRight: 10, backgroundColor: this.props.bgColor2, padding: 5, borderRadius: 8 }}>
								<FontedText style={{ fontSize: 13 }}>{this.state.productHome.ReviewsCount}</FontedText>
							</View>
							<TranslatedText style={{}} text={'NS_Reviews'} />
						</View>
						<Ionicons name={I18nManager.isRTL ? 'ios-arrow-back' : 'ios-arrow-forward'} size={18} color={this.props.iconColor1} />
					</View>
					<ItemSeparator />
					<View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 15, }}>
						<View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
							<View style={{ marginRight: 10, backgroundColor: this.props.bgColor2, padding: 5, borderRadius: 8 }}>
								<FontedText style={{ fontSize: 13 }}>{this.state.productHome.OrdersCount}</FontedText>
							</View>
							<TranslatedText style={{}} text={'Orders'} />
						</View>
						<Ionicons name={I18nManager.isRTL ? 'ios-arrow-back' : 'ios-arrow-forward'} size={18} color={this.props.iconColor1} />
					</View>
					<ItemSeparator />

					{this.state.productHome.ValidityExpiration != null && <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 15, }}>
						<View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>

							<TranslatedText style={{}} text={'ValidityExpiration'} />

						</View>
						<View style={{ justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }} >
							<Ionicons name={'ios-alarm'} size={18} color={this.props.iconColor1} style={{ marginHorizontal: 10 }} />
							<FontedText style={{ fontSize: 13 }}>{`${formatDate(this.state.productHome.ValidityExpiration)}`}</FontedText>
						</View>
					</View>}
					<ItemSeparator />

					{this.renderValidityExtendRequestModal()}

					{this.state.productHome.ValidityExpiration != null && <CustomTouchable onPress={() => {
						this.setState({ showModal: true })
					}}
						disabled={this.state.productHome.ValidityExtendRequest}
						style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 15, opacity: this.state.productHome.ValidityExtendRequest? 0.5 : 1 }}>
						<View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
							<View style={{ marginRight: 10, padding: 5, flexDirection: 'row', justifyContent: 'space-between', width: 40 }}>
								<Ionicons name={'ios-add'} size={18} color={this.props.iconColor1} />
								<Ionicons name={'ios-alarm'} size={18} color={this.props.iconColor1} />
							</View>
							<TranslatedText style={{}} text={'ValidityExtendRequest'} />
						</View>
						<Ionicons name={I18nManager.isRTL ? 'ios-arrow-back' : 'ios-arrow-forward'} size={18} color={this.props.iconColor1} />
					</CustomTouchable>}
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
		const {

			ProductVisibility,
			ProductStatus
		} = this.state

		if (!this.state.FillterFitched) {
			return null
		}
		return (
			<LazyContainer>

				{this.renderContent()}

				<CustomSelector
					ref={this.ProductStatusRef}
					options={ProductStatus.map(item => item.Name)}
					onSelect={(index) => {
						this.setState({ selectedStatus: ProductStatus[index] }, () => {
							EditProductStatus({ productId: this.props.route.params?.ProductId, statusId: this.state.selectedStatus.Id })
						})
					}}
					onDismiss={() => { }}
				/>

				<CustomSelector
					ref={this.ProductVisibilityRef}
					options={ProductVisibility.map(item => item.Name)}
					onSelect={(index) => {
						this.setState({ selectedVisibility: ProductVisibility[index] }, () => {
							EditProductVisibility({ productId: this.props.route.params?.ProductId, visibilityId: this.state.selectedVisibility.Id })
						})
					}}
					onDismiss={() => { }}
				/>

			</LazyContainer>
		)
	}
}

export default withLocalize(productHome)