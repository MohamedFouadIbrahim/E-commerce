import React from 'react'
import { View } from 'react-native'
import TranslatedText from '../TranslatedText';

export default SettingsTitle = ({title, textStyle, containerStyle}) => {
	if (title) {
		return (
			<View
				style={[{
					paddingVertical: 10,
					paddingHorizontal: 20,
					justifyContent: 'center',
				},{containerStyle}]}>
				<TranslatedText style={[{},textStyle]} text={title} />
			</View>
		)
	}
	else {
		return <View style={{ height: 20 }} />
	}
}