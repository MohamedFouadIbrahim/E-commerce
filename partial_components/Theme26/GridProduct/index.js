import React, { PureComponent } from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'
import FontedText from '../../Common/FontedText';
import { redColor } from '../../../constants/Theme26/Colors';
import RemoteImage from '../../Common/RemoteImage';
import { screenWidth } from '../../../constants/Metrics';
import { shadowStyle2 } from '../../../constants/Style';
import { withLocalize } from 'react-localize-redux';
import CustomTouchable from '../../../partial_components/Common/CustomTouchable';
import ProductStatusBadge from '../ProductStatusBadge';
import CartButton from '../CartButton';
import CartButtonWithLike from '../CartButtonWithLike';
import CartControls from '../CartControls';
import DealCountDown from '../DealCountDown';
import PriceText from '../../Common/PriceText';
import StarRating from 'react-native-star-rating';

class GridProduct extends PureComponent {
	constructor(props) {
		super(props)

		const {
			largePagePadding,
			item,
			width
		} = this.props


		const {
			AddedToCartQty,
		} = item

		switch (width) { // numberOfCulomns
			case 1:
				this.DealCountDownSize = 15
				this.dimension = 720
				this.badgeIconSize = 12
				this.badgeIconFontSize = 11
				this.starSize = 12 // 12
				this.SizeCartButton = 32
				this.ProductNameSize = 15
				this.AddToCartFontSize = 12
				this.PriceStyle1 = {
					SalePricefontSize: 11,
					PricefontSize: 11
				}
				this.PriceStyle2 = {
					SalePricefontSize: 11,
					PricefontSize: 11
				}
				this.QuantityButtonsSize = 19
				break;

			case 2:
				this.DealCountDownSize = 15
				this.dimension = 500
				this.badgeIconSize = 12
				this.badgeIconFontSize = 11
				this.starSize = 12 // 12
				this.SizeCartButton = 32
				this.AddToCartFontSize = 12
				this.ProductNameSize = 15
				this.PriceStyle1 = {
					SalePricefontSize: 14,
					PricefontSize: 13
				}

				this.PriceStyle2 = {
					SalePricefontSize: 14,
					PricefontSize: 11
				}
				this.QuantityButtonsSize = 19
				break

			case 3:
				this.DealCountDownSize = 15
				this.dimension = 500
				this.badgeIconSize = 10
				this.badgeIconFontSize = 9
				this.starSize = 10
				this.SizeCartButton = 22
				this.ProductNameSize = 13
				this.AddToCartFontSize = 10
				this.PriceStyle1 = {
					SalePricefontSize: 11,
					PricefontSize: 8
				}
				this.PriceStyle2 = {
					SalePricefontSize: 11,
					PricefontSize: 8
				}
				this.QuantityButtonsSize = 12
				break;
			case 4:
				this.DealCountDownSize = 15
				this.dimension = 250
				this.badgeIconSize = 10
				this.badgeIconFontSize = 9
				this.AddToCartFontSize = 7
				this.starSize = 15
				this.SizeCartButton = 20
				this.ProductNameSize = 11
				this.PriceStyle1 = {
					SalePricefontSize: 11,
					PricefontSize: 9
				}
				this.PriceStyle2 = {
					SalePricefontSize: 11,
					PricefontSize: 8
				}
				this.QuantityButtonsSize = 12
				break
			default:
				this.DealCountDownSize = 15
				this.dimension = 500
				this.badgeIconSize = 12
				this.badgeIconFontSize = 11
				this.starSize = 12 // 12
				this.SizeCartButton = 32
				this.AddToCartFontSize = 12
				this.ProductNameSize = 15
				this.PriceStyle1 = {
					SalePricefontSize: 14,
					PricefontSize: 13
				}
				this.PriceStyle2 = {
					SalePricefontSize: 14,
					PricefontSize: 11
				}
				this.QuantityButtonsSize = 19
				break
		}

		this.itemsMargin = largePagePadding
		this.halfItemsMargin = this.itemsMargin / 4
		if (width == 1) {
			this.itemsWidth = ((screenWidth - (this.itemsMargin * 2.5)) / width) + 10
		} else {
			this.itemsWidth = (screenWidth - (this.itemsMargin * 2.5)) / width
		}

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

		if (AddToCartFromProductIndex.Value !== 1 && AddToCartFromProductIndex.Value !== 4) {
			const { AddedToCartQty } = this.state

			const {
				ProductMinQty,
			} = item

			return (
				<CartButton
					size={this.SizeCartButton}
					navigation={this.props.navigation}
					isAddedToCart={AddedToCartQty >= ProductMinQty ? true : false}
					item={item}
					onAddedToCart={this.onAddedToCart} />
			)
		}
	}

