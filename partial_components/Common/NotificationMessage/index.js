import React from 'react';
import { View } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { connect } from 'react-redux';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import CustomTouchable from '../CustomTouchable';
import FontedText from '../FontedText';

const iconSize = 20
const NotifationMessage = ({ type, message, onClosse, shown = true, style, largePagePadding, smallBorderRadius, pagePadding }) => {

    let color, backgroundColor;

    switch (type) {
        case 'Sucsess':
            color = '#43A047';
            backgroundColor = '#C8E6C9';
            break;
        case 'Info':
            color = '#039BE5';
            backgroundColor = '#B3E5FC';
            break;
        case 'Erorr':
            color = '#ff0000';
            backgroundColor = '#ffb3b3';
            break;
        case 'Warning':
            color = '#FF8F00';
            backgroundColor = '#ffeb99';
            break;
    }

    if (!shown) {
        return null
    }

    return (
        <View style={[
            {
                borderRadius: smallBorderRadius,
                backgroundColor,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingHorizontal: largePagePadding,
                minHeight: 50, marginBottom: largePagePadding,
                marginLeft: largePagePadding,
                marginRight: largePagePadding
            }, style]}>

            {/* left bar */}
            <View style={{ left: 0, width: 6, height: '100%', backgroundColor: color, position: 'absolute', borderBottomLeftRadius: smallBorderRadius, borderTopLeftRadius: smallBorderRadius }}>
            </View>

            {/* icon and text */}
            <View style={{ flexDirection: 'row', alignItems: 'center', flex: 0.9, paddingVertical: pagePadding, }}>
                {
                    type == 'Erorr' ?
                        <AntDesign name={'closecircleo'} color={color} size={iconSize} style={{}} />
                        : type == 'Sucsess' ?
                            <AntDesign name={'checkcircleo'} color={color} size={iconSize} style={{}} />
                            : type == 'Warning' ?
                                <AntDesign name={'infocirlceo'} color={color} size={iconSize} style={{}} />
                                :
                                <AntDesign name={'infocirlceo'} color={color} size={iconSize} style={{}} />
                }
                <FontedText style={{ color, paddingHorizontal: (largePagePadding - 6 /* left bar width*/) }} >
                    {message}
                </FontedText>
            </View>

            {/* close button */}
            {onClosse && <CustomTouchable onPress={onClosse} style={{ flex: 0.1 }} >
                <AntDesign name='closecircleo' color={color} size={iconSize} />
            </CustomTouchable>}

        </View>)
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
export default connect(mapStateToProps)(NotifationMessage)