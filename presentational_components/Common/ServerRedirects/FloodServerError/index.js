import React, { Component } from 'react'
import FloatingNotice from '../../../../partial_components/Common/FloatingNotice';
import { connect } from 'react-redux'

class FloodServerError extends Component {
	render() {
		const { is_flood_error, setIsFloodError } = this.props

		return (
			<FloatingNotice
				isVisible={is_flood_error}
				title="FloodServerErrorTitle"
				info="FloodServerErrorBody"
				button="Back"
				onPressButton={() => {
					setIsFloodError(false)
				}}
				image={require('../../../../assets/images/offline/offline.png')} />
		)
	}
}

const mapStateToProps = ({
	network: { is_flood_error },
}) => ({
	is_flood_error,
})

function mergeProps(stateProps, { dispatch }, ownProps) {
	const {
		actions: {
			setIsFloodError,
		}
	} = require('../../../../redux/NetworkRedux.js');

	return {
		...ownProps,
		...stateProps,
		setIsFloodError: (is_flood_error) => setIsFloodError(dispatch, is_flood_error),
	};
}

export default connect(mapStateToProps, undefined, mergeProps)(FloodServerError)