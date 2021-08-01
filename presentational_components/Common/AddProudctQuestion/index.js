import React from 'react';
import { withLocalize } from 'react-localize-redux';
import { View } from 'react-native';
import StarRating from 'react-native-star-rating';
import { STRING_LENGTH_LONG } from '../../../constants/Config';
import { screenWidth } from '../../../constants/Metrics';
import { shadowStyle0 } from '../../../constants/Style.js';
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

		if (this.props.route.params && this.props.route.params?.Id) {
			this.questionId = this.props.route.params?.Id
		}

		this.state = {
			AnswerTextFomMe: ''
		}
	}

	renderProudct = (Name, ShortDescription, Rating, Type, Id, Icon) => {
		const { largePagePadding, pagePadding } = this.props
		return (
			<View style={{
				flexDirection: 'row',
				justifyContent: 'space-between',
				paddingHorizontal: largePagePadding,
				paddingVertical: pagePadding,
				alignItems: 'center'
			}}>
				<CircularImage
					uri={Icon.ImageUrl}
					id={Id} />
				<View style={{ justifyContent: 'center', alignItems: 'flex-start', position: 'absolute', left: 90 }}>
					<FontedText style={{ fontSize: 14 }}>{`${Name.slice(0, 25)}`}</FontedText>
				</View>
				<View>
					<StarRating
						disabled={true}
						maxStars={5}
						fullStarColor="#FFC600"
						starSize={15}
						rating={parseInt(Rating, 10)}
					/>
				</View>
			</View>
		)
	}

	render() {
		const { translate, textColor1, bgColor2 } = this.props
		const { Description: { Name }, Description: { ShortDescription }, Rating, Type, Id } = this.props.Product;
		const { Images, lockSubmit } = this.props.Product

		return (
			<LazyContainer style={{ paddingBottom: 50 }} >
				<CustomHeader
					leftComponent="back"
					navigation={this.props.navigation}
					title="Questions"
					rightNumOfItems={1}
					rightComponent={
						<HeaderSubmitButton
							isLoading={this.props.lockSubmit}
							onPress={() => { this.props.Ask(this.state.AnswerTextFomMe) }}
						/>
					} />

				{this.renderProudct(Name, ShortDescription, Rating, 'Type', Id, Images[0])}

				<ItemSeparator style={{ marginHorizontal: 10 + 20, }} />

				<CustomInputForFastReply
					maxLength={STRING_LENGTH_LONG}
					onChangeText={(text) => {
						this.setState({ AnswerTextFomMe: text })
					}}

					placeholder={translate('QuetionNow')}
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