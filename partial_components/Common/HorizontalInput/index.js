import React from 'react'
import { View, TextInput, I18nManager } from 'react-native'
import { connect } from 'react-redux'
import TranslatedText from '../TranslatedText';
import { withLocalize } from 'react-localize-redux';

const HorizontalInput = (props) => {
	const { 
		label, 
		placeholder,
		style, 
		placeholderTextColor, 
		mainColor, 
		textColor1, 
		textColor2, 
		translate,
		...inputProps 
	} = props

	let placeholderText

	if (placeholder) {
		placeholderText = translate(placeholder)
	}
	else if (label) {
		placeholderText = translate(label)
	}

	return (
		<View
			style={{
				paddingVertical: 15,
				paddingHorizontal: 20,
				flexDirection: 'row',
				alignItems: 'center',
			}}>
			<View
				style={{
					justifyContent: 'center',
					flex: 2,
				}}>
				<TranslatedText style={{ color: textColor1 }} text={label} />
			</View>

			<View
				style={{
					flex: 5,
					justifyContent: 'center',
					paddingLeft: 70,
				}}>
				<TextInput
					{...inputProps}
					style={[{
						fontSize: 15,
						color: inputProps.editable === false ? textColor2 : textColor1,
						textAlign: I18nManager.isRTL ? 'right' : 'left',
						paddingLeft: 0,
						marginLeft: 0,
					}, style]}
					placeholder={placeholderText}
					placeholderTextColor={placeholderTextColor || textColor2}
					underlineColorAndroid='transparent'
					selectionColor={mainColor} />
			</View>
		</View>
	)
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

export default connect(mapStateToProps)(withLocalize(HorizontalInput))