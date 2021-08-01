import React, { Component } from 'react'
import {
	View,
	ScrollView,
	FlatList,
	ActivityIndicator,
	BackHandler,
	TouchableWithoutFeedback
} from 'react-native'
import { redColor, lightRedColor } from '../../../constants/Theme26/Colors';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import CustomStar from '../../../partial_components/Theme26/CustomStar';
import HorizontalProductsList from '../../../partial_components/Theme26/HorizontalProductsList';
import GridProductsList from '../../../partial_components/Theme26/GridProductsList';
import CloseButton from '../../../partial_components/Theme26/CloseButton';
import FontedText from '../../../partial_components/Common/FontedText';
import { screenWidth } from '../../../constants/Metrics';
import { shadowStyle0 } from '../../../constants/Style';
import CustomMapView from '../../../partial_components/Common/CustomMapView';
import { withLocalize } from 'react-localize-redux';
import ProductOptionsList from '../../../partial_components/Common/ProductOptionsList';
import TranslatedText from '../../../partial_components/Common/TranslatedText';
import RemoteImage from '../../../partial_components/Common/RemoteImage';
import CustomButton from '../../../partial_components/Common/CustomButton';
import SectionSeparator from '../../../partial_components/Common/SectionSeparator';
import CustomTouchable from '../../../partial_components/Common/CustomTouchable';
import ImageViewer from 'react-native-image-zoom-viewer'
import ProductStatusBadge from '../../../partial_components/Theme26/ProductStatusBadge';
import { GetCurrentPosition, OpenGoogleMaps } from '../../../utils/Location';
import CustomWebView from '../../../partial_components/Common/CustomWebView';
import CustomImagesSlider from '../../../partial_components/Theme26/CustomImagesSlider';
import ItemSeparator from '../../../partial_components/Common/ItemSeparator';
import CollectionProduct from '../../../partial_components/Theme26/CollectionProduct';
import { callPhoneNumber } from '../../../utils/Phone';
import CurrentLocationButton from '../../../partial_components/Common/CurrentLocationButton';
import Container from '../../../partial_components/Common/Container';
import PriceText from '../../../partial_components/Common/PriceText';
import PriceTextContainer from '../../../partial_components/Common/PriceTextContainer';
import CustomSelector from '../../../partial_components/Common/CustomSelector';
import PopupsSlider from '../../../partial_components/Theme26/PopupsSlider';
import CustomModal from '../../../partial_components/Common/CustomModal';
import RemoteScalableImage from '../../../partial_components/Common/RemoteScalableImage';
import FastImage from 'react-native-fast-image';
class Product extends Component {
	constructor(props) {
		super(props)

		this.state = {
			fullMapShown: false,
			displayPurchasedProducts: false,
			displayMoreDescription: false,
			latitude: 0,
			longitude: 0,
			UpdateOptions: false,
			trig: false
		}

		this.customSelectoreRef = React.createRef();
		this.opions = [{ Id: 0, Name: this.props.translate('AddToCart') }, { Id: 1, Name: this.props.translate('BuyNow') }]
	}

	renderPopUpsModal = () => {
		const {
			largePagePadding,
			iconColor1,
			bgColor1,
			Popups = {},
			onPressSliderImage,
			bgColor2
		} = this.props

		let isImage = false

		const target = Popups

		if (target && target.Icon) {
			isImage = true
		}

		const {
			showModal
		} = this.state

		if (!target) {
			return null
		}


		if (isImage) {
			return (
				<CustomModal
					visible={showModal}
					style={{ justifyContent: 'center' }}
					contentContainerStyle={{ backgroundColor: 'none', padding: 0 }}
					onClose={() => {
						this.setState({ showModal: false })
					}}
				>

					<CustomTouchable
						onPress={() => { this.setState({ showModal: false }) }}
						style={{
							top: 5,
							right: 0,
							position: 'absolute',
							zIndex: 2,
							backgroundColor: bgColor1,
							borderRadius: 20,
							width: 40,
							height: 40,
							justifyContent: 'center',
							alignItems: 'center',
							borderColor: bgColor2,
							borderWidth: 1,
							...shadowStyle0
						}}>
						<Ionicons name='ios-close' color={iconColor1} size={30} style={{ marginTop: 5 }} />
					</CustomTouchable>

					<TouchableWithoutFeedback onPress={() => {
						this.setState({ showModal: false }, () => onPressSliderImage(target))
					}}  >

						<RemoteScalableImage
							dimension={720}
							wide={true}
							original={true}
							item={target.Icon}
							uri={target.Icon.ImageUrl}
							width={screenWidth - largePagePadding}
							style={{ zIndex: 1, }}
						/>

					</TouchableWithoutFeedback>

				</CustomModal>
			)
		} else {
			return (
				<CustomModal
					visible={showModal}
					style={{ justifyContent: 'center' }}
					contentContainerStyle={{ padding: 0 }}
					onClose={() => {
						this.setState({ showModal: false })
					}}
				>

					<CustomTouchable
						onPress={() => { this.setState({ showModal: false }) }}
						style={{
							top: 5,
							right: 10,
							position: 'absolute',
							zIndex: 2,
							backgroundColor: bgColor1,
							borderRadius: 20,
							width: 40,
							height: 40,
							justifyContent: 'center',
							alignItems: 'center',
							borderColor: bgColor2,
							borderWidth: 1,
							...shadowStyle0
						}}>
						<Ionicons name='ios-close' color={iconColor1} size={30} style={{ marginTop: 5 }} />
					</CustomTouchable>

					{target?.Title && <FontedText style={{ fontSize: 15, alignSelf: 'flex-start', marginLeft: largePagePadding, marginTop: largePagePadding, fontWeight: 'bold' }} >{target.Title}</FontedText>}

					<ItemSeparator style={{ width: '90%', marginTop: largePagePadding }} />

					{target?.Body && <FontedText style={{ marginVertical: largePagePadding, alignSelf: 'flex-start', fontSize: 15, marginLeft: largePagePadding }} >{target.Body}</FontedText>}

					<ItemSeparator style={{ width: '90%', marginBottom: largePagePadding }} />

					<CustomButton title='letsGo' onPress={() => {
						this.setState({ showModal: false }, () => onPressSliderImage(target))
					}} style={{ alignSelf: 'flex-end', right: 10, marginBottom: 10, ...shadowStyle0 }} />

				</CustomModal>
			)
		}
	}

