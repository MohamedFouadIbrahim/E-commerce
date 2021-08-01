import React, { Component } from 'react'
import { connect } from 'react-redux'
import { GetProductOptions } from '../../services/ProductService';
import { AddCartItem } from '../../services/CartService';
import { LongToast } from '../../utils/Toast';
import { withLocalize } from 'react-localize-redux';
import { GetOptionsPostModel } from '../../utils/Product';

class ProductOptions extends Component {
	constructor(props) {
		super(props)

		this.state = {
			Options: [],
			required: null
		}

		this.productId = this.props.route.params?.Id
		this.Quantity = this.props.route.params?.Quantity
	}

	componentDidMount() {
		if (this.productId) {
			GetProductOptions(this.productId, res => {
				this.setState({
					Options: res.data,
					didFetchData: true,
				})
			})
		}
	}

	addToCart = () => {
		if (this.lockSubmit) {
			return
		}

		const { Options } = this.state

		GetOptionsPostModel(Options, false, ({ model }) => {
			this.setState({ isSubmitLocked: true, required: null })
			this.lockSubmit = true

			AddCartItem(this.productId, this.Quantity, model, res => {
				LongToast('AddedToCart')

				this.setState({
					data: {
						...this.state.data,
						isAddedToCart: true,
						cartItemId: res.data,
					},
					isSubmitLocked: false,
				})

				const callBack = this.props.route.params?.callBack
				// onAddToCart && onAddToCart()
				this.props.navigation.goBack()
				callBack && callBack()

				this.lockSubmit = false
			}, () => {
				this.setState({ isSubmitLocked: false })
				this.lockSubmit = false
			})
		}, ({ required }) => {
			this.setState({ required })
			const { translate } = this.props
			LongToast(`${translate("RequiredOptions")}: ${required.join(", ")}`, false)
		})
	}

	onOptionChange = (item, items) => {
		this.setState({
			Options: this.state.Options.map(mapItem => ({
				...mapItem,
				Members: item.Id === mapItem.Id ? items : mapItem.Members
			})),
			required: null
		})
	}

	render() {
		if (!this.state.didFetchData) {
			return null
		}

		let PresentationalComponent = null

		const {
			store_theme_id,
			...restProps
		} = this.props

		switch (store_theme_id) {
			case 26:
				PresentationalComponent = require('../../presentational_components/Theme26/ProductOptions').default
				break;
			default:
				PresentationalComponent = require('../../presentational_components/Theme26/ProductOptions').default
				break;
		}

		return (
			<PresentationalComponent
				{...this.state}
				addToCart={this.addToCart}
				onOptionChange={this.onOptionChange}
				submitLocked={this.state.isSubmitLocked}
				{...restProps} />
		)
	}
}

const mapStateToProps = ({
	login: {
		store_type,
		Currency,
		is_logged_in,
	},
	runtime_config: {
		runtime_config: {
			themes: {
				store_theme_id,
			},
			screens: {
				Product_Details_09_5: {
					ShowThumbnails,
					ShowTextOnImage,
					ShowMap,
					ShowSubStore,
					ShowSubStoreContactInfo,
					ShowTextImaageWide,
				}
			},
			colors,
			styles,
		},
	},
}) => ({
	is_logged_in,
	Currency,
	store_type,
	store_theme_id,
	ShowThumbnails,
	ShowTextOnImage,
	ShowMap,
	ShowSubStore,
	ShowSubStoreContactInfo,
	ShowTextImaageWide,
	...colors,
	...styles,
})

export default connect(mapStateToProps)(withLocalize(ProductOptions))