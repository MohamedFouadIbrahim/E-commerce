import React, { Component } from 'react'
import FloatingNotice from '../../../../partial_components/Common/FloatingNotice';
import { connect } from 'react-redux'

class NotFoundServerError extends Component {
	render() {
		const { is_not_found_error, setIsNotFoundError } = this.props

		return (
			<FloatingNotice
				isVisible={is_not_found_error}
				title="NotFoundServerErrorTitle"
				info="NotFoundServerErrorBody"
				button="HeaderBackTitle"
				onPressButton={() => {
					setIsNotFoundError(false)
				}}
				image={require('../../../../assets/images/offline/offline.png')} />
		)
	}
}

const mapStateToProps = ({
	network: { is_not_found_error },
}) => ({
	is_not_found_error,
})

function mergeProps(stateProps, { dispatch }, ownProps) {
	const {
		actions: {
			setIsNotFoundError,
		}
	} = require('../../../../redux/NetworkRedux.js');

	return {
		...ownProps,
		...stateProps,
		setIsNotFoundError: (is_not_found_error) => setIsNotFoundError(dispatch, is_not_found_error),
	};
}

export default connect(mapStateToProps, undefined, mergeProps)(NotFoundServerError)