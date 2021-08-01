import React, { Component } from 'react'
import { connect } from 'react-redux'
import { QuickOrderCommissionViaQRCode } from '../../services/CheckoutService';
import { LongToast } from '../../utils/Toast';

class CommissionQRCode extends Component {
	constructor(props) {
		super(props)

		this.state = {
			isFocused: false,
			showAmountModal: false,
			showSuccessModal: false,
			code: null
		}
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
		this.setState({ showAmountModal: true, code: data })
	}

	onSubmit = (amount) => {
		this.setState({ isSubmitLocked: true, })
		const { code } = this.state
		QuickOrderCommissionViaQRCode(code, amount, res => {
			this.setState({ isSubmitLocked: false, showAmountModal: false, showSuccessModal: true })
		}, err => {
			this.setState({ isSubmitLocked: false, showAmountModal: false })
			if (err.status === 400) {
				const { Message } = err.data
				LongToast(Message, false)
				return true
			}
		})
	}

	openAmountModal = (value) => {
		this.setState({ showAmountModal: value })
	}

	openSuccessModal = (value) => {
		this.setState({ showSuccessModal: value })
	}
	render() {
		const {
			isFocused
		} = this.state

		const {
			isSubmitLocked,
		} = this.state

		if (isFocused) {
			let PresentationalComponent = require('../../presentational_components/Common/CommissionQRCode/index.js').default

			return (
				<PresentationalComponent
					onRead={this.onRead}
					onSubmit={this.onSubmit}
					submitLocked={isSubmitLocked}
					openAmountModal={this.openAmountModal}
					showAmountModal={this.state.showAmountModal}
					openSuccessModal={this.openSuccessModal}
					showSuccessModal={this.state.showSuccessModal}
					isSubmitLocked={this.state.isSubmitLocked}
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

export default connect(mapStateToProps)(CommissionQRCode)