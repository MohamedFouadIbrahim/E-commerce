import React, { Component } from 'react'
import { connect } from 'react-redux'
class Inbox extends Component {
	constructor(props) {
		super(props)

		this.state = {
			triggerRefresh: false
		}

		const { IsUnifiedInbox } = this.props
	
		if (IsUnifiedInbox.Value == true) {
			this.props.navigation.replace('Support') 
		}

	}

	onChildChange = () => {
		this.setState({ triggerRefresh: !this.state.triggerRefresh })
	}

	onPressItem = (item, forceOnPressFromOrderInbox) => {		
		if (forceOnPressFromOrderInbox == true) {

			const { Id, CustomerId } = item
			this.props.navigation.navigate('OrderChat', {
				orderId: Id,
				onChildChange: this.onChildChange,
				CustomerId: CustomerId,
				fromCustomer: false
			})

		} else {

			const { Order: { Id }, CustomerId, } = item
			this.props.navigation.navigate('OrderChat', {
				orderId: Id,
				onChildChange: this.onChildChange,
				CustomerId: CustomerId,
				fromCustomer: false
			})
		}

	}

	render() {
		let PresentationalComponent = null

		const {
			store_theme_id,
			...restProps
		} = this.props

		switch (store_theme_id) {
			case 7:
				PresentationalComponent = require('../../presentational_components/Theme7/Inbox').default
				break;
			case 26:
				PresentationalComponent = require('../../presentational_components/Theme26/Inbox').default
				break;
			default:
				PresentationalComponent = require('../../presentational_components/Theme7/Inbox').default
				break;
		}

		return (
			<PresentationalComponent
				onPressItem={(item, forceOnPressFromOrderInbox) => { this.onPressItem(item, forceOnPressFromOrderInbox) }}
				triggerRefresh={this.state.triggerRefresh}
				onChildChange={this.onChildChange}
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
			screens: {
				Home_12_1: {
					IsUnifiedInbox
				}
			},
			colors,
			styles,
		},
	},
}) => ({
	store_theme_id,
	IsUnifiedInbox,
	...colors,
	...styles,
})

export default connect(mapStateToProps)(Inbox)