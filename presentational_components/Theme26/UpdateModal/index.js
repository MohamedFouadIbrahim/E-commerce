import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Image, Platform, Linking } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'
import CustomTouchable from '../../../partial_components/Common/CustomTouchable';
import { shadowStyle1 } from '../../../constants/Style';
import TranslatedText from '../../../partial_components/Common/TranslatedText';
import CustomModal from '../../../partial_components/Common/CustomModal';
import ItemSeparator from '../../../partial_components/Common/ItemSeparator';
import { screenWidth } from '../../../constants/Metrics';
import DeviceInfo from 'react-native-device-info'
import { withLocalize } from 'react-localize-redux';
import FontedText from '../../../partial_components/Common/FontedText';

class UpdateModal extends Component {

    constructor() {
        super()
        this.state = {
            appName: '',
            url: '',
        }


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

    render() {
        const { showUpdateModal,
            setShowUpdateModal,
            secondColor,
            pagePadding, smallBorderRadius,
            translate,
            AskUserToUpdate, ForceUserToUpdate } = this.props
        const { appName, url } = this.state

        if (showUpdateModal) {
            if (!AskUserToUpdate.Value && !ForceUserToUpdate.Value) {
                return null
            }

            return (
                <CustomModal
                    isVisible={showUpdateModal}
                    radius={smallBorderRadius}
                    style={{ ...shadowStyle1, justifyContent: 'center', alignItems: 'flex-start', flex: 1, }}
                    contentContainerStyle={{ ...shadowStyle1, alignSelf: 'center', justifyContent: 'center', alignItems: 'flex-start', }}
                    onBackdropPress={() => {
                        setShowUpdateModal(ForceUserToUpdate.Value)  //don't close if (ForceUserToUpdate = true)
                    }}
                    onSwipeComplete={() => {
                        setShowUpdateModal(ForceUserToUpdate.Value)
                    }}

                >
                    {ForceUserToUpdate && ForceUserToUpdate.Value == false &&
                        <View style={{ position: 'absolute', right: 10, top: 10 }} >
                            <Ionicons name="ios-close-circle-outline" size={30} onPress={() => {
                                setShowUpdateModal(false)
                            }} />
                        </View>}
                    <View >


                        <FontedText style={{ color: 'black', fontSize: 18, fontWeight: 'bold', paddingBottom: pagePadding }}>{`${translate('Update')} ${appName}${translate('QuestionMark')}`}</FontedText>
                        <FontedText style={{ paddingBottom: pagePadding }}>{`${appName} ${translate('UpdateText')}`}</FontedText>

                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'flex-end',

                            alignItems: 'center',
                        }}>
                            <CustomTouchable
                                style={{
                                    width: "35%",
                                    marginRight: 10,
                                }}
                                onPress={() => { setShowUpdateModal(false) }} >
                                {ForceUserToUpdate && ForceUserToUpdate.Value == false &&
                                    <TranslatedText style={{ color: secondColor, textAlign: "center", paddingVertical: 8, fontSize: 15 }} text={'NoThanks'} />}
                            </CustomTouchable>


                            <CustomTouchable
                                style={{
                                    width: "35%",
                                    backgroundColor: secondColor,
                                    borderRadius: smallBorderRadius,

                                }}
                                onPress={() => {
                                    Linking.openURL(url).catch((err) => console.error('An error occurred', err));
                                }}
                            >
                                <TranslatedText style={{ color: '#FFF', textAlign: "center", paddingVertical: 8, fontSize: 15, }} text={'Update'} />
                            </CustomTouchable>

                        </View>




                        <ItemSeparator style={{ marginVertical: pagePadding, marginTop: pagePadding }} />

                        {Platform.OS == 'android' ? <Image
                            source=
                            {require('../../../assets/images/StoreLogos/google_play_logo.png')}
                            style={{
                                height: 25,
                                width: screenWidth - 230,
                            }}
                        /> :

                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Image
                                    source=
                                    {require('../../../assets/images/StoreLogos/app_store_logo.png')}
                                    style={{
                                        height: 30,
                                        width: screenWidth - 300,
                                        marginLeft: -15,
                                        marginRight: -12
                                    }}
                                />
                                <FontedText style={{ fontSize: 16, color: 'grey' }}>App Store</FontedText>
                            </View>}
                    </View>
                </CustomModal>
            )
        }
        else {
            return null
        }
    }
}

const mapStateToProps = ({
    navigation: { showUpdateModal },
    runtime_config: {
        runtime_config_version,
        runtime_config: {
            colors,
            styles,
            AppUrl,
            screens: {
                Home_12_1: {
                    AskUserToUpdate,
                    ForceUserToUpdate,
                }
            },
        },
    },
}
) => ({
    runtime_config_version,
    showUpdateModal,
    ...colors,
    ...styles,
    AppUrl,
    AskUserToUpdate,
    ForceUserToUpdate
})



function mergeProps(stateProps, { dispatch }, ownProps) {
    const {
        actions: {
            setShowUpdateModal,
        }
    } = require('../../../redux/NavigationRedux.js');

    return {
        ...ownProps,
        ...stateProps,
        setShowUpdateModal: (showUpdateModal) => setShowUpdateModal(dispatch, showUpdateModal),
    };
}

export default connect(mapStateToProps, undefined, mergeProps)(withLocalize(UpdateModal))