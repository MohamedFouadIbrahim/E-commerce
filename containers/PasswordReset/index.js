import React, { Component } from 'react'
import { Keyboard } from 'react-native';
import { connect } from 'react-redux'
import { ForgetPasswod } from '../../services/RegistrationService';
import { isValidEmail, isValidMobileNumber } from '../../utils/Validation';
import { LongToast } from '../../utils/Toast';
import { withLocalize } from 'react-localize-redux';

class ResetPassword extends Component {
    constructor() {
		super()
		
        this.state = {
            isSubmitLocked: false
        }
        this.isSubmitLocked = false
    }

    submit = (data) => {

        if (this.isSubmitLocked) {
            return
        }

        const { country_id, countries } = this.props

        const {
            Email,
            Password,
            PhoneCountry = countries.find(item => item.Id === country_id)
        } = data;
        let { Phone } = data;
        const { SigninInput } = this.props;
        const isMethodPhone = SigninInput.Value === 2

        Keyboard.dismiss()

        if ((isMethodPhone && !Phone) || (!isMethodPhone && !Email)) {
            LongToast('CantHaveEmptyInputs')
            return;
        }

        let AccountLogin

        if (isMethodPhone) {
            if (PhoneCountry) {
                Phone = (Phone[0] === "0") ? Phone.substr(1) : Phone;
                AccountLogin = `${PhoneCountry.PhoneCode}${Phone}`

                if (!Phone || !isValidMobileNumber(AccountLogin)) {
                    LongToast('InvalidPhone')
                    return;
                }
            }
            else {
                LongToast('InvalidPhone')
                return;
            }
        }
        else {
            if (!isValidEmail(Email)) {
                LongToast('InvalidEmail')
                return;
            }

            AccountLogin = Email
        }


        this.setState({ isSubmitLocked: true })
        this.isSubmitLocked = true

        ForgetPasswod(AccountLogin, res => {

            this.setState({ isSubmitLocked: false })
            this.isSubmitLocked = false

            this.props.navigation.navigate('PasswordVaildation', { Email })
        }, (err) => {

            this.setState({ isSubmitLocked: false })
            this.isSubmitLocked = false

            if (err.status == 404) {
                isMethodPhone ? LongToast('PhoneNotFound') : LongToast('EmailNotFound') 
                return 
            }

        })
    }

    render() {
        const {
            auth_theme_id,
            ...restProps
        } = this.props

        let PresentationalComponent = null

		switch (auth_theme_id) {
            case 7:
                PresentationalComponent = require('../../presentational_components/Theme7/PasswordReset').default
                break;
            case 26:
                PresentationalComponent = require('../../presentational_components/Theme26/PasswordReset').default
                break;
            default:
                PresentationalComponent = require('../../presentational_components/Theme7/PasswordReset').default
                break;
        }

        return (

            <PresentationalComponent
                onSubmit={this.submit}
                submitLocked={this.state.isSubmitLocked}
                {...restProps}
            />

        )
    }
}

const mapStateToProps = ({
    places: {
        countries,
    },
    login: {
        country_id,
    },
    runtime_config: {
        runtime_config: {
            themes: {
                auth_theme_id,
            },
            screens: {
				Signin_02_3: {
					SigninInput,
				},
				Password_Reset_1_02_5,
            },
            colors,
            styles,
        },
    },
}) => ({
    countries,
    country_id,
    auth_theme_id,
	...Password_Reset_1_02_5,
	SigninInput,
    ...colors,
    ...styles,

})

export default withLocalize(connect(mapStateToProps, undefined, undefined)(ResetPassword))