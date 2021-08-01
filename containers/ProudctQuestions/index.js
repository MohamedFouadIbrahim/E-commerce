import React, { Component } from 'react'
import { connect } from 'react-redux'

class ProductQuestion extends Component {
	constructor (props) {
		super (props)

		this.productId = this.props.route.params?.Id
	}

	render () {
		let PresentationalComponent = null

		const {
			store_theme_id,
			...restProps
		} = this.props

		switch (store_theme_id) {
			case 26:
				PresentationalComponent = require('../../presentational_components/Theme26/ProductQuestion').default
				break;
			default:
				return null
		}

		return (
			<PresentationalComponent
				Id={this.productId}
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

export default connect(mapStateToProps)(ProductQuestion)