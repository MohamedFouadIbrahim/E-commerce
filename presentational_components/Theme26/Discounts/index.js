import React, { Component } from 'react'
import { View } from 'react-native'
import LazyContainer from '../../../partial_components/Common/LazyContainer';
import CustomHeader from '../../../partial_components/Common/CustomHeader';
import RemoteDataContainer from '../../../partial_components/Common/RemoteDataContainer';
import DiscountItem from './DiscountItem';

export default class Articles extends Component {
	renderItem = ({ item, index }) => {
		return (
			<DiscountItem
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
			triggerRefresh,
		} = this.props

		return (
			<LazyContainer>
				<CustomHeader
					mainScreen={mainScreen}
					title={"Discounts"}
					navigation={this.props.navigation}
					leftComponent="drawer" />

				<RemoteDataContainer
					url={"Discount"}
					refresh={true}
					triggerRefresh={triggerRefresh}
					keyExtractor={({ OrderId }) => `${OrderId}`}
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