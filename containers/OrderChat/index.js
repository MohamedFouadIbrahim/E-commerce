import React, { Component } from 'react';
import { Linking, Platform } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import { connect } from 'react-redux';
import { withLocalize } from 'react-localize-redux';
import ConfirmModal from '../../partial_components/Common/ConfirmModal';
import CustomSelector from '../../partial_components/Common/CustomSelector';
import { GetChat, SendFile, SendMsg } from '../../services/OrderServices';
import { ChosseFile } from '../../utils/Files';
import { LongToast } from '../../utils/Toast';
import { showImagePicker } from '../../utils/Image';

class OrderChat extends Component {
	constructor(props) {
		super(props)

		this.state = {
			data: {},
			didFetchData: false,
			messages: [],
			uploadingFile: false
		}

		this.confirmRef = React.createRef()
		this.chosseImageFileRef = React.createRef()
		this.uploadingFile = false
		this.customerId = this.props.route.params?.CustomerId
		this.orderId = this.props.route.params?.orderId

	}

	uploadFile = (file) => {
		if (this.uploadingFile) {
			return
		}

		this.setState({ uploadingFile: true })
		this.uploadingFile = true

		SendFile(this.orderId, this.customerId, file, res => {
			const { Time, Message, Id, FileUrl } = res.data

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
		GetChat(this.orderId, res => {
			const newMssege = res.data.Data.Messages.map(item => {
				return {
					_id: item.Id,
					text: item.Message,
					FileUrl: item.FileUrl,
					createdAt: item.Time,
					user: {
						_id: item.User || this.customerId,
						avatar: res.data.Data.Tenant.Image.ImageUrl
					}
				}
			})

			this.setState({
				messages: newMssege,
				user: res.data.Data.User,
				CDNUrl: res.data.Data.CDNUrl,
				didFetchData: true
			})
		})
	}

	componentDidMount() {
		this.fetchData()
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

		SendMsg({
			Message: messages[0].text,
			OrderId: this.orderId,
			// CustomerId: this.customerId
		})
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
			this.confirmRef.current.show()

			this.file = {
				...data,
				name: data.uri
			}
		})
	}

	render() {
		let PresentationalComponent = null

		const {
			store_theme_id,
			translate,
			...restProps
		} = this.props

		const { didFetchData } = this.state

		switch (store_theme_id) {
			case 7:
				PresentationalComponent = require('../../presentational_components/Theme7/OrderChat').default
				break;
			case 26:
				PresentationalComponent = require('../../presentational_components/Theme26/OrderChat').default
				break;
			default:
				PresentationalComponent = require('../../presentational_components/Theme7/OrderChat').default
				break;
		}

		if (!didFetchData) {
			return null
		}

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
					messages={this.state.messages}
					onSendMsg={this.onSend}
					onTextPress={this.onTextPress}
					uploadFile={this.uploadFile}
					customerId={this.customerId}
					uploadingFile={this.state.uploadingFile}
					openPicker={this.pickFile}
					{...this.state}
					{...restProps} />
			</>
		)
	}
}

const mapStateToProps = ({
	runtime_config: {
		runtime_config: {
			themes: {
				store_theme_id,
			},
			colors,
			styles,
		},
	},
}) => ({
	store_theme_id,
	...colors,
	...styles,
})


export default withLocalize(connect(mapStateToProps)(OrderChat))