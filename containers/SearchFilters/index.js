import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withLocalize } from 'react-localize-redux';

class SearchFilters extends Component {
	render () {
		let PresentationalComponent = null

		const {
			store_theme_id,
			...restProps
		} = this.props

		switch (store_theme_id) {
			case 7:
				PresentationalComponent = require('../../presentational_components/Theme7/SearchFilters').default
				break;
			case 26:
				PresentationalComponent = require('../../presentational_components/Theme26/SearchFilters').default
				break;
			default:
				PresentationalComponent = require('../../presentational_components/Theme7/SearchFilters').default
				break;
		}

		return (
			<PresentationalComponent
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

export default connect(mapStateToProps)(withLocalize(SearchFilters))