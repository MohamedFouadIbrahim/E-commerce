import React, { PureComponent } from 'react'
import { View, FlatList, Alert, Platform } from 'react-native'
import FontedText from '../../../partial_components/Common/FontedText';
import { screenWidth } from '../../../constants/Metrics';
import CustomTouchable from '../../../partial_components/Common/CustomTouchable';
import CategoryItem, { TextBelowImageContainerHeight } from './CategoryItem';
import ExploreHeader from './ExploreHeader';

const HomeCategoryTheme2Height = 90

class CategoriesList extends PureComponent {
	constructor(props) {
		super(props)

		const {
			largePagePadding,
			HomeCategoryStyle,
			HomeCategoryTheme,
			Categories,
			HomeCategoryPerRow
		} = this.props

		this.hideCategoriesTitle = HomeCategoryStyle.Value >= 6
		this.isTextBelow = HomeCategoryStyle.Value === 4 || HomeCategoryStyle.Value === 5 || HomeCategoryStyle.Value === 9 || HomeCategoryStyle.Value === 10

		this.data = HomeCategoryTheme.Value === 1 ? Categories : Categories.slice(1).reduce(function (result, value, index, array) {
			if (index % 2 === 0)
				result.push(array.slice(index, index + 2));
			return result;
		}, [])

		this.numColumnsInCategoryList = HomeCategoryPerRow.Value
		this.categoriesMargin = largePagePadding
		this.halfItemsMargin = this.categoriesMargin / 4
		this.itemsMargin = this.halfItemsMargin * 2

		switch (this.numColumnsInCategoryList) {
			case 1:
				this.categoriesWidth = (screenWidth - (this.categoriesMargin * 2)) / this.numColumnsInCategoryList
				break
			case 2:
				this.categoriesWidth = (screenWidth - (this.categoriesMargin * 2.5)) / this.numColumnsInCategoryList
				break
			case 3:
				this.categoriesWidth = (screenWidth - (this.categoriesMargin * 3)) / this.numColumnsInCategoryList
				break
			case 4:
				this.categoriesWidth = (screenWidth - (this.categoriesMargin * 3.5)) / this.numColumnsInCategoryList
				break
		}

	}

	getNumberElementsOutOfRange = () => {

		let LastcolumnWidth = 0

		let NumberOfRows = this.data.length / this.numColumnsInCategoryList

		const haveUnCompeletedRow = NumberOfRows % 1 == 0 ? false : true

		if (NumberOfRows % 1 != 0) {
			NumberOfRows = Math.ceil(NumberOfRows)
		}

		const NumberOfElementsOutOfRange = this.data.length - ((NumberOfRows - 1) * this.numColumnsInCategoryList)

		const ElementsOutOfRange = this.data.slice((this.data.length - NumberOfElementsOutOfRange))

		if (haveUnCompeletedRow) {
			return ElementsOutOfRange.length
		} else {
			return 0
		}

	}
	handelCategoryWidth = (itemPosition) => { // handel CategroyWidth

		let LastcolumnWidth = 0

		let NumberOfRows = this.data.length / this.numColumnsInCategoryList

		const haveUnCompeletedRow = NumberOfRows % 1 == 0 ? false : true

		if (NumberOfRows % 1 != 0) {
			NumberOfRows = Math.ceil(NumberOfRows)
		}

		const NumberOfElementsOutOfRange = this.data.length - ((NumberOfRows - 1) * this.numColumnsInCategoryList)

		const ElementsOutOfRange = this.data.slice((this.data.length - NumberOfElementsOutOfRange))

		switch (ElementsOutOfRange.length) {

			case 1:
				LastcolumnWidth = (screenWidth - (this.categoriesMargin * 2))
				break
			case 2:
				LastcolumnWidth = (screenWidth - (this.categoriesMargin * 2.5)) / 2
				break
			case 3:
				LastcolumnWidth = (screenWidth - (this.categoriesMargin * 3)) / 3
				break
			case 4:
				LastcolumnWidth = (screenWidth - (this.categoriesMargin * 3.5)) / 4
				break
		}

		if (haveUnCompeletedRow) {
			if (ElementsOutOfRange.includes(this.data[itemPosition])) {
				return LastcolumnWidth
			} else {
				return this.categoriesWidth
			}
		}
		else {
			return this.categoriesWidth
		}

	}

	renderCategoryTheme1 = ({ item, index }) => {
		const {
			Categories,
			onPressCategory,
			HomeCategoryHeight
		} = this.props

		let height = 0

		switch (HomeCategoryHeight.Value) {
			case 1:
				height = 90
				break
			case 2:
				height = 90 * 2
				break
			case 3:
				height = 90 * 3
				break
		}

		return (
			<CategoryItem
				getNumberElementsOutOfRange={this.getNumberElementsOutOfRange()}
				numColumns={this.numColumnsInCategoryList}
				height={item.InHomePageMaxHieght == true ? 90 * 3 : height}
				navigation={this.props.navigation}
				item={item}
				width={this.handelCategoryWidth(index, item)}
				index={index}
				forceWidth={false}
				length={Categories.length}
				onPress={onPressCategory}
				IsTextBelowImage={this.isTextBelow}
			/>
		)
	}

