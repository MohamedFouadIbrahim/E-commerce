import React, { Component } from 'react'
import { View, ScrollView, Image } from 'react-native'
import LazyContainer from '../../../partial_components/Common/LazyContainer';
import CustomButton from '../../../partial_components/Common/CustomButton';
import CheckBox from '../../../partial_components/Common/CheckBox';
import TranslatedText from '../../../partial_components/Common/TranslatedText';
import RoundedSelector from '../../../partial_components/Common/RoundedSelector';
import RoundedInput from '../../../partial_components/Theme26/RoundedInput';
import PasswordInput from '../../../partial_components/Theme26/PasswordInput';
import PhoneInput from '../../../partial_components/Theme26/PhoneInput';
import { SelectCountry } from '../../../utils/Places';
import CloseButton from '../../../partial_components/Theme26/CloseButton';
import { withLocalize } from 'react-localize-redux';
import { STRING_LENGTH_SHORT, STRING_LENGTH_LONG, STRING_LENGTH_MEDIUM } from '../../../constants/Config';
import FontedText from '../../../partial_components/Common/FontedText';

class Signup extends Component {
	constructor(props) {
		super(props)

		this.state = {}
		this.Decription = this.props.translate('SignUpDescription')

	}

	submit = () => {
		const { FullName, Email, Password, PasswordConfirmation, Phone, PhoneCountry } = this.state
		this.props.submit({ FullName, Email, Password, PasswordConfirmation, Phone, PhoneCountry })
	}

	renderTermsAndCondition = () => {

		const { pagePadding, AcceptedTerms, onCheck, ShowPrivacyPolicy, largePagePadding } = this.props

		if (!ShowPrivacyPolicy.Value) {
			return null
		}

		return (
			<View style={{ flexDirection: 'row', paddingVertical: largePagePadding }} >

				<CustomTouchable onPress={onCheck} >
					<CheckBox selected={AcceptedTerms} />
				</CustomTouchable>

				<CustomTouchable onPress={() => {
					this.props.navigation.navigate('TermsOfService')
				}}  >
					<TranslatedText style={{ fontSize: 12, paddingHorizontal: pagePadding / 2, lineHeight: pagePadding * 2 }} text={'TermsAndCondation'} />
				</CustomTouchable>
			</View>
		)
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
					maxLength={STRING_LENGTH_SHORT}
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

	componentDidMount() {
	}
	render() {
		const {
			largePagePadding,
			submitLocked,
			mainColor,
			ShowTitle,
			AcceptedTerms,
			ShowLanguageSelector,
			changeLanguageFromSignup
		} = this.props

		const {
			Password,
			PasswordConfirmation,
			FullName
		} = this.state

		return (
			<LazyContainer>
				<ScrollView
					contentContainerStyle={{
						padding: largePagePadding,
					}}>
					<View
						style={{
							alignItems: 'center',
						}}>
						<CloseButton
							style={{
								position: 'absolute',
								top: 1,
								right: 10
							}}
							onPress={() => {
								this.props.navigation.goBack()
								changeLanguageFromSignup(false)
							}}
						/>
						<Image
							resizeMode='contain'
							style={{
								width: 70,
								height: 70,
							}}
							source={require('../../../android/app/src/main/res/mipmap-xxxhdpi/ic_launcher_round.png')} />
					</View>

					<TranslatedText style={{ fontSize: 30, fontWeight: 'bold', textAlign: 'center', }} text="Signup" />

					{ShowTitle.Value && <TranslatedText style={{ fontSize: 14, textAlign: 'center', marginTop: 10 }} text="SignupTitle" />}

					{this.renderAccountInput()}

					<RoundedInput
						maxLength={STRING_LENGTH_LONG}
						// containerStyle={{ marginTop: largePagePadding, }}
						value={FullName}
						onChangeText={(text) => { this.setState({ FullName: text }) }}
						title="FullName"
						placeholder="TypeNameHerePlaceHolder" />

					<PasswordInput
						maxLength={STRING_LENGTH_MEDIUM}
						containerStyle={{ marginTop: largePagePadding, }}
						value={Password}
						onChangeText={(text) => { this.setState({ Password: text }) }}
						title="Password"
						placeholder="TypePasswordHerePlaceHolder"
					/>

					<PasswordInput
						maxLength={STRING_LENGTH_MEDIUM}
						containerStyle={{ marginTop: largePagePadding, }}
						value={PasswordConfirmation}
						onChangeText={(text) => { this.setState({ PasswordConfirmation: text }) }}
						title="PasswordConfirmation"
						placeholder="TypePasswordHerePlaceHolder"
					/>

					{ShowLanguageSelector.Value == true ? <RoundedSelector
						onPress={() => {
							const { openLanguageSelectore } = this.props
							openLanguageSelectore && openLanguageSelectore()
						}}
						title='Language'
						containerStyle={{ flex: 1, marginTop: largePagePadding }}
						placeholder='SelectLanguage'
						value={this.props.selectedLang ? this.props.selectedLang.label || this.props.selectedLang.Name : null}
					/> : null}

					<View
						style={{
							marginTop: largePagePadding,
							flexDirection: 'row',
							alignItems: 'center',
						}}>
						<CustomButton
							style={{}}
							fullWidth={true}
							loading={submitLocked}
							onPress={this.submit}
							title="GetStarted" />
					</View>
					{this.renderTermsAndCondition()}
				</ScrollView>
			</LazyContainer>
		)
	}
}

export default withLocalize(Signup)