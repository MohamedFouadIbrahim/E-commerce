import React, { Component } from 'react'
import { connect } from 'react-redux'
import { DeleteAdress, SetDefault } from '../../services/CustomerService';
import { LongToast } from '../../utils/Toast';

class Address extends Component {
	constructor() {
		super()

		this.state = {}
	}

	onSetDefault = (Id, callBack) => {
		SetDefault(Id, res => {
			LongToast('Hass Been Set To Default')
			callBack && callBack()
		})
	}

	onDelete = (Id, callBack) => {
		DeleteAdress(Id, res => {
			LongToast('dataDeleted')
			callBack && callBack()
		})
	}

	render() {
		let PresentationalComponent = require('../../presentational_components/Common/Address').default

		return (
			<PresentationalComponent
				onSetDefault={this.onSetDefault}
				onDelete={this.onDelete}
				{...this.props}
			/>
		)
	}
}

const mapStateToProps = ({
	runtime_config: {
		runtime_config: {
			screens: {
				Home_12_1,
			},
			colors,
			styles,
		},
	},
}) => ({
	...Home_12_1,
	...colors,
	...styles,
})

export default connect(mapStateToProps)(Address)