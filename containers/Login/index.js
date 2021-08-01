import React, { Component } from 'react'
import { Keyboard, View } from 'react-native'
import { connect } from 'react-redux'
import { isValidEmail, isValidMobileNumber } from '../../utils/Validation';
import { LoginUser, LoginGuest, LoginFacebook, LoginGoogle } from '../../services/RegistrationService';
import Hello from '../../Hello';
import { LongToast } from '../../utils/Toast';
import { LoginManager, GraphRequest, GraphRequestManager } from 'react-native-fbsdk';
import { GoogleSignin, statusCodes } from '@react-native-community/google-signin';
import { withLocalize } from 'react-localize-redux';
import CustomSelector from '../../partial_components/Common/CustomSelector';
import { Languages as ConstantLanguages } from '../../constants/Languages';

class Login extends Component {
	constructor(props) {
		super(props)

		const {
			SigninPageStyle,
			SigninInput,
			required_signup,

			currLang,
			isChangeLanguageFromSignup
		} = this.props

		this.isMethodPhone = SigninInput.Value === 2

		this.LangSelectorRef = React.createRef()

		this.state = {
			AcceptedTerms: true,
			displayCover: SigninPageStyle.Value === 1 || required_signup ? false : true,
			selectedLang: ConstantLanguages.find(item => item.code === currLang),
			Languages: ConstantLanguages,

		}

		//if device langauge is not exist in available languages
		let selectedLng = ConstantLanguages.find(item => item.code === this.props.currLang)
		if (!selectedLng)
			selectedLng = ConstantLanguages.find(item => item.isDefault === true)
		if (!selectedLng)
			selectedLng = ConstantLanguages[0]

		this.props.selectLanguage(selectedLng.key);

		this.lockSubmit = false

		if (required_signup) {
			this.props.navigation.navigate("Signup")
		}

		if (isChangeLanguageFromSignup) {
			this.navigateToSignup()
		}
	}

	componentDidMount() {
		if (this.props.force_guest) {
			this.submitGuest()
		}
		else {
			GoogleSignin.configure()
		}
		const {
			ShowLanguageSelector
		} = this.props
	}

