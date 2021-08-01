import React, { Component } from 'react'
import { Platform, Image, View, I18nManager } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import LinearGradient from 'react-native-linear-gradient';
import Swiper from 'react-native-swiper';
import { screenWidth } from '../../../constants/Metrics';
import RemoteImage from '../../../partial_components/Common/RemoteImage';
import FontedText from '../../../partial_components/Common/FontedText';
import TranslucentStatusBar from '../../../partial_components/Common/TranslucentStatusBar';
import TranslatedText from '../../../partial_components/Common/TranslatedText';
import LazyContainer from '../../../partial_components/Common/LazyContainer';
import CustomTouchable from '../../../partial_components/Common/CustomTouchable';

const imageWidth = screenWidth

class Walkthrough extends Component {
	constructor(props) {
		super(props);

		this.currIndex = 0
		this.maxIndex = this.props.Images.Value.length - 1
	}

	render() {
		const { markWalkthroughSeen, Images, skippable, textColor1, mainColor, mainColorText } = this.props

		return (
			<LazyContainer style={{ flex: 1 }}>
				<TranslucentStatusBar />

				<LinearGradient
					start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
					colors={['#4048EF', '#5A7BEF']}
					style={{ flex: 1, paddingTop: screenWidth * 0.10, paddingBottom: screenWidth * 0.10 }}>
					<View
						style={{
							justifyContent: 'center',
							alignItems: 'flex-end',
							paddingHorizontal: 15,
						}}>
						{skippable.Value && <CustomTouchable
							onPress={() => markWalkthroughSeen(true)}
							style={{
								paddingHorizontal: 15,
							}}>
							<TranslatedText
								style={{ color: 'rgba(255,255,255,0.85)', }}
								text="Skip"
								uppercase={false} />
						</CustomTouchable>}
					</View>

					<Swiper
						ref={ref => this.swiperRef = ref}
						paginationStyle={{
							flexDirection: I18nManager.isRTL ? Platform.OS === 'ios' ? 'row' : 'row-reverse' : 'row',
							bottom: 7
						}}
						showsButtons={false}
						autoplay={false}
						loop={false}
						autoplayTimeout={5}
						onIndexChanged={(index) => {
							this.currIndex = index
						}}
						activeDot={
							<Image
								source={require("../../../assets/images/walkthrough/theme7/dot_inside_circle.png")}
								style={{
									width: 15,
									height: 15,
									opacity: 0.9,

									marginLeft: 3,
									marginRight: 3,
									marginTop: 3,
									marginBottom: 3,
								}} />
						}
						dot={
							<View
								style={{
									backgroundColor: 'rgba(255,255,255,.3)',
									width: 8,
									height: 8,
									borderRadius: 4,
									marginLeft: 3,
									marginRight: 3,
									marginTop: 3,
									marginBottom: 3,
								}} />
						} >
						{
							Images.Value.map((item, index) => {
								return (
									<View style={{ flex: 1, alignItems: 'center', justifyContent: 'space-between', width: imageWidth }} key={index}>
										<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
											<RemoteImage
												dimension={1080}
												style={{ width: imageWidth, height: imageWidth }}
												uri={item.ImageUrl} />
										</View>

										<FontedText
											style={{
												fontSize: 13,
												color: textColor1,
												textAlign: 'center',
												marginHorizontal: screenWidth * 0.1,
												marginBottom: 70,
											}}>{item.Description}</FontedText>
									</View>
								)
							})
						}
					</Swiper>

					<View
						style={{
							position: 'absolute',
							bottom: 25,
							width: screenWidth,
							flexDirection: 'row',
							justifyContent: 'space-between',
							alignItems: 'center',
							paddingHorizontal: screenWidth * 0.05
						}}>
						<CustomTouchable
							onPress={() => {
								if (this.currIndex > 0) {
									this.swiperRef.scrollBy(-1, true)
								}
							}}
							style={{
								justifyContent: 'center',
								alignItems: 'center',
								width: 46,
								height: 46,
								borderRadius: 23,
								backgroundColor: mainColor,
								alignSelf: 'center'
							}}>
							<Ionicons name='ios-arrow-round-back' color={mainColorText} size={25} />
						</CustomTouchable>

						<CustomTouchable
							onPress={() => {
								if (this.currIndex < this.maxIndex) {
									this.swiperRef.scrollBy(1, true)
								}
								else {
									markWalkthroughSeen(true)
								}
							}}
							style={{
								justifyContent: 'center',
								alignItems: 'center',
								paddingVertical: 9,
								paddingHorizontal: 35,
								borderRadius: 30,
								backgroundColor: mainColor,
								alignSelf: 'center'
							}}>
							<Ionicons name='ios-arrow-round-forward' color={mainColorText} size={25} />
						</CustomTouchable>
					</View>
				</LinearGradient>
			</LazyContainer>
		)
	}
}

export default Walkthrough