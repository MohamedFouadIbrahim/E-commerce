import React, { Component } from 'react';
import { Alert, Platform } from 'react-native';
import { connect } from 'react-redux';
import LanguageInitializer from './LanguageInitializer';
import { GetHello } from './services/HelloService';
import { GetAllCountries } from './services/PlacesService';
import { GetRuntimeConfig } from './services/RuntimeConfigService';
import { subscribeToTopic, unsubscribeFromTopic } from './utils/FCM';
import { POST } from './utils/Network';
import { Languages as ConstantLanguages } from './constants/Languages';
import ConnectionErorr from './partial_components/Common/ConnectionErorr';

class Hello extends Component {
	constructor() {
		super()

		this.state = {
			didFetchData: false,
			translation_version: null,
			language_version: null,
			showConnectionErorModal: false
		}
	}

	handleTopicsSubscription = (pushNsTopics, pushNsTopicsUnsubscribe) => {
		const { subscribed_topics } = this.props

		if (subscribed_topics !== pushNsTopics && pushNsTopics && pushNsTopics.length) {
			const { setSubscribedTopics } = this.props

			pushNsTopics.split(",").forEach(item => {
				subscribeToTopic(item)
			})

			setSubscribedTopics(pushNsTopics)
		}

		if (pushNsTopicsUnsubscribe && pushNsTopicsUnsubscribe.length) {
			pushNsTopicsUnsubscribe.split(",").forEach(item => {
				unsubscribeFromTopic(item)
			})

			POST(`Customer/Topic/Unsubscribe?topics=${pushNsTopicsUnsubscribe}`, {})
		}
	}

	getRuntimeConfig = (runtime_version, callback) => {
		const {
			runtime_config,
			runtime_config_version,
			is_logged_in,
			is_guest,
		} = this.props

		if ((!is_logged_in && !is_guest) || !runtime_config || !runtime_config_version || (runtime_version !== runtime_config_version && runtime_version)) {
			GetRuntimeConfig(res => {
				const { setRuntimeConfig, setRuntimeConfigVersion } = this.props
				setRuntimeConfig(res.data)
				setRuntimeConfigVersion(res.data.version)
				callback()
			}, err => {
				this.setState({ showConnectionErorModal: true })
			})
		}
		else {
			callback()
		}
	}

	onHelloResponse = (response) => {
		this.setState({
			helloRequestFinishedLoadFlag: true,
			didFetchData: true,
			showConnectionErorModal: false
		}, () => {
			const { onFinish, } = this.props
			const { helloRequestFinishedLoadFlag, LanguageInitializerLoadFlagFinished } = this.state
			if (helloRequestFinishedLoadFlag === true && LanguageInitializerLoadFlagFinished === true) {
				onFinish && onFinish(response)
			}
		})
	}

	checkCountryVersion = (version, callback) => {
		const { countries_version, countries, cities } = this.props

		if (!countries || !countries.length || (version !== countries_version && version)) {
			GetAllCountries(res => {
				const { setCountries, setCountriesVersion, setCountryId } = this.props

				setCountries(res.data.Data)
				setCountriesVersion(res.data.Vrsn)

				if (res.data.MyLocation) {
					setCountryId(res.data.MyLocation.Id)
				}

				callback && callback()
			}, err => {
				callback && callback()
			})
		}
		else {
			callback && callback()
		}
	}

	requestHello = (initial = true) => {
		if (this.props.is_logged_in || this.props.force_logged_in || this.props.is_guest) {
			GetHello(res => {
				const { tr, lng, runtime, cntry, android, iphone } = res.data.vrsn
				const { Country: { Id: CountryId }, SubStoreId } = res.data.customer
				const { customer, pushNsTopics, pushNsTopicsUnsubscribe, IsDeveloper, Currency, StoreTypeId, CartCount, CurrentCountry, CurrentCity } = res.data
				if (Platform.OS == "android") {
					global.latestBuildVersion = parseFloat(android);
				}
				else {
					global.latestBuildVersion = parseFloat(iphone);
				}

				let foundLanguage = ConstantLanguages.find(item => item.key === customer.Langugae.Id)
				if (!foundLanguage) {
					//selected language is not exist any more on available languages
					foundLanguage = ConstantLanguages.find(item => item.isDefault)

					if (!foundLanguage)
						foundLanguage = ConstantLanguages[0]
				}

				if (foundLanguage && foundLanguage.code !== this.props.currLang) {
					const currentObj = ConstantLanguages.filter(a => a.code == this.props.currLang)[0]
					const currentIsRTL = currentObj ? currentObj.isRTL : false

					this.props.switchLanguage(foundLanguage.key, foundLanguage.code, foundLanguage.isRTL, true, false/* restart */, null)
				}

				if (CurrentCountry) {
					this.props.setCountryId(CurrentCountry.Id)
				}

				if (CurrentCity) {
					this.props.setCity(CurrentCity)
				}

				this.handleTopicsSubscription(pushNsTopics, pushNsTopicsUnsubscribe)
				this.props.setUserID(customer.Id)
				this.props.setStoreType(StoreTypeId)
				this.props.setUserData(customer)
				this.props.setIsDeveloper(IsDeveloper)
				this.props.setCurrency(Currency)
				this.props.setCartCount(CartCount)
				this.props.setSubStoreId(SubStoreId)
				this.props.setIsHelloLoaded(true)

				this.checkCountryVersion(cntry, () => {
					this.setState({
						translation_version: tr,
						language_version: lng,
						showConnectionErorModal: false
					})

					this.getRuntimeConfig(runtime, () => {
						this.onHelloResponse(true)
					})
				})
			}, err => {
				this.props.setIsHelloLoaded(false)
				if (initial) {
					setTimeout(() => {
						this.requestHello(false)
					}, 5000);
				}
				else {

					this.setState({ showConnectionErorModal: true })
				}
			})
		}
		else {
			this.checkCountryVersion(null, () => {
				this.getRuntimeConfig(null, () => {
					this.onHelloResponse(true)
				})
			})
		}
	}

