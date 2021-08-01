import React, { Component } from 'react'
import { connect } from 'react-redux'

class FlashDeals extends Component {
    constructor() {
        super()
        this.state = {
            data: []
        }
    }


    render() {
        let PresentationalComponent = null

        const {
            store_theme_id,
            ...restProps
        } = this.props

        switch (store_theme_id) {
            case 7:
                PresentationalComponent = require('../../presentational_components/Theme7/FlashDeals').default
                break;
            case 26:
                PresentationalComponent = require('../../presentational_components/Theme26/FlashDeals').default
                break;
            default:
                PresentationalComponent = require('../../presentational_components/Theme7/FlashDeals').default
                break;
        }
        
        return (
            <PresentationalComponent
                mainScreen={true}
                data={this.state.data}
				onDataFetch={(data) => {
					this.setState({ data })
				}}
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
				Product_Details_09_5: {
					DefaultProductSize
				}
			},
            colors,
            styles,
        },
    },
}) => ({
    DefaultProductSize,
    store_theme_id,
    ...colors,
    ...styles,
})

export default connect(mapStateToProps)(FlashDeals)