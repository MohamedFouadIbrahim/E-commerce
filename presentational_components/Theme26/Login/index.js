import React, { Component } from 'react'
import { Image, ScrollView, StatusBar, View , Platform} from 'react-native';
import TranslatedText from '../../../partial_components/Common/TranslatedText';
import RoundedSelector from '../../../partial_components/Common/RoundedSelector';
import PhoneInput from '../../../partial_components/Theme26/PhoneInput';
import RoundedInput from '../../../partial_components/Theme26/RoundedInput';
import PasswordInput from '../../../partial_components/Theme26/PasswordInput';
import { SelectCountry } from '../../../utils/Places';
import { screenWidth } from '../../../constants/Metrics';
import RemoteImageBackground from '../../../partial_components/Common/RemoteImageBackground';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { STRING_LENGTH_LONG, STRING_LENGTH_MEDIUM } from '../../../constants/Config';
import CustomTouchable from '../../../partial_components/Common/CustomTouchable';
import CheckBox from '../../../partial_components/Common/CheckBox';
import CustomButton from '../../../partial_components/Common/CustomButton';
import { getStatusBarStyle } from '../../../utils/Misc';

class Login extends Component {
	constructor() {
		super()

		this.state = {}
	}


	submit = () => {
		const { Email, Password, Phone, PhoneCountry } = this.state
		this.props.submit({ Email, Password, Phone, PhoneCountry })
	}

	renderAccountInput = () => {
		const { SigninInput, largePagePadding } = this.props

		if (SigninInput.Value === 1) {
			const { Email } = this.state

			return (
				<RoundedInput
					maxLength={STRING_LENGTH_MEDIUM}
					containerStyle={{ marginTop: largePagePadding, }}
					keyboardType='email-address'
					value={Email}
					onChangeText={(text) => { this.setState({ Email: text }) }}
					title="Email"
					placeholder="TypeEmailHerePlaceHolder" />
			)
		}
		else {
			const { Phone, PhoneCountry } = this.state

			return (
				<PhoneInput
					title='Phone'
					contentContainerStyle={{ marginTop: largePagePadding }}
					countryId={PhoneCountry ? PhoneCountry.Id : undefined}
					onPressFlag={() => {
						SelectCountry(this.props.navigation, item => {
							this.setState({ PhoneCountry: item })
						})
					}}
					value={Phone}
					onChangeText={(text) => { this.setState({ Phone: text }) }} />
			)
		}
	}

	renderTermsAndCondition = () => {
		const {
			pagePadding,
			AcceptedTerms,
			onCheck,
			ShowPrivacyPolicy,
		} = this.props

		if (!ShowPrivacyPolicy.Value) {
			return null
		}

		return (
			<View
				style={{
					flexDirection: 'row',
					paddingVertical: pagePadding
				}}>
				<CustomTouchable onPress={onCheck} >
					<CheckBox selected={AcceptedTerms} />
				</CustomTouchable>

				<CustomTouchable
					onPress={() => {
						this.props.navigation.navigate('TermsOfService')
					}}>
					<TranslatedText style={{ fontSize: 12, paddingHorizontal: pagePadding / 2, lineHeight: pagePadding * 2 }} text={'TermsAndCondation'} />
				</CustomTouchable>
			</View>
		)
	}


