import React, { Component } from 'react'
import { connect } from 'react-redux'
import { GetCustomerCompleteProfile, EditCustomerCompleteProfile } from '../../services/CustomerService';
import { LongToast } from '../../utils/Toast';
import { isValidEmail, isValidMobileNumber } from '../../utils/Validation';
import { parsePhone } from '../../utils/Phone';

class CompleteProfile extends Component {
	constructor() {
		super()

		this.state = {
			lockSubmit: false,
			didFetchData: false,
		}

		this.lockSubmit = false
	}

	componentDidMount() {
		GetCustomerCompleteProfile(res => {
			let {
				Phone,
			} = res.data

			let PhoneCountry

			const {
				fullName: FullName,
			} = res.data

			if (Phone) {
				const parsedPhone = parsePhone(Phone)

				Phone = parsedPhone.NationalNumber
				PhoneCountry = parsedPhone.NumberCountry
			}
			else {
				const {
					country_id
				} = this.props

				PhoneCountry = country_id
			}

			this.setState({
				data: {
					...res.data,
					FullName,
					Phone,
					PhoneCountry,
				},
				didFetchData: true
			})
		})
	}

	skip = () => {
		const { setCompleteProfile } = this.props
		setCompleteProfile(true)
	}

	submit = (data) => {
		if (this.lockSubmit) {
			return
		}

		const { setCompleteProfile, setUserName } = this.props

		let { Phone, PhoneCountry, fullName, Birthday, Email } = data
		let FullPhone = ""

		if (Phone && Phone.length) {
			Phone = (Phone[0] === "0") ? Phone.substr(1) : Phone;
			FullPhone = `${PhoneCountry.PhoneCode}${Phone}`

			if (!isValidMobileNumber(FullPhone)) {
				LongToast('InvalidPhone')
				return;
			}
		}

		if (Email && Email.length) {
			if (!isValidEmail(Email)) {
				LongToast('InvalidEmail')
				return;
			}
		}

		this.setState({ lockSubmit: true })
		this.lockSubmit = true

		EditCustomerCompleteProfile({
			Email,
			Phone: FullPhone,
			fullName,
			Birthday
		}, res => {
			this.setState({ lockSubmit: false })
			this.lockSubmit = false

			setUserName(fullName)
			setCompleteProfile(true)
			
		}, err => {
			this.setState({ lockSubmit: false })
			this.lockSubmit = false

		})
	}

	render() {
		if (!this.state.didFetchData) {
			return null
		}

		const {
			auth_theme_id,
			...restProps
		} = this.props

		let PresentationalComponent = null

		switch (auth_theme_id) {
			case 7:
				PresentationalComponent = require('../../presentational_components/Theme7/CompleteProfile').default
				break;
			case 26:
				PresentationalComponent = require('../../presentational_components/Theme26/CompleteProfile').default
				break;
			default:
				PresentationalComponent = require('../../presentational_components/Theme7/CompleteProfile').default
				break;
		}
		return (
			<PresentationalComponent
				submitLocked={this.state.lockSubmit}
				data={this.state.data}
				submit={this.submit}
				skip={this.skip}
				{...restProps}
			/>
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
	login: {
		country_id,
	},
}) => ({
	auth_theme_id,
	country_id,
	...colors,
	...styles,
})

function mergeProps(stateProps, { dispatch }, ownProps) {
	const {
		actions: {
			setCompleteProfile,
			setUserName
		}
	} = require('../../redux/LoginRedux.js');

	return {
		...ownProps,
		...stateProps,
		setCompleteProfile: (completed_profile) => setCompleteProfile(dispatch, completed_profile),
		setUserName: (user_name) => setUserName(dispatch, user_name)
	};
}

export default connect(mapStateToProps, undefined, mergeProps)(CompleteProfile)