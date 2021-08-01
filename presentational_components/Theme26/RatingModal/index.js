import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Image, Platform, I18nManager, Linking, ActivityIndicator } from 'react-native';
import { shadowStyle1 } from '../../../constants/Style';
import { withLocalize } from 'react-localize-redux';
import StarRating from 'react-native-star-rating';
import { FlatList, TextInput } from 'react-native-gesture-handler';
import { RateApp } from '../../../services/RateAppService';
import CustomTouchable from '../../../partial_components/Common/CustomTouchable';
import CustomModal from '../../../partial_components/Common/CustomModal';
import FontedText from '../../../partial_components/Common/FontedText';
import TranslatedText from '../../../partial_components/Common/TranslatedText';
import SettingsSeparator from '../../../partial_components/Common/Settings/SettingsSeparator';
import DeviceInfo from 'react-native-device-info'
import AsyncStorage from '@react-native-community/async-storage';
class RatingModal extends Component {

    constructor() {
        super()
        this.state = {
            starCount: 0,
            height: 0,
            flatListHeight: 0,
            bottomHeight: 0,
            Suggestions: '',
            Tags: '',
            TagsArray: [],
            RatingObj: {},
            showPopUp: false,
            appName: '',
            loading: false,
        }
        this.ImprovementItems = [{ Id: 0, name: 'Speed', selected: false }, { Id: 1, name: 'Usability', selected: false }, { Id: 2, name: 'Design', selected: false },
        { Id: 3, name: 'Performance', selected: false }, { Id: 4, name: 'Features', selected: false }, { Id: 5, name: 'Explanation', selected: false },
        { Id: 8, name: 'Colors', selected: false }, { Id: 9, name: 'Places', selected: false },
        { Id: 10, name: 'AddMoreProducts', selected: false }, { Id: 11, name: 'Complicated', selected: false }, { Id: 14, name: 'Options', selected: false },
        { Id: 12, name: 'ImagesResolution', selected: false }, { Id: 13, name: 'Payment', selected: false }]

        this.DifferenceInDays = 0

        this.getRatingObjFromAsyncStorage();

    }


    componentDidMount() {
        const { AppUrl } = this.props
        DeviceInfo.getDeviceName().then(() => {
            this.setState({
                appName: DeviceInfo.getApplicationName(),
                url: Platform.OS == 'android' ? AppUrl.AndroidUrl : AppUrl.iPhoneUrl
            })
        })
    }

    setRatingObjToAsyncStorage = (AppInstallDate, ratedBefore) => {
        AsyncStorage.setItem('RatingObj', JSON.stringify({ AppInstallDate, ratedBefore }), (err) => {
            if (err) {
                throw err;
            }
        }).catch((err) => {
        });
    }

    getRatingObjFromAsyncStorage = async () => {
        try {
            const RatingObj = await AsyncStorage.getItem('RatingObj');
            let AppInstallDate, ratedBefore;
            if (RatingObj == null || JSON.parse(RatingObj).AppInstallDate == null) {   //InstantiatedForFirstTime
                AppInstallDate = new Date()
                ratedBefore = false
            }
            else {
                AppInstallDate = JSON.parse(RatingObj).AppInstallDate
                ratedBefore = JSON.parse(RatingObj).ratedBefore
            }
            this.setState({ RatingObj: { AppInstallDate, ratedBefore } })

            //Calculate TotalDifferenceDays
            var date1 = new Date(AppInstallDate);
            var date2 = new Date();

            // To calculate the time difference of two dates 
            var DifferenceInTime = date2.getTime() - date1.getTime();

            // To calculate the no. of days between two dates 
            this.DifferenceInDays = DifferenceInTime / (1000 * 3600 * 24);
        } catch (error) {
            // Error retrieving data
        }
    }


    onSubmit = () => {
        const { starCount, TagsArray, Suggestions } = this.state
        const { setShowRatingModal } = this.props
        const args = {
            Rate: starCount,
            Tags: starCount < 4 ? TagsArray.join(',') : '',
            Message: starCount < 4 ? Suggestions : ''
        }
        this.setState({ loading: true })
        RateApp(args, res => {
            setShowRatingModal(false)
            this.setState({ loading: false })
            if (starCount >= 4) {
                this.setState({ showPopUp: true })
            }
        }, err => {
            setShowRatingModal(false)
            this.setState({ loading: false })
            throw err
        })

    }

    onStarRatingPress(rating) {
        this.setState({
            starCount: rating
        });
    }

    measureTopView(event) {
        this.setState({
            height: event.nativeEvent.layout.height
        })
    }

    measureViewFlatList(event) {
        this.setState({
            flatListHeight: event.nativeEvent.layout.height
        })
    }

    measureBottomView(event) {
        this.setState({
            bottomHeight: event.nativeEvent.layout.height
        })
    }

