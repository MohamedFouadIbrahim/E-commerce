import React, { Component } from 'react'
import { View, ScrollView, ActivityIndicator } from 'react-native';
import LazyContainer from '../../../partial_components/Common/LazyContainer';
import ConfirmationCodeInput from '../../../partial_components/Common/ConfirmationCodeInput';
import CustomHeader from '../../../partial_components/Common/CustomHeader';

class SignupVerify extends Component {
	render() {
		const { 
			pagePadding, 
			submitLocked, 
			mainColor,
			submit,
		} = this.props

		return (
			<LazyContainer>
				<CustomHeader
					navigation={this.props.navigation}
					leftComponent="back"
					title={"CodeVerification"} />

				<ScrollView
					style={{
						flexGrow: 1,
					}}>
					<View
						style={{
							margin: pagePadding,
							padding: pagePadding,
							flex: 1
						}}>
						{submitLocked ?
							<ActivityIndicator
								color={mainColor}
								size='large'
								style={{ marginTop: 20 }} /> : <ConfirmationCodeInput onConfirm={submit} />}
					</View>
				</ScrollView>
			</LazyContainer>
		)
	}
}

export default SignupVerify