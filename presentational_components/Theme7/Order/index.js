import React, { Component } from 'react'
import { ScrollView, View, Linking } from 'react-native'
import CustomHeader from '../../../partial_components/Common/CustomHeader';
import LazyContainer from '../../../partial_components/Common/LazyContainer'
import { withLocalize } from 'react-localize-redux';
import SettingsTitle from '../../../partial_components/Common/Settings/SettingsTitle';
import SettingsItem from '../../../partial_components/Common/Settings/SettingsItem.js';
import SettingsSeparator from '../../../partial_components/Common/Settings/SettingsSeparator.js';
import AutoHeightWebView from 'react-native-autoheight-webview'
import CustomWebView from '../../../partial_components/Common/CustomWebView';
import { screenWidth } from '../../../constants/Metrics.js';
import { shadowStyle0, shadowStyle3 } from '../../../constants/Style';
import Ionicons from 'react-native-vector-icons/Ionicons'
import FontedText from '../../../partial_components/Common/FontedText';
import TouchableIcon from '../../../partial_components/Common/TouchableIcon';
import { FixHtmlTextColor } from '../../../utils/Html';
import CustomTouchable from '../../../partial_components/Common/CustomTouchable';
import PriceText from '../../../partial_components/Common/PriceText';

class Order extends Component {
    constructor(props) {
        super(props)

        this.state = {
            didFetchData: false,
            isPriceCollapsed: false,
            priceEditorShown: false,
        }
    }

    componentDidMount() {
        this.setState({ ...this.props, didFetchData: true })
    }

    renderHeader = () => {
        const { summary, didFetchData } = this.state

        if (!didFetchData) {
            return null
        }

        const {
            bgColor2,
        } = this.props

        return (
            <View
                style={{
                    backgroundColor: bgColor2,
                    borderRadius: 15,
                    ...shadowStyle0,
                    paddingVertical: 20,
                    marginHorizontal: 20,
                    alignItems: 'center',
                }}>
                <CustomWebView
                    style={{
                        width: screenWidth - (20 * 4),
                    }}
                    source={summary}
                />
            </View>
        )
    }

