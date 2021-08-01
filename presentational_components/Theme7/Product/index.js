import React, { Component } from 'react'
import { View,  FlatList } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import CustomButton from '../../../partial_components/Theme7/CustomButton';
import CustomHeader from '../../../partial_components/Common/CustomHeader';
import TranslatedText from '../../../partial_components/Common/TranslatedText';
import RemoteImage from '../../../partial_components/Common/RemoteImage';
import FontedText from '../../../partial_components/Common/FontedText';
import CustomStar from '../../../partial_components/Theme7/CustomStar';
import { withLocalize } from 'react-localize-redux';
import ProductTabs from './ProductTabs';
import { ScrollView } from 'react-native-gesture-handler';
import ProductOptionsList from '../../../partial_components/Common/ProductOptionsList';
import { redColor } from '../../../constants/Theme26/Colors';
import ItemSeparator from '../../../partial_components/Common/ItemSeparator';
import CustomTouchable from '../../../partial_components/Common/CustomTouchable';
import Container from '../../../partial_components/Common/Container';
import PriceText from '../../../partial_components/Common/PriceText';

class Product extends Component {
	constructor () {
		super()

		this.state = {
			selectedImgIndex: 0,
		}
	}

	renderImgItem = ({ item, index }) => {
		const { pagePadding } = this.props

		return (
			<CustomTouchable
				style={{ marginHorizontal: pagePadding }}
				onPress={() => this.setState({ selectedImgIndex: index})}>
				<RemoteImage
					uri={item.ImageUrl}
					style={{
						width: this.state.smallImageWidth,
						height: this.state.smallImageWidth,
					}} />
			</CustomTouchable>
		);
	}

	renderProductTabs = () => {
		if (this.props.didFetchData) {
			return (
				<ProductTabs
					screenProps={{
						...this.props
					}} />
			)
		}
		else {
			return null
		}
	}

	renderOption = (item, index) => {
		const { Members, Name, Type } = item
		const {
			largePagePadding,
			pagePadding,
			onOptionChange,
			bgColor1,
		} = this.props

		return (
			<View
				key={index}
				style={{
					backgroundColor: bgColor1,
					marginTop: pagePadding,
					paddingHorizontal: largePagePadding,
				}}>
				<FontedText style={{ fontWeight: 'bold', marginBottom: pagePadding }}>{Name}</FontedText>

				<ProductOptionsList
					type={Type.Id}
					selection={1}
					onSelect={(items) => {
						onOptionChange(item, items)
					}}
					data={Members} />
			</View>
		)
	}

	renderOptions = () => {
		const {
			Options,
		} = this.props

		if (Options) {
			return (
				<View>
					{Options.map(this.renderOption)}
				</View>
			)
		}
	}

	renderCartButton = () => {
		const { isAddedToCart, largePagePadding, submitLocked } = this.props

		if (isAddedToCart) {
			const { goToCart } = this.props

			return (
				<CustomButton
					onPress={goToCart}
					style={{
						marginHorizontal: largePagePadding,
						marginVertical: largePagePadding,
					}}
					title="Checkout" />
			)
		}
		else {
			const { addToCart } = this.props

			return (
				<CustomButton
					onPress={addToCart}
					style={{
						marginHorizontal: largePagePadding,
						marginVertical: largePagePadding,
					}}
					loading={submitLocked}
					title="AddToCart" />
			)
		}
	}

	renderLikeButton = () => {
		const { isLiked, mainColor, likeProduct } = this.props

		return (
			<CustomTouchable
				onPress={() => isLiked ? likeProduct(false) : likeProduct(true)}
				style={{
					flexDirection: 'row',
					alignItems: 'center'
				}}>
				<FontAwesome name='heart' size={18} color={mainColor} />
				<TranslatedText style={{ color: mainColor, marginLeft: 5 }} text={isLiked ? "Unlike" : "Like"} />
			</CustomTouchable>
		)
	}

