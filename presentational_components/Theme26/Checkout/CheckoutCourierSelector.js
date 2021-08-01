import React from 'react';
import { View, I18nManager } from 'react-native';
import { connect } from 'react-redux';
import TranslatedText from '../../../partial_components/Common/TranslatedText';
import FontedText from '../../../partial_components/Common/FontedText';
import CustomTouchable from '../../../partial_components/Common/CustomTouchable';
import ItemSeparator from '../../../partial_components/Common/ItemSeparator';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { SelectEntity } from '../../../utils/EntitySelector';
import { initialWindowSafeAreaInsets } from 'react-native-safe-area-context';

class CheckoutCourierSelector extends React.PureComponent {

    constructor(props) {
        super(props)
    }

    renderOneList = () => {

        const {
            pagePadding,
            largePagePadding,
            textColor1,
            textColor2,
            mainColor,
            SelectedShipping,
            onChangeShipping,
            SelectedWarehouse,
            icon
        } = this.props

        const {
            SelectedShipping: {
                Warehouses = [],
                AskForWarehouse = false
            }
        } = this.props

        return (
            <View style={{ paddingHorizontal: largePagePadding }} >
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}>

                    <TranslatedText style={{ color: textColor1, fontSize: 24, fontWeight: 'bold',  }} text={'ShippingWarehouse'} />


                    {/* add new address and change addresas selector */}
                    <View style={{ flexDirection: 'row' }}>
                        <CustomTouchable
                            onPress={() => {
                                SelectEntity(this.props.navigation, item => {
                                    onChangeShipping && onChangeShipping(SelectedShipping, item)
                                }, null, null, false, 1, [], { initialData: Warehouses })
                            }}
                            style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                flexDirection: 'row'
                            }}>
                            <Ionicons name={'ios-search'} size={16} color={mainColor} />
                            <TranslatedText style={{ color: mainColor, fontSize: 16, marginHorizontal: 5 }} text="Change" />
                        </CustomTouchable>

                    </View>

                </View>

                {/* current selected address value */}
                {SelectedWarehouse && <View
                    style={{
                        flexDirection: 'row',
                        marginTop: 5,
                    }}>
                    {icon}
                    <FontedText style={{ color: textColor2, fontSize: 19, marginLeft: pagePadding, }}>{SelectedWarehouse.Name}</FontedText>
                </View>}

                
            </View>
        )
    }
    renderExpandList = () => {

        const {
            pagePadding,
            largePagePadding,
            textColor1,
            bgColor2,
            smallBorderRadius
        } = this.props

        const {
            SelectedShipping: {
                Warehouses = [],
                AskForWarehouse = false
            }
        } = this.props


        return (
            <View style={{ marginHorizontal: largePagePadding, marginTop: pagePadding }}>

                <TranslatedText style={{ color: textColor1, fontSize: 24, fontWeight: 'bold', marginBottom: pagePadding, }} text={'ShippingWarehouse'} />

                <View style={{
                    backgroundColor: bgColor2,
                    borderRadius: smallBorderRadius
                }}>
                    {Warehouses.map(this.renderWareHouseItem)}
                </View>

            </View >
        )

    }

    renderMethod = (item, index) => {

        const {
            onChangeShipping,
            mainColor,
            mainColorText,
            textColor2,
            largeBorderRadius,
            SelectedWarehouse,
            largePagePadding,
            SelectedShipping
        } = this.props

        const {
            Id,
            Name
        } = item

        const isSelected = SelectedWarehouse && SelectedWarehouse.Id == Id
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
                onPress={() => onChangeShipping && onChangeShipping(SelectedShipping, item)}
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

    rendeTwoList = () => {
        const {
            textColor1,
            pagePadding,
            largePagePadding
        } = this.props

        const {
            SelectedShipping: {
                Warehouses = [],
                AskForWarehouse = false
            }
        } = this.props

        return (
            <View style={{ paddingHorizontal: largePagePadding }} >
                <TranslatedText style={{ color: textColor1, fontSize: 24, fontWeight: 'bold', marginBottom: pagePadding, }} text={'ShippingWarehouse'} />

                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                    }}>
                    {Warehouses.map(this.renderMethod)}
                </View>

            </View>
        )
    }
    renderWareHouseList = () => {

        const {
            CheckoutStyle
        } = this.props

        const {
            SelectedShipping: {
                Warehouses = [],
                AskForWarehouse = false
            }
        } = this.props

        if (Warehouses.length == 0) {
            return null
        }

        switch (CheckoutStyle.Value) {

            case 1:
                return this.renderOneList()
            case 2:
            case 3:
                return this.rendeTwoList()
            case 4:
            case 5:
                return this.renderExpandList()
            default:
                return null
        }

    }

    renderWareHouseItem = (item, index) => {

        const {
            pagePadding,
            bgColor1,
            textColor2,
            largePagePadding,
            SelectedShipping: {
                Warehouses = [],
                AskForWarehouse = false
            },
            onChangeShipping,
            SelectedShipping,
            mainColor,
            SelectedWarehouse
        } = this.props

        const { Name, Id } = item

        return (
            <View key={index} >

                <CustomTouchable
                    style={{
                        paddingVertical: 10,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        paddingHorizontal: pagePadding,
                        alignItems: 'center',
                    }}

                    onPress={() => {
                        onChangeShipping && onChangeShipping(SelectedShipping, item)
                    }}
                >
                    <FontedText style={{ fontSize: 12, }}>{Name}</FontedText>

                    <View style={{ flexDirection: 'row', }} >

                        {SelectedWarehouse && Id == SelectedWarehouse.Id && <MaterialIcons name='done' color={mainColor} size={18} />}

                        <Ionicons
                            style={{ marginHorizontal: 10, }}
                            name={I18nManager.isRTL ? 'ios-arrow-back' : 'ios-arrow-forward'}
                            size={20}
                            color={textColor2} />
                    </View>


                </CustomTouchable>
                {Warehouses.length - 1 == index ? null : <ItemSeparator style={{ backgroundColor: bgColor1, marginHorizontal: pagePadding }} />}
            </View>
        )
    }

    render() {

        const {
            SelectedShipping: {
                AskForWarehouse = false,
                Warehouses = []
            }
        } = this.props

        if (!AskForWarehouse || (Warehouses && Warehouses.length <= 1)) {
            return null
        }

        return (
            <View style={{ flex: 1 }} >
                {this.renderWareHouseList()}
            </View>
        )
    }
}

const mapStateToProps = ({
    runtime_config: {
        runtime_config: {
            screens: {
                Cart_Index_06_1: {
                    CheckoutStyle
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

export default connect(mapStateToProps)(CheckoutCourierSelector)
