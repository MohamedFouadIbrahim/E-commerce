import React, { Component } from 'react';
import { connect } from 'react-redux';

class TermsOfCondition extends Component {
    constructor(props) {
        super(props)

        this.state = {
            data: {},
        }
    }

    render() {
        let PresentationalComponent = null

        const {
            store_theme_id,
            ...restProps
        } = this.props

        const { data } = this.state

        switch (store_theme_id) {
            case 7:
                PresentationalComponent = require('../../presentational_components/Theme7/TermsOfService').default
                break;
            case 26:
                PresentationalComponent = require('../../presentational_components/Theme26/TermsOfService').default
                break;
            default:
                PresentationalComponent = require('../../presentational_components/Theme7/TermsOfService').default
                break;
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


export default connect(mapStateToProps)(TermsOfCondition)