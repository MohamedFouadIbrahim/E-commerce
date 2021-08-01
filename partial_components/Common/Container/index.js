import React from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'

const Container = ({
	children,
	style,
	bgColor1,
	...restProps
}) => {
	return (
		<View
			style={[{
				flex: 1,
				backgroundColor: bgColor1,
			}, style]}
			{...restProps}>
			{children}
		</View>
	)
}

const mapStateToProps = ({
	runtime_config: {
		runtime_config: {
			colors: {
				bgColor1,
			},
		},
	},
}) => ({
	bgColor1,
})

export default connect(mapStateToProps)(Container)