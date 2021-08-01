import React, { PureComponent } from 'react'
import { View, Dimensions } from 'react-native'
import FontedText from '../../../partial_components/Common/FontedText';
import HorizontalProductsList from '../../../partial_components/Theme26/HorizontalProductsList';
import CustomTouchable from '../../../partial_components/Common/CustomTouchable';
import CustomImagesSlider from '../../../partial_components/Theme26/CustomImagesSlider';
import AdsSlider from './AdsSlider';
import ExploreHeader from './ExploreHeader';
import CategoriesList from './CategoriesList';
import SecondNavBar from '../../../partial_components/Theme26/SecondNavBar';
import { screenWidth } from '../../../constants/Metrics';

const sliderHeight = 230

class ExploreTopContent extends PureComponent {
	constructor(props) {
		super(props)

		const {
			largePagePadding,
			pagePadding,
			Images,
			SliderInterval,
		} = this.props

		this.sliderInterval = SliderInterval.Value > 0 ? SliderInterval.Value * 1000 : null

		let sliderText, sliderTextColor, sliderTextShadowColor

		if (Images.Value.length) {
			sliderText = Images.Value[0].Title
			sliderTextColor = Images.Value[0].TextColor
			sliderTextShadowColor = Images.Value[0].RoundTextColor
		}

		this.state = {
			sliderText,
			sliderTextColor,
			sliderTextShadowColor,
			bannerWidth: screenWidth - (pagePadding * 2),
			loadTopContent: false,
		}
	}

	componentDidMount() {
		Dimensions.addEventListener('change', this.onDimensionsChange)
	}

	componentWillUnmount() {
		Dimensions.removeEventListener('change', this.onDimensionsChange)
	}

	onDimensionsChange = ({ window: { width } }) => {
		const {
			largePagePadding,
			pagePadding
		} = this.props

		this.setState({
			//bannerWidth: screenWidth - (pagePadding * 2),
			bannerWidth: screenWidth,
		})
	}

	onPressTopSliderImage = ({ index }) => {
		const {
			TopSlider = [],
			onPressSliderImage
		} = this.props
		onPressSliderImage(TopSlider[index])
	}

	onPressAds1SliderImage = ({ index }) => {
		const {
			Ads: {
				Ads1
			},
			onPressSliderImage,
		} = this.props

		onPressSliderImage(Ads1.Value[index])
	}

	onPressAds2SliderImage = ({ index }) => {
		const {
			Ads: {
				Ads2
			},
			onPressSliderImage,
		} = this.props

		onPressSliderImage(Ads2.Value[index])
	}

	onPressAds3SliderImage = ({ index }) => {
		const {
			Ads: {
				Ads3
			},
			onPressSliderImage,
		} = this.props

		onPressSliderImage(Ads3.Value[index])
	}

	onSliderImageChange = (index) => {
		const {
			Images,
		} = this.props

		// this.setState({
		// 	sliderText: Images.Value[index].Title,
		// 	sliderTextColor: Images.Value[index].TextColor,
		// 	sliderTextShadowColor: Images.Value[index].RoundTextColor,
		// })
	}

	renderImagesSliderOverlay = () => {
		const {
			largePagePadding,
			Images,
		} = this.props

		const {
			sliderText,
			sliderTextColor,
			sliderTextShadowColor
		} = this.state

		if (sliderText && sliderText.length && Images.Value.length) {
			return (
				<View
					style={{
						position: 'absolute',
						top: largePagePadding,
						paddingHorizontal: largePagePadding,
					}}>
					<FontedText
						style={{
							color: sliderTextColor,
							fontSize: 30,
							fontWeight: 'bold',
							marginTop: 1,
							marginBottom: 5,
							textAlign: 'left',
							textShadowColor: sliderTextShadowColor,
							textShadowOffset: { width: 0, height: 0 },
							textShadowRadius: 8,
						}}>{sliderText}</FontedText>
				</View>
			)
		}
	}

