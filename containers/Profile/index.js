import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Platform } from 'react-native'
import { GetHome, SetCountry, SetInterest, SetCurrency, ChangeCustomerImage, SetLanguage, GetInterest, SetTimeZone, TestNotifcationForUsers } from '../../services/CustomerService';
import { LongToast } from '../../utils/Toast';
import { getFilters } from '../../services/FilterService';
import RNRestart from 'react-native-restart'
import { GetHello } from '../../services/HelloService';
import { Languages as ConstantLanguages } from '../../constants/Languages';

class Profile extends Component {
	constructor(props) {
		super(props)
		this.state = {
			picker_image_uri: null,
			triggerRefresh: false,
			prossesEvent: 0,
			AppUrl: ''
		}
	}

	sendNotification = () => {
		TestNotifcationForUsers(res => {
			LongToast('TwoPushnotificaitonhavebeensent')
		})
	}

	forceNavigateToRedeem = () => {
		if (this.props.route.params?.Code) {
			this.props.navigation.navigate('Redeem', { onRefresh: this.onRefresh, Code: this.props.route.params?.Code })
		}
	}

	fitchData = () => {
		getFilters({ genders: true, timeZones: true, currencies: true }, resfilter => {
			GetInterest(resInterst => {
				GetHome(res => {
					this.setState({
						Listing: {
							GenderTypeList: resfilter.data.Genders,
							TimeZones: resfilter.data.TimeZones,
							Currencies: resfilter.data.Currencies,
							Interestes: resInterst.data.Data,
						},
						data: { ...res.data, TimeZone: res.data.TimeZoneFull },
						dataFetched: true,
						triggerRefresh: false
					})
				})
			})
		})
	}

	componentDidMount() {
		this.fitchData()
		this.forceNavigateToRedeem()
	}

	onRefresh = () => {
		this.setState({ triggerRefresh: true }, this.fitchData)
	}

	onSetCurrency = (Data) => {
		SetCurrency(Data.Id, res => {
			LongToast('DataSaved')
			RNRestart.Restart()
		})
	}

	onSetCountry = (Id) => {
		SetCountry(Id, () => {
			LongToast('DataSaved')
		})
	}

	onSetInterest = (Data) => {
		SetInterest(Data, () => {
			LongToast('DataSaved')
			this.fitchData()
		})
	}

	onSetLanguage = (Id) => {
		const { currLang, switchLanguage } = this.props
		LongToast("PleaseWait")
		SetLanguage(Id, () => {
			//curent lng
			let currentLngObj = ConstantLanguages.filter(a => a.code === currLang)[0];
			if (!currentLngObj)
				currentLngObj = ConstantLanguages.filter(a => a.isDefault === true)[0];
			if (!currentLngObj)
				currentLngObj = ConstantLanguages[0];

			//new lng
			let newLngObj = ConstantLanguages.filter(a => a.key === Id)[0];
			if (!newLngObj)
				newLngObj = ConstantLanguages.filter(a => a.isDefault === true)[0];
			if (!newLngObj)
				newLngObj = ConstantLanguages[0];

			if (currentLngObj.key != newLngObj.key) {
				switchLanguage(newLngObj.key, newLngObj.code, newLngObj.isRTL, true, true, null)
			}
		})
	}

	onChangeCustomerImage = (Data) => {

		this.setState({ uploadingImage: true, prossesEvent: 0 })

		ChangeCustomerImage(Data, () => {
			this.setState({ uploadingImage: false, prossesEvent: 0 })
			LongToast('DataSaved')

			GetHello(res => {
				const { customer } = res.data
				this.props.setUserData(customer)
			})
		}, err => {
			this.setState({ uploadingImage: false, prossesEvent: 0 })

		}, (re) => {

			this.setState({ prossesEvent: re * 0.01 })

		})
	}

	onSetTimeZone = (Id) => {
		SetTimeZone(Id, () => {
			LongToast('DataSaved')
		})
	}

	onPressLogout = () => {
		if (this.props.is_guest) {
			this.props.setIsGuest(false)
		}
		else {
			this.props.setIsLoggedIn(false)
		}
	}

	render() {
		let PresentationalComponent = require('../../presentational_components/Common/Profile').default

		const { dataFetched, data, uploadingImage, prossesEvent, Listing, triggerRefresh } = this.state

		if (!dataFetched) {
			return null
		}
		return (
			<PresentationalComponent
				triggerRefresh={triggerRefresh}
				mainScreen={true}
				AppUrl={this.state.AppUrl}
				onRefresh={this.onRefresh}
				prossesEvent={prossesEvent}
				uploadingImage={uploadingImage}
				SetTimeZone={this.onSetTimeZone}
				SetLanguage={this.onSetLanguage}
				SetInterest={this.onSetInterest}
				SetCurrency={this.onSetCurrency}
				SetCountry={this.onSetCountry}
				ChangeCustomerImage={this.onChangeCustomerImage}
				onPressLogout={this.onPressLogout}
				fitchData={this.fitchData}
				sendNotification={this.sendNotification}
				{...Listing}
				{...data}
				{...this.props}
				AppUrl={this.props.AppUrl.Url}
			/>
		)
	}
}

const mapStateToProps = ({
	language: {
		currLang,
	},
	login: {
		Currency,
		store_type,
		is_guest,
		userId,
		user_data,
	},
	runtime_config: {
		runtime_config: {
			themes: {
				user_theme_id,
			},
			screens: {
				Admin_Page_0_0: {
					EnabelShareStatics
				},
				Home_12_1: {
					AllowCustomerToAddProducts,
				},
				Navigation_Bar_10_2: {
					ShowAffiliate
				}
			},
			AppUrl,
			colors,
			styles,
		},
	},
}) => ({
	EnabelShareStatics,
	user_data,
	userId,
	Currency,
	ShowAffiliate,
	store_type,
	is_guest,
	user_theme_id,
	AppUrl,
	AllowCustomerToAddProducts,
	...colors,
	...styles,
	currLang
})

function mergeProps(stateProps, { dispatch }, ownProps) {
	const {
		actions: {
			switchLanguage,
		}
	} = require('../../redux/LangRedux.js');

	const {
		actions: {
			setIsLoggedIn,
			setIsGuest,
			setUserData,
		}
	} = require('../../redux/LoginRedux.js');

	return {
		...ownProps,
		...stateProps,
		setIsLoggedIn: (is_logged_in) => setIsLoggedIn(dispatch, is_logged_in),
		setIsGuest: (is_guest) => setIsGuest(dispatch, is_guest),
		switchLanguage: (language_id, code, is_rtl, update_translations, restart, callback) => switchLanguage(dispatch, language_id, code, is_rtl, update_translations, restart, callback),
		setUserData: (user_data) => setUserData(dispatch, user_data),
	};
}

export default connect(mapStateToProps, undefined, mergeProps)(Profile)