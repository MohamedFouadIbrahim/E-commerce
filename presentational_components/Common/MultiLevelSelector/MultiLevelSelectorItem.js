import React, { PureComponent } from 'react'
import { View, I18nManager } from 'react-native'
import { connect } from 'react-redux'
import FontedText from '../../../partial_components/Common/FontedText/index.js';
import CheckBox from '../../../partial_components/Common/CheckBox/index.js';
import Ionicons from 'react-native-vector-icons/Ionicons'
import CustomTouchable from '../../../partial_components/Common/CustomTouchable';

class MultiLevelSelectorItem extends PureComponent {
	render() {
		const {
			item,
			onPress,
			onSelect,
			index,
			textColor2,
			iconColor1,
			canSelectParents,
			pagePadding,
			...restProps
		} = this.props

		const {
			Name,
			isSelected,
			hasChildren,
		} = item

		return (
			<CustomTouchable
				onPress={() => { onPress(item, index) }}
				style={{
					paddingVertical: pagePadding,
					flexDirection: 'row',
					justifyContent: 'space-between',
					alignItems: 'center',
				}}
				{...restProps}>
				<View
					style={{
						justifyContent: 'center',
					}}>
					<FontedText style={{ color: textColor2, }}>{Name}</FontedText>
				</View>

				<View
					style={{
						flexDirection: 'row',
						justifyContent: 'flex-end',
						alignItems: 'center',
					}}>
					{(canSelectParents || !hasChildren) && <CustomTouchable
						style={{
							paddingVertical: 5,
							paddingLeft: 20,
						}}
						onPress={() => { onSelect(item, index) }}>
						<CheckBox
							size={22}
							selected={isSelected} />
					</CustomTouchable>}

					<Ionicons
						style={{
							marginLeft: 10,
						}}
						name={I18nManager.isRTL ? 'ios-arrow-back' : 'ios-arrow-forward'}
						size={22}
						color={hasChildren && !isSelected ? iconColor1 : 'transparent'} />
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

export default connect(mapStateToProps)(MultiLevelSelectorItem)