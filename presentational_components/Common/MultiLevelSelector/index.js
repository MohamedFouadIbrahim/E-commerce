import React, { Component } from 'react'
import LazyContainer from '../../../partial_components/Common/LazyContainer';
import SearchBar from '../../../partial_components/Common/SearchBar';
import RemoteDataContainer from '../../../partial_components/Common/RemoteDataContainer';
import HeaderSubmitButton from '../../../partial_components/Common/HeaderSubmitButton';
import MultiLevelSelectorItem from './MultiLevelSelectorItem';
import CustomHeader from '../../../partial_components/Common/CustomHeader';
import { View } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import CustomTouchable from '../../../partial_components/Common/CustomTouchable';
import FontedText from '../../../partial_components/Common/FontedText';

export default class MultiLevelSelector extends Component {
	constructor(props) {
		super(props)

		this.callback = this.props.route.params?.callback
		this.selection = this.props.route.params?.selection
		this.onParentSelectionChange = this.props.route.params?.onParentSelectionChange
		this.parentId = this.props.parentId
		
		this.state = {
			selected_items: this.props.route.params?.selected_items ?? [],
			searchingFor: null,
			data: [],
		}
	}

	submit = () => {
		this.props.navigation.goBack()

		if (!this.parentId) {
			this.callback && this.callback(this.state.selected_items)
		}
	}

	onSelect = (item) => {
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
			const data = this.state.data.map(mapItem => mapItem.Id === item.Id ? ({
				...mapItem,
				isSelected: false,
			}) : mapItem)

			this.setState({
				selected_items: this.state.selected_items.filter(filterItem => filterItem.Id !== item.Id),
				data,
			})
		}

		this.onParentSelectionChange && this.onParentSelectionChange(item, is_selected)
	}

	onPressItem = (item, index) => {
		const {
			first_dest_url,
			second_dest_url,
			options,
		} = this.props

		const {
			isSelected,
			hasChildren,
			Id
		} = item

		if (hasChildren && !isSelected) {
			const {
				selection,
			} = this

			const {
				selected_items,
			} = this.state

			this.props.navigation.push('MultiLevelSelector', {
				Id,
				first_dest_url,
				second_dest_url,
				selection,
				selected_items,
				callback: this.submit,
				onParentSelectionChange: this.onSelectionChange,
				options,
			})
		}
		else {
			this.onSelect(item, index)
		}
	}

	renderItem = ({ item, index }) => {
		const {
			canSelectParents,
		} = this.props

		return (
			<MultiLevelSelectorItem
				item={item}
				index={index}
				canSelectParents={canSelectParents}
				onPress={this.onPressItem}
				onSelect={this.onSelect} />
		)
	}

	renderSearch = () => {
		const {
			onSearch,
		} = this.props

		return (
			<SearchBar
				visible={true}
				autoFocus={false}
				onSubmitEditing={onSearch} />
		)
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
			target_url,
			url_params,
		} = this.props

		return (
			<RemoteDataContainer
				ListHeaderComponent={this.renderListHeader}
				url={target_url}
				params={url_params}
				pagination={true}
				onDataFetched={(data) => {
					if (this.selection === 2 && this.state.selected_items.length) {
						const selected_items_ids = this.state.selected_items.map(item => item.Id)
						data = data.map(item => selected_items_ids.includes(item.Id) ? ({ ...item, isSelected: true, }) : item)
					}

					this.setState({
						data,
					})
				}}
				updatedData={this.state.data}
				keyExtractor={(item) => String(item.Id)}
				renderItem={this.renderItem} />
		)
	}

	renderRightComponent = () => {
		if (this.selection === 2 && !this.parentId) {
			return (
				<HeaderSubmitButton
					isLoading={false}
					didSucceed={this.state.didSucceed}
					onPress={this.submit} />
			)
		} 
		else {
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
					rightNumOfItems={1}
					rightComponent={this.renderRightComponent()} />

				{this.renderSearch()}
				{this.renderContent()}
			</LazyContainer>
		)
	}
}