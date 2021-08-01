import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import CustomTouchable from '../../../partial_components/Common/CustomTouchable';
import FontedText from '../../../partial_components/Common/FontedText';
import { formatDate } from '../../../utils/Date';

export default class OrderListItem extends React.Component {

    render() {

        const {
            Item,
            onOrderPress,
            pagePadding
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
                onPress={ ()=> {onOrderPress && onOrderPress()}}
            >
                <FontedText style={{ alignSelf: 'flex-end', }} >{formatDate(LastMessageDate)}</FontedText>

                <FontedText style={{ color: 'black', alignSelf: 'center', marginVertical: pagePadding }} > {OrderCode}</FontedText>

                <FontedText style={{ alignSelf: 'center', fontWeight: 'bold' }} >{Name}</FontedText>

                <FontedText numberOfLines={2} ellipsizeMode='tail' style={{ alignSelf: 'center', marginTop: 5 }} >{LastMessageText}</FontedText>

                {ShowAlert && <LinearGradient
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    colors={['#ECF0F5', '#CCD6E6']}
                    style={{
                        height: 10,
                        width: 10,
                        borderRadius: 5,
                        alignSelf: 'flex-end',
                        marginTop: 5
                    }} />}

            </CustomTouchable>
        )
    }

}