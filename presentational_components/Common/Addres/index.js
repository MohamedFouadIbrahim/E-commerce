import React from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, View, I18nManager, TouchableOpacity, ActivityIndicator } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { STRING_LENGTH_LONG, STRING_LENGTH_MEDIUM } from '../../../constants/Config';
import CurrentLocationButton from '../../../partial_components/Common/CurrentLocationButton';
import CustomHeader, { headerHeight } from '../../../partial_components/Common/CustomHeader';
import HeaderSubmitButton from '../../../partial_components/Common/HeaderSubmitButton';
import RoundedInput from '../../../partial_components/Theme26/RoundedInput';
import LazyContainer from '../../../partial_components/Common/LazyContainer';
import RoundedSelector from '../../../partial_components/Common/RoundedSelector';
import PhoneInput from '../../../partial_components/Theme26/PhoneInput';
import TranslatedText from '../../../partial_components/Common/TranslatedText';
import { GetCurrentPosition } from '../../../utils/Location';
import { SelectArea, SelectCity, SelectCountry } from '../../../utils/Places.js';
import CustomButton from '../../../partial_components/Theme7/CustomButton';
import CustomMarker from '../../../partial_components/Common/CustomMarker/index';
import { parsePhone } from '../../../utils/Phone';
import CustomTouchable from '../../../partial_components/Common/CustomTouchable';
import { LongToast } from '../../../utils/Toast';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { LocationPermission } from '../../../utils/DevicePermission';
import { screenHeight } from '../../../constants/Metrics';
import { isValidEmail, isValidMobileNumber } from '../../../utils/Validation';
import SwitchItem from '../../../partial_components/Common/SwitchItem';
class Address extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoadingDone: false,
            didFetchData: false,
            latitude: 0,
            longitude: 0,
            markerLatitude: null,
            markerLongitude: null,
            latitudeDelta: 0.002,
            longitudeDelta: 0.002,
            IsShowMap: this.props.IsShowMap,
            MyLocationBottonPressed: false,
            lockSubmit: false,
            FormVaild: false,
            opacity: 0.4,
            is_default: true,
        }
        this.MyLocationBottonPressed = false
    }

    componentDidMount() {
        const {
            latitude,
            longitude
        } = this.props
        if (!latitude || !longitude) {
            if (this.props.editMode) {
                this.setState({
                    ...this.props,
                    latitude: latitude ? latitude : 0,
                    longitude: longitude ? longitude : 0,
                    IsShowMap: this.props.editMode ? { ...this.props.IsShowMap, Value: false } : this.props.IsShowMap,
                    didFetchData: true
                })
            } else if (this.props.IsShowMap.Value) {
                LocationPermission()
                GetCurrentPosition((data) => {
                    this.setState({
                        ...this.props,
                        latitude: data.latitude,
                        longitude: data.longitude,
                        IsShowMap: this.props.editMode ? { ...this.props.IsShowMap, Value: false } : this.props.IsShowMap,
                        didFetchData: true
                    })
                }, err => {

                    LongToast('OpenLocation')
                    this.setState({
                        ...this.props,
                        latitude: 0,
                        longitude: 0,
                        IsShowMap: this.props.editMode ? { ...this.props.IsShowMap, Value: false } : this.props.IsShowMap,
                        didFetchData: true
                    })
                })
            } else {
                this.setState({
                    ...this.props,
                    latitude: latitude ? latitude : 0,
                    longitude: longitude ? longitude : 0,
                    IsShowMap: false,
                    didFetchData: true
                })
            }
        } else {
            this.setState({
                ...this.props,
                latitude,
                longitude,
                IsShowMap: this.props.editMode ? { ...this.props.IsShowMap, Value: false } : this.props.IsShowMap,
                didFetchData: true
            })
        }

    }

    Earth = (scroll = true) => {
        GetCurrentPosition((data) => {
            this.setState({
                latitude: data.latitude,
                longitude: data.longitude,
            })
        }, err => {
            LongToast('OpenLocation')
            this.setState({ latitude: 0, longitude: 0, didFetchData: true })
        })
    }

    rightComponent = () => {
        return (
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                }}>
                <HeaderSubmitButton
                    isLoading={this.props.lockSubmit}
                    onPress={() => {
                        this.onSubmit()
                    }} />
            </View>
        )

    }

    vaildationWise = () => {

        const {
            IsShowCompanyName,
            IsCompanyNameRequired,
            CompanyName,
            IsShowCity,
            IsCityRequired,
            City,
            IsShowCountry,
            IsCountryRequired,
            Country,
            IsShowAddress1,
            IsAddress1Required,
            Address1,
            IsShowAddress2,
            IsAddress2Required,
            Address2,
            IsShowArea,
            IsAreaRequired,
            Area,
            IsShowEmail,
            IsEmailRequired,
            Email1,
            IsShowPhone,
            IsPhoneRequired,
            Phone1Country,
            Phone1,
            FirstName,
            FormVaild
        } = this.state

        const CompanyNameNotValid = IsShowCompanyName.Value && IsCompanyNameRequired.Value && !CompanyName
        const CityNotVaild = IsShowCity.Value && IsCityRequired.Value && !City
        const CountryNotVaild = IsShowCountry.Value && IsCountryRequired.Value && !Country
        const Address1NotVaild = IsShowAddress1.Value && IsAddress1Required.Value && !Address1
        const Address2NotVaid = IsShowAddress2.Value && IsAddress2Required.Value && !Address2
        const AreaNotVaild = IsShowArea.Value && IsAreaRequired.Value && !Area
        const EmailNotVaild = IsShowEmail.Value && IsEmailRequired.Value && Email1 && !isValidEmail(Email1)
        const PhoneNotVaild = IsShowPhone.Value && IsPhoneRequired && !isValidMobileNumber(`${Phone1Country.PhoneCode}${Phone1}`)
        const FirstNameNotVaild = FirstName == null || FirstName == ''

        const OpenDoneButton = (!CompanyNameNotValid &&
            !CityNotVaild &&
            !CountryNotVaild &&
            !Address1NotVaild &&
            !Address2NotVaid &&
            !AreaNotVaild &&
            !EmailNotVaild &&
            !PhoneNotVaild &&
            !FirstNameNotVaild)
        if (OpenDoneButton && !FormVaild) {

            this.setState({ FormVaild: true, opacity: 1 })
        } else if (!OpenDoneButton && FormVaild) {
            this.setState({ FormVaild: false, opacity: 0.4 })
        }

    }

    componentDidUpdate() {
        this.vaildationWise()
    }

    onSubmit = () => {
        const Data = { ...this.state, Id: this.AdreesId ? this.AdreesId : 0 }

        const {
            IsShowCompanyName,
            IsCompanyNameRequired,
            CompanyName,
            IsShowCity,
            IsCityRequired,
            City,
            IsShowCountry,
            IsCountryRequired,
            Country,
            IsShowAddress1,
            IsAddress1Required,
            Address1,
            IsShowAddress2,
            IsAddress2Required,
            Address2,
            IsShowArea,
            IsAreaRequired,
            Area,
            IsShowEmail,
            IsEmailRequired,
            Email1,
            IsShowPhone,
            IsPhoneRequired,
            Phone1Country,
            Phone1,
            FirstName,
            FormVaild
        } = Data

        const CompanyNameNotValid = IsShowCompanyName.Value && IsCompanyNameRequired.Value && !CompanyName
        const CityNotVaild = IsShowCity.Value && IsCityRequired.Value && !City
        const CountryNotVaild = IsShowCountry.Value && IsCountryRequired.Value && !Country
        const Address1NotVaild = IsShowAddress1.Value && IsAddress1Required.Value && !Address1
        const Address2NotVaid = IsShowAddress2.Value && IsAddress2Required.Value && !Address2
        const AreaNotVaild = IsShowArea.Value && IsAreaRequired.Value && !Area
        const EmailNotVaild = IsShowEmail.Value && IsEmailRequired.Value && Email1 && !isValidEmail(Email1)
        const PhoneNotVaild = IsShowPhone.Value && IsPhoneRequired && !isValidMobileNumber(`${Phone1Country.PhoneCode}${Phone1}`)
        const FirstNameNotVaild = FirstName == null || FirstName == ''

        if (CompanyNameNotValid) {
            return LongToast('EnterCompanyName')
        }
        if (CityNotVaild) {
            return LongToast('SelectCity')
        }
        if (CountryNotVaild) {
            return LongToast('SelectCountry')
        }
        if (Address1NotVaild) {
            return LongToast('Address1NotVaild')
        }
        if (Address2NotVaid) {
            return LongToast('Address2NotVaid')
        }
        if (AreaNotVaild) {
            return LongToast('SelectArea')
        }
        if (PhoneNotVaild) {
            return LongToast('PhoneNotVaild')
        }
        if (EmailNotVaild) {
            return LongToast('EmailNotVaild')
        }
        if (FirstNameNotVaild) {
            return LongToast('FirstNameNotVaild')
        }

        this.props.onSubmit(Data)
    }

    renderContent = () => {
        if (!this.state.didFetchData) {
            return
        }

        const { largePagePadding, borderRadius } = this.props

        const {
            FirstName,
            Phone1,
            Email1,
            Address1,
            Address2,
            CountryId,
            CityId,
            Country,
            City,
            Area,
            Phone1Country,
            textColor2,
            largeBorderRadius,
            pagePadding,
            bgColor2,
            IsAddress1Required,
            IsShowCountry,
            IsShowCity,
            IsShowArea,
            IsShowPhone,
            IsShowPhone2,
            IsShowEmail,
            IsShowCompanyName,
            IsShowAddress1,
            IsShowAddress2,
            CompanyName,
            FormVaild,
            is_default,
        } = this.state

        if (!this.state.IsShowMap.Value) {
            return (
                <ScrollView
                    ref={ref => this.ScrollView = ref}>
                    <TranslatedText
                        style={{
                            fontSize: 15,
                            marginTop: largePagePadding,
                            marginHorizontal: largePagePadding,
                            color: textColor2,
                        }}
                        text={'AddressInstructions'} />

                    <RoundedInput
                        title='Name'
                        maxLength={STRING_LENGTH_MEDIUM}
                        containerStyle={{ marginHorizontal: largePagePadding, marginTop: largePagePadding }}
                        placeholder="NameAddressPlaceHolder"
                        value={FirstName}
                        onChangeText={(FirstName) => { this.setState({ FirstName }) }} />


                    {IsShowPhone.Value == true ? < PhoneInput
                        countryId={Phone1Country ? Phone1Country.Id : undefined}
                        onPressFlag={() => {
                            SelectCountry(this.props.navigation, item => {
                                this.setState({ Phone1Country: item })
                            })
                        }}
                        title='Phone'
                        contentContainerStyle={{ marginHorizontal: largePagePadding, marginTop: largePagePadding }}
                        maxLength={STRING_LENGTH_MEDIUM}
                        value={Phone1 && Phone1 != 'null' ? Phone1 : null}
                        onChangeText={(Phone1) => { this.setState({ Phone1: Phone1 }) }} /> : null}

                    <View style={{
                        flexDirection: 'row',
                        // justifyContent: 'space-between',
                        marginTop: (IsShowCity.Value || IsShowCountry.Value) ? 10 : 0,
                        paddingHorizontal: largePagePadding
                    }} >

                        {IsShowCountry.Value == true ? <RoundedSelector
                            arrow={true}
                            onPress={() => {
                                SelectCountry(this.props.navigation, item => {
                                    this.setState({ Country: item, City: null, toggleCity: true, Area: null })
                                })
                            }}
                            containerStyle={{ flex: 1 }}
                            title='Country'
                            placeholder='SelectCountry'
                            value={Country ? Country.Name : null}
                        /> : null}

                        {IsShowCountry.Value && IsShowCity.Value ? <View style={{ width: largePagePadding }} /> : null}


                        {IsShowCity.Value == true ? <RoundedSelector
                            disable={Country && Country.Name ? false : true}
                            arrow={true}
                            onPress={() => {
                                SelectCity(this.props.navigation, item => {
                                    this.setState({ City: item, Area: null })
                                }, Country ? Country.Id : CountryId, true)
                            }}
                            title='City'
                            containerStyle={{ flex: 1 }}
                            placeholder='SelectCity'
                            //value={City && City.Name != '' ? City.Name : !this.state.toggleCity ? this.props.city.Name : null}
                            value={City ? City.Name : null}
                        /> : null}
                    </View>


                    {(City || this.props.city.Id) && IsShowArea.Value == true ?
                        <View  >
                            <RoundedSelector
                                disable={City && City.Name ? false : true}
                                trimText={false}
                                onPress={() => {
                                    SelectArea(this.props.navigation, item => {
                                        this.setState({ Area: item })
                                    }, City ? City.Id : this.props.city.Id, true)
                                }}
                                arrow={true}
                                containerStyle={{ marginHorizontal: largePagePadding }}
                                title='Area'
                                placeholder={'SelectArea'}
                                value={Area ? Area.Name : null}
                            />
                        </View> : null
                    }

                    {IsShowAddress1.Value == true ? <RoundedInput
                        containerStyle={{ marginHorizontal: largePagePadding, }}
                        title='AddressInDetails'
                        maxLength={STRING_LENGTH_LONG}
                        placeholder="AddressInDetailsPlaceHolder2"
                        value={Address1}
                        onChangeText={(Address1) => { this.setState({ Address1 }) }} /> : null}
                    <View>
                        {IsShowEmail.Value == true ? <RoundedInput
                            containerStyle={{ marginHorizontal: largePagePadding }}
                            maxLength={STRING_LENGTH_MEDIUM}
                            title="Email1"
                            value={Email1}
                            placeholder={'Email1PlaceHolder'}
                            onChangeText={(Email1) => { this.setState({ Email1 }) }} /> : null}

                        {IsShowAddress2.Value == true ? <RoundedInput
                            containerStyle={{ marginHorizontal: largePagePadding }}
                            maxLength={STRING_LENGTH_LONG}
                            title="Address2"
                            placeholder="Address2PlaceHolder2"
                            value={Address2}
                            onChangeText={(Address2) => { this.setState({ Address2 }) }} /> : null}

                        {IsShowCompanyName.Value == true ? <RoundedInput
                            containerStyle={{ marginHorizontal: largePagePadding }}
                            maxLength={STRING_LENGTH_LONG}
                            title="CompanyName"
                            placeholder="CompanyNamePlaceHolder"
                            value={CompanyName}
                            onChangeText={(CompanyName) => { this.setState({ CompanyName }) }} /> : null}

                        {!this.props.editMode && <SwitchItem
                            title="MarkAsDefault"
                            value={is_default}
                            style={{
                                marginHorizontal: largePagePadding,
                            }}
                            color={this.props.textColor1}
                            trackColor={{ true: this.props.mainColor }}
                            thumbColor={this.props.bgColor1}
                            onValueChange={(is_default) => {
                                this.setState({
                                    is_default
                                })
                            }} />}


                    </View>
                    {this.state.editMode == true ? <CustomButton
                        title='UpdateLocation'
                        style={{
                            marginHorizontal: largePagePadding,
                            marginVertical: largePagePadding,
                            borderRadius
                        }}
                        onPress={() => {
                            LocationPermission()
                            GetCurrentPosition((data) => {
                                this.setState({
                                    latitude: data.latitude,
                                    longitude: data.longitude,
                                    IsShowMap: {
                                        ...this.state.IsShowMap,
                                        Value: true
                                    }
                                })
                            }, err => {
                                LongToast('OpenLocation')
                                this.setState({
                                    latitude: 0,
                                    longitude: 0,
                                    IsShowMap: {
                                        ...this.state.IsShowMap,
                                        Value: true
                                    }
                                })
                            })
                        }}
                    /> : null}
                    {!this.props.editMode && <View
                        style={{
                            opacity: this.state.opacity
                        }}
                    >
                        <CustomButton
                            loading={this.props.lockSubmit}
                            title='SaveBtn'
                            style={{
                                marginHorizontal: largePagePadding,
                                marginVertical: largePagePadding,
                                borderRadius
                            }}
                            onPress={this.onSubmit}
                        />
                    </View>}


                </ScrollView>
            )
        }
    }

    renderMap = () => {
        const {
            latitude,
            longitude,
            IsShowMap,
            didFetchData,
            latitudeDelta,
            longitudeDelta,
            largeBorderRadius,
            borderRadius,
            smallBorderRadius,
        } = this.state

        const {
            bgColor2,
            IsMapRequired,
            mainColor,
            mainTextColor,
            largePagePadding,
            mainColorText
        } = this.props

        if (!this.state.didFetchData) {
            return
        }
        if (IsShowMap.Value) {
            return (
                <View
                    style={[{
                        borderTopWidth: 1,
                        borderTopColor: bgColor2,
                    }, Platform.OS == 'ios' ? { height: screenHeight - headerHeight } : { flex: 1 }]}
                >
                    <MapView
                        style={[{
                            flex: 1
                        }, Platform.OS == 'ios' ? { height: screenHeight - headerHeight } : {}]}
                        showsMyLocationButton={false}
                        showsUserLocation={false}
                        followsUserLocation={false}
                        initialRegion={{
                            latitude,
                            longitude,
                            latitudeDelta: 0.4,
                            longitudeDelta: 0.4,
                        }}
                        // region={{
                        //     latitude,
                        //     longitude,
                        //     latitudeDelta,
                        //     longitudeDelta,
                        // }}
                        region={{
                            latitude,
                            longitude,
                            latitudeDelta,
                            longitudeDelta,
                        }}
                        onTouchEnd={() => {
                            this.MyLocationBottonPressed = true
                        }}

                        onRegionChangeComplete={(f) => {
                            this.setState({
                                ...f,
                                MyLocationBottonPressed: true
                            })
                        }}
                    >
                    </MapView>
                    <CustomMarker
                        style={{
                            position: 'absolute',
                            top: '44.5%',
                            left: '47%',
                        }}
                        size={40}
                    />
                    <CurrentLocationButton
                        size={25}
                        style={{
                            position: 'absolute',
                            left: 15,
                            top: 25,
                            borderRadius: smallBorderRadius,
                            paddingHorizontal: 8,
                            paddingVertical: 7,
                            borderColor: '#aaa',
                            borderWidth: 0.8
                        }}
                        onPress={() => this.Earth(false)}
                    />

                    {IsMapRequired.Value == false ? <CustomTouchable
                        style={{
                            position: 'absolute',
                            top: 25,
                            right: 15,
                            paddingHorizontal: 8,
                            paddingVertical: 7,
                            backgroundColor: bgColor2,
                            padding: 5,
                            borderRadius: smallBorderRadius,
                            borderColor: '#aaa',
                            borderWidth: 0.8
                        }}
                        onPress={() => {
                            this.setState({
                                IsShowMap: {
                                    ...this.state.IsShowMap,
                                    Value: false
                                }
                            })
                        }}>
                        <View style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}>
                            <TranslatedText text='Skip'></TranslatedText>
                            <MaterialCommunityIcons name={'skip-next-circle-outline'} size={22}
                                style={{
                                    marginLeft: 5,
                                }}
                            />
                        </View>
                    </CustomTouchable> : null}


                    {latitude != 0 && latitude != null && longitude != 0 && longitude != null && this.state.MyLocationBottonPressed && this.MyLocationBottonPressed && <CustomTouchable
                        loading={this.state.lockSubmit}
                        style={[{
                            position: 'absolute',
                            width: '80%',
                            alignSelf: 'center',
                            borderRadius: borderRadius,
                            backgroundColor: mainColor,
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                            paddingHorizontal: 12,
                            paddingVertical: 6
                        }, Platform.OS == 'android' ? { bottom: 40 } : { bottom: 135 }]}
                        onPress={() => {
                            const {
                                latitude,
                                longitude,
                                editMode
                            } = this.state

                            if (editMode) {
                                this.setState({
                                    IsShowMap: {
                                        ...this.state.IsShowMap,
                                        Value: false
                                    }, lockSubmit: {
                                        ...this.state.lockSubmit,
                                        Value: true
                                    },
                                })
                            } else {
                                if (this.props.IsMapRequired.Value && (!latitude || !longitude)) {
                                    LongToast('OpenLocationAndCheckPermission')
                                    return
                                }

                                this.setState({
                                    lockSubmit: {
                                        ...this.state.lockSubmit,
                                        Value: true
                                    },
                                    isLoadingDone: true
                                })

                                this.props.onSelectedLocation(this.props.user_data.Id, latitude, longitude, res => {
                                    const { Phone1 } = res.data
                                    const NumberCountry1 = parsePhone(String(Phone1)).NumberCountry;
                                    const NationalNumber1 = parsePhone(String(Phone1)).NationalNumber
                                    this.setState({
                                        ...this.props,
                                        ...res.data,
                                        didFetchData: true,
                                        latitude: res.data.latitude ? res.data.latitude : latitude,
                                        longitude: res.data.longitude ? res.data.longitude : longitude,
                                        // lockSubmit: false,
                                        Phone1: NationalNumber1,
                                        Phone1Country: NumberCountry1,
                                        IsShowMap: {
                                            ...this.state.IsShowMap,
                                            Value: false
                                        },
                                        isLoadingDone: false
                                    })
                                }, err => {
                                    this.setState({ lockSubmit: false, isLoadingDone: false })
                                })
                            }
                        }}
                    >
                        {this.state.isLoadingDone ? <ActivityIndicator size='small' color={mainColorText} style={{ marginVertical: 5 }} /> :
                            <>
                                <TranslatedText text={'Done'} style={{ color: mainColorText, marginHorizontal: largePagePadding }} />
                                <Ionicons name={I18nManager.isRTL ? 'ios-arrow-round-back' : 'ios-arrow-round-forward'} size={30} color={mainColorText} style={{ alignSelf: 'flex-start' }} />

                            </>
                        }

                    </CustomTouchable>}

                    <CustomTouchable
                        style={[{
                            position: 'absolute',
                            width: '80%',
                            alignSelf: 'center',
                            borderRadius: borderRadius,
                            backgroundColor: mainColor,
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                            paddingHorizontal: 12,
                            paddingVertical: 6
                        }, Platform.OS == 'android' ? { bottom: 90 } : { bottom: 190 }]}
                        onPress={() => {
                            this.MyLocationBottonPressed = true
                            this.setState({
                                MyLocationBottonPressed: true
                            })
                            this.Earth()
                        }}
                    >
                        <Ionicons name={'md-locate'} size={30} color={mainColorText} style={{ alignSelf: 'flex-start' }} />
                        <TranslatedText text={'MyLocation'} style={{ color: mainColorText, marginHorizontal: largePagePadding }} />
                    </CustomTouchable>

                </View>
            )
        }

    }

    render() {
        return (
            <LazyContainer>
                <CustomHeader
                    leftComponent="back"
                    navigation={this.props.navigation}
                    title="Address"
                    rightNumOfItems={1}
                    rightComponent={!this.state.IsShowMap.Value ? this.rightComponent() : null}
                />
                {Platform.OS == 'ios' ?
                    <KeyboardAvoidingView behavior='padding' enabled
                        style={{ flex: 1 }}
                        keyboardVerticalOffset={40}>
                        {this.renderContent()}
                    </KeyboardAvoidingView> : this.renderContent()}


                {this.renderMap()}

            </LazyContainer>
        );
    }
}
export default Address