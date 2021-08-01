import React, { PureComponent } from 'react'
import { withLocalize } from 'react-localize-redux';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { shadowStyle2 } from '../../../constants/Style';
import { redColor } from '../../../constants/Theme26/Colors';
import CustomTouchable from '../../../partial_components/Common/CustomTouchable';
import FontedText from '../../Common/FontedText';
import RemoteImage from '../../Common/RemoteImage';
import ProductStatusBadge from '../ProductStatusBadge';
import CartButton from '../CartButton';
import CartControls from '../CartControls';
import DealCountDown from '../DealCountDown';
import PriceText from '../../Common/PriceText';

export const imageHeight = 150

class HorizontalProduct extends PureComponent {
	constructor(props) {
		super(props)

		const {
			specificProductSize = null,
			DefaultProductSize
		} = this.props

		// alert(DefaultProductSize.Value)


		switch (DefaultProductSize.Value) {
			case 1:
				this.imageHeight = 90
				this.DealCountDownSize = 12
				this.dimension = 750
				this.DefaultFontSize = 11
				this.badgeIconSize = 8 // was 12
				this.fontSize = 8 //was 10
				break
			case 2:
				this.imageHeight = 120
				this.DealCountDownSize = 15
				this.dimension = 500
				this.DefaultFontSize = 13
				this.badgeIconSize = 10 // was 12
				this.fontSize = 9 //was 10
				break
			case 3:
				this.imageHeight = 150
				this.DealCountDownSize = 15
				this.dimension = 250
				this.DefaultFontSize = 15
				this.badgeIconSize = 12 // was 12
				this.fontSize = 10 //was 10
				break
			case 4:
				this.imageHeight = 380
				this.DealCountDownSize = 17
				this.dimension = 250
				this.DefaultFontSize = 17
				this.badgeIconSize = 12 // was 12
				this.fontSize = 10 //was 10
				break
			default:
				this.imageHeight = 150
				this.DealCountDownSize = 15
				this.dimension = 250
				this.DefaultFontSize = 15
				this.badgeIconSize = 12 // was 12
				this.fontSize = 10 //was 10
		}

		if (specificProductSize) {

			switch (specificProductSize.Value) {
				case 1:
					this.imageHeight = 90
					this.DealCountDownSize = 12
					this.dimension = 755
					this.DefaultFontSize = 11
					this.DefaultIconSize = 7
					this.badgeIconSize = 8 // was 12
					this.fontSize = 8 //was 10
					break
				case 2:
					this.imageHeight = 120
					this.DealCountDownSize = 15
					this.dimension = 500
					this.DefaultFontSize = 13
					this.DefaultIconSize = 9
					this.badgeIconSize = 10 // was 12
					this.fontSize = 9 //was 10
					break
				case 3:
					this.imageHeight = 150
					this.DealCountDownSize = 15
					this.dimension = 250
					this.DefaultFontSize = 15
					this.DefaultIconSize = 12
					this.badgeIconSize = 12 // was 12
					this.fontSize = 10 //was 10
					break
				case 4:
					this.imageHeight = 380
					this.DealCountDownSize = 17
					this.dimension = 250
					this.DefaultFontSize = 17
					this.DefaultIconSize = 13
					this.badgeIconSize = 12 // was 12
					this.fontSize = 10 //was 10
					break
				default:
					this.imageHeight = 150
					this.DealCountDownSize = 15
					this.dimension = 250
					this.DefaultFontSize = 15
					this.badgeIconSize = 12 // was 12
					this.fontSize = 10 //was 10
			}
		}
		const {
			AddedToCartQty,
		} = this.props.item

		this.state = {
			AddedToCartQty,
		}
	}

	onAddedToCart = () => {
		const {
			ProductMinQty,
		} = this.props.item

		this.setState({ AddedToCartQty: ProductMinQty })
	}

	renderCartButton = () => {
		const {
			AddToCartFromProductIndex,
			item,
		} = this.props

		if (AddToCartFromProductIndex.Value !== 1) {
			const { AddedToCartQty } = this.state

			const {
				ProductMinQty,
			} = item

			return (
				<CartButton
					navigation={this.props.navigation}
					isAddedToCart={AddedToCartQty >= ProductMinQty ? true : false}
					item={item}
					onAddedToCart={this.onAddedToCart} />
			)
		}
	}

	onQuantityChange = (quantity) => {
		this.setState({ AddedToCartQty: quantity })
	}

	renderCartControls = () => {
		const {
			item,
			pagePadding,
			AddToCartFromProductIndex,
		} = this.props

		const {
			AddedToCartQty,
		} = this.state

		if (AddToCartFromProductIndex.Value === 3 && AddedToCartQty) {
			return (
				<CartControls
					item={item}
					Quantity={AddedToCartQty}
					onQuantityChange={this.onQuantityChange}
					style={{
						marginTop: pagePadding,
					}} />
			)
		}
	}

