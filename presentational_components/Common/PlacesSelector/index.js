import React, { Component } from 'react'
import { FlatList } from 'react-native'
import CountryItem from './CountryItem';
import CityAreaItem from './CityAreaItem';
import SearchBar from '../../../partial_components/Common/SearchBar';
import RemoteDataContainer from '../../../partial_components/Common/RemoteDataContainer';
import HeaderSubmitButton from '../../../partial_components/Common/HeaderSubmitButton';
import LazyContainer from '../../../partial_components/Common/LazyContainer';
import CustomHeader from '../../../partial_components/Common/CustomHeader';

class PlacesSelector extends Component {
	constructor(props) {
		super(props)

		this.place_type = 0

		if (this.props.route.params) {
			const {
				route,
			} = this.props

			this.place_type = route.params?.place_type
			this.country_id = route.params?.parent_id
			this.city_id = route.params?.parent_id

			this.multi_select = route.params?.multi_select
			this.selected_items = route.params?.selected_items
		}

		let originalData = []

		if (this.place_type === 0) {
			const countries = [...this.props.countries.map(item => ({
				...item,
				isSelected: null
			}))]

			if (this.selected_items.length) {
				const selected_items_ids = this.selected_items

				originalData = [
					...countries.filter(item => selected_items_ids.includes(item.Id)).map(item => ({ ...item, isSelected: true, })),
					...countries.filter(item => !selected_items_ids.includes(item.Id))
				]
			}
			else {
				originalData = countries
			}
		}

		this.originalData = originalData
		this.selectedItemsIds = originalData.filter(item => item.isSelected).map(item => item.Id)

		this.state = {
			data: originalData,
		}
	}

	submit = () => {
		this.props.navigation.goBack()

		this.props.route.params?.onSelect
			&& this.props.route.params?.onSelect(this.originalData.filter(item => this.selectedItemsIds.includes(item.Id)))
	}

	onSelectPlace = (item, index) => {
		if (this.multi_select) {
			let copy_items = [
				...this.state.data
			]

			copy_items[index].isSelected = !copy_items[index].isSelected

			this.setState({
				data: copy_items,
			})

			if (copy_items[index].isSelected) {
				this.selectedItemsIds.push(item.Id)
			}
			else {
				this.selectedItemsIds = this.selectedItemsIds.filter(Id => Id !== item.Id)
			}
		}
		else {
			this.props.route.params?.onSelect && this.props.route.params?.onSelect(item)
			this.props.navigation.goBack()
		}
	}

	onPressItem = (item, index) => {
		this.onSelectPlace(item, index)
	}

	renderCountry = ({ item, index }) => {
		return (
			<CountryItem
				item={item}
				index={index}
				onPress={this.onPressItem}
				style={{
					paddingHorizontal: 20,
					paddingVertical: 15,
					flexDirection: 'row',
					justifyContent: 'space-between',
					alignItems: 'center',
				}} />
		)
	}

	renderCityOrArea = ({ item, index }) => {
		return (
			<CityAreaItem
				item={item}
				index={index}
				onPress={this.onPressItem}
				style={{
					paddingHorizontal: 20,
					paddingVertical: 15,
					flexDirection: 'row',
					justifyContent: 'space-between',
					alignItems: 'center',
				}} />
		)
	}

	renderSearch = () => {
		return (
			<SearchBar
				visible={true}
				autoFocus={false}
				interval={100}
				onSubmitEditing={(target_keyword) => {
					if (target_keyword) {
						const filteredData = this.state.data.filter(item => item.Name.toLowerCase().includes(target_keyword.toLowerCase()))
						this.setState({ data: filteredData })
					}
					else {
						this.setState({ data: this.originalData })
					}
				}} />
		)
	}

	renderContent = () => {
		if (this.place_type === 0) {
			return (
				<FlatList
					keyExtractor={(item) => String(item.Id)}
					extraData={this.state}
					data={this.state.data}
					renderItem={this.renderCountry} />
			)
		}
		else if (this.place_type === 1) {
			return (
				<RemoteDataContainer
					url={"Cities"}
					params={`id=${this.country_id}`}
					pagination={false}
					onDataFetched={(data) => {
						this.setState({ data })
					}}
					extraData={this.state}
					updatedData={this.state.data}
					keyExtractor={(item) => String(item.Id)}
					renderItem={this.renderCityOrArea} />
			)
		}
		else if (this.place_type === 2) {
			return (
				<RemoteDataContainer
					url={"Areas"}
					params={`id=${this.city_id}`}
					pagination={false}
					onDataFetched={(data) => {
						this.setState({ data })
					}}
					extraData={this.state}
					updatedData={this.state.data}
					keyExtractor={(item) => String(item.Id)}
					renderItem={this.renderCityOrArea} />
			)
		}
	}

	render() {
		return (
			<LazyContainer>
				<CustomHeader
					title="Select"
					leftComponent="back"
					navigation={this.props.navigation}
					rightComponent={
						this.multi_select ? <HeaderSubmitButton
							isLoading={false}
							didSucceed={this.state.didSucceed}
							onPress={this.submit} /> : null
					} />

				{this.renderSearch()}
				{this.renderContent()}
			</LazyContainer>
		)
	}
}

export default PlacesSelector