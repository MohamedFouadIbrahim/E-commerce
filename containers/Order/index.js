import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CancelOrder, GetOrderItems, GetOrderSummary, GetOrderSummaryDetails } from '../../services/OrderServices';
import { LongToast } from '../../utils/Toast';
import ConfirmModal from '../../partial_components/Common/ConfirmModal';

class Order extends Component {
    constructor(props) {
        super(props)

        this.state = {
            data: {},
            didDataFitched: false
        }
        this.orderId = this.props.route.params?.Id
        this.cancelOrederConfirmRef = React.createRef()
    }

    onGetOrderItems = (Id = this.orderId) => {
        GetOrderItems(Id, res => {
            this.setState({
                data: { ...this.state.data, ...res.data }
            })
        })
    }

    onGetOrderSummary = (Id = this.orderId) => {
        GetOrderSummary(Id, res => {
            this.setState({
                data: { ...this.state.data, ...res.data }
            })
        })
    }

    onGetOrderSummaryDetails = (Id = this.orderId) => {
        GetOrderSummaryDetails(Id, res => {
            this.setState({
                data: { ...this.state.data, ...res.data }
            })
        })
    }

    componentDidMount() {
        GetOrderSummary(this.orderId, (summaryResponce) => {
            GetOrderSummaryDetails(this.orderId, (summaryDetailsResponce) => {
                this.setState({
                    data: {
                        ...this.state.data,
                        ...summaryDetailsResponce.data,
                        ...summaryResponce.data,
                        canCancelOrder: summaryResponce.data.OrderCreatedFromInMins < this.props.TimeToCancleOrder.Value
                    },
                    didDataFitched: true
                })
            })
        })
    }

    ShowConfirm = () => { this.cancelOrederConfirmRef.current.show() }
    
    onCancelOrder = () => {

        const { data } = this.state

        if (data.canCancelOrder) {

            CancelOrder(this.orderId, res => {

                LongToast('DataSaved');
                this.props.navigation.goBack()

            }, err => {

                if (err.status == 400) {
                    LongToast(err.data.Message)
                    return true
                }
            })
        } else {

            LongToast('CantCancelOrder');

        }
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
                PresentationalComponent = require('../../presentational_components/Theme7/Order').default
                break;
            case 26:
                PresentationalComponent = require('../../presentational_components/Theme26/Order').default
                break;
            default:
                PresentationalComponent = require('../../presentational_components/Theme7/Order').default
                break;
        }

        if (!didDataFitched) {
            return null
        }

        return (
            <>
                <PresentationalComponent
                    onCancelOrder={this.ShowConfirm}
                    {...data}
                    {...restProps}
                />

                <ConfirmModal
                    ref={this.cancelOrederConfirmRef}
                    onConfirm={() => {this.onCancelOrder()}}
                    onResponse={(check) => { }}
                />

            </>
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
            screens: {
                Cart_Index_06_1: {
                    TimeToCancleOrder
                },
                Home_12_1: {
					IsUnifiedInbox
				}
            }
        },
    },
}) => ({
    IsUnifiedInbox,
    Currency,
    store_theme_id,
    TimeToCancleOrder,
    ...colors,
    ...styles,
})


export default connect(mapStateToProps)(Order)