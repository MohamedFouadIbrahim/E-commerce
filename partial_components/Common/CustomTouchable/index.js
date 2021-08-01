import React from 'react'
import { TouchableOpacity } from 'react-native'

export default CustomTouchable = ({ onPress, children, ...restProps }) => {
	handleOnPress = () => {
		if (onPress) {
			requestAnimationFrame(() => { onPress() })
		}
	}
	
	return (
		<TouchableOpacity
			onPress={handleOnPress}
			{...restProps}>
			{children}
		</TouchableOpacity>
	)
}