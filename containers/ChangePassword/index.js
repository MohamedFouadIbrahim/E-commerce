import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ChangeCustomerPassword } from '../../services/CustomerService';
import { LongToast } from '../../utils/Toast';
import { isValidPassword } from '../../utils/Validation';

class ChangePassword extends Component {
    constructor(props) {
        super(props)

        this.state = {
            dataFitched: false,
            lockSubmit: false
        }

        this.lockSubmit = false

        if (this.props.route.params && this.props.route.params?.Id) {
            this.Id = this.props.route.params?.Id
        }
    }

    submitChangePassword = (data) => {
        if (this.lockSubmit) {
            return
        }
        const {
            password,
            confirmPassword,
            Id
        } = data

        if (!password || !confirmPassword) {
            LongToast('CantHaveEmptyInputs')
            return
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

       
        this.lockSubmit = true
        this.setState({ lockSubmit: true })

        ChangeCustomerPassword(Id, password, () => {

            this.lockSubmit = false
            this.setState({ lockSubmit: false })
            LongToast('PasswordChanged')

        }, () => {

            this.lockSubmit = false
            this.setState({ lockSubmit: false })

        })
    }

    render() {
        let PresentationalComponent = require('../../presentational_components/Common/ChangePassword').default

        return (
            <PresentationalComponent
                Id={this.Id}
                lockSubmit={this.state.lockSubmit}
                ChangePassword={this.submitChangePassword}
                {...this.props} />
        )
    }
}

const mapStateToProps = ({
    runtime_config: {
        runtime_config: {
            screens: {
                Home_12_1,
            },
            colors,
            styles,
        },
    },
}) => ({
    ...Home_12_1,
    ...colors,
    ...styles,
})

export default connect(mapStateToProps)(ChangePassword)