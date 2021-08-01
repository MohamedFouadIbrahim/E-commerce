import React, { Component } from 'react'
import { connect } from 'react-redux'

class MyProduct extends Component {
	render() {
		let PresentationalComponent = require('../../presentational_components/Common/MyProduct').default

		return (
			<PresentationalComponent
				{...this.props}
			/>
		)
	}
}

const mapStateToProps = ({
	login: {
		Currency
	},
	runtime_config: {
		runtime_config: {
			colors,
			styles,
		},
	},
}) => ({
	Currency,
	...colors,
	...styles,

})

export default connect(mapStateToProps, undefined, undefined)(MyProduct)