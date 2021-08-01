import React from 'react';
import { View, ActivityIndicator } from 'react-native'
import { connect } from 'react-redux';
import CustomTouchable from '../../../partial_components/Common/CustomTouchable';
import TranslatedText from '../../../partial_components/Common/TranslatedText';
import FontedText from '../../../partial_components/Common/FontedText';
import { SelectEntity } from '../../../utils/EntitySelector';
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import ItemSeparator from '../../../partial_components/Common/ItemSeparator';
import { shadowStyle0 } from '../../../constants/Style';
import { TrimText } from '../../../utils/Text';
import { redColor } from '../../../constants/Theme26/Colors';

class CheckoutMethodSelector extends React.PureComponent {

    constructor(props) {
        super(props)
        this.state = {
            Expand: true
        }
    }

    Title = () => {

        const {
            title,
            mainColor,
            textColor1,
            pagePadding,
            onPressToMange,
            CheckoutStyle
        } = this.props

        return (
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }} >
                <TranslatedText style={{ color: textColor1, fontSize: 24, fontWeight: 'bold', marginBottom: pagePadding, }} text={title} />
                {CheckoutStyle.Value != 1 ? <TranslatedText style={{ color: mainColor, marginBottom: pagePadding }} onPress={onPressToMange} text={'Mange'} /> : null}
            </View>
        )
    }

    renderMethod = (item, index) => {

        const {
            value,
            onChange,
            mainColor,
            mainColorText,
            textColor2,
            largeBorderRadius,
        } = this.props

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

    expandList = (item, index) => {
        const {
            value,
            bgColor1,
            pagePadding,
            mainColor,
            onChange,
            onEdit,
            onDelete,
            loading,
            data
        } = this.props
        const {
            Id,
            Name
        } = item
        const isSelected = value ? Id === value.Id : false
        return (
            <View key={index}>
                <CustomTouchable
                    style={{
                        paddingVertical: 10,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        paddingHorizontal: pagePadding,
                        alignItems: 'center',
                    }}
                    onPress={() => { onChange(item) }}>

                    {/* name and selected */}
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly' }}>
                        {isSelected ? <MaterialIcons name='done' style={{ marginRight: 10 }} color={mainColor} size={18} /> : null}
                        <FontedText style={{ fontSize: 12 }}>{TrimText(Name, 40)}</FontedText>
                    </View>

                    {/* edit delete icon */}
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly' }}>
                        <CustomTouchable
                            onPress={() => { onEdit(item) }}
                            style={{ marginHorizontal: 5 }}
                        >
                            <MaterialIcons name='edit' color={mainColor} size={18} />
                        </CustomTouchable>

                        <CustomTouchable
                            onPress={() => {
                                onDelete(item)
                            }}>
                            {
                                loading ? <ActivityIndicator color={mainColor} size='small' /> :
                                    <MaterialIcons name='clear' color={redColor} size={18} />
                            }
                        </CustomTouchable>

                    </View>
                </CustomTouchable>

                {data.length - 1 == index ? null : <ItemSeparator style={{ backgroundColor: bgColor1, marginHorizontal: pagePadding }} />}

            </View>
        )
    }

    render() {
        const {
            url,
            data = [],
            value,
            onChange,
            icon,
            smallBorderRadius,
            mainColor,
            pagePadding,
            navigation,
            CheckoutStyle,
            textColor1,
            textColor2,
            largeBorderRadius,
            bgColor1,
            bgColor2,
            CartInAddressCount
        } = this.props
        switch (CheckoutStyle.Value) {
            case 1:
                // Lists style
                return (
                    <View>
                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                            }}>
                            {this.Title()}

                            {/* add new address and change addresas selector */}
                            <View style={{ flexDirection: 'row' }}>
                                <CustomTouchable
                                    onPress={() => {
                                        SelectEntity(this.props.navigation, onChange, 'Address/ListSimple', null, false, 1)
                                    }}
                                    style={{
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        flexDirection: 'row'
                                    }}>
                                    <Ionicons name={'ios-search'} size={16} color={mainColor} />
                                    <TranslatedText style={{ color: mainColor, fontSize: 16, marginHorizontal: 5 }} text="Change" />
                                </CustomTouchable>

                                <CustomTouchable
                                    style={{
                                        justifyContent: 'center', alignItems: 'center', paddingLeft: 5, marginLeft: 10, flexDirection: 'row',
                                    }}
                                    onPress={this.props.onPressAddAddress}>
                                    <Ionicons name={`ios-add`} size={25} color={mainColor} />
                                    <TranslatedText style={{ color: mainColor, marginHorizontal: 8 }} text={'AddAddress'} />
                                </CustomTouchable>
                            </View>

                        </View>

                        {/* current selected address value */}
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
                // Buttons style
                return (
                    <View>
                        {this.Title()}
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                flexWrap: 'wrap',
                            }}>
                            {data.map(this.renderMethod)}
                        </View>
                        {/* add new address */}
                        {data.length < CartInAddressCount.Value ? <CustomTouchable
                            style={{
                                flexDirection: 'row',
                                alignSelf: 'center',
                                alignItems: 'center',
                                marginVertical: 10,
                                paddingHorizontal: 5,
                                paddingVertical: 2,
                                borderRadius: largeBorderRadius,
                                borderColor: textColor2,
                                borderWidth: 0.5,
                            }}
                            onPress={this.props.onPressAddAddress}>
                            <Ionicons name={`ios-add`} size={25} color={textColor2} style={{ marginLeft: 10, marginRight: 10 }} />
                            <TranslatedText style={{ color: textColor2, marginRight: 15 }} text={'AddAddress'} />
                        </CustomTouchable> : null}
                    </View>
                )
            case 4:
            case 5:
                //ExpandedList style
                return (
                    <View>
                        {this.Title()}
                        <View
                            style={{
                                backgroundColor: this.props.bgColor2,
                                borderRadius: smallBorderRadius,
                            }}>

                            {data.map(this.expandList)}

                            {/* sperator between items and add new */}
                            {data.length > 0 && data.length < CartInAddressCount.Value ? <ItemSeparator style={{ backgroundColor: bgColor1, marginHorizontal: pagePadding }} /> : null}

                            {/* add new address button */}
                            {data.length < CartInAddressCount.Value ?
                                <CustomTouchable
                                    style={{ flexDirection: 'row', alignSelf: 'center', marginVertical: 10, paddingHorizontal: 25 }}
                                    onPress={this.props.onPressAddAddress}>
                                    <Ionicons name={`ios-add`} size={25} color={textColor1} />
                                    <TranslatedText style={{ color: textColor1, marginHorizontal: 8 }} text={'AddAddress'} />
                                </CustomTouchable> : null}
                        </View>
                    </View >
                )
        }
        return null
    }
}

const mapStateToProps = ({
    runtime_config: {
        runtime_config: {
            screens: {
                Cart_Index_06_1: {
                    CheckoutStyle,
                    CartInAddressCount,
                }
            },
            colors,
            styles,
        },
    },
}) => ({
    CartInAddressCount,
    CheckoutStyle,
    ...colors,
    ...styles,
})

export default connect(mapStateToProps)(CheckoutMethodSelector)