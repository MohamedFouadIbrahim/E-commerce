import React from 'react';
import { ScrollView, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { connect } from 'react-redux';
import { redColor } from '../../../constants/Theme26/Colors';
import ArrowItem from '../../../partial_components/Common/ArrowItem';
import CircularImage from '../../../partial_components/Common/CircularImage';
import CustomHeader from '../../../partial_components/Common/CustomHeader';
import CustomLoader from '../../../partial_components/Common/CustomLoader';
import CustomSelector from '../../../partial_components/Common/CustomSelector';
import CustomTouchable from '../../../partial_components/Common/CustomTouchable';
import { LongToast } from '../../../utils/Toast';
import FontedText from '../../../partial_components/Common/FontedText';
import LazyContainer from '../../../partial_components/Common/LazyContainer';
import RemoteImageBackground from '../../../partial_components/Common/RemoteImageBackground';
import SettingsItem from '../../../partial_components/Common/Settings/SettingsItem';
import SettingsSeparator from "../../../partial_components/Common/Settings/SettingsSeparator";
import SettingsTitle from "../../../partial_components/Common/Settings/SettingsTitle";
import { SelectEntity } from '../../../utils/EntitySelector';
import { showImagePicker } from '../../../utils/Image';
import { SelectCountry } from '../../../utils/Places';
import { ShareSomeThing } from '../../../utils/Share';
import TranslatedText from '../../../partial_components/Common/TranslatedText';
import CustomRefreshControl from '../../../partial_components/Common/CustomRefreshControl';
import PriceText from '../../../partial_components/Common/PriceText';
import ConfirmModal from '../../../partial_components/Common/ConfirmModal';
import { TrimText } from '../../../utils/Text';
import RoxiitRefrence from './RoxiitRefrence';
import DeviceInfo from 'react-native-device-info';
import { Languages as ConstantLanguages } from '../../../constants/Languages';
import PopupsSlider from '../../../partial_components/Theme26/PopupsSlider';

class Profile extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            Languages: ConstantLanguages,
            picker_image_uri: null,
            triggerRefresh: false,
            prossesEvent: 0,
            Info: {}
        }
        this.LanguageRef = React.createRef()
        this.TimeZonesRef = React.createRef()
        this.CurrenciesRef = React.createRef()
        this.Testnotification = React.createRef()
    }


    onChildChange = () => {
        this.setState({ triggerRefresh: !this.state.triggerRefresh })
    }

    static getDerivedStateFromProps(props, state) { // replaced with willResceveProps 
        return {
            Info: {
                ...state.Info,
                Interestes: props.Interestes,
                Email: props.Email,
                FullName: props.FullName,
                Media: props.Media
            }
        }
    }

    componentDidMount() {
        this.setState({ Info: this.props, dataFitshed: true })
    }

    renderImage = () => {
        const { picker_image_uri, Info: { Media: { ImageUrl } } } = this.state
        const { iconColor1 } = this.props
        const imageSize = 110

        return (
            <CustomTouchable
                onPress={() => {
                    showImagePicker(({ uri }) => {
                        this.setState({ picker_image_uri: uri })
                        this.props.ChangeCustomerImage(uri)
                    })
                }}
                style={{
                    alignSelf: 'center',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginBottom: 25,
                }}>
                {
                    picker_image_uri ?
                        <CircularImage
                            uri={picker_image_uri}
                            size={imageSize} /> :
                        <CircularImage
                            uri={ImageUrl}
                            size={imageSize} />
                }

                <FontAwesome
                    style={{
                        position: 'absolute',
                        right: 4,
                        bottom: 8,
                    }}
                    name={`camera`}
                    size={20}
                    color={iconColor1} />

                {this.props.uploadingImage == true ?
                    <CustomLoader
                        size={imageSize - 30}
                        progress={this.props.prossesEvent == 0 ? this.props.prossesEvent : this.props.prossesEvent}
                    />
                    : null
                }
            </CustomTouchable>
        )
    }

    onSelectLanguage = (index) => {
        const { switchLanguage, SetLanguage } = this.props
        const selectedLanguage = ConstantLanguages[index]
        this.setState({ ChangeToLanguage: selectedLanguage }, () => {
            SetLanguage(this.state.ChangeToLanguage.key)
        })

    }

    renderHeader = () => {
        const {
            Info: { Email, FullName, Media: { ImageUrl }, Interest },
            picker_image_uri
        } = this.state


        const {
            mainColorText,
            VirtulBalance,
            OrderCount,
            Spent,
        } = this.props

        return (
            <RemoteImageBackground
                dimension={720}
                wide={true}
                blurRadius={5}
                style={{ flex: 1, }}
                uri={picker_image_uri ? picker_image_uri : ImageUrl}>
                <LinearGradient
                    colors={['rgba(0, 0, 0, .1)', 'rgba(0, 0, 0, .6)', 'rgba(0, 0, 0, 1)']}
                    style={{
                        flex: 1,
                        paddingVertical: 25,
                    }}>

                    <View
                        style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            padding: 25,
                        }}>
                        {this.renderImage()}
                        <FontedText style={{ color: mainColorText, textAlign: 'center' }}>{FullName}</FontedText>
                        <FontedText style={{ color: mainColorText, textAlign: 'center' }}>{Email}</FontedText>
                    </View>

                    <View
                        style={{
                            flexDirection: 'row',
                        }}>
                        <View
                            style={{
                                flex: 1,
                                justifyContent: 'flex-start',
                                alignItems: 'center',
                            }}>
                            <PriceText style={{ color: mainColorText, textAlign: 'center' }}>{VirtulBalance}</PriceText>
                            <TranslatedText style={{ color: mainColorText, textAlign: 'center' }} text="VirtualMoney" />
                        </View>

                        <View
                            style={{
                                flex: 1,
                                justifyContent: 'flex-start',
                                alignItems: 'center',
                            }}>
                            <PriceText style={{ color: mainColorText, textAlign: 'center' }}>{Spent}</PriceText>
                            <TranslatedText style={{ color: mainColorText, textAlign: 'center' }} text="Spent" />
                        </View>

                        <View
                            style={{
                                flex: 1,
                                justifyContent: 'flex-start',
                                alignItems: 'center',
                            }}>
                            <FontedText style={{ color: mainColorText, textAlign: 'center' }}>{OrderCount}</FontedText>
                            <TranslatedText style={{ color: mainColorText, textAlign: 'center' }} text="Orders" />
                        </View>
                    </View>

                </LinearGradient>
            </RemoteImageBackground>
        )
    }

    handelSelectedIntersted = (Interestes) => {
        const SelectedInterestes = Interestes.filter(item => item.isSelected == true)
        return SelectedInterestes
    }

    render() {


        if (!this.state.dataFitshed) {
            return null
        }

        const {
            Country,
            TimeZone,
            Language,
            TimeZones,
            Interestes,
            Currencies,
            Currency,
            IsShowRedeem
        } = this.state.Info

        const {
            mainScreen,
            store_type,
            bgColor2,
            mainColor,
            mainColorText,
            largePagePadding,
            smallBorderRadius,
            AppUrl,
            AllowCustomerToAddProducts,
            onPressLogout,
            RoxiitInCustomerProfile,
            ShowAffiliate,
            EnabelShareStatics,
            userId,
            user_data: {
                Secret
            },
            onRefresh,
            triggerRefresh,
            textColor2,
            BottomPopups = [],
            MiddlePopups = [],
            TopPopups = [],
            pagePadding
        } = this.props

        return (
            <LazyContainer>
                <CustomHeader
                    navigation={this.props.navigation}
                    mainScreen={mainScreen}
                    title={"Profile"}
                    leftComponent="drawer" />

                <ScrollView
                    refreshControl={
                        <CustomRefreshControl
                            refreshing={triggerRefresh}
                            onRefresh={onRefresh}
                        />
                    }
                    contentContainerStyle={{
                    }}>
                    {this.renderHeader()}

                    <PopupsSlider
                        contentContainerStyle={{
                            paddingVertical: pagePadding
                        }}
                        name='TopPopupsProfile'
                        images={TopPopups}
                        navigation={this.props.navigation}
                    />
                    <SettingsTitle title={"Info"} />

                    <ArrowItem
                        onPress={() => { this.props.navigation.navigate('PersonalInfo', { Data: this.props, onChildChange: this.props.fitchData }) }}
                        title={'PersonalInfo'}
                        Icon={() => <SimpleLineIcons
                            style={{ marginRight: 20 }}
                            name={"user"}
                            size={20}
                            color={textColor2} />
                        }
                        style={{
                            paddingHorizontal: 20,
                        }}
                    />

                    <SettingsSeparator />

                    {AllowCustomerToAddProducts.Value && this.props.subStoreId &&
                        <View>
                            <ArrowItem
                                style={{
                                    paddingHorizontal: 20,
                                }}
                                Icon={() => <MaterialIcons
                                    style={{ marginRight: 20 }}
                                    name={"business-center"}
                                    size={20}
                                    color={textColor2} />
                                }
                                onPress={() => {
                                    this.props.navigation.navigate('MyStore')
                                }}
                                title={'MyStore'}
                            />
                            <SettingsSeparator />
                        </View>}



                    <ArrowItem
                        style={{
                            paddingHorizontal: 20,
                        }}
                        Icon={() => <FontAwesome
                            style={{ marginRight: 20 }}
                            name={"key"}
                            size={20}
                            color={textColor2} />
                        }
                        onPress={() => { this.props.navigation.navigate('ChangePassword', { Id: this.props.Id }) }}
                        title={'ChangePassword'}
                    />

                    <SettingsSeparator />

                    <ArrowItem
                        style={{
                            paddingHorizontal: 20,
                        }}
                        Icon={() => <FontAwesome
                            style={{ marginRight: 20 }}
                            name={"language"}
                            size={20}
                            color={textColor2} />
                        }
                        onPress={() => { this.LanguageRef.current.show() }}
                        title={'Language'}
                        info={this.state.ChangeToLanguage ? this.state.ChangeToLanguage.label : Language.Name}
                    />

                    <SettingsSeparator />

                    <ArrowItem
                        onPress={() => {
                            SelectCountry(this.props.navigation, item => {
                                this.setState({
                                    Info: {
                                        ...this.state.Info,
                                        Country: item
                                    }
                                }, () => {
                                    this.props.SetCountry(this.state.Info.Country.Id)
                                });

                            });
                        }}
                        Icon={() => <MaterialCommunityIcons
                            style={{ marginRight: 20 }}
                            name={"home-map-marker"}
                            size={20}
                            color={textColor2} />
                        }
                        style={{
                            paddingHorizontal: 20,
                        }}
                        title={'Country'}
                        info={Country ? Country.Name : null} />

                    <SettingsSeparator />

                    <ArrowItem
                        onPress={() => { this.CurrenciesRef.current.show() }}
                        title={'Currency'}
                        Icon={() => <MaterialCommunityIcons
                            style={{ marginRight: 20 }}
                            name={"currency-usd"}
                            size={20}
                            color={textColor2} />
                        }
                        info={Currency ? Currency.Name : null}
                        style={{
                            paddingHorizontal: 20,
                        }}
                    />

                    <SettingsSeparator />

                    <ArrowItem
                        onPress={() => {
                            this.TimeZonesRef.current.show()
                        }}
                        style={{
                            paddingHorizontal: 20,
                        }}
                        Icon={() => <SimpleLineIcons
                            style={{ marginRight: 20 }}
                            name={"globe"}
                            size={20}
                            color={textColor2} />
                        }
                        title={'TimeZone'}
                        info={TimeZone && TimeZone.Object2 ? TrimText(TimeZone.Object2, 40) : null}
                    />

                    <SettingsSeparator />

                    <ArrowItem
                        onPress={() => {
                            SelectEntity(this.props.navigation, data => {
                                this.props.SetInterest({ Categories: data.map(item => item.Id) })
                            }, 'Customer/Interest', null, false, 2, this.handelSelectedIntersted(Interestes))
                        }}
                        style={{
                            paddingHorizontal: 20,
                        }}
                        Icon={() => <SimpleLineIcons
                            style={{ marginRight: 20 }}
                            name={"heart"}
                            size={20}
                            color={textColor2} />
                        }
                        title={'Interest'}
                        info={Interestes ? this.handelSelectedIntersted(Interestes).length : null}
                    />

                    <SettingsSeparator />


                    <PopupsSlider
                        contentContainerStyle={{
                            paddingVertical: pagePadding
                        }}
                        name='MiddlePopupsProfile'
                        images={MiddlePopups}
                        navigation={this.props.navigation}
                    />

                    <SettingsTitle title={'More'} containerStyle={{ paddingVertical: 0 }} />

                    <ArrowItem
                        style={{
                            paddingHorizontal: 20,
                            paddingTop: 10,
                            paddingBottom: 15
                        }}
                        Icon={() => <SimpleLineIcons
                            style={{ marginRight: 20 }}
                            name={"location-pin"}
                            size={20}
                            color={textColor2} />
                        }
                        onPress={() => { this.props.navigation.navigate('Address') }}
                        title={'Address'}
                    />

                    <SettingsSeparator />
                    {ShowAffiliate.Value && <>

                        <ArrowItem
                            style={{
                                paddingHorizontal: 20,
                                paddingTop: 10,
                                paddingBottom: 15
                            }}
                            Icon={() => <AntDesign
                                style={{ marginRight: 20 }}
                                name={"sharealt"}
                                size={20}
                                color={textColor2} />
                            }
                            onPress={() => {
                                this.props.navigation.navigate('Affiliate')
                            }}
                            title={'InviteFriends'}
                        />

                        <SettingsSeparator />

                    </>
                    }

                    {ShowAffiliate.Value && IsShowRedeem && <>
                        <ArrowItem
                            style={{
                                paddingHorizontal: 20,
                                paddingTop: 10,
                                paddingBottom: 15
                            }}
                            Icon={() => <MaterialIcons
                                style={{ marginRight: 20 }}
                                name={"redeem"}
                                size={20}
                                color={textColor2} />
                            }
                            onPress={() => {
                                this.props.navigation.navigate('Redeem', { onRefresh: onRefresh })
                            }}
                            title={'RedeemInviteCode'}
                        />

                        <SettingsSeparator />
                    </>}

                    <ArrowItem
                        style={{
                            paddingHorizontal: 20,
                            paddingTop: 10,
                            paddingBottom: 15
                        }}
                        Icon={() => <MaterialCommunityIcons
                            style={{ marginRight: 20 }}
                            name={"test-tube"}
                            size={20}
                            color={textColor2} />
                        }
                        onPress={() => { this.Testnotification.current.show() }}
                        title={'TestNotification'}
                    />

                    {/* {store_type === 3 && AllowCustomerToAddProducts.Value && <View>
                        <ArrowItem
                            style={{
                                paddingHorizontal: 20,
                            }}
                            onPress={() => { this.props.navigation.navigate('MyProducts_Alt') }}
                            title={'MyProducts'}
                        />
                        <SettingsSeparator />
                    </View>
                    }

                    {store_type === 3 && AllowCustomerToAddProducts.Value ? <View>
                        <ArrowItem
                            style={{
                                paddingHorizontal: 20,
                            }}
                            onPress={() => { this.props.navigation.navigate('MySales') }}
                            title={'MySales'}
                        />
                        <SettingsSeparator />
                    </View> : <SettingsSeparator />
                    } */}

                    <SettingsItem
                        onPress={onPressLogout}
                        leftComponent={
                            <SimpleLineIcons
                                name={"logout"}
                                size={20}
                                color={redColor} />
                        }
                        info="Logout"
                        infoStyle={{
                            color: redColor
                        }} />
                    <SettingsSeparator />

                    <PopupsSlider
                        contentContainerStyle={{
                            paddingVertical: pagePadding
                        }}
                        name='BottomPopupsProfile'
                        images={BottomPopups}
                        navigation={this.props.navigation}
                    />
                    {AppUrl ?
                        <View>
                            <CustomTouchable
                                style={{
                                    borderColor: bgColor2,
                                    backgroundColor: mainColor,
                                    borderRadius: smallBorderRadius,
                                    alignSelf: 'center',
                                    marginHorizontal: largePagePadding,
                                    paddingVertical: 10,
                                    paddingHorizontal: 40,
                                    marginTop: 35,
                                    marginBottom: 35,
                                    flexDirection: 'row'
                                }}

                                onPress={() => {
                                    ShareSomeThing(`${this.props.AppUrl}${EnabelShareStatics.Value ? `/c/${userId}/${Secret}` : ''}`)
                                }}
                            >
                                <TranslatedText text='ShareAppWithYourFriend' style={{
                                    color: mainColorText,
                                    alignSelf: 'center',
                                }} />

                                <SimpleLineIcons
                                    name={"share-alt"}
                                    size={20}
                                    color={mainColorText}
                                    style={{ marginHorizontal: 10 }}
                                />

                            </CustomTouchable>
                        </View> : null
                    }

                    {RoxiitInCustomerProfile.Value && <RoxiitRefrence />}

                    {/* <FontedText
                        style={{
                            fontSize: 12,
                            marginBottom: 2,
                            alignSelf: 'center',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>v {DeviceInfo.getVersion()} - {DeviceInfo.getBuildNumber()}</FontedText> */}


                </ScrollView>

                <CustomSelector
                    ref={this.LanguageRef}
                    options={ConstantLanguages.map(item => item.label)}
                    onSelect={(index) => { this.onSelectLanguage(index) }}
                    onDismiss={() => { }}
                />

                <CustomSelector
                    ref={this.TimeZonesRef}
                    options={TimeZones.map(item => item.Object1)}
                    onSelect={(index) => {
                        this.setState({ Info: { ...this.state.Info, TimeZone: TimeZones[index] } })
                        this.props.SetTimeZone(TimeZones[index].Object1)
                    }}
                    onDismiss={() => { }}
                />

                <CustomSelector
                    ref={this.CurrenciesRef}
                    options={Currencies.map(item => item.Name)}
                    onSelect={(index) => {
                        this.setState({ Info: { ...this.state.Info, Currency: Currencies[index] } })
                        this.props.SetCurrency(Currencies[index])
                    }}
                    onDismiss={() => { }}
                />

                <ConfirmModal
                    ref={this.Testnotification}
                    onConfirm={() => {
                        this.props.sendNotification()
                    }}
                />
            </LazyContainer>
        )
    }
}

const mapStateToProps = ({
    language: {

        currLang,
    },
    login: {
        Currency,
        subStoreId
    },
    runtime_config: {
        runtime_config: {
            colors,
            screens: {
                Admin_Page_0_0: {
                    RoxiitInCustomerProfile
                }
            },
        },
    },
    runtime_config
}) => ({
    subStoreId,
    Currency,
    runtime_config,
    ...colors,

    currLang,
    RoxiitInCustomerProfile
})
export default connect(mapStateToProps)(Profile)