import React, { Component } from 'react'
import { connect } from 'react-redux'

class Discounts extends Component {
	constructor() {
		super()

		this.state = {
			triggerRefresh: false,
		}
	}

	componentDidMount() {
		this.unsubscribeFocusListener = this.props.navigation.addListener('focus', () => {
			this.setState({ triggerRefresh: !this.state.triggerRefresh })
		});
	}

	componentWillUnmount() {
		this.unsubscribeFocusListener && this.unsubscribeFocusListener()
	}

	render() {
		let PresentationalComponent = null

		const {
			user_theme_id,
			...restProps
		} = this.props

		switch (user_theme_id) {
			/*case 7:
				PresentationalComponent = require('../../presentational_components/Theme7/Discounts').default
				break;*/
			case 26:
				PresentationalComponent = require('../../presentational_components/Theme26/Discounts').default
				break;
			default:
				PresentationalComponent = require('../../presentational_components/Theme26/Discounts').default
				break;
		}

		return (
			<PresentationalComponent
				mainScreen={true}
				triggerRefresh={this.state.triggerRefresh}
				{...restProps} />
		)
	}
}

const mapStateToProps = ({
	runtime_config: {
		runtime_config: {
			themes: {
				user_theme_id,
			},
			colors,
			styles,
		},
	},
}) => ({
	user_theme_id,
	...colors,
	...styles,

})

export default connect(mapStateToProps)(Discounts)