import React, { Component } from 'react'
import { connect } from 'react-redux'
import { onPressCategory } from '../../utils/Categories'
import { TrimText } from '../../utils/Text'

class Categories extends Component {
	constructor(props) {
		super(props)

		const {
			top,
			route,
			alt,
		} = this.props

		this.parentId = route.params?.Id
		this.item = route.params?.item
		this.alt = alt
		this.route = top ? "TopCategories" : alt ? "Categories_Alt" : "Categories"
		this.forceGridView = top && this.parentId ? true : false
		this.url = top && !this.parentId ? "Categories/Top" : "Categories"
		this.name = route.params?.Name
		this.title = this.name ? TrimText(this.name, 20) : (alt ? "Categories" : this.route)
		this.translateTitle = this.name ? false : true
		this.state = {
			data: [],
		}
	}

	onPressCategory = (item) => {
		onPressCategory(this.props.navigation, item, this.route)
	}

	getParams = () => {
		const { parentId } = this

		const {
			top,
			ShowOnlyNoParentCategoriesInCategoriesPage,
		} = this.props

		if (!parentId && ShowOnlyNoParentCategoriesInCategoriesPage.Value && !top) {
			return 'parentId=0'
		}
		else if (parentId) {
			return `parentId=${parentId}`
		}
		else {
			return null
		}
	}

	toggleListStyle = () => {
		const { categories_list_style, setCategoriesListStyle } = this.props
		setCategoriesListStyle(categories_list_style === 1 ? 2 : 1)
		this.setState({ toggle: !this.state.toggle })
	}

	render() {
		let PresentationalComponent = null

		const {
			store_theme_id,
			...restProps
		} = this.props

		switch (store_theme_id) {
			case 7:
				PresentationalComponent = require('../../presentational_components/Theme7/Categories').default
				break;
			case 26:
				PresentationalComponent = require('../../presentational_components/Theme26/Categories').default
				break;
			default:
				PresentationalComponent = require('../../presentational_components/Theme7/Categories').default
				break;
		}

		const {
			view,
			categories_list_style,
			CategoryPerRow
		} = this.props

		const isGridView = view === 'grid' || this.forceGridView
		const numColumns = isGridView ? (categories_list_style === 2 ? 1 : CategoryPerRow.Value) : 1

		return (
			<PresentationalComponent
				mainScreen={this.parentId || this.alt ? false : true}
				parentId={this.parentId}
				onPressCategory={this.onPressCategory}
				getParams={this.getParams}
				route={this.route}
				forceGridView={this.forceGridView}
				isGridView={isGridView}
				numColumns={numColumns}
				title={this.title}
				translateTitle={this.translateTitle}
				toggleListStyle={this.toggleListStyle}
				item={this.item}
				url={this.url}
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
				store_theme_id,
			},
			screens: {
				Product_Details_09_5: {
					ShowTextOnImage,
				},
				All_Category_11_1: {
					DefaultCategoryListing,
					ShowOnlyNoParentCategoriesInCategoriesPage,
					CategoryPerRow
				}
			},
			colors,
			styles,
		},
	},
	theme: {
		categories_list_style,
	},
}) => ({
	store_theme_id,
	ShowTextOnImage,
	DefaultCategoryListing,
	ShowOnlyNoParentCategoriesInCategoriesPage,
	categories_list_style: categories_list_style === null ? DefaultCategoryListing.Value : categories_list_style,
	CategoryPerRow,
	...colors,
	...styles,
})

function mergeProps(stateProps, { dispatch }, ownProps) {
	const {
		actions: {
			setCategoriesListStyle,
		}
	} = require('../../redux/ThemeRedux');

	return {
		...ownProps,
		...stateProps,
		setCategoriesListStyle: (categories_list_style) => setCategoriesListStyle(dispatch, categories_list_style),
	};
}

export default connect(mapStateToProps, undefined, mergeProps)(Categories)