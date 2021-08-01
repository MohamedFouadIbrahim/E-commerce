import React, { Component } from 'react';
import { withLocalize } from 'react-localize-redux';
import { ScrollView, Text, View, ActivityIndicator } from 'react-native';
import CustomHeader from '../../../partial_components/Common/CustomHeader';
import FontedText from '../../../partial_components/Common/FontedText';
import LazyContainer from '../../../partial_components/Common/LazyContainer';
import CustomWebView from '../../../partial_components/Common/CustomWebView';
import { screenWidth } from '../../../constants/Metrics';
import RemoteImage from '../../../partial_components/Common/RemoteImage';

class Artical extends Component {
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
			HtmlDescription,
			pagePadding,
			largePagePadding,
			Image,
			Id,
			textColor2,
			loading,
			mainColor
		} = this.props

		const webViewWidth = screenWidth - largePagePadding * 2

		if (loading) {
			return (
				<LazyContainer style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >
					<ActivityIndicator color={mainColor} size='large' />
				</LazyContainer>
			)
		}

		return (
			<LazyContainer>
				<CustomHeader
					navigation={this.props.navigation}
					leftComponent="back"
					translateTitle={false}
					title={Name}
				/>
				<ScrollView>
					{Image && Image.Id != 1 &&
						<RemoteImage
							dimension={720}
							uri={Image ? Image.ImageUrl : 'http://'}
							resizeMode="contain"
							style={{
								width: screenWidth,
								height: screenWidth,
							}} />}

					<View
						style={{
							marginTop: pagePadding,
							paddingHorizontal: largePagePadding,
						}}>
						<FontedText style={{ fontSize: 17, }}>{Description ? Description : null} </FontedText>
					</View>

					<CustomWebView
						key={1}
						style={{
							marginTop: pagePadding,
							marginHorizontal: largePagePadding,
							width: webViewWidth,
						}}
						textColor={textColor2}
						source={HtmlDescription}
					/>
				</ScrollView>
			</LazyContainer>
		)
	}
}

export default withLocalize(Artical)