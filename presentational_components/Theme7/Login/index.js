import React, { Component } from 'react'
import LazyContainer from '../../../partial_components/Common/LazyContainer';
import { View,  ScrollView, Image } from 'react-native'
import CustomButton from '../../../partial_components/Theme7/CustomButton';
import CustomInput from '../../../partial_components/Theme7/CustomInput';
import TranslatedText from '../../../partial_components/Common/TranslatedText';
import { SelectCountry } from '../../../utils/Places';
import PhoneInput from '../../../partial_components/Theme7/PhoneInput';
import CustomHeader from '../../../partial_components/Common/CustomHeader';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { STRING_LENGTH_MEDIUM, STRING_LENGTH_LONG } from '../../../constants/Config';
import CustomTouchable from '../../../partial_components/Common/CustomTouchable';

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
		const { SigninInput, pagePadding } = this.props

		if (SigninInput.Value === 1) {
			const { Email } = this.state

			return (
				<CustomInput
					maxLength={STRING_LENGTH_MEDIUM}
					keyboardType='email-address'
					containerStyle={{ marginBottom: pagePadding }}
					value={Email}
					onChangeText={(text) => { this.setState({ Email: text }) }}
					placeholder='Email' />
			)
		}
		else {
			const { Phone, PhoneCountry } = this.state

			return (
				<PhoneInput
					contentContainerStyle={{ marginBottom: pagePadding }}
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

	render() {
		const { 
			EnableFacebookLogin,
			EnableGooglePlusLogin, 
			pagePadding,
			submitLocked,
			EnableGuestLogin,
			submitGuest,
			submitFacebook,
			submitGoogle,
			textColor2,
			bgColor1,
			ShowTitle,
		} = this.props
		
		const { Password } = this.state

		return (
			<LazyContainer>
				<CustomHeader
					navigation={this.props.navigation}
					leftComponent={null}
					title={"Login"} />

				<ScrollView
					contentContainerStyle={{ flexGrow: 1 }}>
					<View style={{ backgroundColor: bgColor1, margin: pagePadding, padding: pagePadding }}>
						<Image
							style={{ height: 200, width: 200, alignSelf: 'center' }}
							source={require('../../../android/app/src/main/web_hi_res_512.png')}
						/>
						{ShowTitle.Value && <TranslatedText style={{ fontSize: 14, textAlign: 'center', marginVertical: 10 }} text="LoginTitle" />}

						{this.renderAccountInput()}

						<CustomInput
							maxLength={STRING_LENGTH_LONG}
							containerStyle={{ marginBottom: pagePadding }}
							value={Password}
							onChangeText={(text) => { this.setState({ Password: text }) }}
							placeholder='Password'
							secureTextEntry={true} />

						<CustomButton
							fullWidth={true}
							loading={submitLocked}
							onPress={this.submit}
							title="Login" />

					</View>

					<View
						style={{
							flexDirection: 'row',
							justifyContent: 'center',
							padding: pagePadding,
						}}>
						<TranslatedText style={{ color: textColor2, marginRight: 5, }} text="NotRegisteredYetPlease" />

						<CustomTouchable
							onPress={() => {
								this.props.navigation.navigate("Signup")
							}}>
							<TranslatedText style={{ color: textColor2 }} text="Signup" />
						</CustomTouchable>
					</View>

					{EnableGuestLogin.Value && <View
						style={{
							flexDirection: 'row',
							justifyContent: 'center',
							paddingHorizontal: pagePadding,
							paddingBottom: pagePadding,
						}}>
						<TranslatedText style={{ color: textColor2, marginRight: 5, }} text="Or" />

						<CustomTouchable
							onPress={submitGuest}>
							<TranslatedText style={{ color: textColor2 }} text="ContinueAsGuest" />
						</CustomTouchable>
					</View>}

					<View style={{ alignSelf: 'center', flexDirection: 'row' }} >

						<TranslatedText style={{ color: textColor2, marginRight: 5, }} text="Or" />

						<TranslatedText style={{ color: textColor2, marginRight: 5, }} text="MaybeYouNeedTo" />

						<CustomTouchable onPress={() => { this.props.navigation.navigate("PasswordReset") }}>
							<TranslatedText style={{ color: textColor2 }} text="ResetPassword" />
						</CustomTouchable>

					</View>

					{(EnableFacebookLogin.Value || EnableGooglePlusLogin.Value) && <View
						style={{
							marginTop: 15,
							paddingHorizontal: 40,
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
							{EnableFacebookLogin.Value && <TouchableOpacity
								onPress={submitFacebook}
								style={{
									padding: 3,
								}}>
								<FontAwesome
									name="facebook-square"
									color="#1778F2"
									size={32} />
							</TouchableOpacity>}

							{EnableGooglePlusLogin.Value && <TouchableOpacity
								onPress={submitGoogle}
								style={{
									padding: 3,
									marginLeft: 20,
								}}>
								<FontAwesome
									name="google"
									color="#dd4b39"
									size={32} />
							</TouchableOpacity>}
						</View>
					</View>}
				</ScrollView>

			</LazyContainer>
		)
	}
}

export default Login