	render() {
		const {
			largePagePadding,
			pagePadding,
			submitLocked,
			EnableGuestLogin,
			EnableFacebookLogin,
			EnableGooglePlusLogin,
			submitGuest,
			submitFacebook,
			submitGoogle,
			Background,
			bgColor1,
			bgColor2,
			textColor2,
			statusBarColor,
			ShowTitle,
			navigateToSignup,
			EnablePasswordReset,
			ShowLanguageSelector,
			hideGuest
		} = this.props

		const { Password } = this.state

		return (
			<RemoteImageBackground
				dimension={1080}
				original={true}
				uri={Background && Background.Value ? Background.Value.ImageUrl : null}
				resizeMode={"cover"}
				blurRadius={5}
				style={{
					flex: 1,
					backgroundColor: bgColor2,
					justifyContent: 'center',
					alignItems: 'center',
				}}>
				<StatusBar
					backgroundColor={statusBarColor}
					barStyle={getStatusBarStyle()} />

				<ScrollView
					contentContainerStyle={{
						flexGrow: (Platform.OS === 'ios'?0.97/*to avoid flat list freeze */:1),
						justifyContent: 'center'
					}}>
					<View
						style={{
							width: screenWidth * 0.8,
							backgroundColor: bgColor1,
							justifyContent: 'center',
							alignItems: 'center',
							borderRadius: 25,
							padding: largePagePadding,
						}}>
						<Image
							resizeMode='contain'
							style={{
								width: 65,
								height: 65,
							}}
							source={require('../../../android/app/src/main/res/mipmap-xxxhdpi/ic_launcher_round.png')} />

						<TranslatedText style={{ fontSize: 28, fontWeight: 'bold', marginTop: 5, textAlign: 'center', }} text="Login" />

						{ShowTitle.Value && <TranslatedText style={{ fontSize: 14, textAlign: 'center', marginTop: 10 }} text="LoginTitle" />}

						<View
							style={{
								width: '100%',
							}}>
							{this.renderAccountInput()}

							<PasswordInput
								maxLength={STRING_LENGTH_LONG}
								containerStyle={{ marginTop: largePagePadding, }}
								value={Password}
								onChangeText={(text) => { this.setState({ Password: text }) }}
								title="Password"
								placeholder="TypePasswordHerePlaceHolder"
							/>

							{ShowLanguageSelector.Value == true ? <RoundedSelector
								onPress={() => {
									const { openLanguageSelectore } = this.props
									openLanguageSelectore()
								}}
								title='Language'
								containerStyle={{ flex: 1, marginTop: largePagePadding }}
								placeholder='SelectLanguage'
								value={this.props.selectedLang ? this.props.selectedLang.label || this.props.selectedLang.Name : null}
							/> : null}

							<CustomButton
								style={{
									marginTop: 15,
								}}
								fullWidth={true}
								loading={submitLocked}
								onPress={this.submit}
								title="Login" />

							{this.renderTermsAndCondition()}
							<View
								style={{
									marginTop: pagePadding,
									flexDirection: 'row',
									justifyContent: 'space-between',
									alignItems: 'center',
								}}>
								<CustomTouchable
									onPress={navigateToSignup}
									style={{
										flex: 1,
										justifyContent: 'center',
										alignItems: 'flex-start',
										padding: 3,
									}}>
									<TranslatedText style={{ color: textColor2, fontSize: 14, textAlign: 'center', }} text="Signup" />
								</CustomTouchable>

								{EnableGuestLogin.Value && !hideGuest && <CustomTouchable
									onPress={submitGuest}
									style={{
										flex: 1,
										justifyContent: 'center',
										alignItems: EnablePasswordReset.Value ? 'center' : 'flex-end',
										padding: 3,
									}}>
									<TranslatedText style={{ color: textColor2, fontSize: 14, textAlign: 'center', }} text="Guest" />
								</CustomTouchable>}

								{EnablePasswordReset.Value ? <CustomTouchable
									onPress={() => { this.props.navigation.navigate("PasswordReset") }}
									style={{
										flex: 1,
										justifyContent: 'center',
										alignItems: 'flex-end',
										padding: 3,
									}}>
									<TranslatedText style={{ color: textColor2, fontSize: 14, textAlign: 'center', }} text="Password" />
								</CustomTouchable> : null}
							</View>

							{(EnableFacebookLogin.Value || EnableGooglePlusLogin.Value) && <View
								style={{
									marginTop: 15,
									flexDirection: 'row',
									justifyContent: 'space-between',
									alignItems: 'center',
								}}>
								<View>
									<TranslatedText style={{ color: textColor2, fontSize: 14, textAlign: 'left', }} text={"LoginWith"} />
								</View>

								<View
									style={{
										marginLeft: 15,
										flex: 1,
										flexDirection: 'row',
										justifyContent: 'flex-end',
										alignItems: 'center',
									}}>
									{EnableFacebookLogin.Value && <CustomTouchable
										onPress={submitFacebook}
										style={{
											padding: 3,
										}}>
										<FontAwesome
											name="facebook-square"
											color="#1778F2"
											size={32} />
									</CustomTouchable>}

									{EnableGooglePlusLogin.Value && <CustomTouchable
										onPress={submitGoogle}
										style={{
											padding: 3,
											marginLeft: 20,
										}}>
										<FontAwesome
											name="google"
											color="#dd4b39"
											size={32} />
									</CustomTouchable>}
								</View>
							</View>}
						</View>
					</View>
				</ScrollView>
			</RemoteImageBackground>
		)
	}
}

export default Login