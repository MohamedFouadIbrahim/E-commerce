import React, { Component } from 'react'
import { View } from 'react-native'
import LazyContainer from '../../../partial_components/Common/LazyContainer';
import CustomHeader from '../../../partial_components/Common/CustomHeader';
import RemoteDataContainer from '../../../partial_components/Common/RemoteDataContainer';
import OrderItem from '../../../presentational_components/Theme26/Orders/OrderItem';
import PopupsSlider from '../../../partial_components/Theme26/PopupsSlider';
import { PopupsListProps } from '../../../utils/PopupsSliderList';

export default class Orders extends Component {
	renderOrder = ({ item, index }) => {
		const { navigateFromInbox, onOrderInboxPress } = this.props

		return (
			<OrderItem
				navigateFromInbox={navigateFromInbox}
				onOrderInboxPress={() => onOrderInboxPress && onOrderInboxPress(item)}
				navigation={this.props.navigation}
				pushNavigation={true}
				item={item}
				index={index} />
		)
	}

	state = {
		showFooter: false
	}

	render() {
		const {
			pagePadding,
			bgColor2,
			mainScreen,
			triggerRefresh,
			largePagePadding,
			data: {
				TopPopups = [],
				BottomPopups = []
			},
			onDataFetch
		} = this.props


		return (
			<LazyContainer>
				<CustomHeader
					mainScreen={mainScreen}
					title={"Orders"}
					navigation={this.props.navigation}
					leftComponent="drawer" />

				<View style={{ justifyContent: 'space-between' }} ></View>
				<RemoteDataContainer
					url={"Orders"}
					refresh={true}
					triggerRefresh={triggerRefresh}
					keyExtractor={({ Id }) => `${Id}`}
					contentContainerStyle={{
					}}
					onDataFetched={(data, fulldata) => {
						if (fulldata.TotalItemLength == data.length) {
							this.setState({ showFooter: true })
						}
						onDataFetch && onDataFetch(fulldata)
					}}
					ItemSeparatorComponent={
						() => <View style={{ height: 1, backgroundColor: bgColor2, marginHorizontal: 30 }} />
					}
					renderItem={this.renderOrder}
					{...PopupsListProps(TopPopups, BottomPopups, mainScreen, this.state.showFooter && mainScreen, 'OrdersTopPopups', 'OrdersBottomPopups', {
						navigation: this.props.navigation,
					}, {
						navigation: this.props.navigation,
					})}
				/>

			</LazyContainer>
		)
	}
}