import React from 'react';
import { View } from 'react-native'
import { connect } from 'react-redux'

const PriceTextContainer = ({
	children,
	style,
	is_rtl,
	...otherProps
}) => (
	<View
		style={[{
			flexDirection: is_rtl ? 'row-reverse' : 'row',
		}, style]}
		{...otherProps}>
		{children}
	</View>
)

const mapStateToProps = ({
	language: {
		is_rtl,
	},
}) => ({
	is_rtl,
})

export default connect(mapStateToProps)(PriceTextContainer)