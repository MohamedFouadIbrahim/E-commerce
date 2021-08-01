import React, { Component } from 'react'
import { View } from 'react-native'
import { screenWidth } from '../../../constants/Metrics';
import LazyContainer from '../../../partial_components/Common/LazyContainer';
import CustomHeader from '../../../partial_components/Common/CustomHeader';
import RemoteDataContainer from '../../../partial_components/Common/RemoteDataContainer';
import RemoteImage from '../../../partial_components/Common/RemoteImage';
import FontedText from '../../../partial_components/Common/FontedText';
import CustomTouchable from '../../../partial_components/Common/CustomTouchable';

export default class Categories extends Component {
	constructor(props) {
		super(props)

		const { 
			view, 
			forceGridView,
			pagePadding,
			ShowTextOnImage,
		} = this.props

		if (view === 'grid' || forceGridView) {
			this.isGridView = true
			this.imageDim = screenWidth / 2
			this.numColumns = 2
			this.itemSeparatorHeight = 0
		}
		else {
			this.isGridView = false
			this.imageDim = screenWidth
			this.numColumns = 1
			this.itemSeparatorHeight = 1
		}

		if (ShowTextOnImage.Value) {
			this.textStyle = {
				position: 'absolute',
				left: pagePadding,
				bottom: pagePadding,
			}
		}
		else {
			this.textStyle = {
				marginTop: 5,
				marginBottom: 15,
				marginLeft: pagePadding,
			}
		}
	}

	renderCategory = ({ item }) => {
		const { Name, Icon: { ImageUrl, TextColor } } = item
		const { imageDim, textStyle } = this
		const {
			ShowTextOnImage,
			textColor1,
			onPressCategory,
		} = this.props

		return (
			<CustomTouchable
				onPress={() => { onPressCategory(item) }}
				style={{ 
					alignItems: 'center',
					width: imageDim,
				}}>
				<RemoteImage
					dimension={720}
					resizeMode='cover'
					style={{ width: imageDim, height: 230 }}
					uri={ImageUrl}
				/>

				<FontedText
					style={[textStyle, {
						color: ShowTextOnImage.Value ? TextColor : textColor1,
						fontSize: 18,
						textAlign: 'left',
					}]}>{Name}</FontedText>
			</CustomTouchable>
		)
	}

	render() {
		const {
			parentId,
			route,
			url,
			bgColor2,
			mainScreen,
			getParams,
			title,
		} = this.props

		return (
			<LazyContainer>
				<CustomHeader
					navigation={this.props.navigation}
					mainScreen={mainScreen}
					title={title}
					leftComponent={parentId ? "back" : "drawer"} />

				<RemoteDataContainer
					url={url}
					params={getParams()}
					navigation={this.props.navigation}
					keyExtractor={({ Id }) => `${Id}`}
					style={{ flex: 1 }}
					ItemSeparatorComponent={
						() => <View style={{ height: this.itemSeparatorHeight, backgroundColor: bgColor2 }}></View>
					}
					numColumns={this.numColumns}
					renderItem={this.renderCategory} />
			</LazyContainer>
		)
	}
}