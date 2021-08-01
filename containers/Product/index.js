import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Linking } from 'react-native';
import { GetProduct, ProductLike, GetProductCartInfo, GetSelectedProductMembers, GetProductDescription, GetProductHtmlDescription } from '../../services/ProductService';
import { OneTouchOrder } from '../../services/OrderServices';
import { AddCartItem, SetCartItemQuantity } from '../../services/CartService';
import { LongToast } from '../../utils/Toast';
import { withLocalize } from 'react-localize-redux';
import { ValidateQuantityIncrement, ValidateQuantityDecrement } from '../../utils/Cart';
import { GetOptionsPostModel, IsProductCheckoutEligible } from '../../utils/Product';
import ScreenLoadingIndicator from '../../partial_components/Common/ScreenLoadingIndicator';
import { ShareSomeThing } from '../../utils/Share';
import { isValidURL } from '../../utils/Validation';
import { onPressCategory } from '../../utils/Categories';
import { processPressedNotification } from '../../utils/Notifications';
import { SeenPop } from '../../services/PopService';

class Product extends Component {
	constructor(props) {
		super(props)

		this.state = {
			selectedSliderIndex: 0,
			isOrderNowSubmitLocked: false,
			isChangingOption: false,
			seeMore: false
		}
		const {
			StartupPage,
			StartupPageId,
			languages_data,
			currLang
		} = this.props

		this.myLang = languages_data.find(item => item.code == currLang)

		if (this.props.route.params?.Id || this.props.route.params?.params?.Id) {

			this.productId = this.props.route.params?.params?.Id || this.props.route.params?.Id

		} else {

			this.productId = StartupPageId.Value

		}

		this.quantityUpdateTimer = -1
		this.DisplayNavigationToCart = true
	}

	onPressCategory = (item) => {
		onPressCategory(this.props.navigation, item, "Categories_Alt")
	}

	onPressSliderImage = (item) => {
		const {
			navigation,
		} = this.props

		const {
			Navigation: PageV,
			NavigationTo: PageValue1,
			Id,
			SendSeen
		} = item

		if (SendSeen) {
			SeenPop(Id)
		}
		
		if (PageV === "Url" && PageValue1 && isValidURL(PageValue1)) {
			Linking.openURL(PageValue1)
		}
		else if (PageV) {
			const customNotification = {
				_data: {
					type: "navigation",
					routeName: PageV === "Categories" ? "Categories_Alt" : PageV,
					params: PageValue1,
				}
			}

			if (PageV === "Category") {

				const parsedParams = PageValue1 && PageValue1.length ? JSON.parse(PageValue1) : undefined

				if (parsedParams) {
					const Id = parsedParams

					GetCategory(Id, res => {
						this.onPressCategory(res.data)
					})
				}
			}

			else if (PageV === "Product") {
				navigation.navigate('Product', {
					screen: 'Product',
					params: {
						Id: PageValue1
					}
				})
			}

			else if (PageV !== "NoNavigation") {
				processPressedNotification(customNotification, navigation, false)
			}
		}
	}
	componentDidMount() {
		if (this.productId) {
			this.fetchData()

			this.unsubscribeFocusListener = this.props.navigation.addListener('focus', this.reloadCartInfo);
		}
	}

	componentWillUnmount() {
		this.unsubscribeFocusListener && this.unsubscribeFocusListener()
	}

	onPressSeeMore = (callBack) => {
		this.setState({ seeMore: true }, () => {
			this.handleOptionsAdditionalData(this.state.data.Options, () => {
				callBack && callBack()
			})
		})
	}