	componentDidMount() {
		const {
			ShowRelatedProduct,
		} = this.props

		if (ShowRelatedProduct.Value) {
			setTimeout(() => {
				this.setState({
					displayPurchasedProducts: true,
				})
			}, 2000);
		}
		this.addBackHandlerListener()
		// alert(this.state.OptionsPosX)
		const {
			Popups = {},
		} = this.props

		if (Popups) {
			this.setState({ showModal: true })
		}
	}

	getLocation = () => {
		GetCurrentPosition((data) => {
			this.setState({
				latitude: data.latitude,
				longitude: data.longitude,
				errorLocation: false
			})
		})

	}

	renderFixedContent = () => {
		const {
			largePagePadding,
			pagePadding,
			textColor1,
			bgColor2,
			HideProductImageControl,
			onSharePress
		} = this.props

		return (
			<View
				style={{
					flexDirection: 'row',
					alignItems: 'center',
					position: 'absolute',
					top: largePagePadding,
					right: largePagePadding,
				}}>
				{!HideProductImageControl.Value &&
					<View
						style={{
							flexDirection: 'row',
						}}
					>
						<CustomTouchable
							onPress={this.toggleZoomSlider}
							style={{
								backgroundColor: bgColor2,
								justifyContent: 'center',
								alignItems: 'center',
								width: 35,
								height: 35,
								borderRadius: 17.5,
								// marginRight: pagePadding,
							}}>
							<MaterialCommunityIcons name="image-multiple" color={textColor1} size={20} />
						</CustomTouchable>

						<CustomTouchable
							onPress={onSharePress}
							style={{
								backgroundColor: bgColor2,
								justifyContent: 'center',
								alignItems: 'center',
								width: 35,
								height: 35,
								borderRadius: 17.5,
								marginHorizontal: pagePadding
							}}>
							<MaterialCommunityIcons name="share" color={textColor1} size={20} />
						</CustomTouchable>

						<CloseButton
							onPress={() => {
								this.props.navigation.goBack()
							}} />
					</View>
				}


			</View>
		)
	}

	renderOption = (item, index) => {
		const {
			Members,
			Name,
			Type,
			ShowInProducts,
			AllowMultiple
		} = item

		if (!ShowInProducts || Members.length == 0) {
			return null
		}

		//hide it of all members are hidden
		if (Members.filter(a => !a.IsHidden).length == 0) {
			return null
		}

		const {
			largePagePadding,
			pagePadding,
			onOptionChange,
			textColor1,
			required
		} = this.props

		return (
			<View
				key={index}
				style={{
					marginBottom: pagePadding,
				}}>
				{Type.Id == 9 || Type.Id == 8 ?
					null :


					<View style={{ flexDirection: 'row', alignItems: 'center' }}>

						{required && required.length > 0 && required.includes(Name) && <AntDesign name='exclamationcircleo' color={redColor} style={{ marginLeft: largePagePadding, bottom: -1 }} size={15} />}

						<FontedText
							style={{
								color: required && required.length > 0 && required.includes(Name) ? redColor : textColor1,
								fontSize: 16,
								fontWeight: 'bold',
								marginHorizontal: required && required.length > 0 && required.includes(Name) ? pagePadding / 2 : largePagePadding,
							}}>{Name}</FontedText>

					</View>

				}
				<ProductOptionsList
					style={{
						marginTop: 5,
						marginHorizontal: largePagePadding,
					}}
					type={Type.Id}
					navigation={this.props.navigation}
					selection={AllowMultiple ? 2 : 1}
					onSelect={(items) => {
						onOptionChange(item, items)
					}}
					reset={this.state.UpdateOptions}
					typName={Type.Id == 9 || Type.Id == 8 ? Name : null}
					data={Members} />
			</View >
		)
	}

	renderOptions = () => {
		const { Options, largePagePadding, isChangingOption, mainColor, ShowProductOptionsInStandAlonePage } = this.props

		if (ShowProductOptionsInStandAlonePage.Value == 2) {
			return null
		}

		if (Options && Options.length && Options.filter(item => item.ShowInProducts == true).length > 0) {
			return (
				<View style={{ opacity: isChangingOption ? 0.5 : 1 }} onLayout={(e) => {
					const { nativeEvent: { layout: { y } } } = e
					this.setState({ OptionsPosy: y })
					this.setState({ optionHeight: e.nativeEvent.layout.height })
				}} >
					<SectionSeparator
						style={{
							marginVertical: largePagePadding,
						}} />

					{Options.map(this.renderOption)}
					{isChangingOption && <ActivityIndicator color={mainColor} size='large' style={{ bottom: this.state.optionHeight ? this.state.optionHeight / 2 : 0 }} />}

				</View>
			)
		}
	}

	toggleFullMap = () => {
		this.setState({ fullMapShown: !this.state.fullMapShown })
	}

	toggleZoomSlider = () => {
		this.setState({ zoomSliderShown: !this.state.zoomSliderShown })
	}

	renderFullMap = () => {
		const {
			fullMapShown,
			latitude,
			longitude,
		} = this.state

		const {
			Locations,
			largePagePadding,
		} = this.props

		if (fullMapShown) {
			return ([
				<CustomMapView
					key={0}
					initialRegion={{
						latitude: Locations[0].latitude,
						longitude: Locations[0].longitude,
						latitudeDelta: 0.4,
						longitudeDelta: 0.4,
					}}
					region={{
						latitude,
						longitude,
						latitudeDelta: 0.4,
						longitudeDelta: 0.4,
					}}
					markers={Locations}
					showsUserLocation={true} />
				, <CloseButton
					key={1}
					onPress={this.toggleFullMap}
					style={{
						position: 'absolute',
						top: largePagePadding,
						right: largePagePadding,
					}} />,
				<CurrentLocationButton
					key={3}
					size={35}
					style={{
						position: 'absolute',
						left: largePagePadding,
						top: largePagePadding,
						borderRadius: 30,
						paddingHorizontal: 2
					}}
					onPress={() => { this.getLocation() }}
				/>
			])
		}
	}

