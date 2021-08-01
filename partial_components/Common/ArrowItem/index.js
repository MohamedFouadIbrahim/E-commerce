import React from 'react'
import { connect } from 'react-redux'
import { View, I18nManager } from 'react-native'
import TranslatedText from '../TranslatedText';
import FontedText from '../FontedText';
import Ionicons from 'react-native-vector-icons/Ionicons'
import CustomTouchable from '../CustomTouchable';

const ArrowItem = (props) => {
	const {
		textColor2,
	} = props

	const {
		title,
		style,
		info,
		color = textColor2,
		rightComponent,
		largePagePadding,
		Icon = null,
		...buttonProps
	} = props

	return (
		<CustomTouchable
			{...buttonProps}
			style={[{
				paddingVertical: 15,
				flexDirection: 'row',
				justifyContent: 'space-between',
				alignItems: 'center',
			}, style]}>
			<View
				style={{
					justifyContent:'center',
					flexDirection: 'row'
				}}>
				{Icon && <Icon />}
				<TranslatedText style={{ color }} text={title} />
			</View>

			<View
				style={{
					flexDirection: 'row',
					alignItems: 'center',
					paddingLeft: 10,
				}}>
				{rightComponent || <FontedText style={{ fontSize: 15, color }}>{info}</FontedText>}

				<Ionicons
					style={{
						marginLeft: 10,
					}}
					name={I18nManager.isRTL ? 'ios-arrow-back' : 'ios-arrow-forward'}
					size={20}
					color={color} />
			</View>
		</CustomTouchable>
	)
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


export default connect(mapStateToProps)(ArrowItem)
