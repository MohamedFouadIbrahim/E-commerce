import React, { Component } from 'react'
import { connect } from 'react-redux'
import { AddEditAdress, GetAdress, GetAdressForCustomer, GetAdressForCustomerWithLocation } from '../../services/CustomerService';
import { isValidEmail, isValidMobileNumber } from '../../utils/Validation';
import { LongToast } from '../../utils/Toast';
import { parsePhone } from '../../utils/Phone';
import { withLocalize } from 'react-localize-redux';

class Addres extends Component {
	constructor(props) {
		super(props)

		// is add/edit
		if (this.props.route.params && this.props.route.params?.AdressID) {
			this.editMode = true
			this.AdreesId = this.props.route.params?.AdressID
		}
		else {
			this.editMode = false
		}

		//is go back to checkout
		if (this.props.route.params && this.props.route.params?.navigateToCheckOut) {
			this.navigateToCheckOut = this.props.route.params?.navigateToCheckOut
		}
		else {
			this.navigateToCheckOut = false
		}

		this.state = {
			lockSubmit: false,
			didFetchData: false,
		}
	}

	onSubmit = (data) => {
		//submit once
		if (this.lockSubmit) {
			return
		}

		const {
			IsAddress1Required,
			IsAreaRequired,
			IsCountryRequired,
			IsCityRequired,
			IsPhoneRequired,
			IsPhone2Required,
			IsEmailRequired,
			IsCompanyNameRequired,
			IsAddress2Required,
			IsPostCodeRequired,

			IsShowCountry,
			IsShowCity,
			IsShowArea,
			IsShowPhone,
			IsShowEmail,
			IsShowCompanyName,
			IsShowAddress1,
			IsShowAddress2,
		} = this.props

		const {
			FirstName,
			Phone1,
			Phone2,
			Email1,
			Address1,
			Address2,
			CountryId,
			CityId,
			Country,
			City,
			Area,
			Phone1Country,
			latitude,
			longitude,
			CompanyName,
			is_default,
		} = data

		// inputs validation
		if (IsShowCompanyName.Value && IsCompanyNameRequired.Value && !CompanyName) {
			LongToast('CantHaveEmptyInputs')
			return
		}
		if (IsShowCity.Value && IsCityRequired.Value && !City) {
			LongToast('CantHaveEmptyInputs')
			return
		}

		if (IsShowCountry.Value && IsCountryRequired.Value && !Country) {
			LongToast('CantHaveEmptyInputs')
			return
		}
		if (IsShowAddress1.Value && IsAddress1Required.Value && !Address1) {
			LongToast('CantHaveEmptyInputs')
			return
		}

		if (IsShowAddress2.Value && IsAddress2Required.Value && !Address2) {
			LongToast('CantHaveEmptyInputs')
			return
		}

		if (IsShowArea.Value && IsAreaRequired.Value && !Area) {
			LongToast('CantHaveEmptyInputs')
			return
		}

		if (!FirstName) {
			LongToast('CantHaveEmptyInputs')
			return
		}

		if (IsShowEmail.Value && IsEmailRequired.Value && Email1 && !isValidEmail(Email1)) {
			LongToast('InvalidEmail')
			return
		}

		if (IsShowPhone.Value && IsPhoneRequired && !isValidMobileNumber(`${Phone1Country.PhoneCode}${Phone1}`)) {
			LongToast('InvalidPhone')
			return
		}

		const {
			ForceLatLng,
		} = this.props

		//check if location required and if not go to map
		if (ForceLatLng.Value && (!latitude || !longitude)) {
			LongToast('LocationRequired')
			this.setState({ triggerMap: true })
			return
		}

		this.lockSubmit = true;
		this.setState({ lockSubmit: true })

		AddEditAdress({
			Id: this.editMode ? this.AdreesId : 0,
			FirstName,
			Phone1: `${Phone1Country.PhoneCode}${Phone1}`,
			Email1,
			Address1,
			Address2,
			CompanyName,
			CountryId: Country ? Country.Id : CountryId,
			CityId: City ? City.Id : this.props.city.Id,
			CustomerId: this.CustomerId,
			AreaId: Area && Area.Id != 0 ? Area.Id : null,
			latitude,
			longitude,
			isDefault: is_default,
		}, res => {
			this.lockSubmit = false;
			this.setState({ lockSubmit: false })

			if (this.navigateToCheckOut) {
				this.props.route.params?.reloadCheckout(res.data.Id)
				this.props.navigation.navigate('Checkout')
				this.props.route.params?.onChildChange(res.data)
			}
			else {
				this.props.navigation.goBack()
				this.props.route.params?.onChildChange(res.data)
			}
		}, err => {
			this.lockSubmit = false;
			this.setState({ lockSubmit: false })
		})
	}

	componentDidMount() {
		if (this.editMode) {
			GetAdress(this.AdreesId, res => {
				const { Phone1 } = res.data
				const NumberCountry1 = parsePhone(String(Phone1)).NumberCountry;
				const NationalNumber1 = parsePhone(String(Phone1)).NationalNumber

				this.setState({
					...res.data,
					Phone1: NationalNumber1,
					Phone1Country: NumberCountry1,
					didFetchData: true
				})
			})
		}
		else {
			GetAdressForCustomer(this.props.user_data.Id, resAdres => {
				const { Phone1 } = resAdres.data
				const NumberCountry1 = parsePhone(String(Phone1)).NumberCountry;
				const NationalNumber1 = parsePhone(String(Phone1)).NationalNumber
				this.setState({
					...resAdres.data,
					Phone1: NationalNumber1,
					Phone1Country: NumberCountry1,
					didFetchData: true
				})
			})
		}
	}

	render() {
		let PresentationalComponent = require('../../presentational_components/Common/Addres').default

		const {
			store_theme_id,
			...restProps
		} = this.props

		if (!this.state.didFetchData) {
			return null
		}

		return (
			<PresentationalComponent
				editMode={this.editMode}
				lockSubmit={this.state.lockSubmit}
				onSubmit={this.onSubmit}
				onSelectedLocation={GetAdressForCustomerWithLocation}
				{...this.state}
				{...restProps}
			/>
		)
	}
}

const mapStateToProps = ({
	login: {
		city,
		user_data
	},
	runtime_config: {
		runtime_config: {
			themes: {
				store_theme_id,
			},
			screens: {
				Home_12_1,
				Select_Address_06_2: {
					ForceLatLng
				},
				Address_Page_05_3
			},
			colors,
			styles,
		},
	},
}) => ({
	user_data,
	city,
	ForceLatLng,
	store_theme_id,
	...Address_Page_05_3,
	...Home_12_1,
	...colors,
	...styles,
})

export default withLocalize(connect(mapStateToProps)(Addres))