	renderCartButton = () => {
		const {
			isAddedToCart,
			borderRadius,
			submitLocked,
			pagePadding,
			mainColor,
			bgColor2,
			textColor2,
			AddToCartType,
			isChangingOption,
			AddToCartButtonStyle,
			onBuyNow
		} = this.props

		if (isAddedToCart) {
			if (AddToCartType.Value === 1) {
				const { goToCart } = this.props

				return (
					<CustomTouchable
						style={{
							flex: 1,
							height: 45,
							backgroundColor: bgColor2,
							flexDirection: 'row',
							justifyContent: 'center',
							alignItems: 'center',
							borderRadius,
							marginLeft: pagePadding,
						}}
						onPress={goToCart}>
						<MaterialCommunityIcons name='cart-arrow-right' size={20} color={textColor2} />
						<TranslatedText style={{ color: textColor2, marginLeft: 5 }} text={"Checkout"} />
					</CustomTouchable>
				)
			} else if (AddToCartType.Value === 3) {

				const { addToCart } = this.props

				return (
					<CustomButton
						disable={isChangingOption}
						onPress={addToCart}
						style={{
							flex: 1,
							height: 45,
							borderRadius,
							marginLeft: pagePadding,
						}}
						loading={submitLocked}
						title="AddToCart" />
				)
			}
			else {
				return (
					<CustomButton
						disable={true}
						activeOpacity={1.0}
						style={{
							flex: 1,
							height: 45,
							borderRadius,
							marginLeft: pagePadding,
						}}
						loading={false}
						backgroundColor={bgColor2}
						color={textColor2}
						title="AddedToCart" />
				)
			}
		}
		else {
			const { addToCart, canAddToCart, mainColorText } = this.props

			if (AddToCartButtonStyle.Value == 'addtocart') {

				const addToCartProps = canAddToCart ? {
					backgroundColor: mainColor
				} : {
						disable: true,
						activeOpacity: 1.0,
						backgroundColor: bgColor2,
						color: textColor2,
					}

				return (
					<CustomButton
						{...addToCartProps}
						onPress={addToCart}
						style={{
							flex: 1,
							height: 45,
							borderRadius,
							marginLeft: pagePadding,
						}}
						disable={isChangingOption}
						loading={submitLocked}
						title="AddToCart" />
				)

			} else if (AddToCartButtonStyle.Value == 'addtocartbuynow') {

				const addToCartProps = canAddToCart ? {
					backgroundColor: mainColor
				} : {
						disable: true,
						activeOpacity: 1.0,
						backgroundColor: bgColor2,
						color: textColor2,
					}

				return (
					<View
						style={{
							flex: 1,
						}}
					>
						<CustomTouchable
							style={{
								flexDirection: 'row',
								justifyContent: 'space-between',
								alignItems: 'center',
								height: 45,
								borderRadius,
								backgroundColor: mainColor,
								marginLeft: 10,
								flex: 1
							}} onPress={() => { this.customSelectoreRef.current.show() }} disable={isChangingOption}
							{...addToCartProps}>

							<View
								style={{
									justifyContent: 'center',
									alignItems: 'center',
									flex: 1,
								}}>

								<TranslatedText text={'AddToCart'} style={{
									color: mainColorText,
								}} />

							</View>

							<View
								style={{
									borderLeftWidth: 1,
									borderLeftColor: mainColorText,
									height: 45,
									justifyContent: 'center',
								}}
							>
								<MaterialCommunityIcons name={'chevron-down'} color={mainColorText} size={18} style={{ marginHorizontal: 5 }} />
							</View>

						</CustomTouchable>

						<CustomSelector
							ref={this.customSelectoreRef}
							options={this.opions.map(item => item.Name)}
							onSelect={(index) => {
								if (this.opions[index].Id == 0) {
									addToCart && addToCart()
								} else if (this.opions[index].Id == 1) {
									onBuyNow && onBuyNow()
								}
							}}
						/>
					</View>
				)
			} else { // buynow

				const addToCartProps = canAddToCart ? {
					backgroundColor: mainColor
				} : {
						disable: true,
						activeOpacity: 1.0,
						backgroundColor: bgColor2,
						color: textColor2,
					}

				return (
					<CustomButton
						{...addToCartProps}
						onPress={onBuyNow}
						style={{
							flex: 1,
							height: 45,
							borderRadius,
							marginLeft: pagePadding,
						}}
						disable={isChangingOption}
						loading={submitLocked}
						title="BuyNow" />
				)

			}
		}
	}

	renderLikeButton = () => {
		const { isLiked, likeProduct, borderRadius, bgColor2, textColor2, mainColorText, AddToCartButtonStyle } = this.props

		let additionalStyle = {}

		if (AddToCartButtonStyle.Value == 'addtocartbuynow') {
			additionalStyle = {
				paddingHorizontal: 10,
			}
		} else {
			additionalStyle = {
				flex: 1,
			}
		}
		return (
			<CustomTouchable
				onPress={() => isLiked ? likeProduct(false) : likeProduct(true)}
				style={{
					...additionalStyle,
					height: 45,
					backgroundColor: isLiked ? lightRedColor : bgColor2,
					flexDirection: 'row',
					justifyContent: 'center',
					alignItems: 'center',
					borderRadius,
					borderColor: redColor,
					borderWidth: isLiked ? 1 : 0
				}}>
				<FontAwesome name="heart" color={redColor} size={18} />
				<TranslatedText style={{ color: isLiked ? mainColorText : textColor2, marginLeft: 5 }} text={isLiked ? "Unlike" : "Like"} />
			</CustomTouchable>
		)
	}

