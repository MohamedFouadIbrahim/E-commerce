import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import {  View, ActivityIndicator } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { LongToast } from '../../../utils/Toast';
import TouchableIcon from '../TouchableIcon';

class HeaderSubmitButton extends PureComponent {
	componentDidUpdate(prevProps) {
		if (this.props.didSucceed !== prevProps.didSucceed && this.props.didSucceed) {
			LongToast("DoneSuccessfully")
		}
	}

	render () {
		const {
			iconColor1,
		} = this.props

		const { 
			style, 
			isLoading, 
			flex = true, 
			color = iconColor1, 
			...otherProps 
		} = this.props

		if (isLoading) {
			return (
				<View
					style={[{
						justifyContent: 'center',
						alignItems: 'center',
					}, style]}>
					<ActivityIndicator size="small" color={color} />
				</View>
			)
		}
		else {
			return (
				<TouchableIcon
					{...otherProps}>
					<Ionicons
						name={`md-checkmark`}
						size={22}
						color={color} />
				</TouchableIcon>
			)
		}
	}
}

const mapStateToProps = ({
	runtime_config: {
		runtime_config: {
			colors: {
				iconColor1,
			},
		},
	},
}) => ({
	iconColor1,
})


export default connect(mapStateToProps)(HeaderSubmitButton)