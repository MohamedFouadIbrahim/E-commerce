import React, { Component } from 'react'
import { View } from 'react-native'
import RemoteDataContainer from '../../../partial_components/Common/RemoteDataContainer';
import Product from '../../../partial_components/Theme7/Product';

export default class RelatedProductsTab extends Component {
	renderItem = ({ item, index }) => {
		return (
			<Product
				navigation={this.props.navigation}
				pushNavigation={true}
				item={item}
				index={index} />
		)
	}

	render() {
		const {
			pagePadding,
			Id,
		} = this.props

		return (
			<RemoteDataContainer
				ListHeaderComponent={this.renderCarousel}
				url={"Product/Related"}
				params={`Id=${Id}`}
				refresh={false}
				keyExtractor={({ Id }) => `${Id}`}
				numColumns={2}
				contentContainerStyle={{
					paddingVertical: pagePadding,
				}}
				ItemSeparatorComponent={
					() => <View style={{ height: 10, backgroundColor: 'transparent' }} />
				}
				renderItem={this.renderItem} />
		)
	}
}