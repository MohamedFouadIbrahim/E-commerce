import React, { Component } from 'react';
import { connect } from 'react-redux';

class Wishlist extends Component {
    constructor() {
        super()

        this.state = {
            data: []
        }
    }

    render() {
        let PresentationalComponent = require('../../presentational_components/Common/Wishlist').default

        return (
            <PresentationalComponent
            onDataFetch={(data) => {
                this.setState({ data })
            }}
            data={this.state.data}
                {...this.props}
            />
        )
    }
}

const mapStateToProps = ({
    runtime_config: {
        runtime_config: {
            colors,
            styles,
            screens: {
                Product_Details_09_5: {
                    DefaultProductSize
                }
            },
        },
    },
}) => ({
    DefaultProductSize,
    ...colors,
    ...styles,
})

export default connect(mapStateToProps)(Wishlist)