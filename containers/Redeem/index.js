import React, { Component } from 'react';
import { connect } from 'react-redux';
import { LongToast } from '../../utils/Toast';
import { RedeemNow } from '../../services/CustomerService';


class Redeem extends Component {
    constructor(props) {
        super(props)

        this.state = {
            Code: this.props.route.params?.Code ? this.props.route.params?.Code : null,
            lockSubmit: false
        }

        this.lockSubmit = false

    }

    onRedeemInputChange = (Code) => {
        this.setState({ Code })
    }

    onSubmitRedeem = () => {

        const onRefresh = this.props.route.params?.onRefresh

        if (this.lockSubmit) {
            return
        }

        const { Code } = this.state

        if (!Code) {
            return LongToast('CantHaveEmptyInputs')
        }

        this.lockSubmit = true
        this.setState({ lockSubmit: true })

        RedeemNow(Code, () => {
            this.lockSubmit = false
            this.setState({ lockSubmit: false })
            LongToast('DataSaved')
            onRefresh && onRefresh()
            this.props.navigation.goBack()

        }, () => {
            this.lockSubmit = false
            this.setState({ lockSubmit: false })
        })
    }

    render() {
        let PresentationalComponent = require('../../presentational_components/Common/Redeem').default

        return (
            <PresentationalComponent
                onSubmitRedeem={this.onSubmitRedeem}
                onRedeemInputChange={this.onRedeemInputChange}
                lockSubmit={this.state.lockSubmit}
                {...this.state}
                {...this.props}
            />
        )
    }
}

const mapStateToProps = ({
    runtime_config: {
        runtime_config: {
            colors,
            styles,
        },
    },
}) => ({
    ...colors,
    ...styles,

})


export default connect(mapStateToProps)(Redeem)