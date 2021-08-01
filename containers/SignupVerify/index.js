import React, { Component } from 'react'
import { Keyboard } from 'react-native'
import { connect } from 'react-redux'
import { SignupPhoneVerify } from '../../services/RegistrationService';
import { LongToast } from '../../utils/Toast';

class SignupVerify extends Component {
	constructor () {
		super ()

		this.state = {}
		
		this.lockSubmit = false
	}

	submit = (code) => {
		if (this.lockSubmit) {
			return
		}

		Keyboard.dismiss()

		if (!code) {
			LongToast('CantHaveEmptyInputs')
			return;
		}

		this.setState({ isSubmitLocked: true })
		this.lockSubmit = true

		SignupPhoneVerify(this.props.route.params?.CustomerId, code,
			res => {
				if (res.data === true) {
					const onSuccess = this.props.route.params?.onSuccess
					onSuccess && onSuccess()
				}
				else {
					this.setState({ isSubmitLocked: false })
					this.lockSubmit = false

					LongToast('NotValildCode')
				}
			}, err => {
				this.setState({ isSubmitLocked: false })
				this.lockSubmit = false

				if (err.status === 404) {
					LongToast('NotValildCode')
					return true
				}
			})
	}

	render () {
		const {
			auth_theme_id,
			...restProps
		} = this.props

		let PresentationalComponent = null

		switch (auth_theme_id) {
			case 7:
				PresentationalComponent = require('../../presentational_components/Theme7/SignupVerify').default
				break;
			case 26:
				PresentationalComponent = require('../../presentational_components/Theme26/SignupVerify').default
				break;
			default:
				PresentationalComponent = require('../../presentational_components/Theme7/SignupVerify').default
				break;
		}

		return (
			<PresentationalComponent
				submit={this.submit}
				submitLocked={this.state.isSubmitLocked}
				{...restProps} />
		)
	}
}

const mapStateToProps = ({
	runtime_config: {
		runtime_config: {
			themes: {
				auth_theme_id,
			},
			colors,
			styles,
		},
	},
}) => ({
	auth_theme_id,
	...colors,
	...styles,
})

export default connect(mapStateToProps)(SignupVerify)