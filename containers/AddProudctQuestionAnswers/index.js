import React, { Component } from 'react'
import { connect } from 'react-redux'
import { LongToast } from '../../utils/Toast';
import { GetQuestionById, AnswerQuestion } from '../../services/QuestionService';

class AddProudctQuetions extends Component {
    constructor(props) {
        super(props)
        this.state = {
            lockSubmit: false
        }
        this.lockSubmit = false

        this.ProductId = this.props.route.params?.ProductId
        this.QuestionId = this.props.route.params?.questionId
    }

    onAnswer = (AnswerText) => {
        if (this.state.lockSubmit) {
            return
        }

        if (!AnswerText) {
            return LongToast('PleaseWriteAnswer')
        }


        this.setState({ lockSubmit: true })
        this.lockSubmit = true

        AnswerQuestion({
            Id: 0,
            AnswerText,
            QuestionId: this.QuestionId
        }, res => {

            this.setState({ lockSubmit: false })
            this.lockSubmit = false
            this.props.navigation.navigate('ProductQuestion', { Id: this.ProductId })

        }, err => {
            this.setState({ lockSubmit: false })
            this.lockSubmit = false
        })

    }

    componentDidMount() {

        GetQuestionById(this.QuestionId, res => {

            this.setState({
                data: res.data,
                dataFitched: true
            })

        })

    }

    render() {

        let PresentationalComponent = require('../../presentational_components/Common/AddProudctQuestionAnswers').default

        if (!this.state.dataFitched) {
            return null
        }

        return (
            <PresentationalComponent
                lockSubmit={this.state.lockSubmit}
                Answer={this.onAnswer}
                {...this.state.data}
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

export default connect(mapStateToProps)(AddProudctQuetions)