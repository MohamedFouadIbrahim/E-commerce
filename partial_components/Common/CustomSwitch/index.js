import React from 'react'
import { Switch } from 'react-native';
import { connect } from 'react-redux'

const CustomSwitch = (props) => (
	<Switch
		trackColor={{ true: props.mainColor }}
		thumbColor={props.mainColor}
		{...props}
	/>
)

const mapStateToProps = ({
	runtime_config: {
		runtime_config: {
			colors,
		},
	},
}) => ({
	...colors,
})

export default connect(mapStateToProps)(CustomSwitch)