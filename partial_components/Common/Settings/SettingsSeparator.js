import React from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'

const SettingsSeparator = ({ 
	color, 
	bgColor2, 
	containerStyle 
}) => {
	return (
		<View
			style={[{
				width: '100%',
				height: 1,
				backgroundColor: color || bgColor2,
			}, { containerStyle }]} />
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

export default connect(mapStateToProps)(SettingsSeparator)