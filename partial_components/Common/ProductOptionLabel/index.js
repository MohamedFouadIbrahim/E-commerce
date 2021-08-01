import React from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
import FontedText from '../FontedText';
import Icon from '../Icon';

const ProductOptionLabel = ({
	item,
	smallBorderRadius,
	bgColor2,
	textColor2,
}) => {
	const {
		Type,
		Name,
		GroupName,
		ExtraDetails1,
		ExtraDetails2,
	} = item

	let displayedValue, displayedIcon

	switch (Type.Id) {
		case 5:
		case 6:
		case 10:
		case 7:
		case 8:
		case 9:
			displayedValue = `${GroupName}: ${ExtraDetails1}`
			break;
		case 1:
			displayedValue = `${GroupName}:`
			displayedIcon = <View style={{ marginLeft: 5, backgroundColor: ExtraDetails1, width: 12, height: 12, borderRadius: 6 }} />
			break;
		case 3:
			displayedValue = `${GroupName}:`
			displayedIcon = <Icon name={ExtraDetails1} family={ExtraDetails2} size={12} style={{ marginLeft: 5 }} />
			break;
		case 4:
			displayedValue = GroupName
			break;
		default:
			displayedValue = `${GroupName}: ${Name}`
			break;
	}

	return (
		<View
			style={{
				backgroundColor: bgColor2,
				flexDirection: 'row',
				justifyContent: 'center',
				alignItems: 'center',
				padding: 5,
				marginRight: 5,
				marginBottom: 5,
				borderRadius: smallBorderRadius,
			}}>
			<FontedText style={{ fontSize: 12, color: textColor2 }}>{displayedValue}</FontedText>
			{displayedIcon}
		</View>
	)
}

const mapStateToProps = ({
	runtime_config: {
		runtime_config: {
			styles,
			colors
		},
	},
}) => ({
	...styles,
	...colors
})

export default connect(mapStateToProps)(ProductOptionLabel)