import React, { Component } from 'react'
import { connect } from 'react-redux'
import { PasswordReset } from '../../services/RegistrationService';
import { isValidPassword, } from '../../utils/Validation';
import { LongToast } from '../../utils/Toast';
import { withLocalize } from 'react-localize-redux';

class ForgetPassword extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isSubmitLocked: false
        }
        this.isSubmitLocked = false
        this.Email = this.props.route.params?.Email
        this.Code = this.props.route.params?.Code
    }

    submit = (password, confirmPassword) => {

        const { isSubmitLocked } = this.state

        if (isSubmitLocked) {
            return
        }

        if (!password || !confirmPassword) {
            return LongToast('CantHaveEmptyInputs')
        }

        if (password.length < 6) {
            LongToast('TooShortPassword')
            return;
        }

        if (!isValidPassword(password)) {
            return LongToast('InvalidPasswordFormat')
        }

        if (password !== confirmPassword) {
            return LongToast('PassDontMatch')
        }

        this.isSubmitLocked = true
        this.setState({ isSubmitLocked: true })

        PasswordReset(this.Email, this.Code, password, res => {

            this.isSubmitLocked = false
            this.setState({ isSubmitLocked: false })
            LongToast('PasswordHasBeenResetSuccessfully')
            this.props.navigation.navigate('Login')

        }, err => {
            this.isSubmitLocked = false
            this.setState({ isSubmitLocked: false })
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
                PresentationalComponent = require('../../presentational_components/Theme7/PasswordForget').default
                break;
            case 26:
                PresentationalComponent = require('../../presentational_components/Theme26/PasswordForget').default
                break;
            default:
                PresentationalComponent = require('../../presentational_components/Theme7/PasswordForget').default
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
    runtime_config: {
        runtime_config: {
            themes: {
                auth_theme_id,
            },
            // screens: {
            //     Home_12_1,
            // },
            colors,
            styles,
        },
    },
}) => ({
    auth_theme_id,
    ...colors,
    ...styles,

})

export default withLocalize(connect(mapStateToProps)(ForgetPassword))