import React, { Component } from 'react'
import LazyContainer from '../../../partial_components/Common/LazyContainer';
import CustomHeader, { secondHeaderIconSize } from '../../../partial_components/Common/CustomHeader';
import GridProductsList from '../../../partial_components/Theme7/GridProductsList';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import SearchBar from '../../../partial_components/Theme7/SearchBar';
import TouchableIcon from '../../../partial_components/Common/TouchableIcon';

export default class Search extends Component {
	renderFilterIcon = () => {
		const {
			seconndColor,
			navigateToFilters,
		} = this.props

		return (
			<TouchableIcon
				onPress={navigateToFilters}>
				<FontAwesome name="filter" color={seconndColor} size={secondHeaderIconSize} />
			</TouchableIcon>
		)
	}

	renderSearch = () => {
		const {
			pagePadding,
			onSearchSubmitEditting,
		} = this.props

		return (
			<SearchBar
				style={{
					margin: pagePadding,
				}}
				visible={true}
				autoFocus={false}
				onSubmitEditing={onSearchSubmitEditting} />
		)
	}

	render() {
		const {
			getRequestParams,
		} = this.props

		return (
			<LazyContainer>
				<CustomHeader
					navigation={this.props.navigation}
					title={"Search"}
					leftComponent="back"
					rightComponent={this.renderFilterIcon()} />

				{this.renderSearch()}

				<GridProductsList
					url={"Products"}
					params={getRequestParams()}
					navigation={this.props.navigation} />
			</LazyContainer>
		)
	}
}