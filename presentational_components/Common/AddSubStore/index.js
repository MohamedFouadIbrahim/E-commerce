import React, { Component } from 'react';
import CustomHeader from "../../../partial_components/Common/CustomHeader";
import LazyContainer from "../../../partial_components/Common/LazyContainer";
import { AddSubStore as AddNewSubStore } from '../../../services/SubStoreService';
import HeaderSubmitButton from '../../../partial_components/Common/HeaderSubmitButton';
import RoundedInput from '../../../partial_components/Theme26/RoundedInput';
import PhoneInput from '../../../partial_components/Theme26/PhoneInput';
import { parsePhone } from '../../../utils/Phone';
import { LongToast } from '../../../utils/Toast';
import { isValidMobileNumber, isValidEmail } from '../../../utils/Validation';

class AddSubStore extends Component {

    constructor(props) {
        super(props)

        const {
            countries,
            country_id
        } = this.props

        this.state = {
            lockSubmit: false,
            Name: null,
            Description: null,
            Phone: null,
            Address: null,
            PhoneCountry: countries.find(item => item.Id == country_id)
        }

        this.lockSubmit = false

    }

    componentDidMount() {
        if (this.props.route.params?.Id) {

            const {
                Name,
                Description,
                Phone,
                Address
            } = this.props.route.params

            const PhoneCountry = parsePhone(String(Phone)).NumberCountry;
            const PhoneNumber = parsePhone(String(Phone)).NationalNumber
            const fullPhone = `${PhoneCountry.PhoneCode}${PhoneNumber}`

            this.setState({
                Name,
                Description,
                Phone: PhoneNumber,
                Address,
                PhoneCountry
            })
        }
    }

    addNewSubStore = () => {

        if (this.lockSubmit) {
            return
        }


        const {
            Name,
            Description,
            Address,
            PhoneCountry,
        } = this.state

        let {
            Phone,
        } = this.state


        const {
            setSubStoreId
        } = this.props

        if (!Phone || !Name || !Description || !Address) {
            return LongToast('CantHaveEmptyInputs')
        }

        let FullPhone = ""
        if (Phone && Phone.length) {
            Phone = (Phone[0] === "0") ? Phone.substr(1) : Phone;
            FullPhone = `${PhoneCountry.PhoneCode}${Phone}`
            if (!isValidMobileNumber(FullPhone)) {
                LongToast('InvalidPhone')
                return;
            }
        }



        this.lockSubmit = true
        this.setState({ lockSubmit: true })

        AddNewSubStore({
            Id: this.props.route.params?.Id || 0,
            Name,
            Description,
            Phone: Phone ? `${PhoneCountry.PhoneCode}${Phone}` : null,
            Address
        }, res => {


            this.lockSubmit = false
            this.setState({ lockSubmit: false })
            setSubStoreId(res.data)

            if (!this.props.route.params) {
                 LongToast('SubStoreHassBeenCreated')
                this.props.navigation.navigate('MyStore')
                return
            }
            else {
                LongToast('DataSaved')
                this.props.navigation.goBack()
            }

            if (this.props.route.params?.Id) {

                const {
                    fetchContent
                } = this.props.route.params
                fetchContent && fetchContent()

            } else {

                const {
                    fetchContent
                } = this.props

                fetchContent && fetchContent()
            }

        }, err => {

            this.lockSubmit = false
            this.setState({ lockSubmit: false })

        })
    }

    render() {

        const {
            largePagePadding
        } = this.props

        const {
            Name,
            Description,
            Phone,
            Address,
            PhoneCountry,
            lockSubmit
        } = this.state

        return (
            <LazyContainer>

                <CustomHeader
                    title={'AddSubstore'}
                    navigation={this.props.navigation}
                    rightComponent={
                        <HeaderSubmitButton
                            isLoading={lockSubmit}
                            onPress={this.addNewSubStore}
                        />
                    }
                />

                <RoundedInput
                    title='Name'
                    containerStyle={{ marginHorizontal: largePagePadding, }}
                    placeholder="Name"
                    value={Name}
                    onChangeText={(Name) => { this.setState({ Name }) }} />


                <PhoneInput
                    countryId={PhoneCountry ? PhoneCountry.Id : undefined}
                    onPressFlag={() => {
                        SelectCountry(this.props.navigation, item => {
                            this.setState({ PhoneCountry: item })
                        })
                    }}
                    title='Phone'
                    contentContainerStyle={{ marginHorizontal: largePagePadding, marginTop: largePagePadding }}
                    value={Phone ? Phone : null}
                    onChangeText={(Phone) => { this.setState({ Phone }) }} />


                <RoundedInput
                    containerStyle={{ marginHorizontal: largePagePadding, }}
                    title='AddressInDetails'
                    placeholder="AddressInDetailsPlaceHolder"
                    value={Address}
                    onChangeText={(Address) => { this.setState({ Address }) }} />


                <RoundedInput
                    multiline={true}
                    numberOfLines={4}
                    containerStyle={{ marginHorizontal: largePagePadding, }}
                    title='Description'
                    placeholder="Description"
                    value={Description}
                    onChangeText={(Description) => { this.setState({ Description }) }} />


            </LazyContainer>

        )
    }
}


export default AddSubStore