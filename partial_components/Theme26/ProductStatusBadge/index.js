import React from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux';
import { redColor, orangeColor, greenColor } from '../../../constants/Theme26/Colors';
import FontedText from '../../Common/FontedText';

const ProductStatusBadge = ({
	style,
	data: {
		Status
	},
	smallBorderRadius,
	badgeIconSize,
	fontSize,
	...restProps
}) => {
	let bgColor, textColor, IconComponent

	switch (Status.Id) {
		case 2: // Sale
			bgColor = redColor
			textColor = "white"

			IconComponent = require('react-native-vector-icons/FontAwesome5').default
			BadgeIcon = <IconComponent size={badgeIconSize || 12} color="white" name="percentage" style={{}} />
			break;
		case 3: // Featured
			bgColor = orangeColor
			textColor = "white"

			IconComponent = require('react-native-vector-icons/AntDesign').default
			BadgeIcon = <IconComponent size={badgeIconSize || 12} color="white" name="star" style={{}} />
			break;
		case 4: // New
			bgColor = greenColor
			textColor = "white"

			IconComponent = require('react-native-vector-icons/FontAwesome5').default
			BadgeIcon = <IconComponent size={badgeIconSize || 12} color="white" name="dot-circle" style={{}} />
			break;

		case 5: // low Quantity 
			bgColor = redColor
			textColor = "white"

			IconComponent = require('react-native-vector-icons/AntDesign').default
			BadgeIcon = <IconComponent size={badgeIconSize || 12} color="white" name="arrowdown" style={{}} />
			break;
		case 6: // Out of stock
		case 7: // Not for sale
		case 8: // Pending
			bgColor = redColor
			textColor = "white"

			IconComponent = require('react-native-vector-icons/AntDesign').default
			BadgeIcon = <IconComponent size={badgeIconSize || 12} color="white" name="minuscircleo" style={{}} />
			break;
		default:
			return null
	}

	return (
		<View
			style={[{
				flexDirection: 'row',
				alignItems: 'center',
				backgroundColor: bgColor,
				padding: 5,
				borderRadius: smallBorderRadius,
			}, style]}
			{...restProps}>
			{BadgeIcon}

			<FontedText style={{ fontSize: fontSize || 10, textAlign: 'left', color: textColor, marginLeft: 5, }}>{Status.Name}</FontedText>
		</View>
	)
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


export default connect(mapStateToProps)(ProductStatusBadge)