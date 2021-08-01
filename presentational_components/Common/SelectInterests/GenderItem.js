import React, { PureComponent } from 'react'
import { View } from 'react-native'
import FontedText from '../../../partial_components/Common/FontedText/index.js';
import RemoteImageBackground from '../../../partial_components/Common/RemoteImageBackground';
import { connect } from 'react-redux';
import Fontisto from "react-native-vector-icons/Fontisto";
import LinearGradient from 'react-native-linear-gradient';
import CustomTouchable from '../../../partial_components/Common/CustomTouchable';
import { shadowStyle2 } from '../../../constants/Style.js';

class GenderItem extends PureComponent {
	render() {
		const {
			item,
			index,
			itemDim,
			touchableDim,
			onPress,
			Gender,
			mainColor,
			bgColor2,
			textColor1,
			...restProps
		} = this.props

		const { Name, isSelected } = item

		return (
			<View
				style={{
					justifyContent: 'center',
					alignItems: 'center',
					// width: itemDim,
					flex:1,
					height: 100,
				}}>
				<CustomTouchable
					onPress={() => { onPress(item, index) }}
					style={{
						backgroundColor: isSelected ? mainColor : bgColor2,
						justifyContent: 'center',
						alignItems: 'center',
						borderRadius: 20,
						padding: 15,
						height: 90,
						width: touchableDim +5,
						...shadowStyle2,
					}}
					{...restProps}>
					<View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '50%' }} >
						<Fontisto name={item.Id == 1 ? 'male' : 'female'} size={25} />
						<FontedText style={{ textAlignVertical: 'center' }}>{Name}</FontedText>
					</View>
				</CustomTouchable>
			</View>
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

export default connect(mapStateToProps)(GenderItem)