	renderQuantity = () => {
		const {
			smallBorderRadius,
			bgColor2,
			textColor2,
			Qty,
			onIncrementQuantity,
			onDecrementQuantity,
			pagePadding,
		} = this.props

		return (
			<View
				style={{
					marginLeft: pagePadding,
					flexDirection: 'row',
					justifyContent: 'space-between',
					alignItems: 'center',
				}}>
				<View
					style={{
						flexDirection: 'row',
						alignItems: 'center',
					}}>
					<CustomTouchable
						onPress={onDecrementQuantity}
						style={{
							backgroundColor: bgColor2,
							justifyContent: 'center',
							alignItems: 'center',
							paddingHorizontal: 12,
							paddingVertical: 5,
							borderRadius: smallBorderRadius,
						}}>
						<Ionicons name={'md-remove'} color={textColor2} size={21} />
					</CustomTouchable>

					<View
						style={{
							justifyContent: 'center',
							alignItems: 'center',
							paddingHorizontal: 12,
							paddingVertical: 5,
							borderRadius: smallBorderRadius,
						}}>
						<FontedText style={{ fontSize: 18, }}>{Qty}</FontedText>
					</View>

					<CustomTouchable
						onPress={onIncrementQuantity}
						style={{
							backgroundColor: bgColor2,
							justifyContent: 'center',
							alignItems: 'center',
							paddingHorizontal: 12,
							paddingVertical: 5,
							borderRadius: smallBorderRadius,
						}}>
						<Ionicons name={'md-add'} color={textColor2} size={21} />
					</CustomTouchable>
				</View>
			</View>
		)
	}

	renderSliderThumbnail = ({ item, index }) => {
		const {
			smallBorderRadius,
			selectedSliderIndex,
		} = this.props

		const isSelected = selectedSliderIndex === index
		const imageDim = isSelected ? 42 : 50

		return (
			<RemoteImage
				uri={item.ImageUrl}
				style={{
					width: imageDim,
					height: imageDim,
					borderRadius: smallBorderRadius,
					marginTop: 35,
				}} />
		);
	}

	renderZoomSliderIndicator = (currentIndex, allSize) => {
		const {
			largePagePadding,
		} = this.props

		return (
			<View
				style={{
					paddingTop: largePagePadding,
					position: "absolute",
					zIndex: 1,
					alignItems: 'center',
					width: '100%',
				}}>
				<FontedText>{currentIndex} / {allSize}</FontedText>
			</View>
		)
	}

	addBackHandlerListener = () => {
		BackHandler.addEventListener('hardwareBackPress', () => {
			const { zoomSliderShown } = this.state

			if (zoomSliderShown) {
				this.setState({ zoomSliderShown: false })
				return true;
			}

			return false
		});
	}

	renderZoomSlider = () => {
		const {
			zoomSliderShown,
		} = this.state

		if (zoomSliderShown) {
			const {
				Images,
				bgColor1,
				largePagePadding,
			} = this.props

			return (
				<View
					style={{
						position: 'absolute',
						width: '100%',
						height: '100%',
					}}>
					<ImageViewer
						imageUrls={Images.map(item => ({ url: `${item.ImageUrl}?size=${1080}&wide=${false}&keepOriginalSize=${true}` }))}
						renderImage={(props) => <FastImage {...props} />}
						backgroundColor={bgColor1}
						renderIndicator={this.renderZoomSliderIndicator}
						saveToLocalByLongPress={false}
					/>

					<CloseButton
						onPress={this.toggleZoomSlider}
						style={{
							position: 'absolute',
							top: largePagePadding,
							right: largePagePadding,
						}} />
				</View>
			)
		}
	}

	renderQuantityOffer = (item, index) => {
		const { addToCart, Currency, mainColor, textColor2, largePagePadding, translate, Pricing, pagePadding, } = this.props

		const {
			Price,
		} = Pricing

		const { LowStepQty, HighStepQty, Price: DealPrice } = item

		return (
			<View
				key={index}>
				{index !== 0 && <ItemSeparator style={{ marginHorizontal: largePagePadding * 2, marginBottom: pagePadding }} />}

				<View
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
						<PriceTextContainer
							style={{
								justifyContent: 'flex-end',
								alignItems: 'center',
							}}>
							<PriceText style={{ fontSize: 18, fontWeight: 'bold' }}>{DealPrice}</PriceText>

							<PriceText
								contentContainerStyle={{
									marginHorizontal: 5
								}}
								style={{
									fontSize: 18,
									color: redColor,
									textAlign: 'left',
									textDecorationLine: 'line-through',
									textDecorationStyle: 'solid',
								}}>{Price}</PriceText>

							<TranslatedText style={{ fontSize: 18 }} text='PerOne' />
						</PriceTextContainer>

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

						<PriceTextContainer
							style={{
								alignItems: 'center',
							}}>
							<TranslatedText style={{ color: textColor2, fontSize: 18, marginHorizontal: 2, }} text="Save" />
							<PriceText style={{ color: textColor2, fontSize: 18, }}>{(Price - DealPrice).toFixed(2)}</PriceText>
							<FontedText style={{ color: textColor2, fontSize: 18, marginHorizontal: 5, }}>(%{Math.ceil(DealPrice / (Price / 100))})</FontedText>
						</PriceTextContainer>
					</View>
				</View>
			</View>
		)
	}

	renderQuantityOffers = () => {
		const {
			Pricing: { priceSteps },
			largePagePadding,
			pagePadding,
			textColor1,
			textColor2
		} = this.props

		if (priceSteps && priceSteps.length) {
			return (
				<View>
					<SectionSeparator
						style={{
							marginBottom: largePagePadding,
						}} />

					<TranslatedText style={{ color: textColor1, fontSize: 24, fontWeight: 'bold', marginHorizontal: largePagePadding, marginBottom: pagePadding }} text='Deals' />
					<TranslatedText style={{ color: textColor2, marginHorizontal: largePagePadding, marginBottom: pagePadding }} text='BuyMoreSaveMore' />
					{priceSteps.map(this.renderQuantityOffer)}
				</View>
			)
		}
	}

