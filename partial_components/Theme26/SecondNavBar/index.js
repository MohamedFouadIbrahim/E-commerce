import React from 'react'
import { FlatList, View } from 'react-native';
import { connect } from 'react-redux';
import CustomTouchable from '../../Common/CustomTouchable';
import { tabBarIconSize } from '../../../navigation/MainTabNavigator';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { withLocalize } from 'react-localize-redux';
import FontedText from '../../Common/FontedText';
import { TrimText } from '../../../utils/Text';

// const IconbackgroundColor = 'red'
const tabs = {
    "Explore": {
        name: "Explore",
        icon: ({ color, style, IconbackgroundColor, borderColor, borderRadius }) => (
            <View
                style={{ backgroundColor: IconbackgroundColor, width: 50, height: 50, borderRadius: borderRadius, borderColor, borderWidth: 0.5, justifyContent: 'center', alignContent: 'center', alignItems: 'center', alignSelf: 'center' }}
            >
                <SimpleLineIcons color={color} name='magnifier' size={tabBarIconSize} />
            </View>
        )
    },
    "Cart": {
        name: "Cart",
        icon: ({ color, badge, IconbackgroundColor, borderColor, borderRadius }) => (
            <View
                style={{ backgroundColor: IconbackgroundColor, width: 50, height: 50, borderRadius: borderRadius, borderColor, borderWidth: 0.5, justifyContent: 'center', alignContent: 'center', alignItems: 'center', alignSelf: 'center' }}
            >
                <SimpleLineIcons color={color} name='basket-loaded' size={tabBarIconSize} />
            </View>
        )
    },
    "Categories": {
        name: "Categories",
        icon: ({ color, style, IconbackgroundColor, borderColor, borderRadius }) => (
            <View
                style={{ backgroundColor: IconbackgroundColor, width: 50, height: 50, borderRadius: borderRadius, borderColor, borderWidth: 0.5, justifyContent: 'center', alignContent: 'center', alignItems: 'center', alignSelf: 'center' }}
            >
                <SimpleLineIcons color={color} name='layers' style={style} size={tabBarIconSize} />
            </View>
        )
    },
    "TopCategories": {
        name: "TopCategories",
        icon: ({ color, IconbackgroundColor, borderColor, borderRadius }) => (
            <View
                style={{ backgroundColor: IconbackgroundColor, width: 50, height: 50, borderRadius: borderRadius, borderColor, borderWidth: 0.5, justifyContent: 'center', alignContent: 'center', alignItems: 'center', alignSelf: 'center' }}
            >
                <SimpleLineIcons color={color} name='layers' size={tabBarIconSize} />
            </View>
        )
    },
    "Profile": {
        name: "Profile",
        icon: ({ color, IconbackgroundColor, borderColor, borderRadius }) => (
            <View
                style={{ backgroundColor: IconbackgroundColor, width: 50, height: 50, borderRadius: borderRadius, borderColor, borderWidth: 0.5, justifyContent: 'center', alignContent: 'center', alignItems: 'center', alignSelf: 'center' }}
            >
                <SimpleLineIcons color={color} name='user' size={tabBarIconSize} />
            </View>
        )
    },
    "Notifications": {
        name: "Notifications",
        icon: ({ color, badge, IconbackgroundColor, borderColor, borderRadius }) => (
            <View
                style={{ backgroundColor: IconbackgroundColor, width: 50, height: 50, borderRadius: borderRadius, borderColor, borderWidth: 0.5, justifyContent: 'center', alignContent: 'center', alignItems: 'center', alignSelf: 'center' }}
            >
                <SimpleLineIcons color={color} name='bell' size={tabBarIconSize} />
            </View>
        )
    },
    "Orders": {
        name: "Orders",
        icon: ({ color, IconbackgroundColor, borderColor, borderRadius }) => (
            <View
                style={{ backgroundColor: IconbackgroundColor, width: 50, height: 50, borderRadius: borderRadius, borderColor, borderWidth: 0.5, justifyContent: 'center', alignContent: 'center', alignItems: 'center', alignSelf: 'center' }}
            >
                <SimpleLineIcons color={color} name='bag' size={tabBarIconSize} />
            </View>
        )
    },
    "Articles": {
        name: "Articles",
        icon: ({ color, IconbackgroundColor, borderColor, borderRadius }) => (
            <View
                style={{ backgroundColor: IconbackgroundColor, width: 50, height: 50, borderRadius: borderRadius, borderColor, borderWidth: 0.5, justifyContent: 'center', alignContent: 'center', alignItems: 'center', alignSelf: 'center' }}
            >
                <SimpleLineIcons color={color} name='doc' size={tabBarIconSize} />
            </View>
        )
    },
    "MyProducts": {
        name: "MyProducts",
        icon: ({ color, IconbackgroundColor, borderColor, borderRadius }) => (
            <View
                style={{ backgroundColor: IconbackgroundColor, width: 50, height: 50, borderRadius: borderRadius, borderColor, borderWidth: 0.5, justifyContent: 'center', alignContent: 'center', alignItems: 'center', alignSelf: 'center' }}
            >
                <SimpleLineIcons color={color} name='handbag' size={tabBarIconSize} />
            </View>
        )
    },
    "SubStores": {
        name: "SubStores",
        icon: ({ color, IconbackgroundColor, borderColor, borderRadius }) => (
            <View
                style={{ backgroundColor: IconbackgroundColor, width: 50, height: 50, borderRadius: borderRadius, borderColor, borderWidth: 0.5, justifyContent: 'center', alignContent: 'center', alignItems: 'center', alignSelf: 'center' }}
            >
                <SimpleLineIcons color={color} name='organization' size={tabBarIconSize} />
            </View>
        )
    },
    "MonthlyOffers": {
        name: "MonthlyOffers",
        icon: ({ color, IconbackgroundColor, borderColor, borderRadius }) => (
            <View
                style={{ backgroundColor: IconbackgroundColor, width: 50, height: 50, borderRadius: borderRadius, borderColor, borderWidth: 0.5, justifyContent: 'center', alignContent: 'center', alignItems: 'center', alignSelf: 'center' }}
            >
                <SimpleLineIcons color={color} name='wallet' size={tabBarIconSize} />
            </View>
        )
    },
    "FlashDeals": {
        name: "FlashDeals",
        icon: ({ color, IconbackgroundColor, borderColor, borderRadius }) => (
            <View
                style={{ backgroundColor: IconbackgroundColor, width: 50, height: 50, borderRadius: borderRadius, borderColor, borderWidth: 0.5, justifyContent: 'center', alignContent: 'center', alignItems: 'center', alignSelf: 'center' }}
            >
                <SimpleLineIcons color={color} name='fire' size={tabBarIconSize} />
            </View>
        )
    },
    "Inbox": {
        name: "Inbox",
        icon: ({ color, badge, IconbackgroundColor, borderColor, borderRadius }) => (
            <View
                style={{ backgroundColor: IconbackgroundColor, width: 50, height: 50, borderRadius: borderRadius, borderColor, borderWidth: 0.5, justifyContent: 'center', alignContent: 'center', alignItems: 'center', alignSelf: 'center' }}
            >
                <SimpleLineIcons color={color} name='drawer' size={tabBarIconSize} />
            </View>
        )
    },
    "Support": {
        name: "Support",
        icon: ({ color, badge, IconbackgroundColor, borderColor, borderRadius }) => (
            <View
                style={{ backgroundColor: IconbackgroundColor, width: 50, height: 50, borderRadius: borderRadius, borderColor, borderWidth: 0.5, justifyContent: 'center', alignContent: 'center', alignItems: 'center', alignSelf: 'center' }}
            >
                <SimpleLineIcons color={color} name='bubbles' size={tabBarIconSize} />
            </View>
        )
    },
    "ShippingCostEstimator": {
        name: "ShippingCostEstimator",
        icon: ({ color, IconbackgroundColor, borderColor, borderRadius }) => (
            <View
                style={{ backgroundColor: IconbackgroundColor, width: 50, height: 50, borderRadius: borderRadius, borderColor, borderWidth: 0.5, justifyContent: 'center', alignContent: 'center', alignItems: 'center', alignSelf: 'center' }}
            >
                <MaterialCommunityIcons color={color} name='map-marker-path' size={tabBarIconSize} />
            </View>
        )
    },
    "MySales": {
        name: "MySales",
        icon: ({ color, IconbackgroundColor, borderColor, borderRadius }) => (
            <View
                style={{ backgroundColor: IconbackgroundColor, width: 50, height: 50, borderRadius: borderRadius, borderColor, borderWidth: 0.5, justifyContent: 'center', alignContent: 'center', alignItems: 'center', alignSelf: 'center' }}
            >
                <SimpleLineIcons color={color} name='briefcase' size={tabBarIconSize} />
            </View>
        )
    },
    "QRCodeReader": {
        name: "QRCodeReader",
        icon: ({ color, IconbackgroundColor, borderColor, borderRadius }) => (
            <View
                style={{ backgroundColor: IconbackgroundColor, width: 50, height: 50, borderRadius: borderRadius, borderColor, borderWidth: 0.5, justifyContent: 'center', alignContent: 'center', alignItems: 'center', alignSelf: 'center' }}
            >
                <MaterialCommunityIcons color={color} name='qrcode-scan' size={tabBarIconSize} />
            </View>
        )
    },
    "Discounts": {
        name: "Discounts",
        icon: ({ color, IconbackgroundColor, borderColor, borderRadius }) => (
            <View
                style={{ backgroundColor: IconbackgroundColor, width: 50, height: 50, borderRadius: borderRadius, borderColor, borderWidth: 0.5, justifyContent: 'center', alignContent: 'center', alignItems: 'center', alignSelf: 'center' }}
            >
                <Feather color={color} name='percent' size={tabBarIconSize} />
            </View>
        )
    },
    "Product": {
        name: "Product",
        icon: ({ color, IconbackgroundColor, borderColor, borderRadius }) => (
            <View
                style={{ backgroundColor: IconbackgroundColor, width: 50, height: 50, borderRadius: borderRadius, borderColor, borderWidth: 0.5, justifyContent: 'center', alignContent: 'center', alignItems: 'center', alignSelf: 'center' }}
            >
                <SimpleLineIcons color={color} name='bag' size={tabBarIconSize} />
            </View>
        )
    },
    "WishList": {
        name: "WishList",
        icon: ({ color, IconbackgroundColor, borderColor, borderRadius }) => (
            <View
                style={{ backgroundColor: IconbackgroundColor, width: 50, height: 50, borderRadius: borderRadius, borderColor, borderWidth: 0.5, justifyContent: 'center', alignContent: 'center', alignItems: 'center', alignSelf: 'center' }}
            >
                <AntDesign color={color} name='staro' size={tabBarIconSize} />
            </View>
        )
    },
    "MostLikes": {
        name: "MostLikes",
        icon: ({ color, IconbackgroundColor, borderColor, borderRadius }) => (
            <View
                style={{ backgroundColor: IconbackgroundColor, width: 50, height: 50, borderRadius: borderRadius, borderColor, borderWidth: 0.5, justifyContent: 'center', alignContent: 'center', alignItems: 'center', alignSelf: 'center' }}
            >
                <SimpleLineIcons color={color} name='heart' size={tabBarIconSize} />
            </View>
        )
    },
    "FavouriteSubStores": {
        name: "FavouriteSubStores",
        icon: ({ color, IconbackgroundColor, borderColor, borderRadius }) => (
            <View
                style={{ backgroundColor: IconbackgroundColor, width: 50, height: 50, borderRadius: borderRadius, borderColor, borderWidth: 0.5, justifyContent: 'center', alignContent: 'center', alignItems: 'center', alignSelf: 'center' }}
            >
                <SimpleLineIcons color={color} name='organization' size={tabBarIconSize} />
            </View>
        )
    },
    "AddSubstore": {
        name: ' ',
        icon: ({ color, IconbackgroundColor, borderColor, borderRadius }) => (
            <View
                style={{ backgroundColor: IconbackgroundColor, width: 50, height: 50, borderRadius: borderRadius, borderColor, borderWidth: 0.5, justifyContent: 'center', alignContent: 'center', alignItems: 'center', alignSelf: 'center' }}
            >
                <AntDesign color={color} name='plus' size={tabBarIconSize} />
            </View>
        )
    },
    "MyCode": {
        name: "MyCode",
        icon: ({ color, IconbackgroundColor, borderColor, borderRadius }) => (
            <View
                style={{ backgroundColor: IconbackgroundColor, width: 50, height: 50, borderRadius: borderRadius, borderColor, borderWidth: 0.5, justifyContent: 'center', alignContent: 'center', alignItems: 'center', alignSelf: 'center' }}
            >
                <MaterialCommunityIcons color={color} name='qrcode-scan' size={tabBarIconSize} />
            </View>
        )
    },
    "CommissionQRCode": {
        name: "CommissionQRCode",
        icon: ({ color, IconbackgroundColor, borderColor, borderRadius }) => (
            <View
                style={{ backgroundColor: IconbackgroundColor, width: 50, height: 50, borderRadius: borderRadius, borderColor, borderWidth: 0.5, justifyContent: 'center', alignContent: 'center', alignItems: 'center', alignSelf: 'center' }}
            >
                <MaterialCommunityIcons color={color} name='qrcode-scan' size={tabBarIconSize} />
            </View>
        )
    },
}

