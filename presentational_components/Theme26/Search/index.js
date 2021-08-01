import React, { Component } from 'react'
import { ScrollView, View, FlatList, _FlatList } from 'react-native'
import LazyContainer from '../../../partial_components/Common/LazyContainer';
import CustomHeader, { secondHeaderIconSize } from '../../../partial_components/Common/CustomHeader';
import GridProductsList from '../../../partial_components/Theme26/GridProductsList';
import Feather from 'react-native-vector-icons/Feather'
import SearchBar from '../../../partial_components/Theme26/SearchBar';
import TouchableIcon from '../../../partial_components/Common/TouchableIcon';
import { shadowStyle0 } from '../../../constants/Style';
import FontedText from '../../../partial_components/Common/FontedText';
import CustomTouchable from '../../../partial_components/Common/CustomTouchable';
import { PopupsListProps } from '../../../utils/PopupsSliderList';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { headerHeight } from '../../../partial_components/Common/CustomHeader';
export default class Search extends Component {
	constructor(props) {
		super(props)
		this.state = {
			showFooter: false
		}
		const {
			DefaultProductSize
		} = this.props

		switch (DefaultProductSize.Value) {
			case 1:
				this.numColumns = 4
				break
			case 2:
				this.numColumns = 3
				break
			case 3:
				this.numColumns = 2
				break
			case 4:
				this.numColumns = 1
				break
			default:
				this.numColumns = 2

		}
	}

	renderFilterIcon = () => {
		const {
			navigateToFilters,
			iconColor1,
		} = this.props

		return (
			<TouchableIcon
				onPress={navigateToFilters}>
				<Feather name="filter" color={iconColor1} size={secondHeaderIconSize} />
			</TouchableIcon>
		)
	}

	renderSearch = () => {
		const {
			onSearchSubmitEditting,
			largePagePadding,
			HeaderStyle,
			pagePadding,
			DefaultProductSize
		} = this.props

		let marginHorizontal;
		if (HeaderStyle.Value == 'classic') {
			return (
				<SearchBar
					style={[{
						marginTop: largePagePadding,
					}, DefaultProductSize.Value == 3 ? {
						marginLeft: largePagePadding,
						marginRight: largePagePadding - 4
					} : DefaultProductSize.Value == 2 ? {
						marginLeft: largePagePadding - 7,
						marginRight: largePagePadding
					} : DefaultProductSize.Value == 1 ? {
						marginLeft: largePagePadding - 5,
						marginRight: largePagePadding - 5
					} : {
									marginHorizontal: largePagePadding
								}]}
					visible={true}
					autoFocus={false}
					onSubmitEditing={onSearchSubmitEditting} />
			)
		}

	}

	renderFilterItem = (key) => {
		const {
			filters,
		} = this.props

		delete filters.data
		const rawValue = filters[key]

		if (rawValue) {
			let displayValue

			switch (key) {
				case 'searchingFor':
				case 'IncludeSearchProducts':
				case 'MinPrice':
				case 'MaxPrice':
				case 'MinRating':
				case 'MaxRating':
					return null;

				case 'ETags':
					if (rawValue.length) {
						displayValue = rawValue.map(item => item.Name).join(", ")
						break;
					}
					else {
						return null
					}
				default:
					displayValue = rawValue.Name
					break;
			}

			const {
				largePagePadding,
				pagePadding,
				borderRadius,
				bgColor2,
				textColor1,
				translate,
				clearFilter,
			} = this.props

			return (
				<CustomTouchable
					key={key}
					onPress={() => clearFilter(key)}
					style={{
						marginTop: largePagePadding,
						marginBottom: pagePadding,
						marginRight: pagePadding,
						borderRadius: borderRadius,
						padding: pagePadding,
						backgroundColor: bgColor2,
						flexDirection: 'row',
						justifyContent: 'center',
						alignItems: 'center',
						...shadowStyle0
					}}>
					<FontedText style={{ fontSize: 13, color: textColor1 }}>{translate(key)}: {displayValue}</FontedText>
					<Ionicons name="ios-close-circle-outline" color={textColor1} size={18} style={{ marginLeft: 5 }} />
				</CustomTouchable>
			)
		}
	}

	renderFilterItems = () => {
		const {
			filters,
			largePagePadding,
		} = this.props

		return (
			<ScrollView
				contentContainerStyle={{
					paddingLeft: largePagePadding,
				}}
				showsHorizontalScrollIndicator={false}
				horizontal={true}>
				{Object.keys(filters).map(this.renderFilterItem)}
			</ScrollView>
		)
	}

	render() {
		const {
			getRequestParams,
			largePagePadding,
			pagePadding,
			DefaultProductSize,
			onSearchSubmitEditting,
			onDataFetch
		} = this.props

		return (
			<LazyContainer>
				<CustomHeader
					onSearchSubmitEditting={onSearchSubmitEditting}
					search={true}
					modernHeader={true}
					navigation={this.props.navigation}
					leftComponent="back"
					title={'Search'}
					rightComponent={this.renderFilterIcon()} />

				<View style={{ marginLeft: 2 }} >
					{this.renderSearch()}
					{this.renderFilterItems()}
				</View>

				<GridProductsList
					numColumns={this.numColumns}
					url={"Products"}
					onDataFetched={(data, fulldata) => {
						if (fulldata.TotalItemLength == data.length) {
							this.setState({ showFooter: true })
						}
						onDataFetch && onDataFetch(fulldata)
					}}
					params={getRequestParams()}
					navigation={this.props.navigation}

					{...PopupsListProps(this.props?.data?.TopPopups || [], this.props?.data?.BottomPopups || [], true, this.state.showFooter, 'searchTopPopups', 'searchBottomPopups', {
						navigation: this.props.navigation
					}, {
						navigation: this.props.navigation
					})}
				/>
			</LazyContainer>
		)
	}
}
