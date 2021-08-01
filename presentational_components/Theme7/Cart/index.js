import React, { Component } from 'react'
import { View } from 'react-native'
import LazyContainer from '../../../partial_components/Common/LazyContainer';
import RemoteDataContainer from '../../../partial_components/Common/RemoteDataContainer';
import CustomButton from '../../../partial_components/Theme7/CustomButton';
import FontedText from '../../../partial_components/Common/FontedText';
import CartItem from './CartItem';
import TranslatedText from '../../../partial_components/Common/TranslatedText';
import CustomHeader from '../../../partial_components/Common/CustomHeader';
import PriceText from '../../../partial_components/Common/PriceText';

export default class Cart extends Component {
	renderItem = ({ item, index }) => {
		return (
			<CartItem
				navigation={this.props.navigation}
				index={index}
				item={item}
				onDeleteCart={this.props.deleteCart}
				onIncrementQuantity={this.props.onIncrementQuantity}
				onDecrementQuantity={this.props.onDecrementQuantity} />
		)
	}

	renderFooter = () => {
		if (this.props.didFetchData) {
			const {
				pagePadding,
				mainColor,
				bgColor1,
				bgColor2,
				textColor1,
			} = this.props

			const { Total } = this.props.Summary

			return (
				<View>
					<View
						style={{
							backgroundColor: bgColor1,
							flexDirection: 'row',
							justifyContent: 'space-between',
							borderTopColor: bgColor2,
							borderTopWidth: 1,
							borderBottomColor: bgColor2,
							borderBottomWidth: 1,
							padding: 12
						}}>
						<TranslatedText style={{ color: textColor1 }} text="Total" />
						<PriceText style={{ fontSize: 18 }}>{Total}</PriceText>
					</View>

					<CustomButton
						onPress={this.navigateToCheckout}
						style={{
							backgroundColor: mainColor,
							marginHorizontal: pagePadding,
							marginVertical: pagePadding,
						}}
						loading={false}
						title="Checkout" />
				</View>
			)
		}
	}

	render() {
		const {
			pagePadding,
			bgColor2,
			onDataFetched,
			data,
			triggerRefresh,
			mainScreen,
		} = this.props

		return (
			<LazyContainer>
				<CustomHeader
					navigation={this.props.navigation}
					mainScreen={mainScreen}
					title={"Cart"}
					leftComponent="drawer" />

				<RemoteDataContainer
					url={"Cart/Index"}
					onDataFetched={onDataFetched}
					updatedData={data}
					triggerRefresh={triggerRefresh}
					keyExtractor={({ Id }) => `${Id}`}
					contentContainerStyle={{ paddingVertical: pagePadding }}
					style={{ flex: 1 }}
					ItemSeparatorComponent={
						() => <View style={{ height: 1, marginVertical: pagePadding, backgroundColor: bgColor2 }} />
					}
					renderItem={this.renderItem} />

				{this.renderFooter()}
			</LazyContainer>
		)
	}
} 