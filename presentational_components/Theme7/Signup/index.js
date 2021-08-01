import React, { Component } from 'react'
import LazyContainer from '../../../partial_components/Common/LazyContainer';
import { View, ScrollView } from 'react-native'
import CustomButton from '../../../partial_components/Theme7/CustomButton';
import CustomInput from '../../../partial_components/Theme7/CustomInput';
import { SelectCountry } from '../../../utils/Places';
import PhoneInput from '../../../partial_components/Theme7/PhoneInput';
import CustomHeader from '../../../partial_components/Common/CustomHeader';
import TranslatedText from '../../../partial_components/Common/TranslatedText';
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

	renderAccountInput = () => {
		const { SigninInput, pagePadding } = this.props

		if (SigninInput.Value === 1) {
			const { Email } = this.state

			return (
				<CustomInput
					maxLength={STRING_LENGTH_SHORT}
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
					maxLength={STRING_LENGTH_SHORT}
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
			pagePadding, 
			submitLocked,
			ShowTitle,
		} = this.props
		
		const { 
			Password, 
			PasswordConfirmation, 
			FullName 
		} = this.state

		return (
			<LazyContainer>
				<CustomHeader
					navigation={this.props.navigation}
					leftComponent="back"
					title={"Signup"} />

				<ScrollView
					style={{
						flexGrow: 1,
					}}>
					<View style={{ margin: pagePadding, padding: pagePadding }}>
						{ShowTitle.Value && <TranslatedText style={{ fontSize: 14, textAlign: 'center', marginVertical: 10 }} text="SignupTitle" />}

						{this.renderAccountInput()}

						<CustomInput
							maxLength={STRING_LENGTH_LONG}
							containerStyle={{ marginBottom: pagePadding }}
							value={FullName}
							onChangeText={(text) => { this.setState({ FullName: text }) }}
							placeholder='FullName' />

						<CustomInput
							maxLength={STRING_LENGTH_MEDIUM}
							containerStyle={{ marginBottom: pagePadding }}
							value={Password}
							onChangeText={(text) => { this.setState({ Password: text }) }}
							placeholder='Password'
							secureTextEntry={true} />

						<CustomInput
							maxLength={STRING_LENGTH_MEDIUM}
							containerStyle={{ marginBottom: pagePadding }}
							value={PasswordConfirmation}
							onChangeText={(text) => { this.setState({ PasswordConfirmation: text }) }}
							placeholder='PasswordConfirmation'
							secureTextEntry={true} />

						<CustomButton
							fullWidth={true}
							loading={submitLocked}
							onPress={this.submit}
							title="Signup" />
					</View>
				</ScrollView>
			</LazyContainer>
		)
	}
}

export default withLocalize(Signup)