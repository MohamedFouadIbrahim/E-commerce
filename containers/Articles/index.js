import React, { Component } from 'react'
import { connect } from 'react-redux'

class Articles extends Component {
    constructor(props) {
        super(props)

        this.state = {}
    }

    render() {
        let PresentationalComponent = null

        const {
            store_theme_id,
            ...restProps
        } = this.props


        switch (store_theme_id) {
            case 7:
                PresentationalComponent = require('../../presentational_components/Theme7/Articles').default
                break;
            case 26:
            	PresentationalComponent = require('../../presentational_components/Theme26/Articles').default
            	break;
            default:
                PresentationalComponent = require('../../presentational_components/Theme7/Articles').default
                break;
        }

        return (
			<PresentationalComponent 
				mainScreen={true}
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

export default connect(mapStateToProps)(Articles)