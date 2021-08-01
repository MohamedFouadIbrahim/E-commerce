import React, { Component } from 'react'
import { connect } from 'react-redux'
import { LongToast } from '../../utils/Toast';
import { GetQuestionById, AskQuestion, ProductQuestions } from '../../services/QuestionService';


class AddProudctQuetions extends Component {
    constructor(props) {
        super(props)
        this.state = {
            lockSubmit: false,
            dataFitched: false
        }
        this.lockSubmit = false

        this.ProductId = this.props.route.params?.Id
        this.Product = this.props.route.params?.Product

    }

    onAsk = (QuestionText) => {

        if (this.state.lockSubmit) {
            return
        }

        if (!QuestionText) {
            return LongToast('PleaseWriteAQuestion')
        }


        this.setState({ lockSubmit: true })
        this.lockSubmit = true


        AskQuestion({
            Id: 0,
            QuestionText,
            ProductId: this.ProductId
        }, res => {

            this.setState({ lockSubmit: false })
            this.lockSubmit = false

            if (this.props.AutoAcceptQuestions.Value == true) {

                LongToast('QuestionReceived')

            } else {

                LongToast('QuestionNotReceived')

            }
            this.props.navigation.navigate('ProductQuestion', { Id: this.ProductId })

        }, err => {
            this.setState({ lockSubmit: false })
            this.lockSubmit = false
        })

    }


    render() {

        let PresentationalComponent = require('../../presentational_components/Common/AddProudctQuestion').default

        return (
            <PresentationalComponent
                lockSubmit={this.state.lockSubmit}
                Ask={this.onAsk}
                Product={this.Product}
                {...this.props}
            />
        )
    }
}

const mapStateToProps = ({
    runtime_config: {
        runtime_config: {
            screens: {
                Home_12_1,
                Question_Page_07_3: {
                    AutoAcceptQuestions
                },
            },
            colors,
            styles,
        },
    },
}) => ({
    AutoAcceptQuestions,
    ...Home_12_1,
    ...colors,
    ...styles,
})

export default connect(mapStateToProps)(AddProudctQuetions)