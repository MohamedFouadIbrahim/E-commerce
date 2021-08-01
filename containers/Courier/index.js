import React from 'react';
import { connect } from 'react-redux';

class Courier extends React.Component {

    render() {
        const {
            auth_theme_id,
            ...restProps
        } = this.props

        let PresentationalComponent = null

        switch (auth_theme_id) {
            case 26:
                PresentationalComponent = require('../../presentational_components/Theme26/Courier').default
                break;
            default:
                PresentationalComponent = require('../../presentational_components/Theme26/Courier').default
                break;
        }
        return (
            <PresentationalComponent {...restProps} />
        )
    }
}

const mapStateToProps = ({
    runtime_config: {
        runtime_config: {
            colors,
            styles,
            themes: {
                auth_theme_id,
            },
        },
    },
}) => ({
    auth_theme_id,
    ...colors,
    ...styles,
})

export default connect(mapStateToProps)(Courier)