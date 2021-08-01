import React, { Component } from 'react'
import { connect } from 'react-redux'
import { GetOrderItems } from '../../services/OrderServices';

class Order extends Component {
    constructor(props) {
        super(props)

        this.state = {
            data: {},
            didDataFitched: false
        }
        this.orderId = this.props.route.params?.Id
    }

    onGetOrderItems = (Id = this.orderId) => {
        GetOrderItems(Id, res => {
            this.setState({
                data: { ...this.state.data, ...res.data },
                didDataFitched: true
            })
        })
    }

    componentDidMount() {
        this.onGetOrderItems()
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
                PresentationalComponent = require('../../presentational_components/Theme7/OrderItems').default
                break;
            case 26:
                PresentationalComponent = require('../../presentational_components/Theme26/OrderItems').default
                break;
            default:
                PresentationalComponent = require('../../presentational_components/Theme7/OrderItems').default
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
    login: {
        Currency
    },
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
    Currency,
    store_theme_id,
    ...colors,
    ...styles,
})


export default connect(mapStateToProps)(Order)