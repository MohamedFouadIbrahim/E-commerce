

import React, { Component } from 'react'
import LazyContainer from '../../../partial_components/Common/LazyContainer';
import { View, ScrollView, } from 'react-native'
import CustomButton from '../../../partial_components/Theme7/CustomButton';
import CustomInput from '../../../partial_components/Theme7/CustomInput';
import CustomHeader from '../../../partial_components/Common/CustomHeader';
import TranslatedText from '../../../partial_components/Common/TranslatedText';
import PhoneInput from '../../../partial_components/Theme7/PhoneInput';
import { withLocalize } from 'react-localize-redux';
import { STRING_LENGTH_MEDIUM } from '../../../constants/Config';
import FontedText from '../../../partial_components/Common/FontedText';

class PasswordReset extends Component {
	constructor() {
		super()

		this.state = {}
	}

	submit = () => {
		// const { Email, Phone } = this.state
		this.props.onSubmit(this.state)
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
					maxLength={STRING_LENGTH_MEDIUM}
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

		const { Email } = this.state

		return (
			<LazyContainer>
				<CustomHeader
					navigation={this.props.navigation}
					leftComponent="back"
					title={"ResetPassword"} />

				<ScrollView
					style={{
						flexGrow: 1,
					}}>
					<View style={{ margin: pagePadding, padding: pagePadding, }}>
						{ShowTitle.Value && <TranslatedText style={{ fontSize: 14, textAlign: 'center', marginVertical: 10 }} text="PasswordResetTitle" />}

						{this.renderAccountInput()}

						<CustomButton
							fullWidth={true}
							loading={submitLocked}
							onPress={this.submit}
							title="ResetPassword" />
					</View>
				</ScrollView>
			</LazyContainer>
		)
	}
}

export default withLocalize(PasswordReset)