import React, { Component } from 'react'
import NetInfo from "@react-native-community/netinfo";
import { connect } from 'react-redux'
import FloatingNotice from '../../../partial_components/Common/FloatingNotice';

class Offline extends Component {
	componentDidMount() {
		this.connectionChangeListener = NetInfo.addEventListener(this.handleConnectivityChange)
	}

	componentWillUnmount() {
		this.connectionChangeListener && this.connectionChangeListener()
	}

	handleConnectivityChange = ({ isConnected }) => {
		if (isConnected) {
			const { setIsConnected } = this.props
			setIsConnected(true)
		}
	}


	render() {
		return (
			<FloatingNotice
				isVisible={!this.props.is_connected}
				title="NoInternet"
				info="OfflineNotice"
				button="TryAgain"
				image={require('../../../assets/images/offline/offline.png')} />
		)
	}
}

const mapStateToProps = ({
	network: { is_connected },
}) => ({
	is_connected,
})

function mergeProps(stateProps, { dispatch }, ownProps) {
	const {
		actions: {
			setIsConnected,
		}
	} = require('../../../redux/NetworkRedux.js');

	return {
		...ownProps,
		...stateProps,
		setIsConnected: (is_connected) => setIsConnected(dispatch, is_connected),
	};
}

export default connect(mapStateToProps, undefined, mergeProps)(Offline)