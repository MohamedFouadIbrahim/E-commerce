import React from 'react';
import { connect } from 'react-redux'
import {
	View,
} from 'react-native';

const SectionSeparator = (props) => {
	const {
		style,
		bgColor2,
		...otherProps
	} = props;

	return (
		<View
			style={[{ backgroundColor: bgColor2, height: 5, }, style]}
			{...otherProps} />
	)
}

const mapStateToProps = ({
	runtime_config: {
		runtime_config: {
			colors: {
				bgColor2,
			},
		},
	},
}) => ({
	bgColor2,
})


export default connect(mapStateToProps)(SectionSeparator)