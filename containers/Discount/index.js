import React, { Component } from 'react'
import { connect } from 'react-redux'
import ScreenLoadingIndicator from '../../partial_components/Common/ScreenLoadingIndicator';
import { GetDiscount } from '../../services/DiscountService';

class Discount extends Component {
	constructor(props) {
		super(props)

		this.state = {
			didFetchData: false,
		}

		this.discountId = this.props.route.params?.Id
	}

	componentDidMount() {
		if (this.discountId) {
			this.fetchData()
		}
	}

	fetchData = () => {
		GetDiscount(this.discountId, res => {
			this.setState({
				...res.data,
				didFetchData: true,
			})
		})
	}

	render() {
		if (this.state.didFetchData) {
			let PresentationalComponent = null

			const {
				user_theme_id,
				...restProps
			} = this.props


			switch (user_theme_id) {
				case 7:
					//PresentationalComponent = require('../../presentational_components/Theme7/Discount').default
					break;
				case 26:
					PresentationalComponent = require('../../presentational_components/Theme26/Discount').default
					break;
				default:
					PresentationalComponent = require('../../presentational_components/Theme26/Discount').default
					break;
			}

			return (
				<PresentationalComponent
					{...this.state}
					{...restProps} />
			)
		}
		else {
			return (
				<ScreenLoadingIndicator />
			)
		}		
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

export default connect(mapStateToProps)(Discount)