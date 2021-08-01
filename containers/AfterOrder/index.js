import React, { Component } from 'react'
import { connect } from 'react-redux'
import { LongToast } from '../../utils/Toast'

class AfterOrder extends Component {
	onWebViewMessage = (e) => {
		if (e.nativeEvent.data === "v1/Cart/success") {
			LongToast("PlacedOrder")
			
			this.props.setCartCount(0)
			this.props.navigation.navigate('Cart')
			this.props.navigation.navigate("Orders")
		}
		else {
			LongToast("FailedOrder")

			this.props.navigation.goBack()
		}
	}

	render () {
		let PresentationalComponent = require('../../presentational_components/Common/AfterOrder').default

		return (
			<PresentationalComponent
				onWebViewMessage={this.onWebViewMessage}
				{...this.props} />
		)
	}
}

const mapStateToProps = ({
	runtime_config: {
		runtime_config: {
			styles,
		},
	},
}) => ({
	...styles,
})


function mergeProps(stateProps, { dispatch }, ownProps) {
	const {
		actions: {
			setCartCount,
		}
	} = require('../../redux/BadgesRedux');

	return {
		...ownProps,
		...stateProps,
		setCartCount: (cart_count) => setCartCount(dispatch, cart_count),
	};
}

export default connect(mapStateToProps, undefined, mergeProps)(AfterOrder)