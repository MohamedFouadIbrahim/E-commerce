import React, { Component } from 'react'
import { connect } from 'react-redux'

class Orders extends Component {
	constructor(props) {
		super(props)

		this.state = {
			triggerRefresh: false,
			data: []
		}

		if (this.props.route.params && this.props.route.params?.navigateFromInbox == true) {

			this.navigateFromInbox = true

		} else {

			this.navigateFromInbox = false

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
			case 7:
				PresentationalComponent = require('../../presentational_components/Theme7/Orders').default
				break;
			case 26:
				PresentationalComponent = require('../../presentational_components/Theme26/Orders').default
				break;
			default:
				PresentationalComponent = require('../../presentational_components/Theme7/Orders').default
				break;
		}

		return (
			<PresentationalComponent
				mainScreen={true}
				navigateFromInbox={this.navigateFromInbox}
				onOrderInboxPress={this.props.route.params?.onOrderPress}
				triggerRefresh={this.state.triggerRefresh}
				data={this.state.data}
				onDataFetch={(data) => {
					this.setState({ data })
				}}
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

export default connect(mapStateToProps)(Orders)