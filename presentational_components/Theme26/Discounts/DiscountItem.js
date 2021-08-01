import React from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'
import FontedText from '../../../partial_components/Common/FontedText';
import { shadowStyle2 } from '../../../constants/Style';
import CustomTouchable from '../../../partial_components/Common/CustomTouchable';
import QRCode from 'react-native-qrcode-svg';
import { withLocalize } from 'react-localize-redux';
import { formatDate } from '../../../utils/Date';

class DiscountItem extends React.Component {
    render() {
        const {
            item,
            textColor2,
            navigation,
            largePagePadding,
            bgColor1,
            translate,
        } = this.props

        const {
            OrderId: Id,
            Code,
            ApplyDate,
            ExpiryDate,
        } = item

        return (
            <CustomTouchable
                onPress={() => {
                    navigation.navigate('Discount', { Id })
                }}
                style={{
                    flexDirection: 'row',
                }}>
                <View
                    style={{
                        backgroundColor: bgColor1,
                        ...shadowStyle2
                    }}>    
                     <QRCode
                        size={90}
                        value={Code} />
                </View>

                <View
                    style={{
						flex: 1,
						paddingLeft: largePagePadding,
                        justifyContent: 'center',
                    }}>
                    <FontedText style={{ fontSize: 15, textAlign: 'left' }}>{Code}</FontedText>
                    <FontedText style={{ color: textColor2, fontSize: 15, textAlign: 'left' }}>{translate("ApplyDate")} {formatDate(ApplyDate)}</FontedText>
                    <FontedText style={{ color: textColor2, fontSize: 15, textAlign: 'left' }}>{translate("ExpiryDate")} {formatDate(ExpiryDate)}</FontedText>
                </View>
            </CustomTouchable>
        )
    }
}

const mapStateToProps = ({
    runtime_config: {
        runtime_config: {
            styles,
            colors,
        },
    },
}) => ({
    ...styles,
    ...colors,
})

export default connect(mapStateToProps)(withLocalize(DiscountItem))