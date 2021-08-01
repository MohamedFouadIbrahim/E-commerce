import React, { Component } from 'react'
import LazyContainer from '../../../partial_components/Common/LazyContainer';
import ArrowItem from '../../../partial_components/Common/ArrowItem';
import { View, ScrollView } from 'react-native'
import CustomButton from '../../../partial_components/Theme7/CustomButton';
import CustomInput from '../../../partial_components/Theme7/CustomInput';
import { SelectCountry } from '../../../utils/Places';
import PhoneInput from '../../../partial_components/Theme7/PhoneInput';
import CustomHeader from '../../../partial_components/Common/CustomHeader';
import { STRING_LENGTH_SHORT, STRING_LENGTH_LONG } from '../../../constants/Config';
import { formatDate } from '../../../utils/Date';
import CustomDatePicker from '../../../partial_components/Common/CustomDatePicker';

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
			submitLocked,
			pagePadding,
			skip,
		} = this.props

		const {
			FullName,
			Email,
			Phone,
			PhoneCountry,
			Birthday,
			isDateTimePickerVisible
		} = this.state

		const halfPagePadding = pagePadding / 2

		return (
			<LazyContainer>
				<CustomHeader
					navigation={this.props.navigation}
					leftComponent={null}
					title={"CompleteYourProfile"} />

				<ScrollView
					style={{
						flexGrow: 1,
					}}>
					<View style={{ margin: pagePadding, padding: pagePadding }}>

						<CustomInput
							maxLength={STRING_LENGTH_LONG}
							containerStyle={{ marginBottom: pagePadding }}
							value={FullName}
							onChangeText={(text) => { this.setState({ FullName: text }) }}
							placeholder='FullName' />

						<CustomInput
							maxLength={STRING_LENGTH_SHORT}
							keyboardType='email-address'
							containerStyle={{ marginBottom: pagePadding }}
							value={Email}
							onChangeText={(text) => { this.setState({ Email: text }) }}
							placeholder='Email' />

						<PhoneInput
							maxLength={STRING_LENGTH_SHORT}
							contentContainerStyle={{ marginBottom: pagePadding, paddingHorizontal: pagePadding / 2 }}
							countryId={PhoneCountry ? PhoneCountry.Id : undefined}
							onPressFlag={() => {
								SelectCountry(this.props.navigation, item => {
									this.setState({ PhoneCountry: item })
								})
							}}
							value={Phone}
							onChangeText={(text) => { this.setState({ Phone: text }) }} />

						<ArrowItem
							style={{
								paddingHorizontal: halfPagePadding,
								marginBottom: halfPagePadding
							}}
							onPress={() => {
								this.showDateTimePicker()
							}}
							title={'Birthday'}
							info={Birthday ? formatDate(Birthday) : null} />

						<CustomButton
							style={{ marginBottom: pagePadding }}
							fullWidth={true}
							loading={submitLocked}
							onPress={this.submit}
							title="GetStarted" />

						<CustomButton
							fullWidth={true}
							onPress={skip}
							title="Skip" />
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

export default CompleteProfile