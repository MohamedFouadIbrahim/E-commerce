import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withLocalize } from 'react-localize-redux'
import { isValidSearchKeyword } from '../../utils/Validation'

class Search extends Component {
	constructor(props) {
		super(props)

		const Category = this.props.route.params?.Category
		const SubStore = this.props.route.params?.SubStore

		this.state = {
			Category,
			searchingFor: '',
			IncludeSearchProducts: false,
			SubStore,
			data: []
		}

		this.defaultFilters = {
			Category: null,
			Brand: null,
			Gender: null,
			Type: null,
			SubStore: null,
			IncludeSearchProducts: false,
			MinPrice: 5,
			MaxPrice: 3000,
			MinRating: 0,
			MaxRating: 5,
			ETags: [],
		}
	}

	onFiltersResponse = (filters) => {
		this.setState({
			...filters
		})
	}

	onSearchSubmitEditting = (text) => {
		this.setState({ searchingFor: text })
	}

	navigateToFilters = () => {
		const {
			Category,
			Brand,
			Gender,
			Type,
			SubStore,
			IncludeSearchProducts,
			ETags,
			MinPrice,
			MaxPrice,
			MinRating,
			MaxRating,
		} = this.state

		const {
			defaultFilters,
		} = this

		this.props.navigation.navigate('SearchFilters', {
			onResponse: this.onFiltersResponse,
			defaultFilters,
			currentFilters: {
				Category,
				Brand,
				Gender,
				Type,
				SubStore,
				IncludeSearchProducts,
				ETags,
				MinPrice,
				MaxPrice,
				MinRating,
				MaxRating,
			}
		})
	}

	getRequestParams = () => {
		const {
			Category,
			Brand,
			Gender,
			Type,
			SubStore,
			IncludeSearchProducts,
			ETags,
			MinPrice,
			MaxPrice,
			MinRating,
			MaxRating,
			searchingFor,
		} = this.state

		let params = `includeSearchProducts=${IncludeSearchProducts}`

		if (isValidSearchKeyword(searchingFor)) {
			params += `&search=${searchingFor}`
		}

		if (Category) {
			params += `&categoryId=${Category.Id}`
		}

		if (Brand) {
			params += `&brandId=${Brand.Id}`
		}

		if (Gender) {
			params += `&genderId=${Gender.Id}`
		}

		if (Type) {
			params += `&typeId=${Type.Id}`
		}

		if (SubStore) {
			params += `&subStoreId=${SubStore.Id}`
		}

		if (ETags && ETags.length) {
			params += `&${ETags.map(item => `tags=${item.Id}`).join("&")}`
		}

		if (MinPrice) {
			params += `&minPrice=${MinPrice}`
		}

		if (MaxPrice) {
			params += `&maxPrice=${MaxPrice}`
		}

		if (MinRating !== undefined) {
			params += `&minRating=${MinRating}`
		}

		if (MaxRating) {
			params += `&maxRating=${MaxRating}`
		}

		return params
	}

	clearFilter = (key) => {
		const copy_state = this.state
		copy_state[key] = this.defaultFilters[key]

		this.setState({
			...this.state,
			...copy_state,
		})
	}

	render() {
		let PresentationalComponent = null

		const {
			store_theme_id,
			...restProps
		} = this.props

		switch (store_theme_id) {
			case 7:
				PresentationalComponent = require('../../presentational_components/Theme7/Search').default
				break;
			case 26:
				PresentationalComponent = require('../../presentational_components/Theme26/Search').default
				break;
			default:
				PresentationalComponent = require('../../presentational_components/Theme7/Search').default
				break;
		}

		

		return (
			<PresentationalComponent
				onDataFetch={(data) => {
					this.setState({ data })
				}}
				data={this.state.data}
				navigateToFilters={this.navigateToFilters}
				getRequestParams={this.getRequestParams}
				clearFilter={this.clearFilter}
				onSearchSubmitEditting={this.onSearchSubmitEditting}
				filters={this.state}
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
				Top_Header_10_2: {
					HeaderStyle
				},
				Product_Details_09_5: {
					DefaultProductSize
				}
			},
			colors,
			styles,
		},
	},
}) => ({
	DefaultProductSize,
	HeaderStyle,
	store_theme_id,
	...colors,
	...styles,
})

export default connect(mapStateToProps)(withLocalize(Search))