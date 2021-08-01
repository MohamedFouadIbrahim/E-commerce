import React, { Component } from 'react'
import { TextInput, View, I18nManager } from 'react-native'
import { connect } from 'react-redux'
import TranslatedText from '../../Common/TranslatedText';
import { withLocalize } from 'react-localize-redux';
import FontedText from '../../Common/FontedText';

class RoundedInput extends Component {
	constructor() {
		super()

		this.state = {
			isFocused: false,
		}
	}

	renderTitle = () => {

		const {
			titleStyle,
			translatePlaceHolder,
			title,
			textColor1,
			mainColor,
			bgColor1
		} = this.props

		if (translatePlaceHolder == false && title) {

			return (
				<FontedText
					style={[
						{
							fontSize: 14,
							top: 9,
							zIndex: 1,
							marginHorizontal: 5,
							paddingHorizontal: 5,
							backgroundColor: bgColor1,
							alignSelf: 'flex-start',
							color: this.state.isFocused ? mainColor : textColor1
						},
						titleStyle
					]}
				>
					{title}
				</FontedText>
			)

		} else if (title) {

			return (<TranslatedText style={[
				{
					fontSize: 14,
					top: 9,
					zIndex: 1,
					marginHorizontal: 5,
					paddingHorizontal: 5,
					backgroundColor: bgColor1,
					alignSelf: 'flex-start',
					color: this.state.isFocused ? mainColor : textColor1
				},
				titleStyle
			]} text={title} />)
		}
	}

	render() {
		const { props } = this

		const {
			containerStyle,
			inputStyle,
			placeholder,
			translate,
			mainColor,
			borderRadius,
			bgColor2,
			textColor1,
			textColor2,
			onBlur
		} = props

		return (
			<View
				style={containerStyle}
			>

				{this.renderTitle()}
				<TextInput
					{...props}
					style={[
						{
							borderWidth: 1,
							paddingHorizontal: 10,
							paddingVertical: 8,
							width: '100%',
							fontSize: 16,
							borderColor: this.state.isFocused ? mainColor : bgColor2,
							borderRadius: borderRadius,
							color: textColor1,
							textAlign: I18nManager.isRTL ? 'right' : 'left'
						},
						inputStyle
					]}
					placeholder={placeholder ? translate(placeholder) : ""}
					placeholderTextColor={textColor2}
					underlineColorAndroid='transparent'
					selectionColor={mainColor}
					onFocus={() => {
						this.setState({ isFocused: true })
					}}
					onBlur={() => {
						this.setState({ isFocused: false });
						onBlur && onBlur()
					}}
				/>
			</View>
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

export default connect(mapStateToProps)(withLocalize(RoundedInput))