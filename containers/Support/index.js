import React, { Component } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import { connect } from 'react-redux';
import { Linking } from 'react-native';
import ConfirmModal from '../../partial_components/Common/ConfirmModal';
import CustomSelector from '../../partial_components/Common/CustomSelector';
import { GetChat, SendFile, SendMsg } from '../../services/CustomerService';
import { ChosseFile } from '../../utils/Files';
import { LongToast } from '../../utils/Toast';
import { showImagePicker } from '../../utils/Image';
import { withLocalize } from 'react-localize-redux';

class Support extends Component {
    constructor(props) {

        super(props)

        this.state = {
            data: {},
            didDataFitched: false,
            messages: [],
            uploadingFile: false
        }

        this.customerId = this.props.userId
        this.confirmRef = React.createRef()
        this.chosseImageFileRef = React.createRef()

    }


    uploadFile = (file) => {

        if (this.uploadingFile) {
            return
        }

        this.setState({ uploadingFile: true })
        this.uploadingFile = true
        SendFile(this.customerId, file, res => {

            const { Time, Message, User, Id, FileUrl, CustomerId } = res.data

            this.setState(previousState => ({
                messages: GiftedChat.append(previousState.messages, [{
                    createdAt: Time,
                    text: Message,
                    _id: Id,
                    user: { _id: this.customerId },
                    FileUrl
                }]),
            }))

            this.setState({ uploadingFile: false })
            this.uploadingFile = false

        }, err => {

            this.setState({ uploadingFile: false })
            this.uploadingFile = false
            LongToast('FileTypeNotSupported')

        })
    }

    fetchData = () => {
        GetChat(res => {
            const newMssege = res.data.Data.Messages.map(item => {
                let user = {}
                if (res.data.Data.Tenant) {
                    user = {
                        _id: item.User || this.customerId,
                        avatar: res.data.Data.Tenant.Image.ImageUrl
                    }
                } else {
                    user = {
                        _id: item.User || this.customerId,
                    }
                }
                return {
                    _id: item.Id,
                    text: item.Message,
                    FileUrl: item.FileUrl,
                    createdAt: item.Time,
                    user: user
                }
            })

            this.setState({
                messages: newMssege,
                user: res.data.Data.User,
                CDNUrl: res.data.Data.CDNUrl,
                didDataFitched: true
            })

        })
    }

    componentDidMount() {
        this.fetchData()
        this.focusEvent = this.props.navigation.addListener('focus', () => {
            this.fetchData()
        })
    }

    componentWillUnmount() {
        this.focusEvent()
    }
    
    onTextPress = (currentMessage) => {

        if (currentMessage.FileUrl) {

            Linking.openURL(`${this.state.CDNUrl}${currentMessage.FileUrl}`)
        }

    }

    onSend = (messages = []) => {

        this.setState(previousState => ({
            messages: GiftedChat.append(previousState.messages, messages),
        }))

        SendMsg({ Message: messages[0].text })

    }

    pickFile = () => {
        if (Platform.OS == 'android') {
            this.selectfile()
        } else {
            this.chosseImageFileRef.current.show();
        }
    }

    selectfile = () => {
        ChosseFile((file) => {
            this.confirmRef.current.show()
            this.file = file
        })
    }

    selectImage = () => {
        showImagePicker((data) => {
            //    return alert(JSON.stringify(data))
            this.confirmRef.current.show()

            this.file = { ...data, name: data.uri };
        })
    }

    render() {
        let PresentationalComponent = null

        const {
            translate,
            ...restProps
        } = this.props

        PresentationalComponent = require('../../presentational_components/Common/Support').default

        return (
            <>
                <ConfirmModal
                    ref={this.confirmRef}
                    onConfirm={() => {
                        this.uploadFile(this.file)
                    }}
                    onResponse={(check) => { }}
                />

                <CustomSelector
                    ref={this.chosseImageFileRef}
                    options={[{ Id: 0, Name: translate('Image') }, { Id: 1, Name: translate('File') }].map(item => item.Name)}
                    onSelect={(index) => {
                        if (index == 0) {
                            this.selectImage()
                        } else {
                            this.selectfile()
                        }
                    }}
                    onDismiss={() => { }}
                />

                <PresentationalComponent
                    CDNUrl={this.state.CDNUrl}
                    uploadingFile={this.state.uploadingFile}
                    uploadFile={this.uploadFile}
                    onTextPress={this.onTextPress}
                    messages={this.state.messages}
                    onSendMsg={this.onSend}
                    customerId={this.customerId}
                    openPicker={this.pickFile}
                    {...restProps} />
            </>
        )
    }
}

const mapStateToProps = ({
    login: {
        userId
    },
    runtime_config: {
        runtime_config: {
            colors,
            styles,
        },
    },
}) => ({
    userId,
    ...colors,
    ...styles,
})

export default withLocalize(connect(mapStateToProps)(Support))