	renderPurchasedProducts = () => {
		if (this.state.displayPurchasedProducts) {
			const { Id, largePagePadding, translate, YouMayLikeProductsStyle, ProductRelatedSize } = this.props

			return (
				<View>
					<SectionSeparator
						style={{
							marginBottom: largePagePadding,
						}} />

					<View
						style={{
							flexDirection: 'row',
							justifyContent: 'space-between',
							alignItems: 'center',
							marginHorizontal: largePagePadding,
						}}>
						<FontedText style={{ fontSize: 24, fontWeight: 'bold', }}>{translate('CustomersAlsoPurchased')}</FontedText>
					</View>
					{YouMayLikeProductsStyle.Value == 1 ? // Horizontal
						<HorizontalProductsList
							fixScrollButton={true}
							url={"Product/AlsoPurchased"}
							params={`Id=${Id}`}
							contentContainerStyle={{
								paddingLeft: largePagePadding,
								marginTop: largePagePadding / 2
							}}
							specificProductSize={ProductRelatedSize}
							navigation={this.props.navigation} /> :

						<GridProductsList
							url={"Product/AlsoPurchased"}
							params={`Id=${Id}`}
							refresh={false}
							specificProductSize={ProductRelatedSize}
							contentContainerStyle={{
								paddingBottom: largePagePadding,
								paddingLeft: ProductRelatedSize.Value != 4 ? largePagePadding : 0,
								marginTop: largePagePadding / 2,
								alignSelf: 'center'
							}}
							navigation={this.props.navigation} />

					}

				</View>
			)
		}
		else if (this.props.ShowRelatedProduct.Value) {
			return (
				<ActivityIndicator
					color={this.props.mainColor}
					size='large' />
			)
		}
	}

