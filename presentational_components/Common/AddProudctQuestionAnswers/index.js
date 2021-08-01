import React from 'react';
import { withLocalize } from 'react-localize-redux';
import { FlatList, View } from 'react-native';
import StarRating from 'react-native-star-rating';
import { STRING_LENGTH_LONG } from '../../../constants/Config';
import { screenWidth } from '../../../constants/Metrics';
import { largeBorderRadius, shadowStyle0 } from '../../../constants/Style.js';
import CircularImage from '../../../partial_components/Common/CircularImage';
import CustomHeader from '../../../partial_components/Common/CustomHeader';
import CustomInputForFastReply from '../../../partial_components/Common/CustomInputForFastReply';
import FontedText from '../../../partial_components/Common/FontedText';
import HeaderSubmitButton from '../../../partial_components/Common/HeaderSubmitButton';
import ItemSeparator from '../../../partial_components/Common/ItemSeparator';
import LazyContainer from '../../../partial_components/Common/LazyContainer';

class Question extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			AnswerTextFomMe: '',
		}
	}

	renderAswer = (Answers) => {
		const { largePagePadding, pagePadding, largeBorderRadius } = this.props
		return (
			<FlatList
				keyExtractor={({ Id }) => `${Id}`}
				data={Answers}
				renderItem={({ item, index }) => (
					<View
						key={index}>
						<View style={{
							justifyContent: 'space-between',
							flexDirection: 'row',
							marginTop: 10,
							paddingHorizontal: largePagePadding,
							paddingVertical: 5
						}}>
							<View style={{
								flex: 0.2
							}} >
								<CircularImage
									uri={item.answeredBy.Media.ImageUrl}
									id={item.Id}
								// style={{ marginLeft: 10 }}
								/>
							</View>

							<View style={{ flex: 1, marginHorizontal: 10 }}  >
								<FontedText style={{ marginTop: 5, marginHorizontal: 10 }}>{`${item.answeredBy.FullName.slice(0, 30)}`}</FontedText>
								<FontedText style={{ marginTop: 5, marginHorizontal: 10 }}>{`${item.AnswerText}`}</FontedText>
							</View>
						</View>
						{Answers.length === index + 1 ? null :
							<ItemSeparator style={{ marginHorizontal: largeBorderRadius, marginTop: 10 }} />
						}
					</View>
				)}
			/>
		)
	}

	renderProudct = (Name, Rating, Type, Id, Icon, QuestionText) => {
		const { largePagePadding, pagePadding, largeBorderRadius } = this.props

		return (
			<View style={{
				flexDirection: 'row',
				paddingHorizontal: largePagePadding,
				paddingVertical: pagePadding,
				alignItems: 'center',
				marginTop: 10
			}}>
				<View style={{ flex: 0.2 }} >
					<CircularImage
						style={{ width: 60, height: 60, borderRadius: 30, }}
						uri={Icon.ImageUrl}
						id={Id} />
				</View>

				<View
					style={{ flex: 0.7 }}
				>
					<View style={{ justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }} >
						<FontedText style={{ fontSize: 14, width: '80%' }}>{`${Name}`}</FontedText>

						<StarRating
							disabled={true}
							maxStars={5}
							fullStarColor="#FFC600"
							starSize={15}
							rating={parseInt(Rating, 10)}
						/>
					</View>
					<FontedText style={{ fontSize: 14 }}>{QuestionText}</FontedText>

				</View>
			</View>
		)
	}

	render() {
		const { translate, textColor1, bgColor2 } = this.props
		const { Answers, QuestionText } = this.props;
		const { Name, Rating, Type, Id, Icon } = this.props.Product

		return (
			<LazyContainer style={{ paddingBottom: 50 }} >
				<CustomHeader
					leftComponent="back"
					navigation={this.props.navigation}
					title="Answers"
					rightNumOfItems={1}
					rightComponent={
						<HeaderSubmitButton
							isLoading={this.props.lockSubmit}
							onPress={() => {
								this.props.Answer(this.state.AnswerTextFomMe)
							}}
						/>
					} />

				{this.renderProudct(Name, Rating, Type, Id, Icon, QuestionText)}

				<View style={{ paddingHorizontal: 10 }}>
					{this.renderAswer(Answers)}
				</View>

				<ItemSeparator style={{ marginHorizontal: 10 + 20, }} />

				<CustomInputForFastReply
					maxLength={STRING_LENGTH_LONG}
					onChangeText={(text) => {
						this.setState({ AnswerTextFomMe: text })
					}}
					placeholder={translate('Answer')}
					containerStyle={{
						position: 'absolute', bottom: 2,
					}}
					placeholderTextColor={textColor1}
					style={{
						width: screenWidth,
						...shadowStyle0,
						color: textColor1,
						paddingLeft: 10,
						alignSelf: 'center',
						height: 50,
						backgroundColor: bgColor2,
					}} />
			</LazyContainer>
		);
	}
}
export default withLocalize(Question)