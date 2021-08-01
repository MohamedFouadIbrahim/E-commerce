import React, { Component } from 'react'
import LazyContainer from '../../../partial_components/Common/LazyContainer';
import { View, ScrollView } from 'react-native'
import CustomButton from '../../../partial_components/Theme7/CustomButton';
import CustomInput from '../../../partial_components/Theme7/CustomInput';
import CustomHeader from '../../../partial_components/Common/CustomHeader';
import { STRING_LENGTH_MEDIUM } from '../../../constants/Config';

class Signup extends Component {
	constructor() {
		super()

		this.state = {}
	}

	submit = () => {
		const { password, confirmPassword } = this.state
		this.props.onSubmit(password, confirmPassword)
	}

	render() {
		const { pagePadding, submitLocked } = this.props
		const { Password, PasswordConfirmation } = this.state

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
					<View style={{ margin: pagePadding, padding: pagePadding }}>
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
							title="Reset" />
					</View>
				</ScrollView>
			</LazyContainer>
		)
	}
}

export default Signup