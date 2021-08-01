import React from 'react';
import { I18nManager } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import FontedText from '../../Common/FontedText';
import { connect } from 'react-redux';
import { TrimText } from '../../../utils/Text';

class CustomChat extends React.Component {

    constructor(props) {
        super(props)
    }

    handelFileUrl = (currentMessage) => {
        if (currentMessage.FileUrl) {
            return TrimText(currentMessage.text, 20)
        } else {
            return currentMessage.text
        }
    }

    checkingImage = (items) => {
        const { CDNUrl } = this.props
        if(!items.FileUrl) { 
            return null
        }
        if (items.FileUrl.endsWith('.png') || items.FileUrl.endsWith('.jpg') || items.FileUrl.endsWith('.PNG') || items.FileUrl.endsWith('.JPG')) {
            return `${CDNUrl + items.FileUrl}`
        } else {
            return null
        }
    }

    render() {
        const { onTextPress, reseverId, onSendMsg, messages, ...resProps } = this.props

        return (
            <GiftedChat
                {...resProps}
                renderMessageText={(MSG) => {
                    return (
                        <FontedText
                            onPress={() => { onTextPress && onTextPress(MSG.currentMessage) }}
                            style={{
                                color: MSG.currentMessage.user._id != reseverId ? 'black' : 'white',
                                textAlign: I18nManager.isRTL ? 'right' : 'left',
                                textDecorationLine: MSG.currentMessage.FileUrl ? 'underline' : 'none',
                                marginHorizontal: 8,
                                marginTop: 3,
                                fontSize: 17
                            }} >
                            {this.handelFileUrl(MSG.currentMessage)}
                        </FontedText>
                    )
                }}
                messages={messages.map(items => ({
                    ...items,
                    image: this.checkingImage(items)
                }))}
                onSend={(newMessages) => { onSendMsg && onSendMsg(newMessages) }}
                user={{ _id: reseverId }}
            />
        )
    }
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

export default connect(mapStateToProps)(CustomChat)