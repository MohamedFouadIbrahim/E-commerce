import React, { Component } from 'react'
import LazyContainer from '../../../partial_components/Common/LazyContainer';
import CustomHeader from '../../../partial_components/Common/CustomHeader';
import GridProductsList from '../../../partial_components/Theme7/GridProductsList';

export default class Category extends Component {
	render() {
		const {
			Id,
			title,
		} = this.props

		return (
			<LazyContainer>
				<CustomHeader
					navigation={this.props.navigation}
					title={title}
					leftComponent="back" />

				<GridProductsList
					url={"Products"}
					params={`categoryId=${Id}`}
					navigation={this.props.navigation} />
			</LazyContainer>
		)
	}
}