	onChangeLanguage = (lang) => {
		const { switchLanguage, selectLanguage, currLang, storeCurrLangTranslation } = this.props


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
			selectLanguage(newLngObj.key)
			LongToast("PleaseWait")
			storeCurrLangTranslation(newLngObj.obj)
			switchLanguage(newLngObj.key, newLngObj.code, newLngObj.isRTL, true, true, null, true)
		}
	}

	submitGuest = () => {
		if (this.lockSubmit) {
			return
		}

		if (!this.state.AcceptedTerms) {
			return LongToast('PleaseAcceptTerms')
		}
		Keyboard.dismiss()

		this.setState({ isSubmitLocked: true })
		this.lockSubmit = true

		LoginGuest(({ data: { AccessToken } }) => {
			const {
				setMainToken,
				setSignupRequired,
			} = this.props;

			setSignupRequired(false)
			setMainToken(AccessToken)
			this.is_guest = true
			this.setState({ loadHello: true })
		}, err => {
			this.setState({ isSubmitLocked: false })
			this.lockSubmit = false
		})
	}

	submit = (data) => {
		if (this.lockSubmit) {
			return
		}

		const { country_id, countries } = this.props

		const {
			Email,
			Password,
			PhoneCountry = countries.find(item => item.Id === country_id)
		} = data;

		let { Phone } = data;

		const {
			isMethodPhone,
		} = this

		Keyboard.dismiss()

		if (!Password || (isMethodPhone && !Phone) || (!isMethodPhone && !Email)) {
			LongToast('CantHaveEmptyInputs')
			return;
		}

		let AccountLogin

		if (isMethodPhone) {
			if (PhoneCountry) {
				Phone = (Phone[0] === "0") ? Phone.substr(1) : Phone;
				AccountLogin = `${PhoneCountry.PhoneCode}${Phone}`

				if (!Phone || !isValidMobileNumber(AccountLogin)) {
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

			AccountLogin = Email
		}

		if (!this.state.AcceptedTerms) {
			return LongToast('PleaseAcceptTerms')
		}

		const {
			selectedLang
		} = this.state

		this.setState({ isSubmitLocked: true })
		this.lockSubmit = true

		LoginUser({
			AccountLogin,
			Password,
			LanguageId: selectedLang.key
		},
			({ data: { AccessToken, IsInterestSet } }) => {
				const {
					setMainToken,
					setSelectedInterests,
					setSignupRequired,
				} = this.props;

				setSignupRequired(false)
				setMainToken(AccessToken)
				setSelectedInterests(IsInterestSet)
				this.setState({ loadHello: true })
			}, err => {

				this.setState({ isSubmitLocked: false })
				this.lockSubmit = false

				if (err.status === 404) {
					LongToast('FailedLogin')
					return true
				}
			})
	}

	facebookInfoCallback = (error, result) => {
		if (error) {
			this.setState({ isSubmitLocked: false })
			this.lockSubmit = false

		}
		else {
			const {
				last_name,
				first_name,
				id,
				email
			} = result

			LoginFacebook({
				FirstName: first_name,
				LastName: last_name,
				Id: id,
				Email: email,
			},
				({ data: { AccessToken, IsInterestSet } }) => {
					const {
						setMainToken,
						setSelectedInterests,
					} = this.props;

					setMainToken(AccessToken)
					setSelectedInterests(IsInterestSet)
					this.setState({ loadHello: true })
				}, err => {
					this.setState({ isSubmitLocked: false })
					this.lockSubmit = false
				})
		}
	}

	submitFacebook = () => {
		if (this.lockSubmit) {
			return
		}

		this.setState({ isSubmitLocked: true })
		this.lockSubmit = true

		LoginManager.logInWithPermissions(["public_profile"]).then(
			(result) => {
				if (result.isCancelled) {
					this.setState({ isSubmitLocked: false })
					this.lockSubmit = false
				}
				else {
					const infoRequest = new GraphRequest(
						'/me?fields=id,email,first_name,last_name',
						null,
						this.facebookInfoCallback
					)

					new GraphRequestManager().addRequest(infoRequest).start()
				}
			},
			(error) => {

				this.setState({ isSubmitLocked: false })
				this.lockSubmit = false
			}
		)
	}

	submitGoogle = async () => {
		if (this.lockSubmit) {
			return
		}

		this.setState({ isSubmitLocked: true })
		this.lockSubmit = true

		try {
			await GoogleSignin.hasPlayServices();
			const userInfo = await GoogleSignin.signIn();
			const {
				name,
				id,
				email
			} = userInfo.user

			LoginGoogle({
				FirstName: name,
				Id: id,
				Email: email,
			},
				({ data: { AccessToken, IsInterestSet } }) => {
					const {
						setMainToken,
						setSelectedInterests,
					} = this.props;

					setMainToken(AccessToken)
					setSelectedInterests(IsInterestSet)
					this.setState({ loadHello: true })
				}, err => {
					this.setState({ isSubmitLocked: false })
					this.lockSubmit = false
				})
		} catch (error) {
			if (error.code === statusCodes.SIGN_IN_CANCELLED) {
				// user cancelled the login flow
			} else if (error.code === statusCodes.IN_PROGRESS) {
				// operation (f.e. sign in) is in progress already
			} else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
				// play services not available or outdated
			} else {
				// some other error happened
			}

			this.setState({ isSubmitLocked: false })
			this.lockSubmit = false
		}
	}

	addHelloInitializer = () => {
		if (this.state.loadHello) {
			return (
				<Hello
					force_logged_in={true}
					onLanguageInit={() => {
						const {
							setIsLoggedIn,
							setIsGuest,
							setDidNeverLogin,
						} = this.props;

						if (this.is_guest) {
							setIsGuest(true)
						}
						else {
							setIsLoggedIn(true)
						}

						setDidNeverLogin(false)
					}} />
			)
		}
		else {
			return null
		}
	}

	toggleAcceptedTerms = () => {
		this.setState({
			AcceptedTerms: !this.state.AcceptedTerms
		})
	}

	hideLoginCover = () => {
		this.setState({
			displayCover: false,
		})
	}

	navigateToSignup = () => {
		if (this.state.displayCover) {
			this.hideLoginCover()
		}

		this.props.navigation.navigate("Signup")
	}

	openLanguageSelectore = () => {
		this.LangSelectorRef.current.show()
	}

	render() {
		if (this.props.force_guest) {
			return (
				<View
					style={{
						flex: 1,
					}}>
					{this.addHelloInitializer()}
				</View>
			)
		}

		const {
			auth_theme_id,
			...restProps
		} = this.props

		const {
			AcceptedTerms,
			displayCover,
		} = this.state

		const {
			isMethodPhone,
		} = this

		let PresentationalComponent = null

		if (displayCover) {
			PresentationalComponent = require('../../presentational_components/Common/LoginCover').default
		}
		else {
			switch (auth_theme_id) {
				case 7:
					PresentationalComponent = require('../../presentational_components/Theme7/Login').default
					break;
				case 26:
					PresentationalComponent = require('../../presentational_components/Theme26/Login').default
					break;
				default:
					PresentationalComponent = require('../../presentational_components/Theme7/Login').default
					break;
			}
		}

		return (
			<View
				style={{
					flex: 1,
				}}>
				<PresentationalComponent
					onCheck={this.toggleAcceptedTerms}
					AcceptedTerms={AcceptedTerms}
					isMethodPhone={isMethodPhone}
					selectedLang={this.state.selectedLang}
					openLanguageSelectore={this.openLanguageSelectore}
					navigateToSignup={this.navigateToSignup}
					hideLoginCover={this.hideLoginCover}
					submit={this.submit}
					submitGuest={this.submitGuest}
					submitFacebook={this.submitFacebook}
					submitGoogle={this.submitGoogle}
					submitLocked={this.state.isSubmitLocked}
					{...restProps} />

				{this.addHelloInitializer()}

				{<CustomSelector
					ref={this.LangSelectorRef}
					options={ConstantLanguages.map(item => item.label)}
					onSelect={(index) => {
						this.setState({ selectedLang: ConstantLanguages[index] }, () => {
							this.onChangeLanguage(this.state.selectedLang)
						})
					}}
					onDismiss={() => { }} />}

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
		required_login,
		required_signup
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
				Signin_02_3,
				Signin_02_3: {
					ShowLanguageSelector
				},
				Signup_02_1: {
					ShowPrivacyPolicy,
				}
			},
			colors,
			styles,
		},
	},
}) => ({
	ShowLanguageSelector,
	ShowPrivacyPolicy,
	countries,
	country_id,
	required_signup,
	auth_theme_id,

	currLang,
	isChangeLanguageFromSignup,
	force_guest: !Signin_02_3.Enable.Value && !required_login && !required_signup,
	...Signin_02_3,
	...colors,
	...styles,
})

function mergeProps(stateProps, { dispatch }, ownProps) {
	const {
		actions: {
			setIsLoggedIn,
			setIsGuest,
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
		setIsGuest: (is_guest) => setIsGuest(dispatch, is_guest),
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

export default connect(mapStateToProps, undefined, mergeProps)(withLocalize(Login))