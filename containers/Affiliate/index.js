import React, { Component } from 'react';
import { connect } from 'react-redux';
import { LongToast } from '../../utils/Toast';
import { GetAffiliate } from '../../services/CustomerService';
import { ShareSomeThing } from '../../utils/Share';

class Affiliate extends Component {
    constructor(props) {
        super(props)

        this.state = {
            data: null,
            dataFetched: false
        }

        this.lockSubmit = false

    }

    componentDidMount() {
        GetAffiliate(res => {
            this.setState({ data: res.data, dataFetched: true })
        })
    }

    onSubmitAffiliate = () => {
        const { AppUrl } = this.props
        const {
            data: {
                Code
            },
            dataFetched
        } = this.state

        if (!dataFetched) {
            return LongToast('PleaseWait')
        }

        const url = `${AppUrl.Url}/r/${Code}`
        ShareSomeThing(url, url)
    }

    render() {
        let PresentationalComponent = require('../../presentational_components/Common/Affiliate').default

        const { data, dataFetched } = this.state

        if (!dataFetched) {
            return null
        }

        return (
            <PresentationalComponent
                onSubmitAffiliate={this.onSubmitAffiliate}
                lockSubmit={this.state.lockSubmit}
                {...data}
                {...this.props}
            />
        )
    }
}

const mapStateToProps = ({
    login: {
        Currency
    },
    runtime_config: {
        runtime_config: {
            colors,
            styles,
            AppUrl
        },
    },
}) => ({
    AppUrl,
    Currency,
    ...colors,
    ...styles,

})


export default connect(mapStateToProps)(Affiliate)