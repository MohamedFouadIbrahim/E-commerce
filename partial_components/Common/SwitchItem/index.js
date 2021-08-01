import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View } from 'react-native'
import TranslatedText from '../TranslatedText';
import CustomSwitch from '../CustomSwitch';

class SwitchItem extends Component {
	render() {
		const {
			textColor2,
		} = this.props

		const { 
			title, 
			style, 
			color = textColor2,
			...switchProps 
		} = this.props

		return (
			<View
				style={[{
					paddingVertical: 15,
					flexDirection: 'row',
					justifyContent: 'space-between',
					alignItems: 'center',
				}, style]}>
				<View
					style={{
						justifyContent: 'center',
					}}>
					<TranslatedText style={[{ color }, this.props.titleStyle]} text={title} />
				</View>

				<View
					style={{
						flexDirection: 'row',
						alignItems: 'center',
						paddingLeft: 10,
					}}>
					<CustomSwitch
						{...switchProps} />
				</View>
			</View>
		)
	}
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


export default connect(mapStateToProps)(SwitchItem)