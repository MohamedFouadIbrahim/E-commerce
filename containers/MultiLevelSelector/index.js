import React, { Component } from 'react'
import { connect } from 'react-redux'
import { isValidSearchKeyword } from '../../utils/Validation'

class MultiLevelSelector extends Component {
	constructor(props) {
		super(props)

		this.parentId = this.props.route.params?.Id
		this.first_dest_url = this.props.route.params?.first_dest_url
		this.second_dest_url = this.props.route.params?.second_dest_url
		this.options = this.props.route.params?.options

		if (this.options) {
			const {
				canSelectParents = true,
			} = this.options

			this.canSelectParents = canSelectParents
		}
		else {
			this.canSelectParents = true
		}

		this.state = {
			searchingFor: null,
		}
	}

	onSearch = (text) => {
		this.setState({ searchingFor: text })
	}

	getRequestParams = () => {
		let params = this.parentId ? `parentId=${this.parentId}` : `parentId=0`

		const { searchingFor } = this.state

		if (isValidSearchKeyword(searchingFor)) {
			params += `&search=${searchingFor}`
		}

		return params
	}

	render () {
		let PresentationalComponent = require('../../presentational_components/Common/MultiLevelSelector').default

		const {
			parentId,
			first_dest_url,
			second_dest_url,
			canSelectParents,
			options,
		} = this

		return (
			<PresentationalComponent
				canSelectParents={canSelectParents}
				options={options}
				parentId={parentId}
				first_dest_url={first_dest_url}
				second_dest_url={second_dest_url}
				target_url={second_dest_url ? (parentId ? second_dest_url : first_dest_url): first_dest_url}
				url_params={this.getRequestParams()}
				onSearch={this.onSearch}
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

export default connect(mapStateToProps)(MultiLevelSelector)