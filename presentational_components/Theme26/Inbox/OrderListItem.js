import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import CustomTouchable from '../../../partial_components/Common/CustomTouchable';
import FontedText from '../../../partial_components/Common/FontedText';
import { formatDate } from '../../../utils/Date';
import { TrimText } from '../../../utils/Text';
import { View } from 'react-native';

export default class OrderListItem extends React.Component {

    render() {

        const {
            Item,
            onOrderPress,
            pagePadding,
            textColor1,
            textColor2,
            FontSize
        } = this.props
        const {
            Order: { Name, OrderCode },
            LastMessageText,
            LastMessageDate,
            ShowAlert
        } = Item

        return (
            <CustomTouchable
                style={{ paddingHorizontal: pagePadding, paddingVertical: pagePadding }}
                onPress={() => { onOrderPress && onOrderPress() }}
            >
                <View style={{ justifyContent: 'space-between', flexDirection: 'row' }} >

                    <FontedText ellipsizeMode='tail' style={{ color: textColor1 }} >{TrimText(Name, 25)}</FontedText>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }} >
                        <FontedText>{formatDate(LastMessageDate)}</FontedText>

                        {ShowAlert && <LinearGradient
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                            colors={['#108ebc', '#0e7ca4']}
                            style={{
                                height: 10,
                                width: 10,
                                borderRadius: 5,
                                alignSelf: 'flex-end',
                                marginHorizontal: 5,
                                marginBottom: 5
                            }} />}
                    </View>

                </View>

                <FontedText numberOfLines={2} ellipsizeMode='tail' style={{ marginTop: 15, fontWeight: ShowAlert ? 'bold' : 'normal', color: textColor1 }} >{LastMessageText}</FontedText>

            </CustomTouchable>
        )
    }

}