	handleSepratedDescription = (SelelctedMemberIdsParam) => {
		const {
			Options: options
		} = this.state.data
		let SelelctedMemberIds = ''
		let SelelctedMemberIdsArray = []

		if (SelelctedMemberIdsParam && SelelctedMemberIdsParam.length > 0) {
			SelelctedMemberIds = SelelctedMemberIdsParam
		}
		else {
			SelelctedMemberIds = ','
			options.forEach(({ Members }) => {
				Members.filter(member => member.isSelected).map((item, index) => {
					SelelctedMemberIdsArray.push(item)
				})
			})

			SelelctedMemberIdsArray.map((item, index) => {
				if (SelelctedMemberIdsArray.length == 1) {
					SelelctedMemberIds = `${item.Id}`
				} else {
					if (index == 0) {
						SelelctedMemberIds = `${item.Id}`
					} else {
						SelelctedMemberIds += `,${item.Id}`
					}
				}
			})
		}

		const {
			IsHtmlDescription,
			IsSigninHtmlDescription
		} = this.state.data.Description

		if (IsHtmlDescription || IsSigninHtmlDescription) {

			GetProductHtmlDescription({
				Id: this.productId,
				levelsSelectedProductOption: SelelctedMemberIds != ',' ? SelelctedMemberIds : null,
				seeMore: this.state.seeMore,
				languageId: this.myLang.key
			}, res => {
				this.setState({
					data: {
						...this.state.data,
						Description: {
							...this.state.data.Description,
							Description: res.data
						}
					},
					didFetchData: true,
				})
			})
		} else {
			this.setState({
				data: {
					...this.state.data,
					Description: {
						...this.state.data.Description,
						Description: null
					}
				},
				didFetchData: true,
			})
		}
	}

	fetchData = () => {
		GetProduct(this.productId, res => {
			this.originalPricing = res.data.Pricing
			this.originalImages = res.data.Images

			this.setState({
				data: {
					...res.data,
					Description: res.data.Description,
					// {
					// 	IsHtmlDescription: res.data.Description.IsHtmlDescription,
					// 	IsSigninHtmlDescription: res.data.Description.IsSigninHtmlDescription,
					// },
					Qty: res.data.isAddedToCart ? res.data.AddedToCartQty : res.data.ProductMinQty,
					AdditionalDescriptions: [],
				},
				// didFetchData: true,
			}, () => { this.handleSepratedDescription() })
		})
	}

	reloadCartInfo = () => {
		if (this.state.didFetchData && this.state.data.isAddedToCart) {
			GetProductCartInfo(this.productId, res => {
				const {
					data
				} = this.state

				this.setState({
					data: {
						...data,
						...res.data,
						Qty: res.data.isAddedToCart ? res.data.AddedToCartQty : data.ProductMinQty,
					},
				})
			})
		}
	}

	onSliderImageChange = (index) => {
		this.setState({
			selectedSliderIndex: index,
		})
	}