	renderPrice = () => {
		const {
			bgColor2,
			textColor2,
			Pricing,
			smallBorderRadius,
			Status,
			HideProductPriceLabel
		} = this.props

		if (HideProductPriceLabel.Value) {
			return null
		}

		const { Price, SalePrice, ExtraPrice } = Pricing

		if (SalePrice) {
			return (
				<View>

					<View
						style={{
							flexDirection: 'row',
							alignItems: 'center',
							flexWrap: 'wrap',
							marginBottom: 5,
						}}>
						<PriceText
							style={{
								fontSize: 24,
								textAlign: 'left',
								fontWeight: 'bold'
							}}>{SalePrice}</PriceText>

						<PriceText
							contentContainerStyle={{
								marginHorizontal: 5,
							}}
							style={{
								color: redColor,
								fontSize: 17,
								textAlign: 'left',
								textDecorationLine: 'line-through',
								textDecorationStyle: 'solid'
							}}>{Price}</PriceText>

						<PriceTextContainer
							style={{
								backgroundColor: bgColor2,
								borderRadius: smallBorderRadius,
								padding: 5,
								justifyContent: 'center',
								alignItems: 'center',
								marginHorizontal: 5,
							}}>
							<TranslatedText style={{ fontSize: 10, color: textColor2, marginHorizontal: 1, }} text="Save" />
							<PriceText style={{ fontSize: 10, color: textColor2, }}>{(Price - SalePrice).toFixed(2)}</PriceText>
							<FontedText style={{ fontSize: 10, color: textColor2, marginLeft: 5 }}>(%{Math.ceil((((Price - SalePrice) / Price) * 100))})</FontedText>
						</PriceTextContainer>

						<ProductStatusBadge
							data={{ Status }} />
					</View>

					{ExtraPrice > 0 ? <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }} >
						<FontedText>{`+`}</FontedText>
						<PriceText>{ExtraPrice}</PriceText>
						<TranslatedText style={{ marginHorizontal: 5 }} text='ExtraPrice' />
					</View> : null}
				</View>
			)
		}
		else {
			return (
				<View
					style={{
						flexDirection: 'row',
						justifyContent: 'space-between',
						alignItems: 'center',
					}}>
					<View
						style={{
							flex: 1,
						}}>
						<PriceText style={{ fontSize: 24, textAlign: 'left', fontWeight: 'bold' }}>{Price}</PriceText>

						{ExtraPrice > 0 ? <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }} >
							<FontedText>{`+`}</FontedText>
							<PriceText>{ExtraPrice}</PriceText>
							<TranslatedText style={{ marginHorizontal: 5 }} text='ExtraPrice' />
						</View> : null}

					</View>

					<ProductStatusBadge
						data={{ Status }} />
				</View>
			)
		}
	}

	renderCollectionProduct = ({ item }) => {
		return (
			<CollectionProduct
				navigation={this.props.navigation}
				pushNavigation={true}
				item={item} />
		)
	}

	renderCollection = () => {
		const {
			Type,
			Collection,
			largePagePadding,
			pagePadding,
			textColor1,
		} = this.props

		if (Collection.length && Type.Id === 5) {
			return (
				<View>
					<SectionSeparator
						style={{
							marginVertical: largePagePadding,
						}} />

					<TranslatedText style={{ color: textColor1, fontSize: 24, fontWeight: 'bold', marginHorizontal: largePagePadding, marginBottom: pagePadding }} text='Collection' />

					<FlatList
						style={{
							paddingHorizontal: largePagePadding,
						}}
						keyExtractor={item => `${item.Id}`}
						data={Collection}
						ItemSeparatorComponent={() => <View style={{ height: pagePadding }} />}
						renderItem={this.renderCollectionProduct} />
				</View>
			)
		}
	}

	renderAdditionalDescription = (item, index) => {
		const {
			textColor2,
			largePagePadding,
		} = this.props

		const webViewWidth = screenWidth - largePagePadding * 2

		return (
			<CustomWebView
				key={index}
				style={{
					marginHorizontal: largePagePadding,
					width: webViewWidth,
				}}
				textColor={textColor2}
				source={item}
			/>
		)
	}

	displayMoreDescription = () => {

		this.setState({ trig: true }, () => {
			this.props.onPressSeeMore(() => {
				this.setState({ trig: false })
			})
		})

	}

	renderHtmlDescription = (hideSectionSeparator = false) => {
		const {
			textColor2,
			largePagePadding,
			pagePadding,
			hideOriginalDescription,
			AdditionalDescriptions,
			HideAddToCart,
			SectionsStyles,
			HideProductPriceLabel,
			mainColor,
			showSeeMore,
			seeMore,
			translate,
			Description,
		} = this.props

		const {
			trig
		} = this.state

		if (Description && Description.Description && (Description.IsSigninHtmlDescription || Description.IsHtmlDescription)) {
			const webViewWidth = screenWidth

			return (
				<View>
					{!hideSectionSeparator && <SectionSeparator
						style={{
							marginVertical: largePagePadding,
						}} />}

					{trig && <ActivityIndicator color={mainColor} size={'large'} />}

					{!hideOriginalDescription && Description.Description && Description.Description.length && !trig ? <CustomWebView
						style={{
							width: webViewWidth,
						}}
						textColor={textColor2}
						onShouldStartLoadWithRequest={ev => {
							return true
						}}
						source={`${Description.Description}`}
					/> : null}

					{Description && Description.IsSigninHtmlDescription && !seeMore && <View
						style={{
							justifyContent: 'center',
							alignItems: 'center',
						}}>
						<CustomTouchable
							onPress={this.displayMoreDescription}
							style={{
								flexDirection: 'row',
								justifyContent: 'center',
								alignItems: 'center',
							}}>
							<FontedText style={{ color: mainColor, fontSize: 16, marginRight: 5, }}>{translate('SeeMore')}</FontedText>
							<Ionicons name={'ios-arrow-down'} color={mainColor} size={18} />
						</CustomTouchable>
					</View>}

				</View>
			)
		}
	}

	renderThumbnails = () => {

		const { ShowThumbnails, Images = [], largePagePadding, pagePadding } = this.props

		if (ShowThumbnails.Value && Images.length > 1) {

			return (
				<FlatList
					horizontal={true}
					style={{
						paddingHorizontal: largePagePadding,
						marginBottom: largePagePadding,
					}}
					contentContainerStyle={{
						alignItems: 'center',
					}}
					keyExtractor={item => `${item.ImageUrl}`}
					data={Images}
					ItemSeparatorComponent={() => <View style={{ width: pagePadding }} />}
					renderItem={this.renderSliderThumbnail} />
			)
		}
		else {
			return (
				<View
					style={{
						marginBottom: largePagePadding,
					}}>
				</View>
			)
		}
	}

	renderTopDescription = () => {

		const {
			largePagePadding,
			Brand,
			HideProductNameShortDesc,
			Description,
			textColor2
		} = this.props

		return (
			<View>
				<View
					style={{
						paddingHorizontal: largePagePadding,
					}}>
					{this.renderPrice()}

					<View>
						{Brand && Brand.Name && Brand.Name.length ? <FontedText style={{ color: textColor2, fontSize: 16, textAlign: 'left' }}>{Brand.Name}</FontedText> : null}
						{!HideProductNameShortDesc.Value && <FontedText style={{ fontSize: 20, textAlign: 'left' }}>{Description.Name}</FontedText>}
						{Description.ShortDescription && Description.ShortDescription.length && !HideProductNameShortDesc.Value ? <FontedText style={{ color: textColor2, fontSize: 16, textAlign: 'left' }}>{Description.ShortDescription}</FontedText> : null}
					</View>
				</View>
			</View>
		)
	}

	renderSubStore = () => {
		const {
			store_type,
			ShowSubStore,
			SubStore,
			largePagePadding,
			textColor1,
			ShowSubStoreContactInfo,
			ShowSubStoreLocation,
			textColor2,
			translate,
			mainColor,
			pagePadding
		} = this.props

		if (store_type === 3 /*many to many*/ && ShowSubStore.Value /*show substore info*/ && SubStore/*substore product*/) {
			return (
				<View>
					<SectionSeparator
						style={{
							marginVertical: largePagePadding,
						}} />

					<CustomTouchable
						onPress={this.props.navigateToSubStore}
						style={{
							flexDirection: 'row',
							alignItems: 'center',
							paddingHorizontal: largePagePadding,
						}}>
						<RemoteImage
							dimension={250}
							style={{
								width: 50,
								height: 50,
								borderRadius: 35,
								marginRight: largePagePadding,
							}}
							uri={SubStore.Image.ImageUrl} />

						<View
							style={{
								flex: 1,
								justifyContent: 'center',
							}}>
							<FontedText style={{ color: textColor1, textAlign: 'left' }}>{SubStore.Name}</FontedText>

							{ShowSubStoreContactInfo.Value && <View
								style={{
								}}>
								{SubStore.Phone && SubStore.Phone.length && <CustomTouchable
									onPress={() => callPhoneNumber(SubStore.Phone)}
									style={{
										flexDirection: 'row',
										alignItems: 'center',
									}}>
									<Ionicons name={"ios-call"} color={textColor2} size={18} />
									<FontedText style={{ color: textColor2, textAlign: 'left', marginLeft: 5 }}>{SubStore.Phone}</FontedText>
								</CustomTouchable>}

								{SubStore.Address && SubStore.Address.length && <View
									style={{
										flexDirection: 'row',
										alignItems: 'center',
									}}>
									<Ionicons name={"md-home"} color={textColor2} size={21} />
									<FontedText style={{ color: textColor2, textAlign: 'left', marginLeft: 5 }}>{SubStore.Address}</FontedText>
								</View>}
							</View>}

							{ShowSubStoreLocation.Value && SubStore.latitude && SubStore.longitude && <CustomTouchable
								onPress={() => OpenGoogleMaps(SubStore.latitude, SubStore.longitude)}
								style={{
									justifyContent: 'center',
									alignSelf: 'flex-start',
									paddingTop: pagePadding,
									paddingBottom: 2,
									paddingRight: 30,
								}}>
								<FontedText style={{ color: mainColor, fontSize: 16, }}>{translate('ShowOnMap')}</FontedText>
							</CustomTouchable>}
						</View>
					</CustomTouchable>
				</View>
			)
		}
	}

	renderAddToCart = (hideSectionSeparator = false) => {

		const {
			largePagePadding,
			pagePadding,
			HideAddToCart,
		} = this.props

		if (!HideAddToCart) {
			return (
				<>
					{!hideSectionSeparator && <SectionSeparator
						style={{
							marginTop: pagePadding,
						}} />}
					<View
						style={{
							flexDirection: 'row',
							justifyContent: 'space-between',
							marginHorizontal: largePagePadding,
							marginVertical: pagePadding,
						}}>
						{this.renderLikeButton()}
						{this.renderCartButton()}
						{this.renderQuantity()}
					</View>
				</>
			)
		}
	}

	renderSectionStyle = () => {

		const {
			SectionsStyles,
			HideProductPriceLabel,
			HideAddToCart,
			Options,
			isChangingOption,
			mainColor,
			MiddlePopups,
			TopPopups,
			largePagePadding,
			pagePadding
		} = this.props

		if (SectionsStyles.Value == 'style1') {

			const hideAddToCartSectionSeparator = HideProductPriceLabel.Value
			const hideHtmlDescriptionSectionSeparator = HideAddToCart && HideProductPriceLabel.Value && !Options.length

			return (
				<>
					{this.renderAddToCart(hideAddToCartSectionSeparator)}
					{this.renderOptions()}

					{TopPopups && TopPopups.length > 0 && <View
						style={{ paddingBottom: pagePadding }}
					>
						<SectionSeparator
							style={{
								marginVertical: pagePadding,
							}} />

						{this.renderPopUp('TopPopupsProduct', TopPopups, {
						})}
					</View>}
					{this.renderHtmlDescription(hideHtmlDescriptionSectionSeparator)}
					{MiddlePopups && MiddlePopups.length > 0 && <View
						style={{ paddingBottom: pagePadding }}>
						<SectionSeparator
							style={{
								marginVertical: largePagePadding,
							}} />

						{this.renderPopUp('MiddlePopupsProduct', MiddlePopups, {
						})}
					</View>}
				</>
			)
		} else {

			const hideAddToCartSectionSeparator = HideAddToCart && HideProductPriceLabel.Value && !Options.length
			const hideHtmlDescriptionSectionSeparator = HideProductPriceLabel.Value

			return (
				<>
					{TopPopups && TopPopups.length > 0 && <View>
						<SectionSeparator
							style={{
								marginVertical: largePagePadding,
							}} />

						{this.renderPopUp('TopPopupsProduct', TopPopups, {
						})}
					</View>}
					{this.renderHtmlDescription(hideHtmlDescriptionSectionSeparator)}
					{MiddlePopups && MiddlePopups.length > 0 && <View>
						<SectionSeparator
							style={{
								marginVertical: largePagePadding,
							}} />

						{this.renderPopUp('MiddlePopupsProduct', MiddlePopups, {
						})}
					</View>}
					{this.renderOptions()}
					{this.renderAddToCart(hideAddToCartSectionSeparator)}
				</>
			)
		}

	}

	renderOneTouchPurchase = () => {

		const {
			ShowOneTouchPurchase,
			largePagePadding
		} = this.props

		if (ShowOneTouchPurchase.Value) {
			return (
				<>
					<SectionSeparator
						style={{
							marginVertical: largePagePadding,
						}} />

					<CustomButton
						style={{ marginVertical: 5, marginHorizontal: largePagePadding }}
						title={'OrderNow'}
						onPress={() => {
							this.props.onPressOnTouchOrder(() => {
								this.setState({ UpdateOptions: true }, () => {
									this.setState({ UpdateOptions: false })
								})
							})
						}}
						loading={this.props.orderNowSubmitLocked}
					/>
				</>
			)
		}
	}

	renderPopUp = (popUpName, popUp, style = {}) => {

		const {
			largePagePadding
		} = this.props

		return (
			<PopupsSlider
				name={popUpName}
				images={popUp}
				contentContainerStyle={style}
				navigation={this.props.navigation}
				pushNavigation={true}
			/>
		)

	}

	render() {
		const {
			largePagePadding,
			pagePadding,
			smallBorderRadius,
			bgColor2,
			mainColor,
			Images = [],
			Brand,
			Description,
			ReviewsCount,
			Rating,
			LikesCount,
			Locations,
			Id,
			QuestionsCount,
			translate,
			LatestQuestion,
			LatestReview,
			textColor1,
			textColor2,
			iconColor1,
			ShowMap,
			ShowSubStore,
			ShowSubStoreContactInfo,
			ShowSubStoreLocation,
			store_type,
			SubStore,
			HideAddToCart,
			ShowThumbnails,
			EnableReview,
			EnableQuestion,
			ShowTextImaageWide,
			selectedSliderIndex,
			onSliderImageChange,
			ShowOriginalImage,
			HideProductNameShortDesc,
			SectionsStyles,
			HideProductPriceLabel,
			ShowOneTouchPurchase,
			required,
			TopPopups,
			BottomPopups,
			MiddlePopups
		} = this.props

		// console.log(TopPopups)
		if (required && required.length > 0 && this.ScrollView) {
			this.ScrollView.scrollTo({
				y: this.state.OptionsPosy
			})
		}
		return (
			<Container>
				<ScrollView
					ref={e => this.ScrollView = e}
				>
					<CustomImagesSlider
						name={"ProductImagesSlider"}
						original={ShowOriginalImage.Value}
						wide={ShowTextImaageWide.Value}
						onPressImage={this.toggleZoomSlider}
						initialIndex={selectedSliderIndex}
						images={Images}
						onPositionChanged={onSliderImageChange} />

					{this.renderThumbnails()}

					{this.renderTopDescription()}

					{this.renderSubStore()}

					{this.renderSectionStyle()}

					{this.renderCollection()}

					{this.renderOneTouchPurchase()}

					{this.renderPopUpsModal()}

					{ShowMap.Value && Locations && Locations.length > 0 && <View
						style={{
							marginVertical: largePagePadding,
						}}>
						<CustomMapView
							initialRegion={{
								latitude: Locations[0].latitude,
								longitude: Locations[0].longitude,
								latitudeDelta: 0.4,
								longitudeDelta: 0.4,
							}}
							scrollEnabled={true}
							showsUserLocation={true}
							markers={Locations}
							style={{
								width: screenWidth,
								height: 200,
							}} />

						<CustomTouchable
							onPress={this.toggleFullMap}
							style={{
								position: 'absolute',
								right: 15,
								bottom: 15,
							}}>
							<MaterialCommunityIcons name='fullscreen' size={30} color={iconColor1} />
						</CustomTouchable>
					</View>}

					{EnableReview && <View>
						<SectionSeparator
							style={{
								marginVertical: largePagePadding,
							}} />

						<View
							style={{
								flexDirection: 'row',
								justifyContent: 'space-between',
								alignItems: 'center',
								marginHorizontal: largePagePadding,
							}}>
							<FontedText style={{ color: textColor1, fontSize: 24, fontWeight: 'bold', }}>{translate('RatingsReviews')}</FontedText>

							<CustomTouchable
								onPress={() => { this.props.navigation.navigate('ProductReviews', { Id }) }}
								style={{
									justifyContent: 'center',
									alignItems: 'center',
								}}>
								<FontedText style={{ color: mainColor, fontSize: 16, marginLeft: 5, }}>{translate('SeeAll')}</FontedText>
							</CustomTouchable>
						</View>

						<View
							style={{
								flexDirection: 'row',
								alignItems: 'center',
								marginHorizontal: largePagePadding,
							}}>
							<FontedText style={{ color: textColor1, fontSize: 60, fontWeight: 'bold', }}>{Rating.toFixed(1)}</FontedText>

							<View>
								<View
									style={{
										flexDirection: 'row',
										alignItems: 'center',
										marginHorizontal: largePagePadding,
									}}>
									<CustomStar rating={!Rating && !ReviewsCount ? 5 : Rating} />
									<FontedText style={{ color: textColor2, fontSize: 16, marginLeft: 5, }}>({ReviewsCount})</FontedText>
								</View>

								<View
									style={{
										marginTop: pagePadding,
										flexDirection: 'row',
										alignItems: 'center',
										marginHorizontal: largePagePadding,
									}}>
									<FontAwesome name="heart" color={textColor2} size={16} />
									<FontedText style={{ color: textColor2, fontSize: 16, marginLeft: 5, }}>{LikesCount} {translate('Likes')}</FontedText>
								</View>
							</View>
						</View>

						{LatestReview && <View
							style={{
								marginTop: 5,
								paddingHorizontal: largePagePadding,
							}}>
							<View
								style={{
									flexDirection: 'row',
									flex: 1,
									alignItems: 'center',
								}}>
								<RemoteImage
									dimension={250}
									style={{
										height: 50,
										width: 50,
										borderRadius: 25,
									}}
									uri={LatestReview.CustomerImage.ImageUrl} />

								<View
									style={{
										marginHorizontal: 20,
										flexGrow: 1,
									}}>
									<View
										style={{
											backgroundColor: bgColor2,
											borderRadius: smallBorderRadius,
											padding: 5,
											justifyContent: 'center',
											alignItems: 'center',
											alignSelf: 'flex-start',
											marginBottom: 5,
										}}>
										<TranslatedText style={{ color: textColor2, fontSize: 12 }} text="MostRecent" />
									</View>

									<FontedText style={{ color: textColor2, fontSize: 16, }}>{LatestReview.Review}</FontedText>
								</View>
							</View>
						</View>}
					</View>}

					{EnableQuestion && <View
						style={{
							marginBottom: largePagePadding,
						}}>
						<SectionSeparator
							style={{
								marginVertical: largePagePadding,
							}} />

						<View
							style={{
								flexDirection: 'row',
								justifyContent: 'space-between',
								alignItems: 'center',
								marginHorizontal: largePagePadding,
							}}>
							<View
								style={{
									flexDirection: 'row',
									alignItems: 'center',
								}}>
								<FontedText style={{ color: textColor1, fontSize: 24, fontWeight: 'bold', }}>{translate('Questions')}</FontedText>
								<FontedText style={{ color: textColor1, fontSize: 15, fontWeight: 'bold', marginLeft: 5, }}>({QuestionsCount})</FontedText>
							</View>

							<View
								style={{
									flexDirection: 'row',
									alignItems: 'center',
								}}>
								<CustomTouchable
									onPress={() => {
										this.props.navigation.navigate('ProductQuestion', { Id })
									}}
									style={{
										justifyContent: 'center',
										alignItems: 'center',
										marginRight: 1,
										paddingRight: 4,
									}}>
									<FontedText style={{ color: mainColor, fontSize: 16 }}>{translate('SeeAll')}</FontedText>
								</CustomTouchable>

								<CustomTouchable
									onPress={() => {
										this.props.navigation.navigate('AddProudctQuestion', { Id, Product: this.props })
									}}
									style={{
										justifyContent: 'center',
										alignItems: 'center',
										paddingLeft: 15,
										paddingVertical: 1,
									}}>
									<FontAwesome
										name="plus"
										color={mainColor}
										size={17} />
								</CustomTouchable>
							</View>

						</View>

						{LatestQuestion && <View
							style={{
								flexDirection: 'row',
								marginHorizontal: largePagePadding,
								marginTop: 5,
							}}>
							<View
								style={{
									backgroundColor: bgColor2,
									borderRadius: smallBorderRadius,
									padding: 5,
									justifyContent: 'center',
									alignItems: 'center',
									alignSelf: 'flex-start',
									marginRight: pagePadding,
								}}>
								<TranslatedText style={{ color: textColor2, fontSize: 12 }} text="MostRecent" />
							</View>

							<FontedText style={{ color: textColor2, fontSize: 16, }}>{LatestQuestion.QuestionText}</FontedText>
						</View>}
					</View>}

					{BottomPopups && BottomPopups.length > 0 &&
						<View
							style={{ paddingBottom: largePagePadding * 2 }}>
							{<SectionSeparator
								style={
									EnableQuestion || EnableReview ? {
										marginBottom: largePagePadding
									} : {
											marginVertical: largePagePadding
										}}
							/>}
							{this.renderPopUp('BottomPopupsProduct', BottomPopups, {
							})}
						</View>}


					{this.renderQuantityOffers()}

					{this.renderPurchasedProducts()}
					{this.renderFixedContent()}
				</ScrollView>

				{this.renderFullMap()}
				{this.renderZoomSlider()}
			</Container>
		)
	}
}

export default withLocalize(Product)