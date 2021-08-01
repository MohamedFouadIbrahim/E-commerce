import React, { Component } from 'react'
import { View } from 'react-native'
import LazyContainer from '../../../partial_components/Common/LazyContainer';
import CustomHeader from '../../../partial_components/Common/CustomHeader';
import RemoteDataContainer from '../../../partial_components/Common/RemoteDataContainer';
import ProductQuestionItem from './ProductQuestionItem';
import ItemSeparator from '../../../partial_components/Common/ItemSeparator';

export default class ProductQuestion extends Component {

	onPressItem = (item) => {

		const { Id } = item

		this.props.navigation.navigate('AddProudctQuestionAnswers', { ProductId: this.props.Id, questionId: Id })
	}
	renderItem = ({ item }) => {
		return (
			<ProductQuestionItem
				navigation={this.props.navigation}
				item={item}
				additonalProps={this.props}
				onPress={() => { this.onPressItem(item) }}
			/>
		)
	}

	render() {
		const {
			largePagePadding,
			Id
		} = this.props

		return (
			<LazyContainer>
				<CustomHeader
					title={"Questions"}
					navigation={this.props.navigation}
					leftComponent="back" />

				<RemoteDataContainer
					url={"Product/Questions"}
					params={`productId=${Id}`}
					keyExtractor={({ Id }) => `${Id}`}
					contentContainerStyle={{

					}}
					ItemSeparatorComponent={
						() => <View style={{ height: pagePadding, backgroundColor: 'transparent' }} />
					}
					renderItem={this.renderItem} />
			</LazyContainer>
		)
	}
}