	renderCartButtonWithLike = () => {
		const {
			AddToCartFromProductIndex,
			item,
			translate,
			index
		} = this.props

		if (AddToCartFromProductIndex.Value == 4) {
			const { AddedToCartQty } = this.state

			const {
				ProductMinQty,
				isLiked
			} = item

			return (
				<CartButtonWithLike
					fontSize={this.AddToCartFontSize}
					iconSize={this.badgeIconSize}
					isLiked={isLiked}
					index={index}
					translate={translate}
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
					size={this.QuantityButtonsSize}
					item={item}
					Quantity={AddedToCartQty}
					onQuantityChange={this.onQuantityChange}
					style={{
						marginTop: pagePadding,
					}} />
			)
		}
	}

	renderStars = () => {

		const {
			item,
			pagePadding,
			ShowRating
		} = this.props

		const {
			Rating,
			ReviewsCount
		} = item
		// here
		if (ShowRating.Value == true) {
			return (
				<View style={{ marginHorizontal: pagePadding, flexDirection: 'row', alignSelf: 'center', marginTop: 5 }} >
					<StarRating rating={Rating != 0 ? Rating : 5} starSize={this.starSize} fullStarColor={'#ebcc1c'} containerStyle={{ marginTop: 3 }} />
					<FontedText
						style={{ marginHorizontal: 5, fontSize: 12 }}
					>
						{`(${ReviewsCount})`}
					</FontedText>
				</View>
			)
		}

	}
	renderPrice = () => {

		const {
			item,
			borderRadius,
			bgColor2,
			PriceStyle,
			translate,
			AddToCartFromProductIndex,
			width
		} = this.props

		const {
			Price,
			SalePrice,
			SaleOff
		} = item

		const {
			DealCountDownSize,
			PricefontSize,
			SalePricefontSize,
			badgeIconSize
		} = this.PriceStyle1

		if (PriceStyle.Value == 'style1') {
			return (
				<View
					style={{
						marginTop: 5,
						flexDirection: 'row',
						justifyContent: AddToCartFromProductIndex.Value !== 4 ? 'space-between' : 'center',
						alignItems: 'flex-end',
						marginBottom: width == 1 || width == 2 ? 5 : 2
					}}>
					{
						SalePrice ?
							<View
								style={{
									flex: 1,
									flexWrap: 'wrap',
									flexDirection: 'row',
									alignItems: 'center',
									justifyContent: AddToCartFromProductIndex.Value !== 4 ? 'flex-start' : 'center'
								}}>
								<PriceText
									contentContainerStyle={{
										backgroundColor: bgColor2,
										borderRadius,
										justifyContent: 'center',
										alignItems: 'center',
										padding: width == 3 || width == 4 ? 2 : 5,
										marginRight: 3,
									}}
									style={{
										fontSize: width == 3 || width == 4 ? SalePricefontSize + 2 : SalePricefontSize, // here 14
										textAlign: 'left',
										fontWeight: 'bold',
									}}>{SalePrice}</PriceText>

								<PriceText
									style={{
										color: redColor,
										fontSize: width == 3 || width == 4 ? PricefontSize + 2 : PricefontSize, // here 13
										textAlign: 'left',
										textDecorationLine: 'line-through',
										textDecorationStyle: 'solid',
									}}>{Price}</PriceText>
							</View> : <View
								style={{
									backgroundColor: bgColor2,
									borderRadius,
									justifyContent: 'center',
									alignItems: 'center',
									padding: 5, // here
								}}>
								<PriceText style={{
									fontSize: width == 3 || width == 4 ? SalePricefontSize + 2 : SalePricefontSize, //14
									textAlign: 'left',
									fontWeight: 'bold'
								}}>{Price}</PriceText>

							</View>
					}

					{this.renderCartButton()}
				</View>
			)
		} else if (PriceStyle.Value == 'style2') {

			const {
				PricefontSize,
				SalePricefontSize,
			} = this.PriceStyle2

			return (
				<View
					style={{
						marginTop: 0,
						flexDirection: 'row',
						justifyContent: AddToCartFromProductIndex.Value !== 4 ? 'space-between' : 'center',
						alignContent: 'center'
					}}>
					{
						SalePrice ?
							<View
								style={{
									flex: 1,
									flexWrap: 'wrap',
									flexDirection: 'row',
									justifyContent: 'center'
								}}>

								<PriceText
									style={{
										color: redColor,
										fontSize: PricefontSize, // here 11 
										textAlign: 'left',
										textDecorationLine: 'line-through',
										textDecorationStyle: 'solid',
									}}>{Price}</PriceText>

								<PriceText
									contentContainerStyle={{
										justifyContent: 'center',
										alignItems: 'center',
										paddingVertical: 5
										// padding: 5,
									}}
									style={{
										fontSize: SalePricefontSize, // here 14
										textAlign: 'left',
										fontWeight: 'bold',
									}}>{SalePrice}</PriceText>

								<View
									style={{
										borderLeftWidth: 1,
										borderLeftColor: bgColor2,
										marginVertical: 5,
										marginHorizontal: 3
									}}
								/>
								<FontedText
									style={{
										textAlignVertical: 'center',
										fontSize: SalePricefontSize,
									}}
								>
									{`${SaleOff}% ${translate('Off')}`}
								</FontedText>
							</View> : <View
								style={{
									justifyContent: 'center',
									alignItems: 'center',
									padding: 5,
								}}>
								<PriceText style={{
									fontSize: SalePricefontSize, // here
									textAlign: 'left',
									fontWeight: 'bold',
								}}>{Price}</PriceText>

							</View>
					}
					{this.renderCartButton()}
				</View>
			)
		}

	}

