import React from 'react';
import { ActivityIndicator, I18nManager } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import AntDesign from 'react-native-vector-icons/AntDesign';
import ConfirmModal from '../../../partial_components/Common/ConfirmModal';
import CustomHeader from '../../../partial_components/Common/CustomHeader';
import FontedText from '../../../partial_components/Common/FontedText';
import LazyContainer from '../../../partial_components/Common/LazyContainer';
import { ChosseFile } from '../../../utils/Files';

class Chat extends React.Component {
    constructor(props) {

        super(props)

        this.confirmRef = React.createRef()

    }

    pickFile = () => {
        ChosseFile((file) => {
            this.confirmRef.current.show()
            this.file = file
        })
    }


    render() {

        return (
            <LazyContainer style={{ flex: 1 }} >
                <CustomHeader
                    title='Chat'
                    navigation={this.props.navigation}
                    rightComponent={
                        this.props.uploadingFile ? <ActivityIndicator size='small' color={this.props.textColor1} /> :
                            < AntDesign name='addfile' style={{ paddingHorizontal: 5 }} color={this.props.textColor1} onPress={this.pickFile} size={18} />
                    }
                />

                <GiftedChat
                    renderMessageText={(messa) => {
                        return (
                            <FontedText
                                onPress={() => { this.props.onTextPress(messa.currentMessage) }}
                                style={{ color: messa.currentMessage.user._id != this.props.customerId ? 'black' : 'white', textAlign: I18nManager.isRTL ? 'right' : 'left', textDecorationLine: messa.currentMessage.FileUrl ? 'underline' : 'none', marginHorizontal: 8, marginTop: 3, fontSize: 17 }} >
                                {messa.currentMessage.text}
                            </FontedText>
                        )
                    }}
                    messages={this.props.messages}
                    onSend={this.props.onSendMsg}
                    user={{
                        _id: this.props.customerId
                    }}
                />

                <ConfirmModal
                    ref={this.confirmRef}
                    onConfirm={() => this.props.uploadFile(this.file)}
                    onResponse={(check) => { }}
                />

            </LazyContainer>

        )
    }
}

export default Chat