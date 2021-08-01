import React from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'
import CountDown from 'react-native-countdown-component'

const DealCountDown = ({
	textColor2,
	bgColor2,
	until,
	style,
	...restProps
}) => {
	if (until >= 1) {
		return (
			<View
				style={[{
					height: 40,
				}, style]}>
				<CountDown
					until={until}
					timeToShow={['H', 'M', 'S']}
					timeLabels={{
						d: null,
						h: null,
						m: null,
						s: null
					}}
					size={15}
					digitStyle={{ backgroundColor: bgColor2 }}
					digitTxtStyle={{ color: textColor2 }}
					{...restProps} />
			</View>
		)
	}
	else {
		return null
	}
}

const mapStateToProps = ({
	runtime_config: {
		runtime_config: {
			colors: {
				textColor2,
				bgColor2, 
			},
		},
	},
}) => ({
	textColor2,
	bgColor2, 
})


export default connect(mapStateToProps)(DealCountDown)