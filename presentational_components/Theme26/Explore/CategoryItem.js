import React, { PureComponent } from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'
import FontedText from '../../../partial_components/Common/FontedText';
import { shadowStyle1 } from '../../../constants/Style';
import CustomTouchable from '../../../partial_components/Common/CustomTouchable';
import LinearGradient from 'react-native-linear-gradient';
import RemoteImageBackground from '../../../partial_components/Common/RemoteImageBackground';

export const TextBelowImageContainerHeight = 43

class CategoryItem extends PureComponent {
	constructor(props) {
		super(props)

		const {
			HomeCategoryStyle: { Value: Theme },
			width,
			height,
			index,
			length,
			IsTextBelowImage,
			forceWidth = true,
		} = this.props

		const AdditinalCondition = index === length - 1 && forceWidth

		this.width = length !== null && length % 2 !== 0 && AdditinalCondition ? (width * 2) + 10 : width

		this.Theme = Theme
		this.itemHeight = height || (Theme === 1 || Theme === 6 ? 80 : 90)

		this.isLightTheme = Theme === 2 || Theme === 4 || Theme === 7 || Theme === 9
		this.isTextBelow = IsTextBelowImage
	}

	moreHandel = () => {

		const {
			index,
			length,
			numColumns,
			getNumberElementsOutOfRange
		} = this.props

		let dim = 250;

		const unTargetElement = length - getNumberElementsOutOfRange;

		if (unTargetElement >= index + 1) {
			switch (numColumns) {
				case 1:
					dim = 720;
					break
				case 2:
					dim = 500;
					break
				case 3:
					dim = 250;
					break
				case 4:
					dim = 250;
					break
				default:
					dim = 250;
					break
			}
		} else {

			switch (getNumberElementsOutOfRange) {
				case 1:
					dim = 720;
					break
				case 2:
					dim = 500;
					break
				case 3:
					dim = 250;
					break
				case 4:
					dim = 250;
					break
				default:
					dim = 250;
			}

		}
		return dim
	}

	renderContent = () => {
		const {
			item,
			pagePadding,
			borderRadius,
			index, length
		} = this.props

		const dim = this.moreHandel()
		const {
			Name,
		} = item

		const {
			Theme,
		} = this

	
		if (Theme === 1) {
			return (
				<View
					style={{
						padding: pagePadding,
					}}>
					<FontedText
						numberOfLines={3}
						ellipsizeMode="tail"
						style={{
							fontSize: 18,
						}}>{Name}</FontedText>
				</View>
			)
		}
		else {
			const {
				ShowCategoryName,
				HomeCategoryPerRow
			} = this.props

			const {
				width,
			} = this

			const {
				isLightTheme,
				isTextBelow,
			} = this

			const themeColor = isLightTheme ? '255' : '0'
			const textColor = isLightTheme ? '#333333' : 'white'

			const {
				Icon: {
					ImageUrl,
				},
			} = item

			return (
				<RemoteImageBackground
					resizeMode="cover"
					style={{
						borderRadius: borderRadius,
					}}
					original={dim == 720 ? true : false}
					dimension={dim}
					uri={ImageUrl}
					imageStyle={{
						width,
						height: this.itemHeight,
						borderRadius: borderRadius,
					}}>
					<LinearGradient
						colors={[
							`rgba(${themeColor}, ${themeColor}, ${themeColor},${this.props.HomeCategoryIngrediant.Value == true ? 0.1 : 0} )`,
							`rgba(${themeColor}, ${themeColor}, ${themeColor}, ${this.props.HomeCategoryIngrediant.Value == true ? 0.6 : 0} )`,
							`rgba(${themeColor}, ${themeColor}, ${themeColor}, ${this.props.HomeCategoryIngrediant.Value == true ? 1 : 0} )`
						]}
						style={{
							width,
							height: this.itemHeight,
							borderRadius: borderRadius,
							padding: pagePadding,
							justifyContent: 'flex-end',
						}}>
						{!isTextBelow && ShowCategoryName.Value && <FontedText multiLine={true} numberOfLines={4} style={{ fontSize: 15, textAlignVertical: 'center', color: textColor }}>{Name}</FontedText>}
					</LinearGradient>
				</RemoteImageBackground>
			)
		}
	}

	render() {
		const {
			item,
			index,
			onPress,
			bgColor2,
			borderRadius,
			style,
			ShowCategoryName,
		} = this.props

		const {
			width,
		} = this

		const {
			isTextBelow,
		} = this

		const {
			Name,
		} = item

		return (
			<CustomTouchable
				onPress={() => {
					onPress(item, index)
				}}
				style={[{
					width,
					minHeight: this.itemHeight,
				}, style]}>
				<View
					onPress={() => {
						onPress(item, index)
					}}
					style={{
						width,
						height: this.itemHeight,
						backgroundColor: bgColor2,
						borderRadius: borderRadius,
						justifyContent: 'center',
						alignItems: 'center',
						...shadowStyle1,
					}}>
					{this.renderContent()}
				</View>

				{isTextBelow && ShowCategoryName.Value && <View
					style={{
						height: TextBelowImageContainerHeight,
					}}>
					<FontedText
						numberOfLines={2}
						ellipsizeMode="tail"
						style={{
							fontSize: 15,
							marginTop: 5,
						}}>{Name}</FontedText>
				</View>}
			</CustomTouchable>
		)
	}
}

const mapStateToProps = ({
	runtime_config: {
		runtime_config: {
			styles,
			colors,
			screens: {
				Home_12_1: {
					HomeCategoryStyle,
					ShowCategoryName,
					HomeCategoryIngrediant,
					HomeCategoryPerRow
				},
			},
		},
	},
}) => ({
	HomeCategoryStyle,
	ShowCategoryName,
	HomeCategoryIngrediant,
	HomeCategoryPerRow,
	...styles,
	...colors,
})

export default connect(mapStateToProps)(CategoryItem)