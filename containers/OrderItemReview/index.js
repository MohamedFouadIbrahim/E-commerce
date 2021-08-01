import React, { Component } from 'react'
import { connect } from 'react-redux'
import { LongToast } from '../../utils/Toast';
import { AddReview, GetReview, GetOrderItems } from '../../services/OrderServices';

class AddOrderItem extends Component {

    constructor(props) {
        super(props)
        this.state = {
            lockSubmit: false,
            dataFitched: false,
            data: null
        }
        this.lockSubmit = false

        this.orderId = this.props.route.params?.Id
    }


    onSendReview = (data, onSucss, onFailure) => {
        AddReview(data, res => { onSucss && onSucss(res) }, err => { onFailure && onFailure(err) })
    }

    render() {

        let PresentationalComponent = null

        const {
            store_theme_id,
            ...restProps
        } = this.props

        switch (store_theme_id) {
            case 7:
                PresentationalComponent = require('../../presentational_components/Theme7/OrderItemReview').default
                break;
            case 26:
                PresentationalComponent = require('../../presentational_components/Theme26/OrderItemReview').default
                break;
            default:
                PresentationalComponent = require('../../presentational_components/Theme7/OrderItemReview').default
                break;
        }

        return (
            <PresentationalComponent
                submit={this.onSendReview}
                {...restProps}
            />
        )
    }
}

const mapStateToProps = ({

    runtime_config: {
        runtime_config: {
            screens: {
                Home_12_1,
            },
            themes: {
                store_theme_id,
            },
            colors,
            styles,
        },
    },
}) => ({
    ...Home_12_1,
    ...colors,
    ...styles,
    store_theme_id,
})

export default connect(mapStateToProps)(AddOrderItem)