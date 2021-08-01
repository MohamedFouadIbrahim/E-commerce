import React from 'react'
import { connect } from 'react-redux'

const Walkthrough = ({
	auth_theme_id,
	...restProps
}) => {
	let PresentationalComponent = null

	switch (auth_theme_id) {
		case 7:
			PresentationalComponent = require('../../presentational_components/Theme7/Walkthrough').default
			break;
		case 26:
			PresentationalComponent = require('../../presentational_components/Theme26/Walkthrough').default
			break;
		default:
			PresentationalComponent = require('../../presentational_components/Theme7/Walkthrough').default
			break;
	}

	return (
		<PresentationalComponent
			{...restProps} />
	)
}

const mapStateToProps = ({
	runtime_config: {
		runtime_config: {
			themes: {
				auth_theme_id,
			},
			screens: {
				WalkThrow_01_3
			},
			colors,
			styles,
		},
	},
}) => ({
	auth_theme_id,
	...colors,
	...styles,
	...WalkThrow_01_3,
})

function mergeProps(stateProps, { dispatch }, ownProps) {
	const {
		actions: {
			markWalkthroughSeen,
		}
	} = require('../../redux/WalkthroughRedux.js');

	return {
		...ownProps,
		...stateProps,
		markWalkthroughSeen: (seen_walkthrough) => markWalkthroughSeen(dispatch, seen_walkthrough),
	};
}

export default connect(mapStateToProps, undefined, mergeProps)(Walkthrough)