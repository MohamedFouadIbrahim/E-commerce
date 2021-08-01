import React, { PureComponent } from 'react'
import { View,  Image } from 'react-native'
import FontedText from '../../../partial_components/Common/FontedText/index.js';
import { GetCountryFlag } from '../../../utils/Places.js';
import { connect } from 'react-redux';
import CustomTouchable from '../../../partial_components/Common/CustomTouchable';
import { shadowStyle2 } from '../../../constants/Style.js';

class CountryItem extends PureComponent {
	render() {
		const { 
			item,
			onPress, 
			index, 
			mainColor, 
			bgColor2, 
			textColor1,
			mainColorText, 
			...restProps 
		} = this.props
		const { Name, ISOAlpha_2, isSelected } = item

		return (
			<CustomTouchable
				onPress={() => { onPress(item, index) }}
				style={{
					paddingHorizontal: 20,
					paddingVertical: 10,
					flexDirection: 'row',
					justifyContent: 'space-between',
					alignItems: 'center',
					backgroundColor: isSelected ? mainColor : bgColor2,
					borderRadius: 10,
					marginHorizontal: 10,
					marginTop: 10,
					...shadowStyle2,
				}}
				{...restProps}>
				<FontedText style={{ color: isSelected ? mainColorText : textColor1 }}>{Name}</FontedText>

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
				</View>

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