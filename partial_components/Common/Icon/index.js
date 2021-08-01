import React from 'react';

const Icon = ({
	family,
	name,
	...restProps
}) => {
	if (!family || !name) {
		return null
	}

	switch (family) {
		case 'AntDesign':
			IconComponent = require('react-native-vector-icons/AntDesign').default
			break;
		case 'Entypo':
			IconComponent = require('react-native-vector-icons/Entypo').default
			break;
		case 'EvilIcons':
			IconComponent = require('react-native-vector-icons/EvilIcons').default
			break;
		case 'Feather':
			IconComponent = require('react-native-vector-icons/Feather').default
			break;
		case 'FontAwesome':
			IconComponent = require('react-native-vector-icons/FontAwesome').default
			break;
		case 'FontAwesome5':
			IconComponent = require('react-native-vector-icons/FontAwesome5').default
			break;
		case 'Fontisto':
			IconComponent = require('react-native-vector-icons/Fontisto').default
			break;
		case 'Ionicons':
			IconComponent = require('react-native-vector-icons/Ionicons').default
			break;
		case 'MaterialIcons':
			IconComponent = require('react-native-vector-icons/MaterialIcons').default
			break;
		case 'MaterialCommunityIcons':
			IconComponent = require('react-native-vector-icons/MaterialCommunityIcons').default
			break;
		case 'Octicons':
			IconComponent = require('react-native-vector-icons/Octicons').default
			break;
		case 'Zocial':
			IconComponent = require('react-native-vector-icons/Zocial').default
			break;
		case 'SimpleLineIcons':
			IconComponent = require('react-native-vector-icons/SimpleLineIcons').default
			break;
	}

	return (
		<IconComponent
			name={name}
			{...restProps} />
	)
}

export default Icon