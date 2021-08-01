import React, { Component } from 'react'
import { connect } from 'react-redux'
import { GetCurrentPosition } from '../../utils/Location';
import { GetCartEstShippingCost } from '../../services/CartService';
import { LongToast } from '../../utils/Toast';
import { withLocalize } from 'react-localize-redux';

const fitToCoordinatesConfig = {
	edgePadding: { top: 80, right: 80, bottom: 80, left: 80 },
	animated: false,
}

class ShippingCostEstimator extends Component {
	constructor() {
		super()

		this.state = {
			didFetchData: false,
			CostFrom: null,
			CostTo: null,
			ProcessTime: null,
			ShippingTime: null,
			latitudeDelta: 0.005,
			longitudeDelta: 0.005,
			enableButtonState: false
		}
	}

	resetUserLocation = () => {

		GetCurrentPosition(({ latitude, longitude }) => {
			this.setState({
				enableButtonState: true,
				UserLat: latitude,
				UserLng: longitude,
				MarkerLat: latitude,
				MarkerLng: longitude,
			}, () => {

				this.getShippingCost(latitude, longitude)
			})
		})

	}

	onRegionChangeComplete = (e) => {

		const {
			latitude,
			latitudeDelta,
			longitude,
			longitudeDelta
		} = e

		this.setState({
			enableButtonState: false
		}, () => {
			this.getShippingCost(latitude, longitude)
		})

	}

	componentDidMount() {
		GetCurrentPosition(({ latitude, longitude }) => {
			this.setState({
				UserLat: latitude,
				UserLng: longitude,
				MarkerLat: latitude,
				MarkerLng: longitude,
			})

			this.getShippingCost(latitude, longitude)
		})
	}

	getMapRef = (ref) => {
		this.map = ref;
	}

	getShippingCost = (latitude, longitude) => {
		this.setState({
			didFetchData: false,
		})

		LongToast("PleaseWait")
		GetCartEstShippingCost(latitude, longitude, res => {
			const {
				CostFrom,
				CostTo,
				ProcessTime,
				ShippingTime,
				lat,
				lng,
				Warehouse,
				Timemin
			} = res.data


			this.setState({
				CostFrom,
				CostTo,
				ProcessTime,
				ShippingTime,
				lat,
				lng,
				Warehouse,
				Timemin,
				didFetchData: true,
			})
		})
	}

	render() {
		const {
			latitudeDelta,
			longitudeDelta,
			enableButtonState
		} = this.state
		let PresentationalComponent = require('../../presentational_components/Common/ShippingCostEstimator').default


		return (
			<PresentationalComponent
				enableButtonState={enableButtonState}
				latitudeDelta={latitudeDelta}
				longitudeDelta={longitudeDelta}
				onRegionChangeComplete={this.onRegionChangeComplete}
				resetUserLocation={this.resetUserLocation}
				getMapRef={this.getMapRef}
				{...this.state}
				{...this.props} />
		)
	}
}

const mapStateToProps = ({
	login: {
		Currency,
	},
	runtime_config: {
		runtime_config: {
			styles,
			colors,
			screens: {
				Cart_Index_06_1: {
					ShippingEstimatorICon
				}
			}
		},
	},
}) => ({
	ShippingEstimatorICon,
	Currency,
	...styles,
	...colors,
})

export default connect(mapStateToProps)(withLocalize(ShippingCostEstimator))