import React, { Component } from 'react'
import { View } from 'react-native'
import Carousel from 'react-native-carousel-view'
import LazyContainer from '../../../partial_components/Common/LazyContainer';
import { screenWidth } from '../../../constants/Metrics';
import RemoteImage from '../../../partial_components/Common/RemoteImage';
import CustomHeader from '../../../partial_components/Common/CustomHeader';
import RemoteDataContainer from '../../../partial_components/Common/RemoteDataContainer';
import Product from '../../../partial_components/Theme7/Product';
import FontedText from '../../../partial_components/Common/FontedText';

export default class Explore extends Component {
	renderCarouselPage = (item, index) => {
		const { ImageUrl, Title, Description, TextColor } = item

		return (
			<View 
				key={index} 
				style={{ flex: 1 }}>
				<RemoteImage
					dimension={720}
					uri={ImageUrl}
					style={{
						flex: 1
					}} />

				<View
					style={{
						position: 'absolute',
						bottom: 0,
						left: 0,
						padding: 30,
					}}>
					{Title && <FontedText style={{ color: TextColor, fontSize: 28, }}>{Title}</FontedText>}
					{Description && <FontedText style={{ color: TextColor, fontSize: 20, }}>{Description}</FontedText>}
				</View>
			</View>
		)
	}

	renderProduct = ({ item, index }) => {
		return (
			<Product
				navigation={this.props.navigation}
				pushNavigation={true}
				item={item}
				index={index} />
		)
	}

	renderCarousel = () => {
		const {
			Images,
			iconColor1,
		} = this.props

		if (Images && Images.Value.length) {
			return (
				<Carousel
					width={screenWidth}
					height={270}
					delay={3000}
					indicatorAtBottom={true}
					indicatorSize={25}
					indicatorSpace={8}
					indicatorText="•"
					inactiveIndicatorText='•'
					indicatorColor={iconColor1} >
					{Images.Value.map((ad, index) => this.renderCarouselPage(ad, index))}
				</Carousel>
			)
		}
		else {
			return null
		}
	}

	render() {
		const {
			ScrollableProducts,
			pagePadding,
			mainScreen,
		} = this.props

		return (
			<LazyContainer>
				<CustomHeader
					navigation={this.props.navigation}
					mainScreen={mainScreen}
					title="Explore"
					leftComponent="drawer" />

				{ScrollableProducts && <RemoteDataContainer
					ListHeaderComponent={this.renderCarousel}
					url={"Products"}
					skip={1}
					refresh={false}
					initialData={ScrollableProducts.Data}
					keyExtractor={({ Id }) => `${Id}`}
					numColumns={2}
					contentContainerStyle={{
						paddingBottom: pagePadding,
					}}
					ItemSeparatorComponent={
						() => <View style={{ height: 10, backgroundColor: 'transparent' }} />
					}
					renderItem={this.renderProduct} />}
			</LazyContainer>
		)
	}
}