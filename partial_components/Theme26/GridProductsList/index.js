import React, { PureComponent } from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'
import GridProduct from '../GridProduct';
import RemoteDataContainer from '../../Common/RemoteDataContainer';
import PaddingCalculator from '../../Common/RemoteDataContainer/Helper';

class GridProductsList extends PureComponent {

	constructor(props) {
		super(props)

		const {
			DefaultProductSize,
			specificProductSize = null,
			disableChangeNumColumns = false
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

		if (specificProductSize) {

			switch (specificProductSize.Value) {
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
		this.PaddingObj = PaddingCalculator(disableChangeNumColumns ? 2 : this.numColumns)
	}

	renderProduct = ({ item, index }) => {
		const {
			disableChangeNumColumns = false
		} = this.props

		return (
			<View style={{ alignSelf: this.numColumns == 1 ? 'center' : 'auto' }} >
				<GridProduct
					width={disableChangeNumColumns ? 2 : this.numColumns}
					RealItemWidth={this.PaddingObj.ItemWidth}
					RealItemMargin={this.PaddingObj.ItemMarginHorizontal}
					navigation={this.props.navigation}
					pushNavigation={true}
					item={item}
					index={index} />
			</View>
		)
	}

	render() {
		const { pagePadding,
			largePagePadding,
			disableChangeNumColumns = false,
			ListHeaderComponentStyle,
			contentContainerStyle,
			ListFooterComponentStyle,
			...restProps
		} = this.props

		return (
			<RemoteDataContainer
				keyExtractor={({ Id }) => `${Id}`}
				numColumns={disableChangeNumColumns ? 2 : this.numColumns}

				ListHeaderComponentStyle={[{

				}, ListHeaderComponentStyle]}
				ListFooterComponentStyle={[{

				}, ListFooterComponentStyle]}
				contentContainerStyle={[{
				}, contentContainerStyle]}

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
			screens: {
				Product_Details_09_5: {
					DefaultProductSize
				}
			},
		},
	},
}) => ({
	DefaultProductSize,
	...styles,
})

export default connect(mapStateToProps)(GridProductsList)