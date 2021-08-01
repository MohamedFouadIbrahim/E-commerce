import React, { Component } from 'react'
import { connect } from 'react-redux'

class Category extends Component {
	constructor (props) {
		super (props)

		this.categoryId = this.props.route.params?.Id
		this.item = this.props.route.params?.item
		this.title = this.props.route.params?.Name
		this.ShowProductsWithChildren = this.props.route.params?.ShowProductsWithChildren
	}

	render () {
		let PresentationalComponent = null

		const {
			store_theme_id,
			...restProps
		} = this.props

		switch (store_theme_id) {
			case 7:
				PresentationalComponent = require('../../presentational_components/Theme7/Category').default
				break;
			case 26:
				PresentationalComponent = require('../../presentational_components/Theme26/Category').default
				break;
			default:
				PresentationalComponent = require('../../presentational_components/Theme7/Category').default
				break;
		}

		return (
			<PresentationalComponent
				Id={this.categoryId}
				title={this.title}
				item={this.item}
				ShowProductsWithChildren={this.ShowProductsWithChildren}
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

export default connect(mapStateToProps)(Category)