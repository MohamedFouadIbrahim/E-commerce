import React, { Component } from 'react'
import LazyContainer from '../../../partial_components/Common/LazyContainer';
import CustomHeader, { secondHeaderIconSize } from '../../../partial_components/Common/CustomHeader';
import GridProductsList from '../../../partial_components/Theme26/GridProductsList';
import HorizontalCategoriesList from '../../../partial_components/Theme26/HorizontalCategoriesList';
import TouchableIcon from '../../../partial_components/Common/TouchableIcon';
import Ionicons from 'react-native-vector-icons/Ionicons'

export default class Category extends Component {
	renderListHeader = () => {
		const {
			Id,
			ShowProductsWithChildren,
			largePagePadding,
		} = this.props

		if (ShowProductsWithChildren) {
			return (
				<HorizontalCategoriesList
					navigation={this.props.navigation}
					url={"Categories"}
					params={`parentId=${Id}`}
					contentContainerStyle={{
						paddingHorizontal: largePagePadding,
						paddingBottom: largePagePadding,
					}}
				/>
			)
		}
		else return null
	}

	render() {
		const {
			Id,
			title,
			largePagePadding,
			textColor1,
			item,
		} = this.props

		return (
			<LazyContainer>
				<CustomHeader
					navigation={this.props.navigation}
					title={title}
					translateTitle={false}
					leftComponent="back"
					rightComponent={
						<TouchableIcon
							onPress={() => {
								this.props.navigation.push('Search', {
									screen: 'Search',
									params: {
										Category: item,
									},
								})
							}}>
							<Ionicons name="ios-search" color={textColor1} size={secondHeaderIconSize} />
						</TouchableIcon>
					} />

				<GridProductsList
					ListHeaderComponent={this.renderListHeader}
					url={"Products"}
					params={`categoryId=${Id}`}
					navigation={this.props.navigation}
					contentContainerStyle={{
					}} />
			</LazyContainer>
		)
	}
}