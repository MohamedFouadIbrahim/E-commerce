import React, { Component } from 'react'
import { View } from 'react-native';
import { connect } from 'react-redux'
import { ValidateResetToken } from '../../services/RegistrationService';
import { LongToast } from '../../utils/Toast';
import { withLocalize } from 'react-localize-redux';


class ValidationPassword extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isSubmitLocked: false
        }
        this.isSubmitLocked = false

        this.Email = this.props.route.params?.Email
    }

    submit = (token) => {

        if (this.isSubmitLocked) {
            return
        }

        this.setState({ isSubmitLocked: true })
        this.isSubmitLocked = true

        ValidateResetToken(this.Email, token, res => {

            this.setState({ isSubmitLocked: false })
            this.isSubmitLocked = false

            this.props.navigation.navigate('PasswordForget', { Email: this.Email, Code: token })
        }, (res) => {
            this.setState({ isSubmitLocked: false })
            this.isSubmitLocked = false
            if (res.status == 404) {
                return LongToast('NotValildCode')
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
                PresentationalComponent = require('../../presentational_components/Theme7/PasswordVaildation').default
                break;
            case 26:
                PresentationalComponent = require('../../presentational_components/Theme26/PasswordVaildation').default
                break;
            default:
                PresentationalComponent = require('../../presentational_components/Theme7/PasswordVaildation').default
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

export default withLocalize(connect(mapStateToProps)(ValidationPassword))