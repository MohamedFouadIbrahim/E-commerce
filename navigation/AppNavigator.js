import React from 'react';
import { connect } from 'react-redux';
import { createDrawerNavigator } from '@react-navigation/drawer';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import MainTabNavigator from './MainTabNavigator';
import CustomDrawerContent from './CustomDrawerContent';
import Feather from 'react-native-vector-icons/Feather'
import { withLocalize } from 'react-localize-redux';

/*
	- The route key must end with "_Drawer"
	- Route names are auto translated after auto removal of "_Drawer"
	- So for example if you're adding a route "Users_Drawer", you have
	to make sure a translation for "Users" exists in constants\Languages.js
*/

const drawerIconSize = 20

const drawer_items = {
	"Explore": {
		label: "Explore",
		name: "Explore_Drawer",
		icon: (color) => <SimpleLineIcons color={color} name='magnifier' size={drawerIconSize} />
	},
	"Cart": {
		label: "Cart",
		name: "Cart_Drawer",
		icon: (color) => <SimpleLineIcons color={color} name='basket-loaded' size={drawerIconSize} />
	},
	"Categories": {
		label: "Categories",
		name: "Categories_Drawer",
		icon: (color) => <SimpleLineIcons color={color} name='layers' size={drawerIconSize} />
	},
	"TopCategories": {
		label: "TopCategories",
		name: "TopCategories_Drawer",
		icon: (color) => <SimpleLineIcons color={color} name='layers' size={drawerIconSize} />
	},
	"Profile": {
		label: "Profile",
		name: "Profile_Drawer",
		icon: (color) => <SimpleLineIcons color={color} name='user' size={drawerIconSize} />
	},
	"Notifications": {
		label: "Notifications",
		name: "Notifications_Drawer",
		icon: (color) => <SimpleLineIcons color={color} name='bell' size={drawerIconSize} />
	},
	"Orders": {
		label: "Orders",
		name: "Orders_Drawer",
		icon: (color) => <SimpleLineIcons color={color} name='bag' size={drawerIconSize} />
	},
	"Articles": {
		label: "Articles",
		name: "Articles_Drawer",
		icon: (color) => <SimpleLineIcons color={color} name='doc' size={drawerIconSize} />
	},
	"MyProducts": {
		label: "MyProducts",
		name: "MyProducts_Drawer",
		icon: (color) => <SimpleLineIcons color={color} name='handbag' size={drawerIconSize} />
	},
	"SubStores": {
		label: "SubStores",
		name: "SubStores_Drawer",
		icon: (color) => <SimpleLineIcons color={color} name='organization' size={drawerIconSize} />
	},
	"MonthlyOffers": {
		label: "MonthlyOffers",
		name: "MonthlyOffers_Drawer",
		icon: (color) => <SimpleLineIcons color={color} name='wallet' size={drawerIconSize} />
	},
	"FlashDeals": {
		label: "FlashDeals",
		name: "FlashDeals_Drawer",
		icon: (color) => <SimpleLineIcons color={color} name='fire' size={drawerIconSize} />
	},
	"Inbox": {
		label: "Inbox",
		name: "Inbox_Drawer",
		icon: (color) => <SimpleLineIcons color={color} name='drawer' size={drawerIconSize} />
	},
	"Support": {
		label: "Support",
		name: "Support_Drawer",
		icon: (color) => <SimpleLineIcons color={color} name='info' size={drawerIconSize} />
	},
	"ShippingCostEstimator": {
		label: "ShippingCostEstimator",
		name: "ShippingCostEstimator_Drawer",
		icon: (color) => <MaterialCommunityIcons color={color} name='map-marker-path' size={drawerIconSize} />
	},
	"MySales": {
		label: "MySales",
		name: "MySales_Drawer",
		icon: (color) => <SimpleLineIcons color={color} name='briefcase' size={drawerIconSize} />
	},
	"QRCodeReader": {
		label: "QRCodeReader",
		name: "QRCodeReader_Drawer",
		icon: (color) => <MaterialCommunityIcons color={color} name='qrcode-scan' size={drawerIconSize} />
	},
	"Discounts": {
		label: "Discounts",
		name: "Discounts_Drawer",
		icon: (color) => <Feather color={color} name='percent' size={drawerIconSize} />
	},
	"WishList": {
		name: "WishList_Drawer",
		label: 'WishList',
		icon: (color) => <AntDesign color={color} name='staro' size={drawerIconSize} />
	},
	"MostLikes": {
		name: "MostLikes_Drawer",
		label: 'MostLikes',
		icon: (color) => <SimpleLineIcons color={color} name='heart' size={drawerIconSize} />
	},
	"FavouriteSubStores": {
		name: "FavouriteSubStores_Drawer",
		label: 'FavouriteSubStores',
		icon: (color) => <SimpleLineIcons color={color} name='organization' size={drawerIconSize} />
	},
	"AddSubstore": {
		name: " _Drawer",
		label: 'AddSubstore',
		icon: (color) => (
			<AntDesign color={color} name='plus' size={drawerIconSize} />
		)
	},
	"MyCode": {
		label: "MyCode",
		name: "MyCode_Drawer",
		icon: (color) => <MaterialCommunityIcons color={color} name='qrcode-scan' size={drawerIconSize} />
	},

	"CommissionQRCode": {
		label: "CommissionQRCode",
		name: "CommissionQRCode_Drawer",
		icon: (color) => <MaterialCommunityIcons color={color} name='qrcode-scan' size={drawerIconSize} />
	},
}

const Drawer = createDrawerNavigator()

export const AppNavigator = ({
	textColor1,
	Side_Menu_10_1,
	translate,
	overrideShowCommisionQrCode,
	subStoreId
}) => {
	const renderDrawerItem = (item, index) => {
		const drawer = drawer_items[item]
		if (!drawer) {
			return null
		}
		else if (item == "CommissionQRCode" && !overrideShowCommisionQrCode) {
			return null
		}
		else if (item == 'AddSubstore') {
			drawer.label = subStoreId == null ? "AddStoreLaber" : "AddPoductsLabel"
			// drawerIcon = tab.icon
		}

		return (
			<Drawer.Screen
				key={index}
				name={drawer.name}
				component={MainTabNavigator}
				options={{
					gestureEnabled: Side_Menu_10_1.Enable.Value,
					drawerLabel: translate(drawer.label),
					drawerIcon: () => drawer.icon(textColor1)
				}} />
		)
	}

	return (
		<Drawer.Navigator
			drawerType={Side_Menu_10_1.Type.Value}
			drawerContent={(props) => <CustomDrawerContent {...props} />}>
			<Drawer.Screen
				name="Home_Drawer"
				component={MainTabNavigator}
				options={{
					gestureEnabled: Side_Menu_10_1.Enable.Value,
					drawerLabel: translate("Home"),
					drawerIcon: () => (
						<SimpleLineIcons name='home' color={textColor1} size={20} />
					)
				}} />

			{Side_Menu_10_1.SideMenuItems.Value.map(renderDrawerItem)}
		</Drawer.Navigator>
	)
}

const mapStateToProps = ({
	login: {
		subStoreId,
		user_data: {
			overrideShowCommisionQrCode
		}
	},
	runtime_config: {
		runtime_config: {
			screens: {
				Side_Menu_10_1,
			},
			colors: {
				textColor1,
			},
		},
	},
}) => ({
	textColor1,
	Side_Menu_10_1,
	overrideShowCommisionQrCode,
	subStoreId,
})

export default connect(mapStateToProps)(withLocalize(AppNavigator))