	handelDimension = () => {

		const {
			specificProductSize = null,
			DefaultProductSize
		} = this.props

		let dimension = 0;
		if (specificProductSize) {
			switch (specificProductSize.Value) {
				case 1: // 4 row
					dimension = 250;
					break
				case 2: // 3 row
					dimension = 500;
					break
				case 3: // // 2 row 
					dimension = 500;
					break
				case 4: // oneRow
					dimension = 720;
					break
				default:
					dimension = 250;
					break
			}
		} else {
			switch (DefaultProductSize.Value) {
				case 1: // 4 row
					dimension = 250;
					break
				case 2: // 3 row
					dimension = 500;
					break
				case 3: // // 2 row 
					dimension = 500;
					break
				case 4: // oneRow
					dimension = 720;
					break
				default:
					dimension = 250;
					break
			}
		}
		return dimension
	}

	render() {
		const {
			item,
			pagePadding,
			borderRadius,
			smallBorderRadius,
			navigation,
			pushNavigation,
			textColor2,
			bgColor2,
			bgColor1,
		} = this.props

		const {
			Id,
			Icon: { ImageUrl },
			Name,
			Brand,
			Price,
			SalePrice,
			FlashDealsEnd,
		} = item

		return (
			<CustomTouchable
				onPress={() => {
					if (pushNavigation) {
						navigation.push('Product', { // Make Sure We Send Id  
							Id,
							screen: 'Product',
							params: { Id },
						})
					}
					else {
						navigation.navigate('Product', { // Make Sure We Send Id 
							screen: 'Product',
							params: { Id },
							Id
						})
					}
				}}
				style={{
					width: this.imageHeight,
				}}>
				<View
					style={{
						width: this.imageHeight,
						height: this.imageHeight,
						backgroundColor: bgColor1,
						borderRadius: smallBorderRadius,
						...shadowStyle2
					}}>
					<RemoteImage
						borderRadius={smallBorderRadius}
						dimension={this.handelDimension()}
						style={{
							borderRadius: smallBorderRadius,
							width: this.imageHeight,
							height: this.imageHeight,
						}}
						uri={ImageUrl} />

					<ProductStatusBadge // here
						data={item}
						badgeIconSize={8} // 
						fontSize={8}
						style={{
							position: 'absolute',
							top: 3,
							right: 3,
						}} />
				</View>

				<View
					style={{
						flex: 1,
						marginTop: pagePadding,
						justifyContent: 'space-between',
					}}>
					<View>
						<FontedText
							numberOfLines={2}
							ellipsizeMode="middle"
							style={{
								fontSize: this.DefaultFontSize,
								textAlign: 'left'
							}}>{Name}</FontedText>

						{Brand && <FontedText style={{ color: textColor2, fontSize: 16, }}>{Brand.Name}</FontedText>}
					</View>

					<DealCountDown
						size={this.DealCountDownSize}
						style={{ marginVertical: pagePadding }}
						until={FlashDealsEnd} />

					<View
						style={{
							marginTop: 5,
							flexDirection: 'row',
							justifyContent: 'space-between',
							alignItems: 'flex-end',
						}}>
						{
							SalePrice ?
								<View
									style={{
										flex: 1,
										flexWrap: 'wrap',
										flexDirection: 'row',
										alignItems: 'center',
									}}>
									<PriceText // herre
										contentContainerStyle={{
											backgroundColor: bgColor2,
											borderRadius,
											justifyContent: 'center',
											alignItems: 'center',
											padding: 5,
											marginRight: 3,
										}}
										style={{
											fontSize: this.DefaultFontSize,
											textAlign: 'left',
											fontWeight: 'bold',
										}}>{SalePrice}</PriceText>

									<PriceText
										style={{
											color: redColor,
											fontSize: 13,
											textAlign: 'left',
											textDecorationLine: 'line-through',
											textDecorationStyle: 'solid'
										}}>{Price}</PriceText>
								</View> :
								<View
									style={{
										backgroundColor: bgColor2,
										borderRadius,
										justifyContent: 'center',
										alignItems: 'center',
										padding: 5,
									}}>
									<PriceText style={{ fontSize: this.DefaultFontSize, textAlign: 'left', fontWeight: 'bold', }}>{Price}</PriceText>
								</View>
						}

						{this.renderCartButton()}
					</View>

					{this.renderCartControls()}
				</View>
			</CustomTouchable>
		)
	}
}


const mapStateToProps = ({
	runtime_config: {
		runtime_config: {
			styles,
			colors,
			screens: {
				Home_12_1: {
					AddToCartFromProductIndex,
				},
				Product_Details_09_5: {
					HomeProductOffersSize,
					ProductRelatedSize,
					YouMayLikeProductsStyle,
					DefaultProductSize
				}
			},
		},
	},
}) => ({
	AddToCartFromProductIndex,
	HomeProductOffersSize,
	ProductRelatedSize,
	DefaultProductSize,
	YouMayLikeProductsStyle,
	...styles,
	...colors,
})

export default connect(mapStateToProps)(withLocalize(HorizontalProduct))