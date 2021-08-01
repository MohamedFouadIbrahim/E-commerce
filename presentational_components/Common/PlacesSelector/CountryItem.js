import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { View,  Image } from 'react-native'
import FontedText from '../../../partial_components/Common/FontedText/index.js';
import CheckBox from '../../../partial_components/Common/CheckBox/index.js';
import { GetCountryFlag } from '../../../utils/Places.js';
import CustomTouchable from '../../../partial_components/Common/CustomTouchable';

class CountryItem extends PureComponent {
	render() {
		const { item, onPress, index, textColor2, ...restProps } = this.props
		const { Name, ISOAlpha_2, isSelected } = item

		return (
			<CustomTouchable
				onPress={() => { onPress(item, index) }}
				{...restProps}>
				<View
					style={{
						flexDirection: 'row',
						alignItems: 'center',
					}}>
					<Image
						source={GetCountryFlag(ISOAlpha_2)}
						style={{
							marginRight: 15,
							width: 50,
							height: 50,
							borderRadius: 10,
						}}
						resizeMode="contain" />

					<FontedText style={{ color: textColor2 }}>{Name}</FontedText>
				</View>

				<CheckBox
					selected={isSelected} />
			</CustomTouchable>
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

export default connect(mapStateToProps)(CountryItem)