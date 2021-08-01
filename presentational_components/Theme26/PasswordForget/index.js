import React, { Component } from 'react';
import { Image, ScrollView, View } from 'react-native';
import { STRING_LENGTH_MEDIUM } from '../../../constants/Config';
import CustomButton from '../../../partial_components/Common/CustomButton';
import LazyContainer from '../../../partial_components/Common/LazyContainer';
import TranslatedText from '../../../partial_components/Common/TranslatedText';
import CloseButton from '../../../partial_components/Theme26/CloseButton';
import RoundedInput from '../../../partial_components/Theme26/RoundedInput';

class ForgetPassword extends Component {
	constructor() {
		super()

		this.state = {}
	}

	submit = () => {
		const { Password, PasswordConfirmation } = this.state
		this.props.onSubmit(Password, PasswordConfirmation)
	}
	
	render() {
		const { largePagePadding, submitLocked, mainColor } = this.props
		const { Password, PasswordConfirmation, } = this.state

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
								right: 10,
							}}
							onPress={() => {
								this.props.navigation.goBack()
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

					<TranslatedText style={{ fontSize: 30, fontWeight: 'bold', textAlign: 'center', }} text="ResetPassword" />


					<RoundedInput
						maxLength={STRING_LENGTH_MEDIUM}
						containerStyle={{ marginTop: largePagePadding, }}
						value={Password}
						onChangeText={(text) => { this.setState({ Password: text }) }}
						title="Password"
						placeholder="TypePasswordHerePlaceHolder"
						secureTextEntry={true} />

					<RoundedInput
						maxLength={STRING_LENGTH_MEDIUM}
						containerStyle={{ marginTop: largePagePadding, }}
						value={PasswordConfirmation}
						onChangeText={(text) => { this.setState({ PasswordConfirmation: text }) }}
						title="PasswordConfirmation"
						placeholder="TypePasswordHerePlaceHolder"
						secureTextEntry={true} />

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
							title="Reset" />
					</View>
				</ScrollView>
			</LazyContainer>
		)
	}
}

export default ForgetPassword