	OnLanguageIniliyFinish = () => {
		this.setState({
			LanguageInitializerLoadFlagFinished: true,
		}, () => {
			this.onHelloResponse(true)
		})
	}
	componentDidMount() {
		this.requestHello()
	}

	render() {
		if (this.state.didFetchData) {
			const {
				force_logged_in,
				onLanguageInit,
			} = this.props

			return (
				<LanguageInitializer
					force_logged_in={force_logged_in}
					onLanguageInit={onLanguageInit}
					OnLanguageIniliyFinish={this.OnLanguageIniliyFinish}
					translation_version={this.state.translation_version}
					language_version={this.state.language_version} />
			)
		}
		else if (this.state.showErorrConnectionModal) {
			return (
				<ConnectionErorr
					onPress={() => {
						this.requestHello(false)
					}}
				/>
			)
		} else {
			return null
		}
	}
}

const mapStateToProps = ({
	login: {
		is_logged_in,
		is_guest,
	},
	runtime_config: {
		runtime_config,
		runtime_config_version,
	},
	places: {
		countries,
		countries_version,
		cities,
	},
	language: {
		currLang,

	},
	topics: {
		subscribed_topics,
	},
}) => ({
	cities,
	currLang,

	is_logged_in,
	is_guest,
	runtime_config,
	runtime_config_version,
	countries,
	countries_version,
	subscribed_topics,
})

function mergeProps(stateProps, { dispatch }, ownProps) {
	const {
		actions: {
			setCartCount,
		}
	} = require('./redux/BadgesRedux');

	const {
		actions: {
			setIsHelloLoaded
		}
	} = require('./redux/NavigationRedux');
	const {
		actions: {
			setSubscribedTopics,
		}
	} = require('./redux/TopicsRedux');

	const {
		actions: {
			setRuntimeConfig,
			setRuntimeConfigVersion,
		}
	} = require('./redux/RuntimeConfigRedux');

	const {
		actions: {
			setCountries,
			setCountriesVersion,
			setCities
		}
	} = require('./redux/PlacesRedux.js');

	const {
		actions: {
			setCountryId,
			setCity,
			setUserID,
			setStoreType,
			setUserData,
			setCurrency,
			setSubStoreId
		}
	} = require('./redux/LoginRedux.js');

	const {
		actions: {
			setIsDeveloper
		}
	} = require('./redux/InspectorRedux');

	const {
		actions: {
			resetLanguageTo,
			switchLanguage,
		}
	} = require('./redux/LangRedux.js');

	return {
		...ownProps,
		...stateProps,
		setSubscribedTopics: (subscribed_topics) => setSubscribedTopics(dispatch, subscribed_topics),
		setRuntimeConfig: (runtime_config) => setRuntimeConfig(dispatch, runtime_config),
		setRuntimeConfigVersion: (runtime_config_version) => setRuntimeConfigVersion(dispatch, runtime_config_version),
		setCountries: (countries) => setCountries(dispatch, countries),
		setCities: (cities) => setCities(dispatch, cities),
		setCountriesVersion: (countries_version) => setCountriesVersion(dispatch, countries_version),
		setCountryId: (country_id) => setCountryId(dispatch, country_id),
		setCity: (city) => setCity(dispatch, city),
		setUserID: (userId) => setUserID(dispatch, userId),
		setStoreType: (store_type) => setStoreType(dispatch, store_type),
		setUserData: (user_data) => setUserData(dispatch, user_data),
		setIsDeveloper: (is_developer) => setIsDeveloper(dispatch, is_developer),
		setCurrency: (Currency) => setCurrency(dispatch, Currency),
		setCartCount: (cart_count) => setCartCount(dispatch, cart_count),
		resetLanguageTo: (code, is_rtl) => resetLanguageTo(dispatch, code, is_rtl),
		setSubStoreId: (subStoreId) => setSubStoreId(dispatch, subStoreId),
		setIsHelloLoaded: (isHelloLoaded) => setIsHelloLoaded(dispatch, isHelloLoaded),
		switchLanguage: (language_id, code, is_rtl, update_translations, restart, callback) => switchLanguage(dispatch, language_id, code, is_rtl, update_translations, restart, callback),

	};
}

export default connect(mapStateToProps, undefined, mergeProps)(Hello)