import React, { Component } from 'react';
import { withLocalize } from 'react-localize-redux';
import { Image, ScrollView, StatusBar, View } from 'react-native';
import { STRING_LENGTH_LONG, STRING_LENGTH_SHORT } from '../../../constants/Config';
import CustomButton from '../../../partial_components/Common/CustomButton';
import CustomDatePicker from '../../../partial_components/Common/CustomDatePicker';
import CustomTouchable from '../../../partial_components/Common/CustomTouchable';
import LazyContainer from '../../../partial_components/Common/LazyContainer';
import TranslatedText from '../../../partial_components/Common/TranslatedText';
import CloseButton from '../../../partial_components/Theme26/CloseButton';
import PhoneInput from '../../../partial_components/Theme26/PhoneInput';
import RoundedInput from '../../../partial_components/Theme26/RoundedInput';
import { formatDate } from '../../../utils/Date';
import { SelectCountry } from '../../../utils/Places';
import { getStatusBarStyle } from '../../../utils/Misc';

class CompleteProfile extends Component {
	constructor() {
		super()

		this.state = {
			isDateTimePickerVisible: false
		}
	}

	componentDidMount() {
		const { data } = this.props

		this.setState({
			...data,
		})
	}

	submit = () => {
		const {
			Email,
			PhoneCountry,
			Phone,
			FullName,
			Birthday,
		} = this.state

		this.props.submit({
			Email,
			PhoneCountry,
			Phone,
			fullName: FullName,
			Birthday
		})
	}

	hideDateTimePicker = (callback) => {
		this.setState({ isDateTimePickerVisible: false }, () => { callback && callback() })
	}

	showDateTimePicker = () => {
		this.setState({ isDateTimePickerVisible: true })
	}

	render() {
		const {
			largePagePadding,
			submitLocked,
			largeBorderRadius,
			skip,
			statusBarColor,
		} = this.props

		const {
			Email,
			PhoneCountry,
			Phone,
			FullName,
			Birthday,
			isDateTimePickerVisible
		} = this.state

		return (
			<LazyContainer>

				<StatusBar
					backgroundColor={statusBarColor}
					barStyle={getStatusBarStyle()}
				/>

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
							onPress={skip} />

						<Image
							resizeMode='contain'
							style={{
								width: 70,
								height: 70,
							}}
							source={require('../../../android/app/src/main/res/mipmap-xxxhdpi/ic_launcher_round.png')} />
					</View>

					<TranslatedText style={{ fontSize: 30, fontWeight: 'bold', textAlign: 'center', }} text="CompleteYourProfile" />

					<RoundedInput
						maxLength={STRING_LENGTH_LONG}
						// containerStyle={{ marginTop: largePagePadding, }}
						value={FullName}
						title='Name'
						onChangeText={(text) => { this.setState({ FullName: text }) }}
						placeholder="TypeNameHere" />

					<RoundedInput
						maxLength={STRING_LENGTH_SHORT}
						// containerStyle={{ marginTop: largePagePadding, }}
						keyboardType='email-address'
						title='Email'
						value={Email}
						onChangeText={(text) => { this.setState({ Email: text }) }}
						placeholder="TypeEmailHere" />

					<PhoneInput
						maxLength={STRING_LENGTH_SHORT}
						style={{
							paddingVertical: 9
						}}
						title='Phone'
						contentContainerStyle={{ marginTop: largePagePadding, paddingVertical: 0, borderRadius: largeBorderRadius / 2 }}
						countryId={PhoneCountry ? PhoneCountry.Id : undefined}
						onPressFlag={() => {
							SelectCountry(this.props.navigation, item => {
								this.setState({ PhoneCountry: item })
							})
						}}
						title='Phone'
						value={Phone}
						onChangeText={(text) => { this.setState({ Phone: text }) }} />

					<CustomTouchable
						onPress={() => {
							this.showDateTimePicker()
						}}
					>
						<RoundedInput
							editable={false}
							title='Birthday'
							// containerStyle={{ marginTop: largePagePadding, }}
							value={Birthday ? formatDate(Birthday) : null}
							placeholder="Birthday" />
					</CustomTouchable>

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

					<View style={{ alignSelf: 'center' }} >

						<CustomTouchable
							onPress={skip}
						>
							<TranslatedText text={'orSkipthisPage'} style={{ color: this.props.mainColor, color: this.props.textColor2, textAlign: 'center', marginTop: largePagePadding }} />
						</CustomTouchable>

					</View>

					<CustomDatePicker
						isVisible={isDateTimePickerVisible}
						date={Birthday}
						onDatePicked={(date) => {
							this.hideDateTimePicker(() => {
								this.setState({ Birthday: date })
							})
						}}
						onCancel={this.hideDateTimePicker} />
				</ScrollView>
			</LazyContainer>
		)
	}
}

export default withLocalize(CompleteProfile)