class SecondNavBar extends React.PureComponent {

    renderItem = (item, Index) => {

        const tab = tabs[item.item]
        const SecondNavBarStyle = this.props.Navigation_Bar_10_2.SecondNavBarStyle.Value
        const SecondNavBarBackgroundColor = this.props.Navigation_Bar_10_2.SecondNavBarBackgroundColor.Value
        const SecondNavBarIconColor = this.props.Navigation_Bar_10_2.SecondNavBarIconColor.Value
        const SecondNavBarBorderColor = this.props.Navigation_Bar_10_2.SecondNavBarBorderColor.Value
        const { translate, subStoreId, overrideShowCommisionQrCode } = this.props

        if (!tab) {
            return null
        }
        else if (item.item == "CommissionQRCode" && !overrideShowCommisionQrCode) {
            return null
        }
        return (
            <CustomTouchable
                style={{ width: 80, }}
                key={tab.name}
                onPress={() => { this.props.navigation.navigate(tab.name) }}
            >
                {tab.icon({
                    color: SecondNavBarIconColor,
                    borderColor: SecondNavBarBorderColor,
                    IconbackgroundColor: SecondNavBarStyle == 1/*no background*/ ? undefined : SecondNavBarBackgroundColor,
                    borderRadius: SecondNavBarStyle == 2 ? 25 /*circle style*/ : 0/*square style */,
                })}
                <FontedText
                    style={{ alignSelf: 'center', color: this.props.textColor1, textAlign: 'center', }}>
                    {tab.name == ' ' ? subStoreId == null ? translate("AddStoreLaber") : translate("AddPoductsLabel") : translate(tab.name)}
                </FontedText>

            </CustomTouchable>
        )
    }

