import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { getInitialRouteName, NavigateWithUrl } from '../utils/Navigation';

class CustomDrawerContent extends PureComponent {
	onPressLogout = () => {
		if (this.props.is_guest) {
			this.props.setIsGuest(false)
		}
		else {
			this.props.setIsLoggedIn(false)
		}
	}

	filterDrawerItems = (original_items, items) => {
		let filteredItems = [
			original_items[0],
		]

		items.map(item => `${item}_Drawer`).forEach(item => {
			filteredItems.push(original_items.find(findItem => findItem.key === item))
		})

		return filteredItems
	}

	logout = () => {
		const {
			required_login,
		} = this.props

		this.onPressLogout()

		if (!required_login) {
			const {
				setLoginRequired,
			} = this.props

			setLoginRequired(true)
		}
	}

	onDrawerItemPress = (route) => {
		const {
			navigation,
		} = this.props

		// Close drawer first
		navigation.closeDrawer()

		let navigateTo

		if (route === "Home_Drawer") {
			navigateTo = getInitialRouteName()
		}
		else {
			navigateTo = route.replace("_Drawer", "")
		}

		setTimeout(() => {
			navigation.navigate(navigateTo)
		}, 0)
	}

	onPressArticle = (Id) => {
		this.props.navigation.navigate('Article', {
			screen: 'Article',
			params: {
				Id,
			}
		})
	}

	componentDidMount() {
		setTimeout(() => {
			NavigateWithUrl(this.props.navigation)
		}, 2000)
	}
	render() {
		const PresentationalComponent = require('./Common/CustomDrawerContent').default

		return (
			<PresentationalComponent
				onPressArticle={this.onPressArticle}
				filterDrawerItems={this.filterDrawerItems}
				onDrawerItemPress={this.onDrawerItemPress}
				onPressLogout={this.onPressLogout}
				logout={this.logout}
				{...this.props} />
		)
	}
}

const mapStateToProps = ({
	inspector: {
		is_developer,
		is_inspector_enabled,
	},
	login: {
		user_data,
		hello_data,
		is_logged_in,
		is_guest,
		required_login,
		userId,
	},
	language: {

		currLang,
	},
	runtime_config: {
		runtime_config: {
			screens: {
				Side_Menu_10_1,
				Side_Menu_10_1: {
					BackgroundImage,
					HelpUrl,
					ShowChangeLanguage
				},
				sidemenuarticle,
				navbararticle,
				Admin_Page_0_0: {
					RoxiitInSideMenu,
					EnabelShareStatics
				}
			},
			AppUrl,
			colors,
			styles,
		},
	},
}) => ({
	userId,
	EnabelShareStatics,
	RoxiitInSideMenu,
	sidemenuarticle,
	navbararticle,
	is_developer,
	is_inspector_enabled,
	user_data,
	hello_data,
	is_logged_in,
	is_guest,
	required_login,
	Side_Menu_10_1,
	HelpUrl,
	BackgroundImage,

	currLang,
	ShowChangeLanguage,
	AppUrl,
	...colors,
	...styles,
})

function mergeProps(stateProps, { dispatch }, ownProps) {
	const {
		actions: {
			setInspectorEnabled,
		}
	} = require('../redux/InspectorRedux.js');

	const {
		actions: {
			setIsLoggedIn,
			setIsGuest,
			setLoginRequired,
		}
	} = require('../redux/LoginRedux.js');

	const {
		actions: {
			switchLanguage
		}
	} = require('../redux/LangRedux');

	return {
		...ownProps,
		...stateProps,
		setInspectorEnabled: (is_inspector_enabled) => setInspectorEnabled(dispatch, is_inspector_enabled),
		setIsLoggedIn: (is_logged_in) => setIsLoggedIn(dispatch, is_logged_in),
		setIsGuest: (is_guest) => setIsGuest(dispatch, is_guest),
		setLoginRequired: (required_login) => setLoginRequired(dispatch, required_login),
		switchLanguage: (language_id, code, is_rtl, update_translations, restart, callback) => switchLanguage(dispatch, language_id, code, is_rtl, update_translations, restart, callback)
	};
}

export default connect(mapStateToProps, undefined, mergeProps)(CustomDrawerContent)