	render() {
		const {
			mainColor,
			largePagePadding,
			pagePadding,
			Products,
			FlashOffers,
			translate,
			textColor1,
			TopSlider: Images = [],
			ShowHotDeal,
			ShowMonthlyOffers,
			Ads: {
				Ads1 = [],
				Ads2 = [],
				Ads3 = [],
			},
			borderRadius,
			HomeSliderStyle
		} = this.props

		const {
			bannerWidth
		} = this.state

		const largerPagePadding = largePagePadding * 2

		return (
			<View
				style={{

				}}>

				{HomeSliderStyle.Value == 'classic' ?  // old slider

					<CustomImagesSlider
						original={true}
						autoPlayWithInterval={this.sliderInterval}
						height={sliderHeight}
						images={Images.map(item => item.Icon).filter(item => item != null)}
						onPressImage={this.onPressTopSliderImage}
						onPositionChanged={this.onSliderImageChange} /> :

					<CustomImagesSlider // top header is the page (Modern)
						original={true}
						imageStyle={{
							borderRadius: borderRadius,
							marginHorizontal: largePagePadding,
							marginTop: pagePadding,
						}}
						autoPlayWithInterval={this.sliderInterval}
						width={bannerWidth}
						height={sliderHeight}
						images={Images.map(item => item.Icon).filter(item => item != null)}
						onPressImage={this.onPressTopSliderImage}
						onPositionChanged={this.onSliderImageChange} />
				}

				<SecondNavBar navigation={this.props.navigation} />

				<CategoriesList
					{...this.props} />

				{/* first ads slider */}
				{Ads1.Value.length > 0 && <AdsSlider
					name={'Ads1Slider'}
					autoPlayWithInterval={this.sliderInterval + 1}
					onPressImage={this.onPressAds1SliderImage}
					images={Ads1.Value}
					width={bannerWidth}
					style={{
					}}
					imageStyle={{
						marginTop: largePagePadding,
						marginHorizontal: pagePadding,
					}}
					item={Ads1.Value} />}

				{ShowHotDeal.Value && Products.Data.length > 0 ?
					<View
						style={{
							marginHorizontal: pagePadding
						}}>
						<View
							style={{
								flexDirection: 'row',
								justifyContent: 'space-between',
								alignItems: 'center',
								marginTop: largePagePadding,
								marginBottom: pagePadding,
							}}>
							<ExploreHeader title={'HotDeals'} color={textColor1} />

							<CustomTouchable
								onPress={() => { this.props.navigation.navigate('MonthlyOffers') }} //Hot Deals
								style={{
									justifyContent: 'center',
									alignItems: 'center',
								}}>
								<FontedText style={{ color: mainColor, fontSize: 16, }}>{translate('SeeAll')}</FontedText>
							</CustomTouchable>
						</View>

						<HorizontalProductsList
							specificProductSize={this.props.HomeProductOffersSize}
							data={Products.Data}
							navigation={this.props.navigation}
							contentContainerStyle={{
							}} />
					</View> :
					Ads1.Value.length > 0 && Ads2.Value.length > 0 ?
						// show empty margin only in case there is a ads2 & ads3
						<View
							style={{
								marginTop: largePagePadding,
							}}>
						</View> :
						null}

				{Ads2.Value.length > 0 && <AdsSlider
					name={'Ads2Slider'}
					autoPlayWithInterval={this.sliderInterval + 2}
					onPressImage={this.onPressAds2SliderImage}
					images={Ads2.Value}
					width={bannerWidth}
					style={{
					}}
					imageStyle={{
						marginTop: largePagePadding,
						marginHorizontal: pagePadding,
					}}
					item={Ads2.Value} />}

				{ShowMonthlyOffers.Value && FlashOffers && FlashOffers.length ?
					<View
						style={{
							marginHorizontal: pagePadding
						}}>
						<View
							style={{
								flexDirection: 'row',
								justifyContent: 'space-between',
								alignItems: 'center',
								marginTop: largePagePadding,
								marginBottom: pagePadding,
							}}>
							<ExploreHeader title={'FlashDeals'} color={textColor1} />

							<CustomTouchable
								onPress={() => { this.props.navigation.navigate('FlashDeals') }}
								style={{
									justifyContent: 'center',
									alignItems: 'center',
								}}>
								<FontedText style={{ color: mainColor, fontSize: 16, }}>{translate('SeeAll')}</FontedText>
							</CustomTouchable>
						</View>

						<HorizontalProductsList
							specificProductSize={this.props.HomeProductOffersSize}
							data={FlashOffers}
							navigation={this.props.navigation}
							contentContainerStyle={{
							}} />
					</View> :
					Ads2.Value.length > 0 && Ads3.Value.length > 0 ?
						// show empty margin only in case there is a ads2 & ads3
						<View
							style={{
								marginTop: largePagePadding,
							}}>
						</View> :
						null
				}

				{Ads3.Value.length > 0 && <AdsSlider
					name={'Ads3Slider'}
					autoPlayWithInterval={this.sliderInterval + 3}
					onPressImage={this.onPressAds3SliderImage}
					images={Ads3.Value}
					width={bannerWidth}
					style={{
					}}
					imageStyle={{
						marginTop: largePagePadding,
						marginHorizontal: pagePadding,
					}}
					item={Ads3.Value} />}

				{this.renderImagesSliderOverlay()}
			</View>
		)
	}
}

export default ExploreTopContent