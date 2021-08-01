import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { screenWidth } from '../../../constants/Metrics';
import { SliderBox } from "react-native-image-slider-box";
import FastImage from 'react-native-fast-image';

class CustomImagesSlider extends PureComponent {
	constructor(props) {
		super(props)

		const {
			initialIndex = 0,
			name = "slider"
		} = this.props

		this.sliderName = name
		this.currentIndex = initialIndex
	}

	render() {
		const {
			mainColor,
			images = [],
			width = screenWidth,
			wide = true,
			dimension = 720,
			original = true,
			imageStyle,
			ImageScalingType,
			PadScalingColor,
			SliderInterval,
			onPressImage
		} = this.props

		if (!images || !images.length) {
			return null
		}

		//calculate the height (min image height)
		const minWHRatio = Math.min.apply(Math, images.map(item => item.WHRatio));
		return (
			<SliderBox
				ImageComponent={FastImage}
				images={images.map(item => `${item.ImageUrl}?size=${dimension}&wide=${wide}&keepOriginalSize=${original}&ImageScalingType=${ImageScalingType.Value}&PadScalingColor=${PadScalingColor.Value}`)}
				circleLoop={true}
				autoplay={SliderInterval.Value != null && SliderInterval.Value > 0 ? true : false}
				dotColor='#000'
				inactiveDotColor='#FFF'
				dotStyle={{
					width: 6,
					height: 6,
					borderColor: '#FFF',
					borderWidth: 1,
				}}
				imageLoadingColor={mainColor}
				ImageComponentStyle={[imageStyle, {
					width: width,
					height: (width / minWHRatio)
				}]}
				onCurrentImagePressed={index => {
					onPressImage && onPressImage({
						index
					})
				}}
			>
			</SliderBox >
		)
	}
}

const mapStateToProps = ({
	runtime_config: {
		runtime_config: {
			styles,
			colors,
			screens: {
				Product_Details_09_5: {
					ImageScalingType,
					PadScalingColor,
				},
				Home_12_1: {
					SliderInterval
				},
			},
		},
	},
}) => ({
	...styles,
	...colors,
	ImageScalingType,
	PadScalingColor,
	SliderInterval
})

export default connect(mapStateToProps)(CustomImagesSlider)