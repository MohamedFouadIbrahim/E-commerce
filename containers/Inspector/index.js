import React, { Component } from 'react'
import { connect } from 'react-redux'

class Inspector extends Component {
	render () {
		let PresentationalComponent = require('../../presentational_components/Common/Inspector').default

		return (
			<PresentationalComponent
				{...this.props} />
		)
	}
}

const mapStateToProps = ({
	inspector: {
		is_developer,
		is_inspector_enabled,
		is_inspector_collapsed,
		inspector_logs,
		last_request_time,
		last_query_count,
	},
	runtime_config: {
		runtime_config: {
			colors,
		},
	},
}) => ({
	...colors,
	is_developer,
	is_inspector_enabled,
	is_inspector_collapsed,
	inspector_logs,
	last_request_time,
	last_query_count,
})

function mergeProps(stateProps, { dispatch }, ownProps) {
	const {
		actions: {
			setInspectorCollapsed,
			setInspectorEnabled,
		}
	} = require('../../redux/InspectorRedux.js');

	return {
		...ownProps,
		...stateProps,
		setInspectorCollapsed: (is_inspector_collapsed) => setInspectorCollapsed(dispatch, is_inspector_collapsed),
		setInspectorEnabled: (is_inspector_enabled) => setInspectorEnabled(dispatch, is_inspector_enabled),
	};
}

export default connect(mapStateToProps, undefined, mergeProps)(Inspector)