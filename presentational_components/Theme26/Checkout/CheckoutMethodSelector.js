import React from 'react';
import { View } from 'react-native'
import { connect } from 'react-redux';
import CustomTouchable from '../../../partial_components/Common/CustomTouchable';
import TranslatedText from '../../../partial_components/Common/TranslatedText';
import FontedText from '../../../partial_components/Common/FontedText';
import ItemSeparator from '../../../partial_components/Common/ItemSeparator';
import { SelectEntity } from '../../../utils/EntitySelector';
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { LongToast } from '../../../utils/Toast';

const CheckoutMethodSelector = ({
	title,
	url,
	address,
	data = [],
	value,
	onChange,
	icon,
	mainColor,
	mainColorText,
	textColor1,
	textColor2,
	pagePadding,
	largeBorderRadius,
	smallBorderRadius,
	navigation,
	CheckoutStyle,
	bgColor2,
	iconColor1,
	bgColor1
}) => {
	const renderMethod = (item, index) => {
		const {
			Id,
			Name
		} = item

		const isSelected = value ? Id === value.Id : false
		let textColor, iconName, bgColor, borderColor

		if (isSelected) {
			textColor = mainColorText
			iconName = "ios-radio-button-on"
			bgColor = mainColor
			borderColor = "transparent"
		}
		else {
			textColor = textColor2
			iconName = "ios-radio-button-off"
			bgColor = "transparent"
			borderColor = textColor2
		}

		return (
			<CustomTouchable
				key={index}
				onPress={() => onChange(item)}
				style={{
					borderRadius: largeBorderRadius,
					paddingHorizontal: 10,
					paddingVertical: 5,
					backgroundColor: bgColor,
					borderColor,
					borderWidth: 0.5,
					flexDirection: 'row',
					justifyContent: 'center',
					alignItems: 'center',
					marginTop: 5,
					marginRight: 5,
				}}>
				<Ionicons name={iconName} color={textColor} size={18} style={{ marginRight: 5 }} />
				<FontedText style={{ fontSize: 12, color: textColor }}>{Name}</FontedText>
			</CustomTouchable>
		)
	}

	const expandList = (item, index) => {
		const { Id, Name } = item
		const isSelected = value ? Id === value.Id : false
		return (
			<View key={index} >
				<CustomTouchable style={{
					paddingVertical: 10,
					flexDirection: 'row',
					justifyContent: 'space-between',
					paddingHorizontal: pagePadding,
					alignItems: 'center',
				}} onPress={() => { onChange(item) }}  >
					<FontedText style={{ fontSize: 12, }}>{Name}</FontedText>
					{isSelected && <MaterialIcons name='done' color={mainColor} size={18} />}
				</CustomTouchable>
				{data.length - 1 == index ? null : <ItemSeparator style={{ backgroundColor: bgColor1, marginHorizontal: pagePadding }} />}
			</View>
		)
	}
	switch (CheckoutStyle.Value) {
		case 1:
			// Lists

			return (
				<View>
					<View
						style={{
							flexDirection: 'row',
							justifyContent: 'space-between',
							alignItems: 'center',
						}}>
						<TranslatedText style={{ color: textColor1, fontSize: 24, fontWeight: 'bold', }} text={title} />

						<View
							style={{
								flexDirection: 'row',
							}}>
							<CustomTouchable
								onPress={() => {
									SelectEntity(navigation, onChange, null, null, false, 1, [], { initialData: data })
								}}
								style={{
									justifyContent: 'center',
									alignItems: 'center',
								}}>
								<TranslatedText style={{ color: mainColor, fontSize: 16, marginLeft: 5, }} text="Change" />
							</CustomTouchable>
						</View>
					</View>

					{value && <View
						style={{
							flexDirection: 'row',
							marginTop: 5,
						}}>
						{icon}
						<FontedText style={{ color: textColor2, fontSize: 19, marginLeft: pagePadding, }}>{value.Name}</FontedText>
					</View>}
				</View>
			)
		case 2:
		case 3:
			// Buttons

			return (
				<View>
					<TranslatedText style={{ color: textColor1, fontSize: 24, fontWeight: 'bold', marginBottom: pagePadding, }} text={title} />

					<View
						style={{
							flexDirection: 'row',
							alignItems: 'center',
							flexWrap: 'wrap',
						}}>
						{data.map(renderMethod)}
					</View>
				</View>
			)
		case 4:
		case 5:
			//ExpandedList
			return (
				<View>
					<TranslatedText style={{ color: textColor1, fontSize: 24, fontWeight: 'bold', marginBottom: pagePadding, }} text={title} />
					<View style={{
						backgroundColor: bgColor2,
						borderRadius: smallBorderRadius
					}}>
						{data.map(expandList)}
					</View>
				</View>
			)
	}

	return null
}

const mapStateToProps = ({
	runtime_config: {
		runtime_config: {
			screens: {
				Cart_Index_06_1: {
					CheckoutStyle,
				}
			},
			colors,
			styles,
		},
	},
}) => ({
	CheckoutStyle,
	...colors,
	...styles,
})

export default connect(mapStateToProps)(CheckoutMethodSelector)