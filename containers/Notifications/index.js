import React, { Component } from 'react'
import { connect } from 'react-redux'
import { readAllNotifications, readNotification } from '../../services/NotificationsService';

class Notifications extends Component {
    constructor() {
        super()

        this.state = {}
    }

    ReadAll = (callback) => {
        readAllNotifications(res => {
            callback && callback()
        })
    }

    render() {
        let PresentationalComponent;

        const {
            store_theme_id,
            ...restProps
        } = this.props

        switch (store_theme_id) {
            case 7:
                PresentationalComponent = require('../../presentational_components/Theme7/Notifications').default
                break;
            case 26:
                PresentationalComponent = require('../../presentational_components/Theme26/Notifications').default
                break;
            default:
                PresentationalComponent = require('../../presentational_components/Theme7/Notifications').default
                break;
        }
        return (
            <PresentationalComponent
				mainScreen={true}
				onReadAllNotification={this.ReadAll}
                {...restProps}
            />
        )
    }
}

const mapStateToProps = ({
    runtime_config: {
        runtime_config: {
            themes: {
                store_theme_id,
            },
            screens: {
                Home_12_1,
            },
            colors,
            styles,
        },
    },
}) => ({
    store_theme_id,
    ...Home_12_1,
    ...colors,
    ...styles,
})

export default connect(mapStateToProps)(Notifications)