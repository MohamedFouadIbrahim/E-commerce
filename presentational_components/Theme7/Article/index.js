import React, { Component } from 'react'
import { View } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import LazyContainer from '../../../partial_components/Common/LazyContainer';
import TranslatedText from '../../../partial_components/Common/TranslatedText';
import RemoteImage from '../../../partial_components/Common/RemoteImage';
import FontedText from '../../../partial_components/Common/FontedText';
import { withLocalize } from 'react-localize-redux';
import { ScrollView } from 'react-native-gesture-handler';
import CustomHeader from '../../../partial_components/Common/CustomHeader';
import CustomTouchable from '../../../partial_components/Common/CustomTouchable';
class Article extends Component {
	constructor() {
		super()

		this.state = {
			selectedImgIndex: 0,
		}
	}

	render() {
		const {
			Description,
			Name,
			ShortDescription,
			mainColor,
			bgColor1,
			textColor2,
			pagePadding,
			largePagePadding,
			Image,
			onLike,
			Id,
			IsLike,
			onDesLike
		} = this.props

		return (
			<LazyContainer>
				<CustomHeader
					navigation={this.props.navigation}
					title={"Article"}
					leftComponent="back" />

				<ScrollView>
					<View
						style={{
							flexDirection: 'row',
							justifyContent: 'space-between',
							alignItems: 'center',
							marginHorizontal: largePagePadding,
							marginTop: largePagePadding
						}}>
						<View
							style={{
								flex: 1,
							}}>
							<FontedText style={{ fontSize: 26, fontWeight: 'bold' }}>{Name ? Name : null}</FontedText>
						</View>

					</View>

					<View
						style={{}}
						onLayout={(event) => this.setState({
							largeImageWidth: event.nativeEvent.layout.width,
							smallImageWidth: event.nativeEvent.layout.width * 0.235
						})}>
						{this.state.largeImageWidth && <RemoteImage
							dimension={500}
							uri={Image ? Image.ImageUrl : 'http://'}
							style={{
								marginHorizontal: largePagePadding,
								width: this.state.largeImageWidth - (largePagePadding * 2),
								height: this.state.largeImageWidth - (largePagePadding * 2),
							}} />}
					</View>

					<View style={{ backgroundColor: bgColor1, marginVertical: largePagePadding, paddingVertical: largePagePadding, paddingHorizontal: largePagePadding }}>
						<View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
							<View style={{ flexDirection: 'row', alignItems: 'center' }}>
								<FontedText style={{ alignSelf: 'center' }}>{Name}</FontedText>
							</View>

							<CustomTouchable style={{ flexDirection: 'row', alignItems: 'center' }}
								onPress={() => {
									IsLike == true ? onDesLike(Id) : onLike(Id)
								}} >
								{
									IsLike == true ? <Ionicons name='md-remove' size={18} color={mainColor} /> :
										<Ionicons name='md-add' size={18} color={mainColor} />
								}
								<TranslatedText style={{ color: mainColor, marginLeft: 4 }} text={IsLike == true ? "UnLike" : 'Like'} />
							</CustomTouchable>
						</View>
						<FontedText style={{ color: textColor2, textAlign: 'left', marginLeft: 6, marginTop: largePagePadding }}>{ShortDescription ? ShortDescription : null}</FontedText>
						<FontedText style={{ color: textColor2, textAlign: 'left', marginLeft: 6, marginTop: largePagePadding }}>{Description ? Description : null}</FontedText>
					</View>
				</ScrollView>
			</LazyContainer>
		);
	}
}

export default withLocalize(Article)