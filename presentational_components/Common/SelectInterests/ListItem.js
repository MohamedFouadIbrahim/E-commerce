import React, { PureComponent } from 'react'
import { View } from 'react-native'
import FontedText from '../../../partial_components/Common/FontedText/index.js';
import RemoteImageBackground from '../../../partial_components/Common/RemoteImageBackground';
import { connect } from 'react-redux';
import Fontisto from "react-native-vector-icons/Fontisto";
import LinearGradient from 'react-native-linear-gradient';
import CustomTouchable from '../../../partial_components/Common/CustomTouchable';
import { shadowStyle2 } from '../../../constants/Style.js';

class ListItem extends PureComponent {
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
			ShowInterestBackground,
			textColor1,
			...restProps
		} = this.props

		const { Name, isSelected } = item
		const selectedBgColor = ShowInterestBackground.Value ? bgColor2 : mainColor

		return (
			<View
				style={{
					justifyContent: 'center',
					alignItems: 'center',
					height: itemDim,
					// width: itemDim,
					flex: 1,
				}}>
				<CustomTouchable
					onPress={() => { onPress(item, index) }}
					style={{
						backgroundColor: isSelected ? selectedBgColor : bgColor2,
						marginTop: 20,
						justifyContent: 'center',
						alignItems: 'center',
						borderRadius: 20,
						padding: ShowInterestBackground.Value ? 0 : 12,
						height: touchableDim,
						width: touchableDim,
						...shadowStyle2,
					}}
					{...restProps}>
					{ShowInterestBackground.Value ?
						<RemoteImageBackground
							style={{
								flex: 1,
								height: touchableDim,
								width: touchableDim,
								borderRadius: 20
							}}
							uri={item.Image.ImageUrl}
							imageStyle={{
								borderRadius: 20,
								flex: 1,
								height: touchableDim,
								width: touchableDim,
							}}>

							<LinearGradient
								colors={['rgba(0, 0, 0, .1)', 'rgba(0, 0, 0, .6)', 'rgba(0, 0, 0, 1)']}
								style={{
									justifyContent: 'center',
									alignItems: 'center',
									borderRadius: 20,
									height: touchableDim,
									width: touchableDim,
								}}>
								<FontedText style={{ textAlignVertical: 'center', padding: 12, color: isSelected ? mainColor : item.Image.TextColor }}>{Name}</FontedText>
							</LinearGradient>
						</RemoteImageBackground> : <FontedText style={{ textAlignVertical: 'center' }}>{Name}</FontedText>
					}
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
			screens: {
				Select_Main_Interest_02_8: {
					ShowInterestBackground
				}
			}
		},
	},
}) => ({
	ShowInterestBackground,
	...colors,
	...styles,
})

export default connect(mapStateToProps)(ListItem)