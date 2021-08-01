import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ValidateQRCode } from '../../services/CheckoutService';
import { LongToast } from '../../utils/Toast';
import ScreenLoadingIndicator from '../../partial_components/Common/ScreenLoadingIndicator';

class QRCodeReader extends Component {
	constructor(props) {
		super(props)

		this.state = {
			isFocused: false,
		}

		this.callback = this.props.route.params?.callback
		this.displayDrawer = !this.callback
	}

	componentDidMount() {
		this.unsubscribeFocusListener = this.props.navigation.addListener('focus', () => {
			this.setState({ isFocused: true })
		});

		this.unsubscribeBlurListener = this.props.navigation.addListener('blur', () => {
			this.setState({ isFocused: false })
		});
	}

	componentWillUnmount() {
		this.unsubscribeFocusListener && this.unsubscribeFocusListener()
		this.unsubscribeBlurListener && this.unsubscribeBlurListener()
	}

	onRead = ({ data }) => {
		const {
			callback,
		} = this

		if (callback) {
			this.props.navigation.goBack()
			callback(data)
		}
		else {
			this.setState({ isSubmitLocked: true })

			ValidateQRCode(data, res => {
				const { 
					Message, 
					OrderId,
				} = res.data

				if (Message) {
					LongToast(Message, false)
				}

				this.setState({ isSubmitLocked: false })
				this.props.navigation.navigate('Order', { Id: OrderId })
			}, err => {
				if (err.status === 400) {
					const { Message } = err.data
					this.setState({ isSubmitLocked: false })
					LongToast(Message, false)
					return true
				}
			})
		}
	}

	render () {
		const {
			isFocused
		} = this.state

		const {
			isSubmitLocked,
		} = this.state

		if (isSubmitLocked) {
			return (
				<ScreenLoadingIndicator
					message="CheckingQRCode" />
			)
		}
		else if (isFocused) {
			let PresentationalComponent = require('../../presentational_components/Common/QRCodeReader').default

			return (
				<PresentationalComponent
					onRead={this.onRead}
					submitLocked={isSubmitLocked}
					displayDrawer={this.displayDrawer}
					{...this.props} />
			)
		}
		else {
			return null
		}
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

export default connect(mapStateToProps)(QRCodeReader)