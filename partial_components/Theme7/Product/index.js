import React, { PureComponent } from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'
import FontedText from '../../Common/FontedText';
import RemoteImage from '../../Common/RemoteImage';
import { AddCartItem } from '../../../services/CartService';
import { redColor } from '../../../constants/Theme26/Colors';
import CustomTouchable from '../../../partial_components/Common/CustomTouchable';
import PriceText from '../../Common/PriceText';
import { LongToast } from '../../../utils/Toast';
import { IsProductCheckoutEligible } from '../../../utils/Product';

class Product extends PureComponent {
	constructor(props) {
		super(props)

		const {
			isAddedToCart,
		} = this.props.item

		this.state = {
			isAddedToCart,
		}
	}

	addToCart = () => {
		if (IsProductCheckoutEligible(this.props.item)) {
			const { Id } = this.props.item

			AddCartItem(Id, 1, null, () => {
				this.setState({ isAddedToCart: true })
			})
		}
		else {
			LongToast("CantAddToCart")
		}
	}

	goToCart = () => {
		this.props.navigation.navigate("Cart")
	}

	renderCartButton = () => {
		return null
		/*const { isAddedToCart } = this.state
		const { mainColor } = this.props

		if (isAddedToCart) {
			return (
				<CustomTouchable
					onPress={this.goToCart}>
					<MaterialCommunityIcons name='cart-arrow-right' size={32} color={mainColor} />
				</CustomTouchable>
			)
		}
		else {
			return (
				<CustomTouchable
					onPress={this.addToCart}>
					<MaterialCommunityIcons name='plus-circle' size={32} color={mainColor} />
				</CustomTouchable>
			)
		}*/
	}

	render() {
		const {
			item,
			pagePadding,
			mainColor,
			textColor2,
			navigation,
			pushNavigation,
		} = this.props

		const {
			Id,
			Icon: { ImageUrl },
			Name,
			ShortDescription,
			Price,
			SalePrice
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
				style={{ flex: 1, borderRadius: 2, marginHorizontal: pagePadding / 2 }}>
				<RemoteImage
					resizeMode='cover'
					dimension={250}
					style={{
						height: 180,
					}}
					uri={ImageUrl}
				/>

				<View
					style={{
						flex: 1,
						justifyContent: 'space-between',
						paddingVertical: pagePadding,
					}}>
					<View>
						<FontedText style={{ fontSize: 15, textAlign: 'left' }}>{Name}</FontedText>
						<FontedText style={{ color: textColor2, fontSize: 15, textAlign: 'left' }}>{ShortDescription}</FontedText>
					</View>

					<View
						style={{
							flexDirection: 'row',
							justifyContent: 'space-between',
							alignItems: 'center',
						}}>

						{
							SalePrice == null || SalePrice == 0 ?
								<PriceText style={{ color: mainColor, fontSize: 15, textAlign: 'left' }}>{Price}</PriceText> :

								<View>
									<PriceText style={{ color: mainColor, fontSize: 15, textAlign: 'left' }}>{SalePrice}</PriceText>
									<PriceText style={{ color: redColor, fontSize: 15, textAlign: 'left', textDecorationLine: 'line-through', textDecorationStyle: 'solid', }}>{Price}</PriceText>
								</View>

						}
						{this.renderCartButton()}
					</View>
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
		},
	},
}) => ({
	...styles,
	...colors,
})

export default connect(mapStateToProps)(Product)