import React, { Component } from 'react'
import { View, Image, } from 'react-native'
import { connect } from 'react-redux'
import { screenWidth, screenHeight } from '../../../constants/Metrics';
import TranslatedText from '../TranslatedText';
import CustomButton from '../CustomButton';

class FloatingNotice extends Component {
	render() {
		const { 
			isVisible, 
			title, 
			info, 
			image, 
			button, 
			onPressButton, 
			largePagePadding,
			bgColor1,
			textColor2,
		} = this.props

		if (isVisible) {
			return (
				<View
					style={{
						backgroundColor: bgColor1,
						justifyContent: 'center',
						alignItems: 'center',
						position: "absolute",
						zIndex: 1,
						width: screenWidth,
						height: screenHeight,
						padding: 35,
					}}>
					<Image
						style={{
							width: 150,
							height: 150,
							marginBottom: 5,
						}}
						source={image} />

					<TranslatedText
						style={{ fontSize: 24, marginHorizontal: largePagePadding, }}
						text={title} />

					<TranslatedText
						style={{ color: textColor2, fontSize: 14, textAlign: "center", marginTop: 10, opacity: .6 }}
						text={info} />

					<CustomButton
						onPress={() => {
							onPressButton && onPressButton()
						}}
						style={{
							marginTop: 60,
						}}
						fullWidth={true}
						uppercase={true}
						title={button} />
				</View>
			)
		}
		else {
			return null
		}
	}
}

const mapStateToProps = ({
	runtime_config: {
		runtime_config: {
			colors,
			styles,
		},
	},
}) => ({
	...colors,
	...styles,
})

export default connect(mapStateToProps)(FloatingNotice)