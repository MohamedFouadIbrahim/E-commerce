import React from 'react'
import { View, TextInput, I18nManager } from 'react-native'
import { connect } from 'react-redux'
import { withLocalize } from 'react-localize-redux';

const CustomInput = (props) => {
	const { 
		placeholder, 
		translate, 
		mainColor,
		bgColor2,
		textColor1,
		textColor2,
	} = props

	const styles = {
		backgroundColor: bgColor2,
		textColor: textColor1,
		placeholderTextColor: textColor2,
	}

	return (
		<View
			style={[{
				backgroundColor: styles.backgroundColor,
				paddingRight: 14,
				flexDirection: 'row',
				alignItems: 'center',
				justifyContent: 'space-between',
			}, props.containerStyle]}>
			<View
				style={{
					flex: 1,
					paddingLeft: 14,
				}}>
				<TextInput
					{...props}
					style={[{
						fontSize: 15,
						color: styles.textColor,
						textAlign: I18nManager.isRTL ? 'right' : 'left',
						paddingLeft: 0,
						marginLeft: 0,
						paddingVertical: 10
					}, props.style]}
					placeholder={placeholder ? translate(placeholder) : ""}
					placeholderTextColor={styles.placeholderTextColor}
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

export default connect(mapStateToProps)(withLocalize(CustomInput))