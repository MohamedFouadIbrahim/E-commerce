import React, { Component } from 'react'
import { View, FlatList, ScrollView } from 'react-native'
import CustomHeader, { secondHeaderIconSize } from '../../../partial_components/Common/CustomHeader';
import FontedText from '../../../partial_components/Common/FontedText';
import RemoteImageBackground from '../../../partial_components/Common/RemoteImageBackground';
import { screenWidth } from '../../../constants/Metrics';
import LazyContainer from '../../../partial_components/Common/LazyContainer';
import PopupsSlider from '../../../partial_components/Theme26/PopupsSlider';
import RemoteDataContainer from '../../../partial_components/Common/RemoteDataContainer';
import PaddingCalculator from '../../../partial_components/Common/RemoteDataContainer/Helper';
import { shadowStyle2 } from '../../../constants/Style';
import CustomTouchable from '../../../partial_components/Common/CustomTouchable';
import TouchableIcon from '../../../partial_components/Common/TouchableIcon';
import Ionicons from 'react-native-vector-icons/Ionicons'
import RowCategoryItem from './RowCategoryItem';
import { PopupsListProps } from '../../../utils/PopupsSliderList';

export default class Categories extends Component {
	constructor(props) {
		super(props)
		this.state = {
			showFooter: false
		}
		this.SetCatsSizes()
	}

	SetCatsSizes = () => {
		const {
			categories_list_style,
			isGridView,
			numColumns
		} = this.props

		if (isGridView) {
			this.isGridView = true // will set the grid style icon
			this.numColumns = categories_list_style === 2 ? 1 : numColumns
		}
		else {
			this.isGridView = false
			this.numColumns = 1
		}

		this.PaddingObj = PaddingCalculator(this.numColumns)

		switch (this.numColumns) {
			case 1:
				this.categoryNameFontSize = 19
				break
			case 2:
				this.categoryNameFontSize = 17
				break
			case 3:
				this.categoryNameFontSize = 15
				break
			case 4:
				this.categoryNameFontSize = 12
				break
		}
	}

	renderCategory = ({ item, index }) => {
		const { Name, Icon: { ImageUrl, TextColor } } = item

		const {
			bgColor1,
			pagePadding,
			smallBorderRadius,
			ShowTextOnImage,
			onPressCategory,
			categories_list_style,
		} = this.props
		const { PaddingObj } = this

		if (this.isGridView && categories_list_style === 2) {
			return (
				<View style={{ marginHorizontal: PaddingObj.itemMarginHorizontal, }} >
					<RowCategoryItem
						navigation={this.props.navigation}
						item={item}
						onPressCategory={onPressCategory}
						index={index} />
				</View>

			)
		}
		else {
			return (
				<CustomTouchable
					onPress={() => { onPressCategory(item) }}
					style={{
						borderRadius: smallBorderRadius,
						width: PaddingObj.ItemWidth,
						marginHorizontal: PaddingObj.ItemMarginHorizontal,
					}}>
					<View
						style={{
							backgroundColor: bgColor1,
							borderRadius: smallBorderRadius,
							width: PaddingObj.ItemWidth,
							...shadowStyle2
						}}>
						<RemoteImageBackground
							borderRadius={smallBorderRadius}
							dimension={PaddingObj.ImageDimension}
							style={{
								borderRadius: smallBorderRadius,
								width: PaddingObj.ItemWidth,
								height: PaddingObj.ItemWidth,

							}}
							uri={ImageUrl}>
							{ShowTextOnImage.Value && <FontedText style={{ color: TextColor, fontSize: this.categoryNameFontSize, textAlign: 'left', fontWeight: 'bold', }}>{Name}</FontedText>}
						</RemoteImageBackground>
					</View>

					{!ShowTextOnImage.Value && <FontedText style={{ fontSize: this.categoryNameFontSize, textAlign: 'left', marginTop: pagePadding, }}>{Name}</FontedText>}
				</CustomTouchable >
			)
		}
	}

	render() {
		const {
			largePagePadding,
			pagePadding,
			parentId,
			route,
			url,
			mainScreen,
			getParams,
			title,
			textColor1,
			item,
			categories_list_style,
			toggleListStyle,
			numColumns,
			translateTitle,
			top,
			data: {
				TopPopups = [],
				BottomPopups = []
			},
			onDataFetch
		} = this.props

		this.SetCatsSizes()

		return (
			<LazyContainer >
				<CustomHeader
					navigation={this.props.navigation}
					mainScreen={mainScreen}
					title={title}
					translateTitle={translateTitle}
					leftComponent={parentId || !mainScreen ? "back" : "drawer"}
					rightNumOfItems={mainScreen ? 1 : 2}
					rightComponent={
						<View
							style={{
								flexDirection: 'row',
								alignItems: 'center',
							}}>
							{this.isGridView && <TouchableIcon
								onPress={toggleListStyle}>
								<Ionicons
									name={categories_list_style === 2 ? 'md-grid' : 'ios-list'}
									size={secondHeaderIconSize}
									color={textColor1} />
							</TouchableIcon>}

							{mainScreen ? null : <TouchableIcon
								onPress={() => {
									this.props.navigation.push('Search', {
										screen: 'Search',
										params: {
											Category: item,
										},
									})
								}}>
								<Ionicons name="ios-search" color={textColor1} size={secondHeaderIconSize} />
							</TouchableIcon>}
						</View>
					} />


				<RemoteDataContainer
					key={numColumns}
					url={url}
					params={getParams()}
					navigation={this.props.navigation}
					keyExtractor={({ Id }) => `${Id}`}
					onDataFetched={(data, fulldata) => {
						if (fulldata.TotalItemLength == data.length) {
							this.setState({ showFooter: true })
						}
						onDataFetch && onDataFetch(fulldata)
					}}
					numColumns={numColumns}
					renderItem={this.renderCategory}
					pagination={top ? false : true}

					ItemSeparatorComponent={
						() => <View style={{ height: pagePadding, backgroundColor: 'transparent' }} />
					}
					{...PopupsListProps(TopPopups, BottomPopups, true, this.state.showFooter, 'CategoriesTopPopups', 'CategoriesBottomPopups', {
						navigation: this.props.navigation,
						pushNavigation: true,
					}, {
						navigation: this.props.navigation,
						pushNavigation: true,
					})}
				/>

			</LazyContainer>
		)
	}
}