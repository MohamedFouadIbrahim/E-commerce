import React, { Component } from 'react'
import { View } from 'react-native'
import LazyContainer from '../../../partial_components/Common/LazyContainer';
import RemoteImage from '../../../partial_components/Common/RemoteImage';
import FontedText from '../../../partial_components/Common/FontedText';
import TranslatedText from '../../../partial_components/Common/TranslatedText';
import RemoteDataContainer from '../../../partial_components/Common/RemoteDataContainer';
import CustomStar from '../../../partial_components/Theme7/CustomStar';

export default class ReviewsTab extends Component {
	renderItem = ({ item }) => {
		const {
			largePagePadding,
			Rating,
			textColor2,
		} = this.props

		return (
			<View 
				style={{ 
					flex: 1, 
					padding: largePagePadding, 
					flexDirection: 'row' 
				}}>
				<View style={{ flex: 0.4, alignItems: 'center' }}>
					<CustomStar 
						rating={Rating} />

					<RemoteImage
						style={{ width: 70, height: 70, borderRadius: 35, marginTop: 8 }}
						uri={item.CustomerImage.ImageUrl} />
				</View>

				<View style={{ flex: 1.5, paddingHorizontal: 30, flexWrap: 'wrap' }}>
					<FontedText style={{ fontWeight: 'bold', marginBottom: 6 }}>{item.Customer.Name}</FontedText>
					<FontedText style={{ color: textColor2, textAlign: 'justify', fontSize: 14, marginTop: 6 }}>{item.Review}</FontedText>
				</View>
			</View>
		)
	}

	render() {
		const {
			largePagePadding,
			ReviewsCount,
			Id,
			textColor2,
			bgColor2,
		} = this.props

		return (
			<LazyContainer>
				<View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: largePagePadding }}>
					<View style={{ flexDirection: 'row' }}>
						<TranslatedText style={{ alignSelf: 'center' }} text="Reviews" />
						<FontedText style={{ alignSelf: 'center', marginLeft: 6, color: textColor2 }}>{ReviewsCount}</FontedText>
					</View>
				</View>

				<RemoteDataContainer
					url={"Product/Reviews"}
					params={`productId=${Id}`}
					keyExtractor={({ Id }) => `${Id}`}
					contentContainerStyle={{ padding: largePagePadding }}
					ItemSeparatorComponent={() => <View style={{ backgroundColor: bgColor2, height: 1, marginVertical: largePagePadding }} />}
					renderItem={this.renderItem} />
			</LazyContainer>
		)
	}
}