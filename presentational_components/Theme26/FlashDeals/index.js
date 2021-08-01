import React, { Component } from 'react'
import { View, ScrollView } from 'react-native'
import LazyContainer from '../../../partial_components/Common/LazyContainer';
import RemoteDataContainer from '../../../partial_components/Common/RemoteDataContainer';
import CustomHeader from '../../../partial_components/Common/CustomHeader';
import GridProduct from '../../../partial_components/Theme26/GridProduct';
import PopupsSlider from '../../../partial_components/Theme26/PopupsSlider';
import { screenWidth } from '../../../constants/Metrics';
import { PopupsListProps } from '../../../utils/PopupsSliderList';

export default class FlashDeals extends Component {
	constructor(props) {
		super(props)
		this.state = {
			showFooter: false
		}
		const {
			DefaultProductSize
		} = this.props

		switch (DefaultProductSize.Value) {
			case 1:
				this.numColumns = 4
				break
			case 2:
				this.numColumns = 3
				break
			case 3:
				this.numColumns = 2
				break
			case 4:
				this.numColumns = 1
				break
			default:
				this.numColumns = 2

		}

	}
	renderFlashDeal = ({ item, index }) => {
		return (
			<View style={{ alignSelf: this.numColumns == 1 ? 'center' : 'center' }} >
				<GridProduct
					width={this.numColumns}
					navigation={this.props.navigation}
					pushNavigation={true}
					item={item}
					index={index}
				/>
			</View>

		)
	}

	render() {
		const {
			pagePadding,
			mainScreen,
			largePagePadding,
			data: {
				TopPopups = [],
				BottomPopups = []
			},
			onDataFetch
		} = this.props

		let AdditinalProps = {}

		if (this.numColumns > 1) {
			AdditinalProps = {
				columnWrapperStyle: {
					paddingLeft: (pagePadding + 8.5),
					paddingRight: pagePadding
				}
			}
		}

		return (
			<LazyContainer>
				<CustomHeader
					navigation={this.props.navigation}
					mainScreen={mainScreen}
					title={"FlashDeals"}
					leftComponent="drawer" />

				<RemoteDataContainer
					url={"Offers/flash"}
					keyExtractor={({ Id }) => `${Id}`}
					numColumns={this.numColumns}
					contentContainerStyle={{
					}}
					ItemSeparatorComponent={
						() => <View style={{ height: 10, backgroundColor: 'transparent' }} />
					}

					onDataFetched={(data, fulldata) => {
						if (fulldata.TotalItemLength == data.length) {
							this.setState({ showFooter: true })
						}

						onDataFetch && onDataFetch(fulldata)
					}}
					{...AdditinalProps}
					renderItem={this.renderFlashDeal}
					{...PopupsListProps(TopPopups, BottomPopups, true, this.state.showFooter, 'flashTopPopups', 'flashBottomPopups', {
						navigation: this.props.navigation,
					}, {
						navigation: this.props.navigation,
					})}
				/>
			</LazyContainer>
		)
	}
}