	handleOptionsAdditionalData = (options, callBack = null) => {

		this.setState({ isChangingOption: true })

		let optionsImages = []
		let optionsDescriptions = []
		let shouldReplaceImages = false
		let shouldReplaceDescriptions = false

		let {
			selectedSliderIndex,
		} = this.state

		options.forEach(option => {
			if (option.Type.Id === 1 || option.Type.Id === 2 || option.Type.Id === 3 || option.Type.Id === 10/*list*/) {
				option.Members.filter(member => member.isSelected).forEach(member => {
					if (member.Images && member.Images.length) {
						optionsImages = [
							...member.Images,
							...optionsImages,
						]
					}

					// if (member.Description && member.Description.length) {
					// 	optionsDescriptions.push(member.Description)

					// 	if (!shouldReplaceDescriptions && member.IsReplaceableDescription) {
					// 		shouldReplaceDescriptions = true
					// 	}
					// }

					if (!shouldReplaceImages && member.IsReplaceableImages && member.Images.length > 0) {
						shouldReplaceImages = true
					}
				})
			}
		})

		const { data } = this.state

		if (!optionsImages.length) {
			selectedSliderIndex = this.originalImages.length - 1
		}

		const prependProductImages = shouldReplaceImages ? [] : this.originalImages

		// i have added comma as default value to avoid server throw null exceprion on empty string (it will be cleared when first item added) and if no items it will be sent to server
		let SelelctedMemberIds = ','
		let SelelctedMemberIdsArray = []

		options.forEach(({ Members }) => {
			Members.filter(member => member.isSelected).map((item, index) => {
				SelelctedMemberIdsArray.push(item)
			})
		})

		SelelctedMemberIdsArray.map((item, index) => {
			if (SelelctedMemberIdsArray.length == 1) {
				SelelctedMemberIds = `${item.Id}`
			} else {
				if (index == 0) {
					SelelctedMemberIds = `${item.Id}`
				} else {
					SelelctedMemberIds += `,${item.Id}`
				}
			}
		})



		levelsSelectedProductOption: SelelctedMemberIds != ',' ? SelelctedMemberIds : null,

			GetSelectedProductMembers(this.productId, SelelctedMemberIds != ',' ? SelelctedMemberIds : null, this.myLang.key, this.state.seeMore, res => {
				//get all new product option data form backend exept the values keep load it form local state data
				let newOptions = res.data.Options
				newOptions = newOptions.map((item) => ({
					...item,
					Members: item.Members.map((mbmr) => ({
						...mbmr,
						value1: options.filter(a => a.Id == item.Id).map(a => a.Members.filter(b => b.Id == mbmr.Id).map(a => a.value1))[0][0] ?? null,
						value2: options.filter(a => a.Id == item.Id).map(a => a.Members.filter(b => b.Id == mbmr.Id).map(a => a.value2))[0][0] ?? null,
						value3: options.filter(a => a.Id == item.Id).map(a => a.Members.filter(b => b.Id == mbmr.Id).map(a => a.value3))[0][0] ?? null,
					}))
				}))
				// let modifiedData = this.state.data;
				// modifiedData.Options = newOptions;
				// modifiedData.hideOriginalDescription = shouldReplaceDescriptions;
				// modifiedData.AdditionalDescriptions = optionsDescriptions;
				// modifiedData.Images = [...prependProductImages, ...optionsImages];

				// update pricing
				let totalPriceChange = 0
				newOptions.forEach(({ Members }) => {
					Members.filter(member => member.isSelected).forEach(member => {
						if (member.PriceChange !== null) {
							totalPriceChange += member.PriceChange
						}
					})
				})

				let updatedPricing = this.originalPricing

				if (totalPriceChange !== 0) {
					updatedPricing = {
						...this.state.data.Pricing,
						Price: updatedPricing.Price + totalPriceChange,
						SalePrice: updatedPricing.SalePrice ? updatedPricing.SalePrice + totalPriceChange : updatedPricing.SalePrice,
					}
				}


				this.setState({
					selectedSliderIndex,
					data: {
						...this.state.data,
						Options: newOptions,
						hideOriginalDescription: shouldReplaceDescriptions,
						AdditionalDescriptions: optionsDescriptions,
						Images: [...prependProductImages, ...optionsImages],
						Description: {
							...this.state.data.Description,
							Description: res.data.Description
						}
					},
					Pricing: updatedPricing,
					required: null,
					isChangingOption: false
				}, () => {
					callBack && callBack()
				})



			}, err => {
				this.setState({ isChangingOption: false, isChangingDescription: false })
			})
	}

	likeProduct = (like_status) => {
		ProductLike(this.productId, like_status, () => {
			this.setState({
				data: {
					...this.state.data,
					isLiked: like_status,
				}
			})
		})
	}

	onSharePress = () => {
		const { AppUrl } = this.props
		const url = `${AppUrl.Url}/p/${this.productId}`
		ShareSomeThing(url, url)
	}

	setQuantity = (quantity) => {
		if (this.lockQuantityChange || this.lockSubmit) {
			return
		}

		this.lockQuantityChange = true

		this.setState({
			data: {
				...this.state.data,
				Qty: quantity,
			},
		}, () => {
			this.lockQuantityChange = false
		})

		if (this.state.data.isAddedToCart) {
			if (this.quantityUpdateTimer !== -1) {
				clearTimeout(this.quantityUpdateTimer)

				this.quantityUpdateTimer = -1
			}

			this.quantityUpdateTimer = setTimeout(() => {
				const { productId } = this

				SetCartItemQuantity(0, productId, quantity, [], () => {
					this.quantityUpdateTimer = -1
				})
			}, 500)
		}
	}

