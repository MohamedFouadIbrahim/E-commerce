import React, { Component } from 'react'
import { View, ScrollView, ActivityIndicator } from 'react-native';
import LazyContainer from '../../../partial_components/Common/LazyContainer';
import ConfirmationCodeInput from '../../../partial_components/Common/ConfirmationCodeInput';
import CustomHeader from '../../../partial_components/Common/CustomHeader';

class ValidationPassword extends Component {
	render() {
		const { 
			pagePadding, 
			submitLocked, 
			mainColor,
			onSubmit,
		} = this.props

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
								style={{ marginTop: 20 }} /> : <ConfirmationCodeInput onConfirm={onSubmit} />}
					</View>
				</ScrollView>
			</LazyContainer>
		)
	}
}

export default ValidationPassword