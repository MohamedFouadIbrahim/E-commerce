import React, { Component } from 'react'
import {  ActivityIndicator } from 'react-native'
import { connect } from 'react-redux'
import { withLocalize } from 'react-localize-redux';
import FontedText from '../../Common/FontedText';
import CustomTouchable from '../../../partial_components/Common/CustomTouchable';

class CustomButton extends Component {
	render() {
		const { mainColor, mainColorText } = this.props

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
		} = this.props

		const buttonTitle = autoTranslate ? translate(title) : title

		return (
			<CustomTouchable
				{...this.props}
				style={[{
					justifyContent: 'center',
					alignItems: 'center',
					padding: 12,
					backgroundColor,
					width: fullWidth ? '100%' : 'auto',
				}, style]}>
				{
					loading ?
						<ActivityIndicator size="small" color={color} />
						:
						<FontedText style={{ color }}>{uppercase ? buttonTitle.toUpperCase() : buttonTitle}</FontedText>
				}
			</CustomTouchable>
		)
	}
}

const mapStateToProps = ({
	runtime_config: {
		runtime_config: {
			colors,
		},
	},
}) => ({
	...colors,
})

export default connect(mapStateToProps)(withLocalize(CustomButton))