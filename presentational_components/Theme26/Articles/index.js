import React, { Component } from 'react'
import { View } from 'react-native'
import LazyContainer from '../../../partial_components/Common/LazyContainer';
import CustomHeader from '../../../partial_components/Common/CustomHeader';
import RemoteDataContainer from '../../../partial_components/Common/RemoteDataContainer';
import ArticleItem from '../../../presentational_components/Theme26/Articles/ArticleItem';

export default class Articles extends Component {
	renderArticle = ({ item, index }) => {
		return (
			<ArticleItem
				navigation={this.props.navigation}
				pushNavigation={true}
				item={item}
				index={index} />
		)
	}

	render() {
		const {
			largePagePadding,
			mainScreen,
		} = this.props

		return (
			<LazyContainer>
				<CustomHeader
					mainScreen={mainScreen}
					title={"Articles"}
					navigation={this.props.navigation}
					leftComponent="drawer" />

				<RemoteDataContainer
					url={"Article/Index"}
					refresh={false}
					keyExtractor={({ Id }) => `${Id}`}
					contentContainerStyle={{

					}}
					ItemSeparatorComponent={
						() => <View style={{ height: 10, backgroundColor: 'transparent' }} />
					}
					renderItem={this.renderArticle} />
			</LazyContainer>
		)
	}
}