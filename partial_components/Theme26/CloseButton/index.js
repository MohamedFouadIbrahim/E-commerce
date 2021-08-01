import React from 'react'
import { connect } from 'react-redux'
import Ionicons from 'react-native-vector-icons/Ionicons'
import CustomTouchable from '../../../partial_components/Common/CustomTouchable';

const CloseButton = (props) => {
	const {
		textColor1,
		bgColor2,
	} = props

	const {
		style,
		color = textColor1,
		backgroundColor = bgColor2,
	} = props

	return (
		<CustomTouchable
			{...props}
			style={[{
				backgroundColor,
				justifyContent: 'center',
				alignItems: 'center',
				width: 35,
				height: 35,
				borderRadius: 17.5,
			}, style]}>
			<Ionicons name="ios-close" color={color} size={30} />
		</CustomTouchable>
	)
}

const mapStateToProps = ({
	runtime_config: {
		runtime_config: {
			colors: {
				textColor1,
				bgColor2, 
			},
		},
	},
}) => ({
	textColor1,
	bgColor2, 
})


export default connect(mapStateToProps)(CloseButton)