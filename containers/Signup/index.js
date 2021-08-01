import React, { Component } from 'react'
import { Keyboard, View, BackHandler } from 'react-native'
import { connect } from 'react-redux'
import { isValidEmail, isValidMobileNumber } from '../../utils/Validation';
import { SignupUser } from '../../services/RegistrationService';
import Hello from '../../Hello';
import LanguageInitializer from '../../LanguageInitializer';
import { LongToast } from '../../utils/Toast';
import CustomSelector from '../../partial_components/Common/CustomSelector';
import { Languages as ConstantLanguages } from '../../constants/Languages';
import { GetSelectBasics } from '../../services/SelectBasicsService';

class Signup extends Component {
	constructor(props) {
		super(props)

		const {

			currLang
		} = this.props

		this.LangSelectorRef = React.createRef();

		this.state = {
			AcceptedTerms: true,
			selectedLang: ConstantLanguages.find(item => item.code === currLang),
			Languages: ConstantLanguages,
			didDatafetched: false
		}

		this.lockSubmit = false
	}

	componentDidMount() {
		const {
			ShowLanguageSelector
		} = this.props

		this.addBackHandlerListener()
	}

	onChangeLanguage = (lang) => {
		const { switchLanguage, selectLanguage, currLang, storeCurrLangTranslation, changeLanguageFromSignup } = this.props

		//curent lng
		let currentLngObj = ConstantLanguages.filter(a => a.code === currLang)[0];
		if (!currentLngObj)
			currentLngObj = ConstantLanguages.filter(a => a.isDefault === true)[0];
		if (!currentLngObj)
			currentLngObj = ConstantLanguages[0];

		//new lng
		let newLngObj = ConstantLanguages.filter(a => a.key === lang.key)[0];
		if (!newLngObj)
			newLngObj = ConstantLanguages.filter(a => a.isDefault === true)[0];
		if (!newLngObj)
			newLngObj = ConstantLanguages[0];


		if (currentLngObj.key != newLngObj.key) {
			LongToast("PleaseWait")
			selectLanguage(newLngObj.key)
			storeCurrLangTranslation(newLngObj.obj)
			switchLanguage(newLngObj.key, newLngObj.code, newLngObj.isRTL, true, true, null, true)
			changeLanguageFromSignup(true)
		}
	}

	addBackHandlerListener = () => {
		const {
			changeLanguageFromSignup
		} = this.props

		BackHandler.addEventListener('hardwareBackPress', () => {
			changeLanguageFromSignup(false)
			this.props.navigation.goBack()
			return true;
		});

	}

	componentWillUnmount() {
		BackHandler.removeEventListener('hardwareBackPress', () => {
			return true
		})
	}

	openLanguageSelectore = () => {
		this.LangSelectorRef.current.show()
	}

	submit = (data) => {
		if (this.lockSubmit) {
			return
		}

		const {
			country_id,
			countries,
			changeLanguageFromSignup
		} = this.props

		const {
			FullName,
			Email,
			Password,
			PasswordConfirmation,
			PhoneCountry = countries.find(item => item.Id === country_id)
		} = data;

		let { Phone } = data
		const { SigninInput } = this.props;
		const isMethodPhone = SigninInput.Value === 2

		Keyboard.dismiss()

		if (!FullName || !Password || !PasswordConfirmation || (isMethodPhone && !Phone) || (!isMethodPhone && !Email)) {
			LongToast('CantHaveEmptyInputs')
			return;
		}

		if (Password.length < 6) {
			LongToast("TooShortPassword")
		}

		if (Password !== PasswordConfirmation) {
			LongToast('PassDontMatch')
			return;
		}

		let LoginAccount

		if (isMethodPhone) {
			if (PhoneCountry) {
				Phone = (Phone[0] === "0") ? Phone.substr(1) : Phone;
				LoginAccount = `${PhoneCountry.PhoneCode}${Phone}`

				if (!Phone || !isValidMobileNumber(LoginAccount)) {
					LongToast('InvalidPhone')
					return;
				}
			}
			else {
				LongToast('InvalidPhone')
				return;
			}
		}
		else {
			if (!isValidEmail(Email)) {
				LongToast('InvalidEmail')
				return;
			}

			LoginAccount = Email
		}

		if (!this.state.AcceptedTerms) {
			return LongToast('PleaseAcceptTerms')
		}

		const {
			required_signup,
			guest_token,
		} = this.props

		this.setState({ isSubmitLocked: true })
		this.lockSubmit = true

		SignupUser({
			FullName,
			LoginAccount,
			Password,
			PasswordConfirmation: Password,
			WasGuestAccessToken: required_signup ? guest_token : null,
			LanguageId: this.state.selectedLang.key
		},
			({ data: { AccessToken, IsInterestSet, CustomerId } }) => {
				const loginAfterSignup = () => {
					const {
						setMainToken,
						setSelectedInterests,
					} = this.props;

					setMainToken(AccessToken)
					setSelectedInterests(IsInterestSet)
					this.setState({ loadHello: true })
				}

				changeLanguageFromSignup(false)
				const {
					MustVerifyAfterSignup,
					setSignupRequired,
				} = this.props

				if (required_signup) {
					setSignupRequired(false)
				}

				if (MustVerifyAfterSignup.Value) {
					this.props.navigation.navigate("SignupVerify", {
						CustomerId,
						onSuccess: loginAfterSignup,
					})

					this.setState({ isSubmitLocked: false })
					this.lockSubmit = false
				}
				else {
					loginAfterSignup()
				}
			}, err => {
				this.setState({ isSubmitLocked: false })
				this.lockSubmit = false

				if (err.status === 400) {
					LongToast('FailedSignup')
					return true
				}
			})
	}

