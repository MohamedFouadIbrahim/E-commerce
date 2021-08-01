import React, { Component } from 'react';
import CustomHeader from '../../../partial_components/Common/CustomHeader';
import ItemSeparator from '../../../partial_components/Common/ItemSeparator';
import LazyContainer from '../../../partial_components/Common/LazyContainer';
import RemoteDataContainer from '../../../partial_components/Common/RemoteDataContainer';
import ProductReviewItem from './ProductReviewItem';
import { View } from 'react-native'

export default class ProductReviews extends Component {
	renderItem = ({ item }) => {
		return (
			<ProductReviewItem
				navigation={this.props.navigation}
				item={item} />
		)
	}

	render() {
		const {
			largePagePadding,
			pagePadding,
			Id,
		} = this.props

		return (
			<LazyContainer>
				<CustomHeader
					title={"Reviews"}
					navigation={this.props.navigation}
					leftComponent="back" />

				<RemoteDataContainer
					url={"Product/Reviews"}
					params={`productId=${Id}`}
					keyExtractor={({ Id }) => `${Id}`}
					ItemSeparatorComponent={
						() => <View style={{ height: pagePadding, backgroundColor: 'transparent' }} />
					}
					renderItem={this.renderItem} />
			</LazyContainer>
		)
	}
}