    renderFooter = () => {
        if (!this.state.didFetchData) {
            return null
        }

        const {
            translate,
            pagePadding,
            bgColor1,
            bgColor2,
        } = this.props

        const { Total } = this.state.pricing

        const { SubTotal, Tax, Shipping, Disocunt: Discount } = this.state.pricing
        if (this.state.isPriceCollapsed) {

            return (
                <CustomTouchable
                    onPress={() => {
                        this.setState({ isPriceCollapsed: false })
                    }}>
                    <View
                        style={{
                            backgroundColor: bgColor1,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            borderTopColor: bgColor2,
                            borderTopWidth: 1,
                            padding: 12
                        }}>
                        <FontedText style={{}}>{translate('Subtotal')}</FontedText>
                        <PriceText style={{ fontSize: 18 }}>{SubTotal}</PriceText>
                    </View>

                    <View
                        style={{
                            backgroundColor: bgColor1,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            borderTopColor: bgColor2,
                            borderTopWidth: 1,
                            padding: 12
                        }}>
                        <FontedText style={{}}>{translate('Shipping')}</FontedText>
                        <PriceText style={{ fontSize: 18 }}>{Shipping}</PriceText>
                    </View>

                    <View
                        style={{
                            backgroundColor: bgColor1,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            borderTopColor: bgColor2,
                            borderTopWidth: 1,
                            borderBottomColor: bgColor2,
                            borderBottomWidth: 1,
                            padding: 12
                        }}>
                        <FontedText style={{}}>{translate('Total')}</FontedText>
                        <PriceText style={{ fontSize: 18 }}>{Total}</PriceText>
                    </View>

                    {/* <View
                        style={{
                            backgroundColor: bgColor1,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            borderTopColor: bgColor2,
                            borderTopWidth: 1,
                            borderBottomColor: bgColor2,
                            borderBottomWidth: 1,
                            padding: 12
                        }}>
                        <FontedText style={{}}>{translate('Disocunt')}</FontedText>
                        <PriceText style={{ fontSize: 18 }}>{Disocunt}</PriceText>
                    </View> */}

                    <View
                        style={{
                            backgroundColor: bgColor1,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            borderTopColor: bgColor2,
                            borderTopWidth: 0,
                            borderBottomColor: bgColor2,
                            borderBottomWidth: 1,
                            padding: 12
                        }}>
                        <FontedText style={{}}>{translate('Tax')}</FontedText>
                        <PriceText style={{ fontSize: 18 }}>{Tax}</PriceText>
                    </View>

                </CustomTouchable>
            )
        }
        else {
            const { iconColor1 } = this.props

            return (
                <View
                    style={{
                        backgroundColor: bgColor1,
                        ...shadowStyle3,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                    }}>
                    <View
                        style={{
                            justifyContent: 'space-between',
                            flexDirection: 'row',
                            alignItems: 'center',
                            padding: pagePadding
                        }}>
                        <FontedText style={{ fontSize: 14, }}>{translate('FullPrice')}</FontedText>
                        <FontedText style={{ fontSize: 14, marginLeft: 20 }}>{Total}</FontedText>
                    </View>
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            paddingHorizontal: 10,
                        }}>

                        <CustomTouchable
                            onPress={() => {
                                this.setState({ isPriceCollapsed: true })
                            }}
                            style={{
                                paddingVertical: 2,
                                paddingHorizontal: 10,
                                marginLeft: 5,
                            }}>
                            <Ionicons name='ios-arrow-up' color={iconColor1} size={24} />
                        </CustomTouchable>
                    </View>
                </View>
            )
        }
    }

    render() {
        const {
            iconColor1,
            canCancelOrder,
            onCancelOrder
        } = this.props

        return (
            <LazyContainer style={{ flex: 1 }}>
                <CustomHeader
                    navigation={this.props.navigation}
                    title={"Order"}
                    leftComponent="back"
                    rightComponent={
                        <TouchableIcon
                            onPress={() => {
                                this.props.navigation.navigate('OrderDetails', {
                                    Id: this.props.Id,
                                })
                            }}>
                            <Ionicons
                                name={`ios-information-circle`}
                                size={24}
                                color={iconColor1} />
                        </TouchableIcon>
                    } />

                <ScrollView
                    contentContainerStyle={{
                    }}>
                    <View style={{ marginVertical: 10 }}>
                        <SettingsTitle title={"Summary"} textStyle={{ fontWeight: 'bold' }} />
                    </View>

                    {this.renderHeader()}

                    <View style={{ marginTop: 10 }}  >
                        <SettingsTitle
                            textStyle={{ fontWeight: 'bold' }}
                            title={"More"} />
                    </View>

                    <SettingsSeparator />

                    <SettingsItem
                        onPress={() => {
                            this.props.navigation.navigate('OrderItems', {
                                Id: this.props.Id,
                                onChildChange: this.onChildChange,
                            })
                        }}
                        info="Items" />

                    <SettingsSeparator />

                    <SettingsItem
                        onPress={() => {
                            this.props.navigation.navigate('OrderTrackingHistory', {
                                Id: this.props.Id
                            })
                        }}
                        info="TrackingHistory" />

                    <SettingsSeparator />

                    <SettingsItem
                        onPress={() => {
                            this.props.navigation.navigate('OrderItemReview', {
                                Id: this.props.Id
                            })
                        }}
                        info="OrderReview" />

                    <SettingsSeparator />

                    <SettingsItem
                        onPress={() => {
                            this.props.navigation.navigate('OrderChat', {
                                orderId: this.props.Id,
                                CustomerId: this.state.Customer.Id,
                            })
                        }}
                        info="Chat" />


                    <SettingsSeparator />


                    <View style={{ opacity: canCancelOrder ? 1 : 0.4 }} >
                        <SettingsItem
                            onPress={() => { onCancelOrder() }}
                            info="CancelOrder"
                            infoStyle={{ color: redColor, fontSize: 15 }}
                            leftComponent={<FontAwesome name="trash" color={iconColor1} size={22} />}
                        />

                    </View>

                </ScrollView>

                {this.renderFooter()}

            </LazyContainer>
        )
    }
}

export default withLocalize(Order)