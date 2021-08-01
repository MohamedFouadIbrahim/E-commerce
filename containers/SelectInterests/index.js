import React, { Component } from 'react'
import { connect } from 'react-redux'
import { SetSelectedInterests } from '../../services/SelectInterestsService';

class SelectInterests extends Component {
	constructor() {
		super()

		this.state = {
			lockSubmit: false
		}
	}
	
	submit = ({ selectedInterests, selectedGender }) => {
		this.setState({ lockSubmit: true })

		SetSelectedInterests({
			GenderId: selectedGender ? selectedGender.Id : null,
			Categories: selectedInterests ? selectedInterests : null,
		}, res => {
			this.setState({ lockSubmit: false })

			const {
				setSelectedInterests,
			} = this.props;

			setSelectedInterests(true)
		}, err => {
			this.setState({ lockSubmit: false })
		})
	}

	render() {
		let PresentationalComponent = require('../../presentational_components/Common/SelectInterests').default

		return (
			<PresentationalComponent
				lockSubmit={this.state.lockSubmit}
				submit={this.submit}
				{...this.props} />
		)
	}
}

const mapStateToProps = ({
	runtime_config: {
		runtime_config: {
			styles,
			colors,
			screens: {
				Select_Main_Interest_02_8: {
					AskForGender
				}
			}
		},
	},
}) => ({
	AskForGender,
	...styles,
	...colors,
})

function mergeProps(stateProps, { dispatch }, ownProps) {
	const {
		actions: {
			setSelectedInterests,
		}
	} = require('../../redux/LoginRedux.js');

	return {
		...ownProps,
		...stateProps,
		setSelectedInterests: (selected_interests) => setSelectedInterests(dispatch, selected_interests),
	};
}

export default connect(mapStateToProps, undefined, mergeProps)(SelectInterests)