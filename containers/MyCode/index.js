import React, { Component } from 'react'
import { connect } from 'react-redux'
import { LongToast } from '../../utils/Toast';
import ScreenLoadingIndicator from '../../partial_components/Common/ScreenLoadingIndicator';
import { GetMyCode } from '../../services/CustomerService';

class MyCode extends Component {
    constructor(props) {
        super(props)

        this.state = {
            dataFetched: false,
            width: 0,
            height: 0
        }
    }

    componentDidMount() {
        GetMyCode(res => {
            this.setState({ data: res.data, dataFetched: true })
            LongToast()
            console.log(this.props.user_data, false)
        })
    }
    render() {
        const {
            dataFetched
        } = this.state


        if (!dataFetched) {
            return (
                <ScreenLoadingIndicator
                />
            )
        }
        else {
            let PresentationalComponent = require('../../presentational_components/Common/MyCode').default

            return (
                <PresentationalComponent
                    data={this.state.data}
                    {...this.props} />
            )
        }
    }
}

const mapStateToProps = ({
    login: {
        user_data
    },
    runtime_config: {
        runtime_config: {
            styles,
            colors,
        },
    },
}) => ({
    ...styles,
    ...colors,
    user_data,
})

export default connect(mapStateToProps)(MyCode)