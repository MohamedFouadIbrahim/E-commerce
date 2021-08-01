import React, { Component } from 'react'
import { View, ScrollView, Image, ActivityIndicator } from 'react-native';
import ConfirmationCodeInput from '../../../partial_components/Common/ConfirmationCodeInput';
import LazyContainer from '../../../partial_components/Common/LazyContainer';
import TranslatedText from '../../../partial_components/Common/TranslatedText';
import CloseButton from '../../../partial_components/Theme26/CloseButton';

class SignupVerify extends Component {
	render() {
		const {
			largePagePadding,
			submitLocked,
			mainColor,
			submit,
		} = this.props

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
							}} />

						<Image
							resizeMode='contain'
							style={{
								width: 70,
								height: 70,
							}}
							source={require('../../../android/app/src/main/res/mipmap-xxxhdpi/ic_launcher_round.png')} />
					</View>

					<TranslatedText style={{ fontSize: 30, fontWeight: 'bold', textAlign: 'center', }} text="CodeVerification" />

					{submitLocked ? <ActivityIndicator 
						color={mainColor} 
						size='large' 
						style={{ marginTop: 20 }} /> : <ConfirmationCodeInput onConfirm={submit} />}
				</ScrollView>
			</LazyContainer>
		)
	}
}

export default SignupVerify