import React, { Component } from 'react'
import { View } from 'react-native'
import LazyContainer from '../../../partial_components/Common/LazyContainer';
import SearchBar from '../../../partial_components/Common/SearchBar';
import RemoteDataContainer from '../../../partial_components/Common/RemoteDataContainer';
import HeaderSubmitButton from '../../../partial_components/Common/HeaderSubmitButton';
import EntitySelectorItem from './EntitySelectorItem';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import CustomHeader from '../../../partial_components/Common/CustomHeader';
import TouchableIcon from '../../../partial_components/Common/TouchableIcon';
import { isValidSearchKeyword } from '../../../utils/Validation';
import FontedText from '../../../partial_components/Common/FontedText';
import Ionicons from 'react-native-vector-icons/Ionicons'

export default class EntitySelector extends Component {
	constructor(props) {
		super(props)

		let selected_items = []

		if (this.props.route.params) {
			const {
				route,
			} = this.props

			this.destination_url = route.params?.destination_url
			this.destination_params = route.params?.destination_params
			this.selection = route.params?.selection
			selected_items = route.params?.selected_items ?? []
			this.search = route.params?.search
			this.callback = route.params?.callback

			if (route.params?.options) {
				const {
					pagination = false,
					initialData = []
				} = route.params?.options

				this.pagination = pagination
				this.initialData = initialData
			}
			else {
				this.pagination = false,
					this.initialData = []
			}
		}

		this.selectedItemsIds = []
		this.isAllSelected = false

		this.state = {
			data: this.initialData ? this.initialData : [],
			isAllSelected: this.isAllSelected,
			selected_items,
		}
	}

	submit = () => {
		this.props.navigation.goBack()
		this.callback && this.callback(this.state.selected_items.map(item => ({ ...item, isSelected: true })))
	}

	onSelect = (item, index) => {
		if (this.onSelectItem && this.onSelectItem(item, index)) {

		}
		else {
			if (this.selection === 2) {
				let updatedIsSelected

				const data = this.state.data.map(mapItem => {
					if (mapItem.Id === item.Id) {
						updatedIsSelected = !mapItem.isSelected
						return {
							...mapItem,
							isSelected: updatedIsSelected,
						}
					}
					else {
						return mapItem
					}
				})

				this.onSelectionChange(item, updatedIsSelected)

				this.setState({
					data,
				})
			}
			else if (this.selection === 1) {
				this.callback && this.callback(item)
				this.props.navigation.goBack()
			}
		}
	}

	onSelectionChange = (item, is_selected) => {
		if (is_selected) {
			if (!this.state.selected_items.map(mapItem => mapItem.Id).includes(item.Id)) {
				this.setState({
					selected_items: [
						...this.state.selected_items,
						item,
					]
				})
			}
		}
		else {
			this.setState({
				selected_items: this.state.selected_items.filter(filterItem => filterItem.Id !== item.Id),
			})
		}
	}

	toggleSelectionAll = () => {
		const nextIsAllSelected = !this.isAllSelected
		this.isAllSelected = nextIsAllSelected

		this.setState({
			selected_items: nextIsAllSelected ? this.state.data : [],
			data: this.state.data.map(item => ({ ...item, isSelected: nextIsAllSelected })),
			isAllSelected: nextIsAllSelected,
		})
	}

	onPressItem = (item, index) => {
		this.onSelect(item, index)
	}

	renderItem = ({ item, index }) => {
		const {
			largePagePadding,
			pagePadding,
		} = this.props

		return (
			<EntitySelectorItem
				item={item}
				index={index}
				onPress={this.onPressItem}
				style={{
					paddingVertical: pagePadding,
					paddingHorizontal: pagePadding,
					flexDirection: 'row',
					justifyContent: 'space-between',
					alignItems: 'center',
				}} />
		)
	}

	addParamsSeparator = (params) => {
		return params.length ? '&' : ''
	}

	getRequestParams = () => {
		let params = ''

		const { searchingFor } = this.state
		const { destination_params } = this

		if (isValidSearchKeyword(searchingFor)) {
			params += `search=${searchingFor}`
		}

		if (destination_params && destination_params.length) {
			params += `${this.addParamsSeparator(params)}${destination_params}`
		}

		return params
	}

