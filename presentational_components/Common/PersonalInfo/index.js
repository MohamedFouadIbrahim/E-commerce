import React from 'react';
import { ScrollView, View } from 'react-native';
import { STRING_LENGTH_LONG } from '../../../constants/Config';
import RoundedSelector from '../../../partial_components/Common/RoundedSelector';
import RoundedInput from '../../../partial_components/Theme26/RoundedInput';
import CustomDatePicker from '../../../partial_components/Common/CustomDatePicker';
import CustomHeader from '../../../partial_components/Common/CustomHeader';
import CustomSelector from '../../../partial_components/Common/CustomSelector';
import HeaderSubmitButton from '../../../partial_components/Common/HeaderSubmitButton';
import LazyContainer from '../../../partial_components/Common/LazyContainer';
import PhoneInput from '../../../partial_components/Theme26/PhoneInput';
import { GetMyLocation } from '../../../services/PlacesService';
import { formatDate } from '../../../utils/Date';
import { parsePhone } from '../../../utils/Phone';
import { SelectCity, SelectCountry, SelectArea } from '../../../utils/Places';
import TextEditorInput from '../../../partial_components/Common/TextEditorInput';

class PersonalInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataFitched: false,
            lockSubmit: false,
            PhoneCountry: null,
            isDateTimePickerVisible: false
        }
        this.lockSubmit = false
        this.genderTypesSelcectorRef = React.createRef();

    }
    hideDateTimePicker = (callback) => {
        this.setState({ isDateTimePickerVisible: false }, () => { callback && callback() })
    }

    showDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: true })
    }

    submit = () => {
        const { FullName, Phone, Email, Birthday, Twitter, Facebook, Gender, Country, City, Website, PhoneCountry, Area, Address } = this.state
        this.props.submitPersonalInfo({ FullName, Phone, Email, Birthday, Twitter, Facebook, Gender, Country, City, Website, PhoneCountry, Area, Address })
    }

    componentDidMount() {
        this.props.Phone ?
            this.setState({
                ...this.props,
                Phone: this.props.Phone ? parsePhone(this.props.Phone).NationalNumber : null,
                PhoneCountry: this.props.Phone ? parsePhone(this.props.Phone).NumberCountry : null,
                dataFitched: true
            }) :
            GetMyLocation(res => {
                this.setState({
                    ...this.props,
                    PhoneCountry: res.data,
                    dataFitched: true
                })
            })
    }

    renderContent = () => {
        const {
            FullName,
            Phone,
            Email,
            Birthday,
            Twitter,
            Facebook,
            Gender,
            Country,
            City,
            Website,
            PhoneCountry,
            GenderTypeList,
            Area,
            Address,
            Description,
        } = this.state

        const {
            store_type,
            SubStoreId,
            largePagePadding
        } = this.props

        return (
            <ScrollView
                contentContainerStyle={{
                    paddingHorizontal: largePagePadding
                }}>

                <RoundedInput
                    maxLength={STRING_LENGTH_LONG}
                    title="Name"
                    // containerStyle={{ marginTop: largePagePadding }}
                    value={FullName}
                    placeholder="TypeNameHerePlaceHolder"
                    onChangeText={(text) => { this.setState({ FullName: text }) }} />

                <RoundedInput
                    maxLength={STRING_LENGTH_LONG}
                    // containerStyle={{ marginTop: largePagePadding }}
                    title="Email"
                    value={Email}
                    keyboardType='email-address'
                    placeholder="TypeEmailHerePlaceHolder"
                    onChangeText={(text) => { this.setState({ Email: text }) }} />

                <RoundedInput
                    maxLength={STRING_LENGTH_LONG}
                    // containerStyle={{ marginTop: largePagePadding }}
                    placeholder="TypeFaceBookHerePlaceHolder"
                    title="Facebook"
                    value={Facebook}
                    onChangeText={(text) => { this.setState({ Facebook: text }) }} />

                <RoundedInput
                    maxLength={STRING_LENGTH_LONG}
                    // containerStyle={{ marginTop: largePagePadding }}
                    placeholder="TypeTwitterHerePlaceHolder"
                    title="Twitter"
                    value={Twitter}
                    onChangeText={(text) => { this.setState({ Twitter: text }) }} />

                <RoundedInput
                    maxLength={STRING_LENGTH_LONG}
                    title="Website"
                    // containerStyle={{ marginTop: largePagePadding }}
                    placeholder="TypeWebsiteHerePlaceHolder"
                    value={Website}
                    onChangeText={(text) => { this.setState({ Website: text }) }} />

                <PhoneInput
                    countryId={PhoneCountry ? PhoneCountry.Id : undefined}
                    onPressFlag={() => {
                        SelectCountry(this.props.navigation, item => {
                            this.setState({ PhoneCountry: item })
                        })
                    }}
                    title='Phone'
                    contentContainerStyle={{ marginTop: largePagePadding }}
                    maxLength={STRING_LENGTH_LONG}
                    value={Phone}
                    onChangeText={(text) => { this.setState({ Phone: text }) }} />

                <RoundedInput
                    maxLength={STRING_LENGTH_LONG}
                    title="Address"
                    // containerStyle={{ marginTop: largePagePadding }}
                    placeholder='AddressInDetailsPlaceHolder2'
                    value={Address}
                    onChangeText={(text) => { this.setState({ Address: text }) }} />

                <View
                    style={{
                        flexDirection: 'row',
                        marginTop: largePagePadding
                    }}
                >
                    <RoundedSelector
                        arrow={true}
                        containerStyle={{ flex: 1, }}
                        onPress={() => {
                            SelectCountry(this.props.navigation, item => {
                                this.setState({ Country: item, City: null })
                            })
                        }}
                        title={'Country'}
                        placeholder='Country'
                        value={Country ? Country.Name : null} />

                    <View style={{ width: largePagePadding }} />

                    <RoundedSelector
                        arrow={true}
                        containerStyle={{ flex: 1, }}
                        onPress={() => {
                            SelectCity(this.props.navigation, item => {
                                this.setState({ City: item })
                            }, Country.Id)
                        }}
                        title={'City'}
                        placeholder='City'
                        value={City ? City.Name : this.props.city.Name} />
                </View>

                {City && <View>
                    <RoundedSelector
                        arrow={true}
                        containerStyle={{ marginTop: largePagePadding }}
                        onPress={() => {
                            SelectArea(this.props.navigation, item => {
                                this.setState({ Area: item })
                            }, City.Id)
                        }}
                        title={'Area'}
                        placeholder='Area'
                        value={Area ? Area.Name : null} />
                </View>}

                <RoundedSelector
                    containerStyle={{ marginTop: largePagePadding }}
                    onPress={() => {
                        this.genderTypesSelcectorRef.current.show()
                    }}
                    placeholder='Gender'
                    title={'Gender'}
                    value={Gender ? Gender.Name : null} />

                <RoundedSelector
                    containerStyle={{ marginVertical: largePagePadding }}
                    onPress={() => {
                        this.showDateTimePicker()
                    }}
                    title={'Birthday'}
                    placeholder='Birthday'
                    value={Birthday ? formatDate(Birthday) : null} />

                {store_type === 3 && SubStoreId && <View>
                    <TextEditorInput
                        navigation={this.props.navigation}
                        value={Description || ''}
                        onFinishEditing={(text) => { this.setState({ Description: text }) }}
                    />
                </View>}
            </ScrollView>
        )
    }
    render() {
        const { GenderTypeList, Birthday, isDateTimePickerVisible } = this.state

        return (
            <LazyContainer >
                <CustomHeader
                    navigation={this.props.navigation}
                    leftComponent="back"
                    title='PersonalInfo'
                    rightComponent={
                        <HeaderSubmitButton
                            isLoading={this.props.lockSubmit}
                            // didSucceed={this.state.didSucceed}
                            onPress={() => { this.submit() }}
                        />
                    }
                />

                {this.state.dataFitched ?
                    this.renderContent()
                    : null}

                {GenderTypeList && <CustomSelector
                    ref={this.genderTypesSelcectorRef}
                    options={GenderTypeList.map(item => item.Name)}
                    onSelect={index => {
                        this.setState({ Gender: GenderTypeList[index] });
                    }}
                    onDismiss={() => { }}
                />}

                <CustomDatePicker
                    isVisible={isDateTimePickerVisible}
                    date={Birthday}
                    onDatePicked={(date) => {
                        this.hideDateTimePicker(() => {
                            this.setState({ Birthday: date })
                        })
                    }}
                    onCancel={this.hideDateTimePicker} />

            </LazyContainer>
        )
    }
}
export default PersonalInfo
