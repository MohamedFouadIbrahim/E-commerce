import React, { Component } from 'react';
import { connect } from 'react-redux';

class AddSubStore extends Component {

    constructor(props) {
        super(props)

        this.state = {
            lockSubmit: false,
            Name: null,
            Address: null,
            Description: null,
        }
        this.lockSubmit = false
    }

    render() {

        const {
            subStoreId,
        } = this.props

        let PresentationalComponent = null

        if (this.props.route.params?.Id) {
            PresentationalComponent = require('../../presentational_components/Common/AddSubStore').default
        }
        else if (subStoreId == null) {
            PresentationalComponent = require('../../presentational_components/Common/AddSubStore').default
        } else {
            PresentationalComponent = require('../../presentational_components/Common/MyProduct/newProduct').default
        }

        return (
            <PresentationalComponent
                showDrawer={true}
                {...this.props}
            />
        )
    }
}

const mapStateToProps = ({
    places: {
        countries,
    },
    login: {
        subStoreId,
        country_id,
    },
    runtime_config: {
        runtime_config: {
            colors,
            styles
        },
    },
}) => ({
    countries,
    country_id,
    subStoreId,
    ...colors,
    ...styles,
})

function mergeProps(stateProps, { dispatch }, ownProps) {
    const {
        actions: {
            setSubStoreId
        }
    } = require('../../redux/LoginRedux.js');

    return {
        ...ownProps,
        ...stateProps,
        setSubStoreId: (subStoreId) => setSubStoreId(dispatch, subStoreId)
    };
}
export default connect(mapStateToProps, undefined, mergeProps)(AddSubStore)