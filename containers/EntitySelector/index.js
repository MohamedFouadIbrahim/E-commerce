import React, { Component } from 'react'
import { connect } from 'react-redux'

class EntitySelector extends Component {
	render () {
		let PresentationalComponent = require('../../presentational_components/Common/EntitySelector').default

		return (
			<PresentationalComponent
				{...this.props} />
		)
	}
}

const mapStateToProps = ({
	runtime_config: {
		runtime_config: {
			styles,
			colors,
		},
	},
}) => ({
	...styles,
	...colors,
})

export default connect(mapStateToProps)(EntitySelector)