	onIncrementQuantity = () => {
		if (IsProductCheckoutEligible(this.state.data)) {
			const { Qty, ProductMaxQty, ProductStepQty } = this.state.data

			ValidateQuantityIncrement(Qty, ProductMaxQty, valid => {
				if (valid) {
					this.setQuantity(Qty + ProductStepQty)
				}
				else {
					LongToast("ReachedMaxQuantity")
				}
			})
		}
		else {
			LongToast("CantAddToCart")
		}
	}

	onDecrementQuantity = () => {
		if (IsProductCheckoutEligible(this.state.data)) {
			const { Qty, ProductMinQty, ProductStepQty } = this.state.data

			ValidateQuantityDecrement(Qty, ProductMinQty, valid => {
				if (valid) {
					this.setQuantity(Qty - ProductStepQty)
				}
				else {
					LongToast("ReachedMinQuantity")
				}
			})
		}
		else {
			LongToast("CantAddToCart")
		}
	}

	onPressOnTouchOrder = (onSucess) => {
		if (this.lockSubmit) {
			return
		}
		const { Options } = this.state.data

		GetOptionsPostModel(Options, false, ({ model }) => {

			this.setState({ isOrderNowSubmitLocked: true })
			this.lockSubmit = true

			OneTouchOrder({
				ProductId: this.productId,
				Options: model
			}, res => {
				this.setState({ isOrderNowSubmitLocked: false })
				this.fetchData()
				this.lockSubmit = false
				onSucess && onSucess()
				LongToast('PlacedOrder')
			}, () => {
				this.setState({ isOrderNowSubmitLocked: false })
				this.lockSubmit = false
			})
		}, ({ required }) => {
			const { translate } = this.props
			LongToast(`${translate("RequiredOptions")}: ${required.join(", ")}`, false)
		})

		// if (IsProductCheckoutEligible(data)) {

		// }
		// else {
		// 	LongToast("CantAddToCart")
		// }
	}

	onBuyNow = (quantity) => {

		this.addToCart(quantity, () => {
			this.props.navigation.navigate("Cart", {
				screen: 'Cart',
				params: {
					NavigateToCheckout: true
				}
			})
		})

	}

	addToCart = (quantity, callBack) => {
		if (this.lockSubmit) {
			return
		}

		if (isNaN(quantity)) {
			quantity = this.state.data.Qty
		}

		if (this.props.ShowProductOptionsInStandAlonePage.Value == 2) {

			this.props.navigation.navigate('ProductOptions', {
				Quantity: quantity,
				Id: this.productId,
				callBack
			})
			return
		}

		if (IsProductCheckoutEligible(this.state.data)) {
			const { Options } = this.state.data

			GetOptionsPostModel(Options, false, ({ model }) => {
				this.setState({ isSubmitLocked: true })
				this.lockSubmit = true


				AddCartItem(this.productId, quantity, model, res => {
					const { translate } = this.props
					LongToast(`${translate('AddedToCart')}${quantity > 1 ? ` (${quantity})` : ''}`, false)

					this.setState({
						data: {
							...this.state.data,
							isAddedToCart: true,
						},
						isSubmitLocked: false,
					})

					this.lockSubmit = false
					callBack && callBack()

				}, () => {
					this.setState({ isSubmitLocked: false })
					this.lockSubmit = false
				})
			}, ({ required }) => {
				const { translate } = this.props
				this.setState({ required })
				LongToast(`${translate("RequiredOptions")}: ${required.join(", ")}`, false)
			})
		}
		else {
			LongToast("CantAddToCart")
		}
	}

	goToCart = () => {
		this.props.navigation.navigate("Cart")
	}

	onOptionChange = (item, items) => {
		const updatedOptions = this.state.data.Options.map(mapItem => ({
			...mapItem,
			Members: item.Id === mapItem.Id ? items : mapItem.Members
		}))

		this.handleOptionsAdditionalData(updatedOptions)
	}

