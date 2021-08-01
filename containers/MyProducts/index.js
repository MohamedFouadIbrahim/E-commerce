import React, { Component } from 'react'
import { connect } from 'react-redux'

class MyProducts extends Component {
	render() {
		let PresentationalComponent = require('../../presentational_components/Common/MyProducts').default

		const {
			main,
		} = this.props

		return (
			<PresentationalComponent
				mainScreen={main}
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

export default connect(mapStateToProps, undefined, undefined)(MyProducts)