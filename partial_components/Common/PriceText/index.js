import React from 'react';
import { View } from 'react-native'
import { connect } from 'react-redux'
import FontedText from '../FontedText';

const PriceText = ({
	contentContainerStyle,
	children,
	Currency,
	...otherProps
}) => (
	<View
		style={[{
			flexDirection: 'row',
			alignItems: 'center',
		}, contentContainerStyle]}>
		<FontedText {...otherProps}>{Currency.Name}</FontedText>
		<FontedText {...otherProps}>{children}</FontedText>
	</View>
)

const mapStateToProps = ({
	login: {
		Currency,
	},
}) => ({
	Currency,
})

export default connect(mapStateToProps)(PriceText)