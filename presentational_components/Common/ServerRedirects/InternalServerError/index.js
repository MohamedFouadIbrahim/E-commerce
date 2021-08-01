import React, { Component } from 'react'
import FloatingNotice from '../../../../partial_components/Common/FloatingNotice';
import { connect } from 'react-redux'

class InternalServerError extends Component {
	render() {
		const { is_internal_error, setIsInternalError } = this.props

		return (
			<FloatingNotice
				isVisible={is_internal_error}
				title="InternalServerErrorTitle"
				info="InternalServerErrorBody"
				button="HeaderBackTitle"
				onPressButton={() => {
					setIsInternalError(false)
				}}
				image={require('../../../../assets/images/offline/offline.png')} />
		)
	}
}

const mapStateToProps = ({
	network: { is_internal_error },
}) => ({
	is_internal_error,
})

function mergeProps(stateProps, { dispatch }, ownProps) {
	const {
		actions: {
			setIsInternalError,
		}
	} = require('../../../../redux/NetworkRedux.js');

	return {
		...ownProps,
		...stateProps,
		setIsInternalError: (is_internal_error) => setIsInternalError(dispatch, is_internal_error),
	};
}

export default connect(mapStateToProps, undefined, mergeProps)(InternalServerError)