	renderSearch = () => {
		if (this.search) {
			return (
				<SearchBar
					visible={true}
					autoFocus={false}
					onSubmitEditing={(text) => {
						this.setState({ searchingFor: text })
					}} />
			)
		}
	}

	onDataFetched = (data) => {
		let isAllSelected = this.isAllSelected
		let selected_items = this.state.selected_items

		if (this.selection === 2 && this.state.selected_items.length) {
			if (this.isAllSelected) {
				data = data.map(item => ({ ...item, isSelected: true })),
					selected_items = data
			}
			else {
				const selected_items_ids = this.state.selected_items.map(item => item.Id)
				isAllSelected = selected_items_ids.length >= data.length
				data = data.map(item => selected_items_ids.includes(item.Id) ? ({ ...item, isSelected: true, }) : item)
			}
		}

		this.setState({
			data,
			isAllSelected,
			selected_items,
		})
	}

	onPressListHeaderItem = (item) => {
		this.onSelect(item)
	}

	renderListHeaderItem = (item, index) => {
		const {
			Name
		} = item

		const {
			mainColor,
			largeBorderRadius,
		} = this.props

		return (
			<CustomTouchable
				key={index}
				onPress={() => this.onPressListHeaderItem(item)}
				style={{
					borderRadius: largeBorderRadius,
					paddingHorizontal: 10,
					paddingVertical: 5,
					backgroundColor: mainColor,
					flexDirection: 'row',
					justifyContent: 'center',
					alignItems: 'center',
					marginTop: 5,
					marginRight: 5,
				}}>
				<FontedText style={{ fontSize: 12, color: "white" }}>{Name}</FontedText>
				<Ionicons name="ios-close-circle-outline" color={"white"} size={18} style={{ marginLeft: 5 }} />
			</CustomTouchable>
		)
	}

	renderListHeader = () => {
		if (this.selection === 2 && this.state.selected_items.length) {
			const {
				largePagePadding,
				pagePadding,
			} = this.props

			return (
				<View
					style={{
						paddingTop: 15,
						paddingHorizontal: largePagePadding,
						paddingBottom: pagePadding,
						flexDirection: 'row',
						flexWrap: 'wrap',
					}}>
					{this.state.selected_items.map(this.renderListHeaderItem)}
				</View>
			)
		}
		else {
			return null
		}
	}

	renderContent = () => {
		const {
			pagination,
		} = this

		return (
			<RemoteDataContainer
				ListHeaderComponent={this.renderListHeader}
				initialData={this.state.data}
				url={this.destination_url}
				params={this.getRequestParams()}
				pagination={pagination}
				onDataFetched={this.onDataFetched}
				updatedData={this.state.data}
				keyExtractor={(item) => String(item.Id)}
				renderItem={this.renderItem} />
		)
	}
	renderRightComponent = () => {
		if (this.selection == 2) {
			const {
				iconColor1,
			} = this.props

			return (
				<View style={{ flexDirection: 'row', alignItems: 'center', }}>
					<TouchableIcon
						onPress={this.toggleSelectionAll}
						style={{
							marginRight: 5,
						}}>
						<MaterialCommunityIcons
							name={this.state.isAllSelected ? "checkbox-multiple-marked-circle" : "checkbox-multiple-marked-circle-outline"}
							size={18}
							color={iconColor1} />
					</TouchableIcon>

					<HeaderSubmitButton
						isLoading={false}
						didSucceed={this.state.didSucceed}
						onPress={() => { this.submit() }} />
				</View>
			)
		} else {
			return null
		}
	}

	render() {
		return (
			<LazyContainer>
				<CustomHeader
					title="Select"
					leftComponent="back"
					navigation={this.props.navigation}
					rightNumOfItems={this.selection}
					rightComponent={this.renderRightComponent()} />

				{this.renderSearch()}
				{this.renderContent()}
			</LazyContainer>
		)
	}
}