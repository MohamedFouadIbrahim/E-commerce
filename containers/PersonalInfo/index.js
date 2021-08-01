import React, { Component } from 'react'
import { connect } from 'react-redux'
import { GetPersonalInfo } from '../../services/CustomerService';
import { LongToast } from '../../utils/Toast';
import { PostPersonalInfo, GetGenderStatus } from '../../services/CustomerService';
import { isValidMobileNumber, isValidEmail } from '../../utils/Validation';

class PersonalInfo extends Component {
    constructor() {
        super()
        this.state = {
            dataFitched: false,
            lockSubmit: false
        }
        this.lockSubmit = false
    }

    componentDidMount() {
        GetGenderStatus(null, gender => {
            GetPersonalInfo(res => {
                this.setState({
                    data: { ...res.data, GenderTypeList: gender.data.Data },
                    dataFitched: true,
                })
            })
        })

    }

    submitPersonalInfo = (data) => {
        if (this.lockSubmit) {
            return
        }
        const {
            FullName, //Requierd
            Email,
            Birthday,
            Twitter,
            Facebook,
            Gender,
            Country, //Required
            City,
            Website,
            PhoneCountry,
            Area,
            Address,
            Description,
        } = data

        if (!FullName || !Country) {
            LongToast('CantHaveEmptyInputs')
            return
        }

        const { SigninInput } = this.props;
        // const isMethodPhone = SigninInput.Value === 2

        if (Email && Email.length) {
            if (!isValidEmail(Email)) {
                LongToast('InvalidEmail')
                return;
            }
        }
        // else if (!isMethodPhone) {
        //     LongToast('CantHaveEmptyInputs')
        //     return;
        // }

        let { Phone } = data
        let FullPhone = ""

        if (Phone && Phone.length) {
            Phone = (Phone[0] === "0") ? Phone.substr(1) : Phone;
            FullPhone = `${PhoneCountry.PhoneCode}${Phone}`

            if (!isValidMobileNumber(FullPhone)) {
                LongToast('InvalidPhone')
                return;
            }
        }
        // else if (isMethodPhone) {
        //     LongToast('CantHaveEmptyInputs')
        //     return;
        // }

        this.setState({ lockSubmit: true })
        this.lockSubmit = true

        PostPersonalInfo({
            FullName,
            Phone: FullPhone,
            Email: Email ? Email : '',
            Birthday,
            Twitter,
            Facebook,
            GenderId: Gender ? Gender.Id : null,
            CountryId: Country.Id,
            CityId: City ? City.Id : this.props.city.Id,
            Website,
            AreaId: Area ? Area.Id : null,
            Address,
            Description,
        }, () => {
            this.props.setUserName(FullName)
            this.setState({ lockSubmit: false }); this.lockSubmit = false
            this.props.route.params?.onChildChange && this.props.route.params?.onChildChange()
            this.props.navigation.goBack()
            LongToast('DataSaved')
        }, () => {
            this.setState({ lockSubmit: false })
            this.lockSubmit = false
        })
    }

    render() {
        let PresentationalComponent = require('../../presentational_components/Common/PersonalInfo').default

        const { data, dataFitched } = this.state
        if (!dataFitched) {
            return null
        }
        return (
            <PresentationalComponent
                lockSubmit={this.state.lockSubmit}
                submitPersonalInfo={this.submitPersonalInfo}
                {...data}
                {...this.props} />
        )
    }
}

const mapStateToProps = ({
    login: {
        city,
        store_type,
        user_data: {
            SubStoreId,
        },
    },
    runtime_config: {
        runtime_config: {
            screens: {
                Home_12_1,
                Signin_02_3: {
                    SigninInput,
                },
            },
            colors,
            styles,
        },
    },
}) => ({
    city,
    store_type,
    SubStoreId,
    SigninInput,
    ...Home_12_1,
    ...colors,
    ...styles,
})

function mergeProps(stateProps, { dispatch }, ownProps) {
    const {
        actions: {
            setUserName
        }
    } = require('../../redux/LoginRedux.js');

    return {
        ...ownProps,
        ...stateProps,
        setUserName: (user_name) => setUserName(dispatch, user_name)
    };
}


export default connect(mapStateToProps, undefined, mergeProps)(PersonalInfo)