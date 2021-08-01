import React, { Component } from 'react'
import { connect } from 'react-redux'
import { GetOrderHistory } from '../../services/OrderServices';
import { withLocalize } from 'react-localize-redux';

class OrderTrackingHistory extends Component {
    constructor(props) {
        super(props)

        this.state = {
            data: {},
            didFetchData: false
        }

        this.orderId = this.props.route.params?.Id
    }

    componentDidMount() {
        GetOrderHistory(this.orderId, this.props.mainColor, (res, formatted_data) => {
            this.setState({
                data: {
                    timeline_data: formatted_data
                },
                didFetchData: true
            })
        })
    }

    render() {
        let PresentationalComponent = null

        const {
            store_theme_id,
            ...restProps
        } = this.props

        const {
            data,
            didFetchData,
        } = this.state

        switch (store_theme_id) {
            case 7:
                PresentationalComponent = require('../../presentational_components/Theme7/OrderTrackingHistory').default
                break;
            case 26:
                PresentationalComponent = require('../../presentational_components/Theme26/OrderTrackingHistory').default
                break;
            default:
                PresentationalComponent = require('../../presentational_components/Theme7/OrderTrackingHistory').default
                break;
        }

        if (didFetchData) {
            return (
                <PresentationalComponent
                    {...data}
                    {...restProps} />
            )
        }
        else {
            return null
        }
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


export default connect(mapStateToProps)(withLocalize(OrderTrackingHistory))