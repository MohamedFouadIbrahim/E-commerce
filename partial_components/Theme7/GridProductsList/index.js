import React, { PureComponent } from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'
import RemoteDataContainer from '../../Common/RemoteDataContainer';
import Product from '../../../partial_components/Theme7/Product';

class GridProductsList extends PureComponent {
	renderProduct = ({ item, index }) => {
		return (
			<Product
				navigation={this.props.navigation}
				pushNavigation={true}
				item={item}
				index={index} />
		)
	}

	render() {
		const { pagePadding, ...restProps } = this.props

		return (
			<RemoteDataContainer
				keyExtractor={({ Id }) => `${Id}`}
				numColumns={2}
				contentContainerStyle={{
					paddingVertical: pagePadding,
				}}
				ItemSeparatorComponent={
					() => <View style={{ height: pagePadding, backgroundColor: 'transparent' }} />
				}
				renderItem={this.renderProduct}
				{...restProps} />
		)
	}
}

const mapStateToProps = ({
	runtime_config: {
		runtime_config: {
			styles,
		},
	},
}) => ({
	...styles,
})

export default connect(mapStateToProps)(GridProductsList)