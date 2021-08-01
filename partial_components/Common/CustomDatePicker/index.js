import React, { PureComponent } from 'react';
import { withLocalize } from 'react-localize-redux';
import DateTimePicker from "react-native-modal-datetime-picker";
import { formatDate, dateToLocalTimezone } from '../../../utils/Date';

class CustomDatePicker extends PureComponent {
	handleDatePicked = (date) => {
		date = new Date(date)
		date = dateToLocalTimezone(date)
		
		const { onDatePicked } = this.props
		const convertedDate = date.toISOString()

		onDatePicked && onDatePicked(convertedDate, formatDate(convertedDate))
	};

	render() {
		const {
			translate,
			time,
			minimumDate,
		} = this.props

		let { 
			date, 
		} = this.props
		
		if (date) {
			date = dateToLocalTimezone(new Date(date), true)
		}
		else {
			date = new Date()
		}

		if (minimumDate && minimumDate > date) {
			date = minimumDate
		}

		if (!time) {
			return (
				<DateTimePicker
					{...this.props}
					date={date}
					cancelTextIOS={translate("Cancel")}
					confirmTextIOS={translate("Confirm")}
					is24Hour={false}
					onConfirm={this.handleDatePicked}
				/>
			);
		} else {
			return (
				<DateTimePicker
					{...this.props}
					cancelTextIOS={translate("Cancel")}
					confirmTextIOS={translate("Confirm")}
					is24Hour={false}
				/>
			)
		}

	}
}

export default withLocalize(CustomDatePicker)
