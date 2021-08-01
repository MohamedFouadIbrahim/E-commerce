import React, { Component } from 'react'
import { View } from 'react-native'
import LazyContainer from '../../../partial_components/Common/LazyContainer';
import RemoteImage from '../../../partial_components/Common/RemoteImage';
import FontedText from '../../../partial_components/Common/FontedText';
import TranslatedText from '../../../partial_components/Common/TranslatedText';
import RemoteDataContainer from '../../../partial_components/Common/RemoteDataContainer';
import CustomTouchable from '../../../partial_components/Common/CustomTouchable';

export default class QuestionsTab extends Component {
	renderItem = ({ item }) => {
		const { Id } = item

		const {
			textColor2,
		} = this.props

		return (
			<CustomTouchable
				onPress={() => {
					const { Id } = item

					this.props.navigation.navigate('AddProudctQuestionAnswers', { ProductId: this.props.Id, questionId: Id })
				}}
				style={{
					flex: 1,
					flexDirection: 'row'
				}}>
				<View style={{ flex: 0.4, alignItems: 'center' }}>
					<RemoteImage
						style={{ width: 70, height: 70, borderRadius: 35, marginTop: 8 }}
						uri={item.CustomerImage.ImageUrl} />
				</View>

				<View style={{ flex: 1.5, paddingHorizontal: 30, flexWrap: 'wrap' }}>
					<FontedText style={{ fontWeight: 'bold', }}>{item.Customer.Name}</FontedText>
					<FontedText style={{ color: textColor2, textAlign: 'justify', fontSize: 14, marginTop: 6, marginLeft: 5 }}>{item.QuestionText}</FontedText>
				</View>
			</CustomTouchable>
		)
	}

	render() {
		const {
			largePagePadding,
			QuestionsCount,
			Id,
			textColor2,
			mainColor,
			bgColor2,
		} = this.props

		return (
			<LazyContainer>
				<View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: largePagePadding }}>
					<View style={{ flexDirection: 'row' }}>
						<TranslatedText style={{ alignSelf: 'center' }} text="Questions" />
						<FontedText style={{ alignSelf: 'center', marginLeft: 6, color: textColor2 }}>{QuestionsCount}</FontedText>
					</View>

					<CustomTouchable
						style={{ flexDirection: 'row', alignItems: 'center' }}
						onPress={() => { this.props.navigation.navigate('AddProudctQuestion', { Id, Product: this.props }) }}
					>
						<TranslatedText style={{ color: mainColor, marginLeft: 4 }} text="AskaQuestions" />
					</CustomTouchable>
				</View>

				<RemoteDataContainer
					url={"Product/Questions"}
					params={`productId=${Id}`}
					keyExtractor={({ Id }) => `${Id}`}
					contentContainerStyle={{ padding: largePagePadding }}
					ItemSeparatorComponent={() => <View style={{ backgroundColor: bgColor2, height: 1, marginVertical: largePagePadding }} />}
					renderItem={this.renderItem}
				/>
			</LazyContainer>
		)
	}
}