    renderImprovementItem = ({ item, index }) => {
        const {
            TagsArray
        } = this.state
        const {
            textColor2, bgColor1
        } = this.props

        return (
            <CustomTouchable
                activeOpacity={0.2}
                onPress={() => {
                    this.ImprovementItems[index].selected = !this.ImprovementItems[index].selected
                    if (!this.ImprovementItems[index].selected) {
                        this.setState({ TagsArray: TagsArray.filter(name => name !== item.name) })
                    }
                    else {
                        var joined = TagsArray.concat(item.name);
                        this.setState({ TagsArray: joined })
                    }
                }}
                style={{
                    backgroundColor: item.selected ? textColor2 : bgColor1,
                    flexDirection: 'column',
                    paddingVertical: 5,
                    paddingHorizontal: 10,
                    marginRight: 10,
                    marginBottom: 5,
                    borderRadius: 20,
                    borderWidth: 1,
                    borderColor: textColor2,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>

                <TranslatedText style={{ fontSize: 12, color: item.selected ? bgColor1 : textColor2 }} text={item.name}></TranslatedText>


            </CustomTouchable>
        )
    }

    renderImprovementItemsList = () => {
        return (
            <FlatList onLayout={(event) => this.measureViewFlatList(event)}
                horizontal={false}
                data={this.ImprovementItems}
                renderItem={this.renderImprovementItem}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                style={{ alignSelf: 'center' }}
                numColumns={3}
                columnWrapperStyle={{ alignSelf: 'center', flexWrap: 'wrap', flex: 1, paddingHorizontal: 0, marginVertical: 0, marginTop: 5 }}
                keyExtractor={({ Id }) => String(Id)}
            />
        )
    }

    renderRateUsModal = () => {
        const {
            showPopUp,
            appName,
            url,
        } = this.state
        const {
            mainColor,
            largePagePadding,
            pagePadding,
            translate,

        } = this.props

        return (
            <CustomModal
                isVisible={showPopUp}
                radius={5}
                style={{ flex: 1, justifyContent: 'center' }}
                contentContainerStyle={{ padding: 0, }}
            >

                <TranslatedText style={{ color: 'black', fontSize: 20, fontWeight: 'bold', padding: largePagePadding, paddingBottom: pagePadding }} text={"ThankYou"}></TranslatedText>
                <TranslatedText style={{ paddingHorizontal: largePagePadding, paddingBottom: largePagePadding, fontSize: 16 }} text={"HappyToHearThat"}></TranslatedText>

                <SettingsSeparator />

                <CustomTouchable
                    style={{
                        justifyContent: "center",
                        alignItems: "center",
                        paddingVertical: pagePadding,
                    }}
                    onPress={() => {
                        Linking.openURL(url).catch((err) => console.error('An error occurred', err));

                        this.setState({ showPopUp: false })
                    }}
                >

                    <FontedText style={{ color: mainColor, textAlign: "center", fontSize: 18 }}> {`${translate('Rate')} ${appName}`}</FontedText>

                </CustomTouchable>
                <SettingsSeparator />
                <CustomTouchable
                    style={{
                        justifyContent: "center",
                        alignItems: "center",
                        paddingVertical: pagePadding,
                        alignSelf: 'center'

                    }}
                    onPress={() => {
                        this.setRatingObjToAsyncStorage(new Date(), false)
                        this.setState({ showPopUp: false })
                    }}
                >
                    <TranslatedText style={{ color: mainColor, textAlign: "center", fontSize: 18 }} text={"RemindMeLater"} />

                </CustomTouchable>
                <SettingsSeparator />
                <CustomTouchable
                    style={{
                        justifyContent: "center",
                        alignItems: "center",
                        paddingVertical: pagePadding,
                        alignSelf: 'center'
                    }}
                    onPress={() => {
                        this.setState({ showPopUp: false })
                    }}
                >
                    <TranslatedText style={{ color: mainColor, textAlign: "center", fontSize: 18 }} text={"NoThanks"} />

                </CustomTouchable>
            </CustomModal>
        )
    }

    render() {
        const {
            showRatingModal, setShowRatingModal,
            AskForRateAfterXDays,
            secondColor,
            pagePadding,
            translate,
            largePagePadding, mainColor, textColor2, textColor1, bgColor1 } = this.props
        const { height, flatListHeight, bottomHeight, starCount,
            Suggestions, loading, RatingObj: { AppInstallDate, ratedBefore } } = this.state


        if (AskForRateAfterXDays &&
            (this.DifferenceInDays >= AskForRateAfterXDays.Value) &&
            ratedBefore == false) {
            if (showRatingModal) {
                this.setRatingObjToAsyncStorage(AppInstallDate, true)
                return (
                    <CustomModal
                        isVisible={showRatingModal}
                        radius={0}
                        style={{ flex: 1, justifyContent: 'flex-end', margin: 0, paddingHorizontal: 0, }}
                        contentContainerStyle={{ ...shadowStyle1, }}
                        onClose={() => {
                            setShowRatingModal(false)
                        }}
                        closeButton={true}>
                        <Image
                            source=
                            {require('../../../assets/images/Rating/rating.png')}
                            style={{
                                position: 'absolute',
                                bottom: starCount > 0 && starCount < 4 ? height + flatListHeight + bottomHeight - 25 : starCount > 3 ? height + bottomHeight - 25 : height - 25,
                                height: 220,
                                width: 250,

                            }}
                        />
                        <View style={{ paddingTop: 50, alignItems: 'center', }} onLayout={(event) => this.measureTopView(event)} >

                            <TranslatedText style={{ color: 'black', fontSize: 17, fontWeight: 'bold', paddingVertical: pagePadding }} text={starCount == 0 ? 'RateOurApp' : starCount > 0 && starCount < 4 ? 'Okay' : 'Excellent'} ></TranslatedText>
                            <View style={{ flexDirection: 'row', alignItems: 'center', }} >
                                <StarRating
                                    disabled={false}
                                    maxStars={5}
                                    fullStarColor="#FFC600"
                                    starSize={30}
                                    rating={starCount}
                                    selectedStar={(rating) => this.onStarRatingPress(rating)}
                                    containerStyle={{ paddingVertical: 10, justifyContent: 'center', alignItems: 'center', flex: 1 }}
                                    buttonStyle={{ paddingHorizontal: 5, }}
                                />
                            </View>


                            {starCount > 0 && <TranslatedText style={{ color: 'black', fontSize: 15, fontWeight: 'bold', paddingVertical: 20, }} text={starCount > 0 && starCount < 4 ? 'WhereCanWeImprove' : 'ThanksForLovingUs'} ></TranslatedText>}

                        </View>
                        {starCount > 0 && starCount < 4 ? this.renderImprovementItemsList() : null}
                        {starCount > 0 &&
                            <View onLayout={(event) => this.measureBottomView(event)}
                                style={{
                                    alignSelf: 'stretch'
                                    , marginHorizontal: 5,
                                    justifyContent: 'center'
                                }}>
                                {starCount > 0 && starCount < 4 ?
                                    <TextInput
                                        style={{
                                            width: "100%",
                                            color: textColor1,
                                            textAlign: I18nManager.isRTL ? 'right' : 'left',
                                            paddingLeft: 0,
                                            marginLeft: 0,
                                            marginVertical: largePagePadding,
                                            alignSelf: 'flex-start'
                                        }}
                                        value={Suggestions}
                                        onChangeText={(Suggestions) => { this.setState({ Suggestions }) }}
                                        placeholder={translate('AnySuggestions')}
                                        placeholderTextColor={textColor2}
                                        underlineColorAndroid={textColor2}
                                        selectionColor={mainColor} /> :
                                    <TranslatedText style={{ paddingBottom: 20, alignSelf: 'center' }} text={'RateUsOnGoogle'} ></TranslatedText>
                                }
                                <CustomTouchable
                                    style={{
                                        backgroundColor: secondColor,
                                        justifyContent: "center",
                                        alignItems: "center",
                                        paddingVertical: 10,
                                        paddingHorizontal: 30,
                                        borderRadius: 20,
                                        marginBottom: 0,
                                        alignSelf: 'center'

                                    }}
                                    onPress={this.onSubmit}
                                >
                                    {
                                        loading == true ? <ActivityIndicator color={bgColor1} size="small" style={{ paddingVertical: 13 }} /> :
                                            <TranslatedText style={{ color: bgColor1, textAlign: "center", }} text={starCount < 4 ? "Submit" : "RateUs"} />
                                    }
                                </CustomTouchable>
                            </View>
                        }
                    </CustomModal >
                )

            }
            return (
                this.renderRateUsModal()
            )
        }

        return (null)

    }
}

const mapStateToProps = ({
    navigation: { showRatingModal },
    runtime_config: {
        runtime_config: {
            AppUrl,
            colors,
            styles,
            screens: {
                Home_12_1: {
                    AskForRateAfterXDays,
                }
            },
        },
    },
}
) => ({
    showRatingModal,
    AppUrl,
    AskForRateAfterXDays,
    ...colors,
    ...styles,
})



function mergeProps(stateProps, { dispatch }, ownProps) {
    const {
        actions: {
            setShowRatingModal,
        }
    } = require('../../../redux/NavigationRedux.js');

    return {
        ...ownProps,
        ...stateProps,
        setShowRatingModal: (showRatingModal) => setShowRatingModal(dispatch, showRatingModal),
    };
}

export default connect(mapStateToProps, undefined, mergeProps)(withLocalize(RatingModal))