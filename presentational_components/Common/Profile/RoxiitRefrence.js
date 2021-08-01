import React from "react";
import { Text, Image, Linking, Platform, View } from "react-native";
import DeviceInfo from 'react-native-device-info';
import { connect } from "react-redux";
import CustomTouchable from '../../../partial_components/Common/CustomTouchable';
import TranslatedText from "../../../partial_components/Common/TranslatedText";
import FontAwesome from 'react-native-vector-icons/FontAwesome';

class RoxiitRefrence extends React.Component {
    constructor(props) {
        super(props)
    }

    onIconPress = (url) => {
        if (url) {
            Linking.canOpenURL(url).then(isSuported => {
                if (isSuported) {
                    Linking.openURL(url)
                }
            })
        }
    }
    handelUrl = () => {
        return `http://roxiit.com?utm_source=${DeviceInfo.getBundleId()}&utm_medium=${Platform.OS}&utm_campaign=profile&utm_content=${DeviceInfo.getVersion()}-${DeviceInfo.getBuildNumber()}`
    }

    render() {
        const {
            largePagePadding,
            textColor2,
            AppUrl,
            justPowredBy = false
        } = this.props

        const mainUrl = this.handelUrl()

        let OpenOsStoreUrl
        if (Platform.OS == 'android') {
            OpenOsStoreUrl = this.props.AppUrl.AndroidUrl
        } else
            OpenOsStoreUrl = this.props.AppUrl.iPhoneUrl

        return (
            <View >
                {!justPowredBy && <CustomTouchable style={{ marginVertical: 15, flexDirection: "row", }}>

                    <CustomTouchable
                        style={{ flex: 1, paddingHorizontal: 8, }}
                        onPress={() => { this.onIconPress(OpenOsStoreUrl) }}
                    >
                        <View style={{
                            width: 72, height: 72,
                            alignSelf: 'center',
                            borderRadius: 10,
                            shadowRadius: 10,
                            shadowColor: { textColor2 },
                            shadowOpacity: 0.5,
                            elevation: 5,
                            overflow: 'visible',

                        }}>
                            <Image
                                style={{ alignSelf: 'center', width: 70, height: 70 }}
                                source={require('../../../assets/images/RoxiitAnimationLogo/Tenant.png')}
                            />
                        </View>
                        <TranslatedText
                            text={'TenantDescription'}
                            style={{ textAlign: 'center', marginVertical: 5, color: textColor2, flex: 0.5 }}
                        />
                    </CustomTouchable>
                </CustomTouchable>}

                <CustomTouchable
                    onPress={() => { this.onIconPress(mainUrl) }}
                    style={{ paddingHorizontal: 8, marginVertical: 5, flex: 1, }}>
                    <Text
                        text={'Roxiit'}
                        style={{ textAlign: 'center', marginVertical: 5, color: textColor2, fontSize: 11 }}>
                        POWERED BY&#160;&#160;&#160;
                            <FontAwesome
                            name={'heart'}
                            color={'#F00'}
                            size={13}
                            style={{
                                textAlign: 'center',
                                marginVertical: 5,
                                marginHorizontal: 5,
                                paddingHorizontal: 5,
                            }} />
                            &#160;&#160;&#160;

                            <Image
                            style={{ alignSelf: 'center', height: 13, width: 60 }}
                            source={require('../../../assets/images/RoxiitAnimationLogo/Roxiit.png')}
                            resizeMode="contain"
                        />
                    </Text>
                </CustomTouchable>
            </View>
        )
    }
}
const mapStateToProps = ({
    language: {

        currLang,
    },
    login: {
        Currency
    },
    runtime_config: {
        runtime_config: {
            colors,
            screens: {
                Admin_Page_0_0: {
                    RoxiitInCustomerProfile
                }
            },
            AppUrl
        },
    },
    runtime_config
}) => ({
    Currency,
    runtime_config,
    AppUrl,
    ...colors,

    currLang,
    RoxiitInCustomerProfile
})
export default connect(mapStateToProps)(RoxiitRefrence)
