import React from 'react';
import { connect } from 'react-redux'
import Ionicons from 'react-native-vector-icons/Ionicons'

const CheckBox = (props) => {
	const {
		size = 22,
		selected,
	} = props;

	if (selected) {
		const { mainColor } = props

		return (
			<Ionicons
				name={"ios-checkmark-circle"}
				size={size}
				color={mainColor} />
		)
	}
	else {
		const { bgColor2 } = props

		return (
			<Ionicons
				name={"ios-checkmark-circle-outline"}
				size={size}
				color={bgColor2} />
		)
	}
}

const mapStateToProps = ({
	runtime_config: {
		runtime_config: {
			colors: {
				mainColor,
				bgColor2,
			},
		},
	},
}) => ({
	mainColor,
	bgColor2,
})

export default connect(mapStateToProps)(CheckBox)