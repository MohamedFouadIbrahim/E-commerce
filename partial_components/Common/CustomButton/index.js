import React, { Component } from 'react'
import { connect } from 'react-redux'
import {  ActivityIndicator } from 'react-native'
import FontedText from '../FontedText';
import { withLocalize } from 'react-localize-redux';
import CustomTouchable from '../CustomTouchable';

class CustomButton extends Component {
	render() {
		const { mainColor, mainColorText, largeBorderRadius } = this.props

		const { 
			style, 
			title, 
			autoTranslate = true, 
			uppercase = false, 
			translate, 
			loading = false, 
			color = mainColorText,
			backgroundColor = mainColor,
			fullWidth = false,
			textStyle,
		} = this.props

		const buttonTitle = autoTranslate ? translate(title) : title

		return (
			<CustomTouchable
				{...this.props}
				style={[{
					justifyContent: 'center',
					alignItems: 'center',
					padding: 12,
					borderRadius: largeBorderRadius,
					backgroundColor,
					width: fullWidth ? '100%' : 'auto',
				}, style]}>
				{
					loading ?
						<ActivityIndicator size="small" color={color} />
						:
						<FontedText style={[{ color }, textStyle]}>{uppercase ? buttonTitle.toUpperCase() : buttonTitle}</FontedText>
				}
			</CustomTouchable>
		)
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

export default connect(mapStateToProps)(withLocalize(CustomButton))