    render() {

        const {
            Navigation_Bar_10_2,
            Side_Menu_10_1,
            largePagePadding,
            pagePadding
        } = this.props

        const HaveProductPage = Navigation_Bar_10_2.SeconderyNavbar.Value.includes('Product')

        const hiddenTabs = Side_Menu_10_1.SideMenuItems.Value.filter(item => !Navigation_Bar_10_2.SeconderyNavbar.Value.includes(item))

        if (HaveProductPage && Navigation_Bar_10_2.SeconderyNavbar.Value[0] != 'Product') {
            const ProductIndex = Navigation_Bar_10_2.SeconderyNavbar.Value.indexOf('Product')
            Navigation_Bar_10_2.SeconderyNavbar.Value.splice(ProductIndex, 1)
        }

        const filteredData = Navigation_Bar_10_2.SeconderyNavbar.Value.filter(item => !hiddenTabs.includes(item));

        if (!filteredData || filteredData.length == 0)
            return null

        return (
            <View
                style={{ marginTop: largePagePadding * 2, marginBottom: -largePagePadding }}>
                <FlatList
                    contentContainerStyle={{
                        flex: 1,
                        justifyContent: 'space-around',
                        marginHorizontal: pagePadding,
                    }}
                    horizontal={true}
                    data={filteredData}
                    renderItem={this.renderItem}
                    keyExtractor={(Item, Index) => String(Index)}
                />
            </View>

        )
    }
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
                Navigation_Bar_10_2,
                Side_Menu_10_1
            },
            colors,
            styles,
        },
    }
}) => ({
    subStoreId,
    overrideShowCommisionQrCode,
    Navigation_Bar_10_2,
    Side_Menu_10_1,
    ...colors,
    ...styles,
})

export default withLocalize(connect(mapStateToProps)(SecondNavBar))