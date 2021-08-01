import React, { PureComponent } from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import { screenWidth } from '../../../constants/Metrics';
import { shadowStyle0 } from '../../../constants/Style';

class CustomMultiSlider extends PureComponent {
	render() {
		const {
			mainColor,
		} = this.props

		const { 
			largePagePadding,
			color = mainColor,
		} = this.props

		const {
			marginHorizontal = largePagePadding,
		} = this.props

		return (
			<MultiSlider
				containerStyle={{
					justifyContent: 'center',
					alignItems: 'center',
					alignSelf: 'center',
				}}
				sliderLength={screenWidth - (marginHorizontal * 2)}
				selectedStyle={{
					backgroundColor: color
				}}
				customMarker={() => (
					<View style={{
						backgroundColor: color,
						width: 20,
						height: 20,
						borderRadius: 10,
						...shadowStyle0,
					}} />
				)}
				{...this.props}
			/>
		)
	}
}

const mapStateToProps = ({
	runtime_config: {
		runtime_config: {
			colors,
			styles,
		},
	},
}) => ({
	...colors,
	...styles,
})

export default connect(mapStateToProps)(CustomMultiSlider)