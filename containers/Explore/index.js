import React, { Component } from 'react'
import { Linking } from 'react-native'
import { connect } from 'react-redux'
import { GetHome } from '../../services/HomeService';
import { ActivityIndicator } from 'react-native';
import { processPressedNotification } from '../../utils/Notifications';
import { GetCategory } from '../../services/CategoryService';
import { SeenPop } from '../../services/PopService';
import { onPressCategory } from '../../utils/Categories';
import { isValidURL } from '../../utils/Validation';

class Explore extends Component {
	constructor() {
		super()

		this.state = {
			didFetchData: false
		}
	}

	componentDidMount() {
		GetHome(res => {
			this.setState({
				data: res.data,
				didFetchData: true
			})
		})
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

	render() {
		let PresentationalComponent = null

		const {
			store_theme_id,
			...restProps
		} = this.props

		const { data } = this.state

		switch (store_theme_id) {
			case 7:
				PresentationalComponent = require('../../presentational_components/Theme7/Explore').default
				break;
			case 26:
				PresentationalComponent = require('../../presentational_components/Theme26/Explore').default
				break;
			default:
				PresentationalComponent = require('../../presentational_components/Theme7/Explore').default
				break;
		}

		if (this.state.didFetchData) {
			return (
				<PresentationalComponent
					mainScreen={true}
					onPressCategory={this.onPressCategory}
					onPressSliderImage={this.onPressSliderImage}
					{...data}
					Ads={{
						Ads1: { Value: data.Ads1 },
						Ads2: { Value: data.Ads2 },
						Ads3: { Value: data.Ads3 }
					}}
					{...restProps} />
			)
		}
		else {
			const {
				mainColor,
			} = this.props

			return (
				<ActivityIndicator
					color={mainColor}
					size='large'
					style={{
						alignSelf: 'center',
						flex: 1
					}} />
			)
		}
	}
}


const mapStateToProps = ({
	runtime_config: {
		runtime_config: {
			themes: {
				store_theme_id,
			},
			screens: {
				Home_12_1,
				Product_Details_09_5: {
					HomeProductOffersSize,
					ProductRelatedSize,
					YouMayLikeProductsStyle,
					DefaultProductSize
				},
				Top_Header_10_2: {
					HeaderStyle
				},
			},
			colors,
			styles,
		},
	},
}) => ({
	HeaderStyle,
	store_theme_id,
	HomeProductOffersSize,
	ProductRelatedSize,
	YouMayLikeProductsStyle,
	DefaultProductSize,
	...Home_12_1,
	...colors,
	...styles,
})

function mergeProps(stateProps, { dispatch }, ownProps) {
	const {
		actions: {
			setIsLoggedIn,
		}
	} = require('../../redux/LoginRedux.js');

	return {
		...ownProps,
		...stateProps,
		setIsLoggedIn: (is_logged_in, do_not_call_api) => setIsLoggedIn(dispatch, is_logged_in, do_not_call_api),
	};
}

export default connect(mapStateToProps, undefined, mergeProps)(Explore)