	renderQuantityOffer = (item, index) => {
		const { addToCart, mainColor, textColor2, largePagePadding, translate, Pricing } = this.props
		const { Price } = Pricing
		const { LowStepQty, HighStepQty, Price: DealPrice } = item

		return (
			<View
				key={index}
				style={{
					flexDirection: 'row',
					justifyContent: 'space-between',
					alignItems: 'center',
					marginHorizontal: largePagePadding,
					marginBottom: largePagePadding,
				}}>
				<View
					style={{
						flex: 1,
					}}>
					<View
						style={{
							flexDirection: 'row',
						}}>
						<PriceText style={{ fontSize: 18 }}>{DealPrice}</PriceText>

						<PriceText
							style={{
								fontSize: 18,
								color: redColor,
								textAlign: 'left',
								textDecorationLine: 'line-through',
								textDecorationStyle: 'solid',
								marginHorizontal: 5
							}}>{Price}</PriceText>

						<TranslatedText style={{ fontSize: 18 }} text='PerOne' />
					</View>

					<FontedText style={{ color: textColor2, fontSize: 18 }}>{translate('Quantity')} {LowStepQty}~{HighStepQty}</FontedText>
				</View>

				<View
					style={{
						flex: 1,
						alignItems: 'flex-end',
					}}>
					<CustomTouchable
						onPress={() => addToCart(LowStepQty)}
						style={{
							backgroundColor: 'transparent',
							flexDirection: 'row',
							justifyContent: 'center',
							alignItems: 'center',
						}}>
						<FontedText style={{ color: mainColor, fontSize: 18, marginRight: 5, }}>{LowStepQty}</FontedText>
						<FontAwesome name="plus" color={mainColor} size={18} />
					</CustomTouchable>

					<FontedText style={{ color: textColor2, fontSize: 18 }}>{translate('Save')} {Currency.Name}{Price - DealPrice} {`(%${Math.ceil(DealPrice / (Price / 100))})`}</FontedText>
				</View>
			</View>
		)
	}

	renderQuantityOffers = () => {
		const { Pricing: { priceSteps } } = this.props

		if (priceSteps && priceSteps.length) {
			return (
				<View>
					{priceSteps.map(this.renderQuantityOffer)}
				</View>
			)
		}
	}

	render() {
		const {
			Description,
			Pricing,
			Rating,
			ReviewsCount,
			textColor1,
			textColor2,
			Images,
			pagePadding,
			largePagePadding,
			Currency,
			translate,
			HideAddToCart,
		} = this.props

		const { Price, SalePrice } = Pricing

		return (
			<Container>
				<CustomHeader
					navigation={this.props.navigation}
					title={"Product"}
					leftComponent="back" />
				
				<ScrollView>
					<View
						style={{ 
							flexDirection: 'row', 
							justifyContent: 'space-between', 
							alignItems: 'center', 
							margin: largePagePadding, 
						}}>
						<View
							style={{
								flex: 1,
							}}>
							<FontedText style={{ fontSize: 26, fontWeight: 'bold' }}>{Description ? Description.Name : null}</FontedText>
						</View>

						{/*
						todo: fix currency like Theme26

						Pricing && <View>
							{SalePrice ? <View>
								<PriceText>{SalePrice}</PriceText>
								<FontedText style={{ color: redColor, textDecorationLine: 'line-through', textDecorationStyle: 'solid' }}>{Currency.Name}{Price}</FontedText>
								<FontedText style={{}}>{translate('Save')} {Currency.Name}{Price - SalePrice} {`(%${Math.ceil((((Price - SalePrice) / Price) * 100))})`}</FontedText>
							</View> : <View>
								<PriceText>{Price}</PriceText>
							</View>}
						</View>*/}
					</View>

					<View
						style={{  }}
						onLayout={(event) => this.setState({
							largeImageWidth: event.nativeEvent.layout.width,
							smallImageWidth: event.nativeEvent.layout.width * 0.235
						})}>
						{this.state.largeImageWidth && <RemoteImage
							dimension={720}
							uri={Images ? Images[this.state.selectedImgIndex].ImageUrl : 'http://'}
							style={{
								marginHorizontal: largePagePadding,
								width: this.state.largeImageWidth - (largePagePadding * 2), 
								height: this.state.largeImageWidth - (largePagePadding * 2),
							}} />}

						<FlatList
							horizontal={true}
							style={{ marginTop: largePagePadding, paddingHorizontal: pagePadding }}
							keyExtractor={item => `${item.ImageUrl}`}
							data={Images}
							renderItem={this.renderImgItem} />
					</View>

					<View style={{ marginVertical: largePagePadding, paddingVertical: largePagePadding, paddingHorizontal: largePagePadding }}>
						<View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
							<View style={{ flexDirection: 'row', alignItems: 'center' }}>
								<CustomStar rating={Rating} />
								<FontedText style={{ alignSelf: 'center', marginLeft: 6, color: textColor1 }}>{ReviewsCount} {translate('Reviews')}</FontedText>
							</View>

							{this.renderLikeButton()}
						</View>

						<FontedText style={{ color: textColor2, textAlign: 'left', marginTop: largePagePadding }}>{Description ? Description.Description : null}</FontedText>
					</View>

					{!HideAddToCart && <View>
						{this.renderOptions()}
						{this.renderCartButton()}
					</View>}
					
					{this.renderQuantityOffers()}

					<ItemSeparator />
					
					{this.renderProductTabs()}
				</ScrollView>
			</Container>
		);
	}
}

export default withLocalize(Product)