	handelWidth = () => {
		switch (this.props.width) {
			case 1:
				return 0
			case 2:
				return 10
			case 3:
				return 8
			case 4:
				return 5
			default:
				return 10
		}
	}

	handelHeight = () => {

		const defaultHeight = 190

		// const newHeight = (defaultHeight / this.itemsWidth) * this.itemsWidth (Not Working As We Excepcted)


		switch (this.props.width) { // numberofclu
			case 1:
				return defaultHeight + 30
			case 2:
				return defaultHeight
			case 3:
				return defaultHeight - 60
			case 4:
				return defaultHeight - 30
			default:
				return defaultHeight
		}
	}

	handelDimension = () => {
		this.dimension
	}

	render() {
		const {
			item,
			pagePadding,
			borderRadius,
			smallBorderRadius,
			index,
			navigation,
			pushNavigation,
			textColor2,
			bgColor2,
			bgColor1,
			PriceStyle,
			AddToCartFromProductIndex,
			RealItemWidth,
			RealItemMargin
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
						navigation.push('Product', {
							screen: 'Product',
							params: { Id },
						})
					}
					else {
						navigation.navigate('Product', {
							screen: 'Product',
							params: { Id },
						})
					}
				}}
				style={[{
					width: RealItemWidth,
					marginHorizontal: RealItemMargin,
					borderRadius: smallBorderRadius,
					backgroundColor: bgColor1,
					flex: this.props.width > 1 ? 1 : null,
					...shadowStyle2
				}]}>
				<View
					style={{
						width: '100%',
						height: this.handelHeight(),
						borderTopLeftRadius: smallBorderRadius,
						borderTopRightRadius: smallBorderRadius
					}}>
					<RemoteImage
						dimension={this.dimension}
						original={this.dimension == 720 ? true : false}
						style={{
							borderTopLeftRadius: smallBorderRadius,
							borderTopRightRadius: smallBorderRadius,
							//flex: this.props.width > 1 ? 1 : null,
							flex: 1,
						}}
						uri={ImageUrl} />

					<ProductStatusBadge
						badgeIconSize={this.badgeIconSize}
						fontSize={this.badgeIconFontSize}
						data={item}
						style={{
							position: 'absolute',
							top: 3,
							right: 3,
						}} />
				</View>

				<View
					style={{
						flex: 1,
						padding: pagePadding,
						paddingBottom: AddToCartFromProductIndex.Value == 4 ? 0 /* style 1 add to cart button*/ : null/*style 2 add to cart button */,
					}}>
					<View>
						<FontedText
							numberOfLines={2}
							ellipsizeMode="middle"
							style={{
								fontSize: this.ProductNameSize, // here 15
								textAlign: 'left'
							}}>{Name}</FontedText>

						{Brand && <FontedText style={{ color: textColor2, fontSize: 16, }}>{Brand.Name}</FontedText>}
					</View>

					<DealCountDown
						size={this.DealCountDownSize} // here
						style={{ marginVertical: pagePadding }}
						until={FlashDealsEnd} />

					{this.renderStars()}

					{this.renderPrice()}

					{this.renderCartControls()}
				</View>
				{this.renderCartButtonWithLike()}

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
					ShowRating,
					PriceStyle
				},
			},
		},
	},
}) => ({
	PriceStyle,
	ShowRating,
	AddToCartFromProductIndex,
	...styles,
	...colors,
})

export default connect(mapStateToProps)(withLocalize(GridProduct))