	renderTheme2Header = () => {
		const {
			Categories,
			onPressCategory,
		} = this.props

		let itemDim = (HomeCategoryTheme2Height * 2) + this.itemsMargin

		if (this.isTextBelow) {
			itemDim += TextBelowImageContainerHeight
		}

		return (
			<CategoryItem
				navigation={this.props.navigation}
				item={Categories[0]}
				width={itemDim}
				height={itemDim}
				onPress={onPressCategory}
				IsTextBelowImage={this.isTextBelow}
				style={{
					marginRight: this.itemsMargin,
					marginBottom: 3,
				}} />
		)
	}

	renderCategoryTheme2 = ({ item, index }) => {
		const {
			onPressCategory,
		} = this.props

		const topItem = item[0]
		const bottomItem = item[1]

		return (
			<View>
				<CategoryItem
					navigation={this.props.navigation}
					item={topItem}
					width={HomeCategoryTheme2Height}
					height={HomeCategoryTheme2Height}
					IsTextBelowImage={this.isTextBelow}
					onPress={onPressCategory} />

				{bottomItem && <CategoryItem
					navigation={this.props.navigation}
					item={bottomItem}
					width={HomeCategoryTheme2Height}
					height={HomeCategoryTheme2Height}
					IsTextBelowImage={this.isTextBelow}
					onPress={onPressCategory}
					style={{
						marginTop: this.itemsMargin,
					}} />}
			</View>
		)
	}

	renderList = () => {
		const {
			HomeCategoryTheme,
			ShowYouMayLike,
			YouMayLikeProductsStyle
		} = this.props

		const {
			data,
		} = this

		if (data.length === 0) {
			return null
		}
		else if (HomeCategoryTheme.Value === 1) {

			let AdditionalProps = {}
			if (this.numColumnsInCategoryList != 1) {
				AdditionalProps = {
					columnWrapperStyle: {
						flex: 1,
						justifyContent: 'space-between'
					}
				}
			} else {
				AdditionalProps = {}
			}

			let contentContainerStyle = {}
			let style = {}

			if (Platform.OS == 'ios') {
				contentContainerStyle = {
					paddingBottom: 3,
					paddingHorizontal: this.props.largePagePadding
				}

				style = {}

				if (ShowYouMayLike.Value == true && YouMayLikeProductsStyle.Value == 1) { //if show you amy like and Horizon (cases Bug In Ios)
					style = {
						paddingHorizontal: this.props.largePagePadding
					}
				}
			} else {
				contentContainerStyle = {
					paddingBottom: 3,
				}
				style = {
					paddingHorizontal: this.props.largePagePadding
				}
			}

			return (
				<FlatList
					numColumns={this.numColumnsInCategoryList}
					contentContainerStyle={{
						...contentContainerStyle
					}}
					style={{
						...style
					}}
					ItemSeparatorComponent={
						() => <View style={{ height: this.itemsMargin, backgroundColor: 'transparent' }} />
					}
					keyExtractor={item => `${item.Id}`}
					data={data}
					renderItem={this.renderCategoryTheme1}
					{...AdditionalProps}
				/>
			)
		}
		else {
			const {
				largePagePadding,
			} = this.props

			return (
				<FlatList
					ListHeaderComponent={this.renderTheme2Header}
					horizontal={true}
					showsHorizontalScrollIndicator={false}
					contentContainerStyle={{
						paddingHorizontal: this.props.pagePadding
					}}
					ItemSeparatorComponent={
						() => <View style={{ width: this.itemsMargin, backgroundColor: 'transparent' }} />
					}
					keyExtractor={item => `${item[0].Id}`}
					data={data}
					renderItem={this.renderCategoryTheme2} />
			)
		}
	}

	render() {
		const {
			mainColor,
			largePagePadding,
			pagePadding,
			Categories,
			translate,
			textColor1,
		} = this.props

		if (Categories.length) {
			return (
				<View>
					{this.hideCategoriesTitle ? <View style={{ marginBottom: largePagePadding, }} /> :
						<View
							style={{
								flexDirection: 'row',
								justifyContent: 'space-between',
								alignItems: 'center',
								paddingRight: largePagePadding,
								marginBottom: pagePadding,
								marginTop: largePagePadding,
								paddingHorizontal: pagePadding
							}}>
							<ExploreHeader title={"Categories"} color={textColor1} />

							<CustomTouchable
								onPress={() => {
									this.props.navigation.navigate('Categories_Alt')
								}}
								style={{
									justifyContent: 'center',
									alignItems: 'center',
								}}>
								<FontedText style={{ color: mainColor, fontSize: 16, marginLeft: 5, }}>{translate('SeeAll')}</FontedText>
							</CustomTouchable>
						</View>}

					{this.renderList()}
				</View>
			)
		}
		else {
			return null
		}
	}
}

export default CategoriesList