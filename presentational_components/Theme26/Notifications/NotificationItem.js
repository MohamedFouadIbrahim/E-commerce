import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { View } from 'react-native'
import FontedText from '../../../partial_components/Common/FontedText';
import LinearGradient from 'react-native-linear-gradient';
import { formatDate, formatTime } from '../../../utils/Date';
import CustomTouchable from '../../../partial_components/Common/CustomTouchable';

class NotificationItem extends PureComponent {
    render() {
        const {
            item,
            onPress,
            textColor2,
            ...restProps
        } = this.props

        return (
            <CustomTouchable
                onPress={() => { onPress(item) }}
                {...restProps}>
                <View
                    style={{
                        flex: 1,
                        alignItems: 'center',
                    }}>
                    <LinearGradient
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        colors={[
                            item.notificationType.Color ? item.notificationType.Color : 'transparent',
                            item.notificationType.Color ? item.notificationType.Color : 'transparent'
                        ]}
                        style={{
                            height: 10,
                            width: 10,
                            borderRadius: 5,
                        }} />
                </View>

                <View style={{ flex: 6, }}>
                    <FontedText style={{ fontSize: 16, paddingTop: 0, }}>{item.Title}</FontedText>
                    <FontedText style={{ color: textColor2 }}>{item.Body}</FontedText>
                </View>

                <View
                    style={{
                        flex: 3,
                        alignItems: 'center',
                    }}>
                    <View
                        style={{
                            alignItems: 'flex-start',
                            marginHorizontal: 20,
                            justifyContent: 'center'
                        }}>
                        <FontedText numberOfLines={2} style={{ color: textColor2, paddingTop: 0, fontSize: 13, textAlign: 'center' }}>{formatDate(item.ReadDate)}</FontedText>
                        <FontedText numberOfLines={2} style={{ color: textColor2, paddingTop: 0, fontSize: 13, textAlign: 'center' }}>{formatTime(item.ReadDate)}</FontedText>
                    </View>
                </View>
            </CustomTouchable>
        )
    }
}

const mapStateToProps = ({
    runtime_config: {
        runtime_config: {
            colors,
        },
    },
}) => ({
    ...colors,
})

export default connect(mapStateToProps)(NotificationItem)