	navigateToSubStore = () => {
		const { SubStore } = this.state.data

		this.props.navigation.navigate("SubStore", { Id: SubStore.Id })
	}
	//"IsHtmlDescription": true,
	// "IsSigninHtmlDescription": true,
	//"SigninHtmlDescription": "string", no
	// "Description": "string", no
	render() {
		if (this.state.didFetchData) {
			let PresentationalComponent = null

			const {
				store_theme_id,
				...restProps
			} = this.props

			const { didFetchData, data } = this.state

			switch (store_theme_id) {
				case 7:
					PresentationalComponent = require('../../presentational_components/Theme7/Product').default
					break;
				case 26:
					PresentationalComponent = require('../../presentational_components/Theme26/Product').default
					break;
				default:
					PresentationalComponent = require('../../presentational_components/Theme7/Product').default
					break;
			}

			return (
				<PresentationalComponent
					{...data}
					{...this.state}
					onSharePress={this.onSharePress}
					onPressOnTouchOrder={this.onPressOnTouchOrder}
					onSliderImageChange={this.onSliderImageChange}
					canAddToCart={IsProductCheckoutEligible(data)}
					addToCart={this.addToCart}
					navigateToSubStore={this.navigateToSubStore}
					goToCart={this.goToCart}
					likeProduct={this.likeProduct}
					onOptionChange={this.onOptionChange}
					onIncrementQuantity={this.onIncrementQuantity}
					onDecrementQuantity={this.onDecrementQuantity}
					submitLocked={this.state.isSubmitLocked}
					orderNowSubmitLocked={this.state.isOrderNowSubmitLocked}
					didFetchData={didFetchData}
					required={this.state.required}
					isChangingOption={this.state.isChangingOption}
					handleSepratedDescription={this.handleSepratedDescription}
					seeMore={this.state.seeMore}
					onPressSeeMore={this.onPressSeeMore}
					onBuyNow={this.onBuyNow}
					onPressSliderImage={this.onPressSliderImage}
					{...restProps} />
			)
		}
		else {
			return (
				<ScreenLoadingIndicator />
			)
		}
	}
}

const mapStateToProps = ({
	login: {
		store_type,
		Currency,
		is_logged_in,
	},
	language: {
		currLang,
		languages_data
	},
	runtime_config: {
		runtime_config: {
			themes: {
				store_theme_id,
			},
			screens: {
				Product_Details_09_5: {
					ShowThumbnails,
					ShowTextOnImage,
					ShowMap,
					ShowSubStore,
					ShowSubStoreContactInfo,
					ShowSubStoreLocation,
					ShowTextImaageWide,
					AddToCartType,
					ShowOriginalImage,
					ShowRelatedProduct,
					HideProductPriceLabel,
					HideProductImageControl,
					HideProductNameShortDesc,
					SectionsStyles,
					ShowOneTouchPurchase,
					ProductRelatedSize,
					YouMayLikeProductsStyle,
					AddToCartButtonStyle,
					ProductOptionStyle,
				},
				Navigation_Bar_10_2: {
					StartupPage,
					StartupPageId
				}
			},
			AppUrl,
			colors,
			styles,
		},
	},
}) => ({
	ShowProductOptionsInStandAlonePage: ProductOptionStyle,
	YouMayLikeProductsStyle,
	StartupPage,
	AppUrl,
	StartupPageId,
	ShowOneTouchPurchase,
	SectionsStyles,
	HideProductNameShortDesc,
	HideProductImageControl,
	is_logged_in,
	HideProductPriceLabel,
	Currency,
	store_type,
	store_theme_id,
	ShowThumbnails,
	ShowTextOnImage,
	ShowMap,
	currLang,
	languages_data,
	ShowSubStore,
	ShowSubStoreContactInfo,
	ShowSubStoreLocation,
	ShowTextImaageWide,
	AddToCartType,
	ShowOriginalImage,
	ShowRelatedProduct,
	ProductRelatedSize,
	AddToCartButtonStyle,
	...colors,
	...styles,
})

export default connect(mapStateToProps)(withLocalize(Product))