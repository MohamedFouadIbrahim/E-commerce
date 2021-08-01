import React, { Component } from 'react'
import { View } from 'react-native'
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { screenWidth, screenHeight } from '../../../constants/Metrics';
import TranslatedText from '../../../partial_components/Common/TranslatedText';
import LazyContainer from '../../../partial_components/Common/LazyContainer';
import FontedText from '../../../partial_components/Common/FontedText';
import RemoteImage from '../../../partial_components/Common/RemoteImage';
import CustomTouchable from '../../../partial_components/Common/CustomTouchable';
class Walkthrough extends Component {
	constructor(props) {
		super(props)

		this.maxIndex = this.props.Images.Value.length - 1

		this.state = {
			activeSlide: 0,
			headerHeight: null,
		}
	}

	_renderItem = ({ item, index }) => {
		return (
			<View
				style={{
					justifyContent: 'space-between',
					alignItems: 'center',
					paddingTop: 20,
					height: screenHeight,
				}}
				key={index}>
				<View
					onLayout={({ nativeEvent: { layout: { height } } }) => {
						this.setState({ headerHeight: height })
					}}
					style={{
						paddingHorizontal: 35,
					}}>
					<FontedText style={{ fontSize: 32, textAlign: 'center', fontWeight: 'bold', }}>{item.Title}</FontedText>
					<FontedText style={{ fontSize: 19, textAlign: 'center', marginTop: 10, }}>{item.Description}</FontedText>
				</View>

				<View style={{}}>
					<RemoteImage
						dimension={1080}
						resizeMode='contain'
						style={{
							width: screenWidth * 0.8,
							height: 500,
						}}
						uri={item.ImageUrl} />
				</View>
			</View>
		)
	}

	get pagination() {
		const { activeSlide = 0 } = this.state;
		const { Images, bgColor2, mainColor } = this.props

		return (
			<Pagination
				dotsLength={Images.Value.length}
				activeDotIndex={activeSlide}
				containerStyle={{}}
				dotStyle={{
					width: 10,
					height: 10,
					borderRadius: 5,
					backgroundColor: mainColor,
				}}
				inactiveDotStyle={{
					width: 10,
					height: 10,
					borderRadius: 5,
					backgroundColor: bgColor2,
				}}
				inactiveDotOpacity={1.0}
				inactiveDotScale={1.0}
			/>
		);
	}

	render() {
		const { markWalkthroughSeen, Images, skippable, mainColor } = this.props

		return (
			<LazyContainer>
				<Carousel
					contentContainerCustomStyle={{}}
					ref={(c) => { this._carousel = c; }}
					firstItem={0}
					data={Images.Value}
					renderItem={this._renderItem}
					sliderWidth={screenWidth}
					sliderWidth={screenHeight}
					itemWidth={screenWidth}
					itemHeight={screenHeight}
					activeSlideAlignment='start'
					layout={'default'}
					onSnapToItem={(index) => this.setState({ activeSlide: index })} />

				{this.state.headerHeight && <View
					style={{
						position: 'absolute',
						top: this.state.headerHeight + 30,
						flexDirection: 'row',
						justifyContent: 'space-between',
						alignItems: 'center',
						paddingHorizontal: 55,
						width: '100%',
					}}>
					{skippable.Value && <CustomTouchable
						onPress={() => { markWalkthroughSeen(true) }}
						style={{
							padding: 5,
							justifyContent: 'center',
							alignItems: 'center',
						}}>
						<TranslatedText
							style={{ color: mainColor, fontSize: 20 }}
							text="Skip" />
					</CustomTouchable>}

					{this.pagination}

					<CustomTouchable
						onPress={() => {
							this.state.activeSlide < this.maxIndex ?
								this._carousel.snapToNext() : markWalkthroughSeen(true)
						}}
						style={{
							padding: 5,
							justifyContent: 'center',
							alignItems: 'center',
						}}>
						<TranslatedText
							style={{ color: mainColor, fontSize: 20 }}
							text="Next" />
					</CustomTouchable>
				</View>}
			</LazyContainer>
		)
	}
}

export default Walkthrough