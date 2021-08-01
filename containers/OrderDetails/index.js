import React, { Component } from 'react'
import { connect } from 'react-redux'
import { GetOrderSummaryDetails } from '../../services/OrderServices';

class OrderItemOne extends Component {
    constructor(props) {
        super(props)

        this.state = {
            data: {},
            didDataFitched: false
        }
        this.orderId = this.props.route.params?.Id
        this.summary = this.props.route.params?.summary
        
    }

    componentDidMount(Id = this.orderId) {
        GetOrderSummaryDetails(Id, res => {
            this.setState({
                data: { ...res.data, summary: this.summary },
                didDataFitched: true
            })
        })
    }

    render() {
        let PresentationalComponent = null

        const {
            store_theme_id,
            ...restProps
        } = this.props

        const { data, didDataFitched } = this.state

        switch (store_theme_id) {
            case 7:
                PresentationalComponent = require('../../presentational_components/Theme7/OrderDetails').default
                break;
            case 26:
                PresentationalComponent = require('../../presentational_components/Theme26/OrderDetails').default
                break;
            default:
                PresentationalComponent = require('../../presentational_components/Theme7/OrderDetails').default
                break;
        }

        if (!didDataFitched) {
            return null
        }

        return (
            <PresentationalComponent
                {...data}
                {...restProps} />
        )
    }
}

const mapStateToProps = ({
    runtime_config: {
        runtime_config: {
            themes: {
                store_theme_id,
            },
            colors,
            styles,
        },
    },
}) => ({
    store_theme_id,
    ...colors,
    ...styles,
})


export default connect(mapStateToProps)(OrderItemOne)