	addHelloInitializer = () => {
		if (this.state.loadHello) {
			return (
				<Hello
					force_logged_in={true}
					onFinish={() => { this.setState({ loadLanguageInitializer: true }) }} />
			)
		}
		else {
			return null
		}
	}

	addLanguageInitializer = () => {
		if (this.state.loadLanguageInitializer) {
			return (
				<LanguageInitializer
					key={0}
					force_logged_in={true}
					onLanguageInit={() => {
						const {
							setIsLoggedIn,
							setDidNeverLogin,
						} = this.props;

						setIsLoggedIn(true)
						setDidNeverLogin(false)
					}} />
			)
		}
		else {
			return null
		}
	}

	toggleAcceptedTerms = () => {
		this.setState({ AcceptedTerms: !this.state.AcceptedTerms })
	}

	render() {
		const {
			auth_theme_id,
			...restProps
		} = this.props

		const { AcceptedTerms, didDatafetched } = this.state

		let PresentationalComponent = null

		switch (auth_theme_id) {
			case 7:
				PresentationalComponent = require('../../presentational_components/Theme7/Signup').default
				break;
			case 26:
				PresentationalComponent = require('../../presentational_components/Theme26/Signup').default
				break;
			default:
				PresentationalComponent = require('../../presentational_components/Theme7/Signup').default
				break;
		}

		return (
			<View
				style={{
					flex: 1,
				}}>
				<PresentationalComponent
					selectedLang={this.state.selectedLang}
					openLanguageSelectore={() => { this.openLanguageSelectore() }}
					onCheck={this.toggleAcceptedTerms}
					AcceptedTerms={AcceptedTerms}
					submit={this.submit}
					submitLocked={this.state.isSubmitLocked}
					{...restProps} />

				{this.addHelloInitializer()}
				{this.addLanguageInitializer()}

				<CustomSelector
					ref={this.LangSelectorRef}
					options={ConstantLanguages.map(item => item.label)}
					onSelect={(index) => {
						this.setState({ selectedLang: ConstantLanguages[index] }, () => {
							this.onChangeLanguage(this.state.selectedLang)
						})
					}}
					onDismiss={() => { }} />
			</View>
		)
	}
}

const mapStateToProps = ({
	places: {
		countries,
	},
	login: {
		country_id,
		required_signup,
		guest_token,
	},
	language: {

		currLang,
		isChangeLanguageFromSignup
	},
	runtime_config: {
		runtime_config: {
			themes: {
				auth_theme_id,
			},
			screens: {
				Signup_02_1,
				Signin_02_3: {
					SigninInput,
					ShowLanguageSelector
				},
			},
			colors,
			styles,
		},
	},
}) => ({
	isChangeLanguageFromSignup,
	countries,
	country_id,
	required_signup,
	guest_token,
	auth_theme_id,
	SigninInput,

	currLang,
	ShowLanguageSelector,
	...Signup_02_1,
	...colors,
	...styles,
})

function mergeProps(stateProps, { dispatch }, ownProps) {
	const {
		actions: {
			setIsLoggedIn,
			setDidNeverLogin,
			setMainToken,
			setSelectedInterests,
			setSignupRequired,
		}
	} = require('../../redux/LoginRedux.js');

	const {
		actions: {
			switchLanguage,
			storeCurrLangTranslation,
			changeLanguageFromSignup
		}
	} = require('../../redux/LangRedux')

	const {
		actions: {
			selectLanguage,
		}
	} = require('../../redux/WalkthroughRedux.js');

	return {
		...ownProps,
		...stateProps,
		setIsLoggedIn: (is_logged_in) => setIsLoggedIn(dispatch, is_logged_in),
		setDidNeverLogin: (did_never_log_in) => setDidNeverLogin(dispatch, did_never_log_in),
		setMainToken: (main_token) => setMainToken(dispatch, main_token),
		setSelectedInterests: (selected_interests) => setSelectedInterests(dispatch, selected_interests),
		setSignupRequired: (required_signup) => setSignupRequired(dispatch, required_signup),
		selectLanguage: (selected_language) => selectLanguage(dispatch, selected_language),
		storeCurrLangTranslation: (translation_data) => storeCurrLangTranslation(dispatch, translation_data),
		changeLanguageFromSignup: (isChangeLanguageFromSignup) => changeLanguageFromSignup(dispatch, isChangeLanguageFromSignup),
		switchLanguage: (language_id, code, is_rtl, update_translations, restart, callback, changeLanguageAtStart) => switchLanguage(dispatch, language_id, code, is_rtl, update_translations, restart, callback, changeLanguageAtStart)
	};
}

export default connect(mapStateToProps, undefined, mergeProps)(Signup)