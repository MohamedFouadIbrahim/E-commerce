import React from "react";
import { Image, View, Clipboard, ScrollView } from 'react-native';
import LazyContainer from '../../../partial_components/Common/LazyContainer';
import CustomHeader from '../../../partial_components/Common/CustomHeader';
import TranslatedText from "../../../partial_components/Common/TranslatedText";
import CustomButton from "../../../partial_components/Common/CustomButton";
import CustomTouchable from "../../../partial_components/Common/CustomTouchable";
import FontedText from "../../../partial_components/Common/FontedText";
import { LongToast } from "../../../utils/Toast";
import { formatDate } from "../../../utils/Date";
import AntDesign from 'react-native-vector-icons/AntDesign';


class Affiliate extends React.Component {

    renderHistory = () => {
        const {
            history,
            textColor2
        } = this.props

        if (history.length == 0)
            return

        return (
            <View>
                <TranslatedText
                    text='History'
                    style={{
                        color: textColor2,
                        fontWeight: 'bold'
                    }}
                />
                {history.map(this.renderHistoryItem)}
            </View>
        )
    }

    renderHistoryItem = (item, index) => {
        const {
            Customer,
            ToMe,
            date
        } = item

        const {
            largePagePadding,
            pagePadding,
            textColor2,
            Currency,
            mainColorText
        } = this.props

        return (
            <View key={index}
                style={{
                    paddingVertical: pagePadding,
                }}
            >
                <View style={{
                    justifyContent: 'space-between',
                    flexDirection: 'row'
                }} >

                    <View style={{ flexDirection: 'row' }}>

                        <AntDesign
                            name={"caretright"}
                            size={13}
                            color={textColor2}
                            style={{ marginTop: 4, paddingRight: pagePadding }}
                        />

                        <FontedText style={{ color: textColor2 }}>
                            {`${Customer.Name}`}
                        </FontedText>

                        {ToMe > 0 ? <FontedText style={{ color: textColor2 }}>
                            {` => ${ToMe}${Currency.Name}`}
                        </FontedText> : null}
                    </View>

                    <FontedText>
                        {`${formatDate(date)}`}
                    </FontedText>
                </View>

            </View>
        )

    }

    render() {
        const {
            Code,
            history,
            bgColor2,
            mainColor,
            textColor2,
            largePagePadding
        } = this.props

        return (
            <LazyContainer>

                <CustomHeader
                    navigation={this.props.navigation}
                    title={"Affiliate"}
                    leftComponent="back" />

                <ScrollView
                    contentContainerStyle={{
                        paddingHorizontal: largePagePadding
                    }}>
                    <TranslatedText
                        style={{ marginVertical: 25, fontWeight: 'bold', alignSelf: 'center', color: textColor2 }}
                        text='ShareAgift'
                    />
                    <Image
                        style={{
                            width: 300,
                            height: 200,
                            marginVertical: 25,
                            alignSelf: 'center'
                        }}
                        source={require('../../../assets/images/Redeem/gift.png')}
                    />

                    <TranslatedText
                        style={{ marginVertical: 5, alignSelf: 'center', color: textColor2 }}
                        text='InviteYourFreind'
                    />

                    <CustomTouchable
                        disabled={true}
                        style={{
                            flexDirection: 'row',
                            backgroundColor: bgColor2,
                            marginVertical: 20,
                            // padding: 10,
                            borderRadius: 5,
                            alignItems: 'center'
                        }} >
                        <FontedText style={{
                            flex: 3,
                            padding: 10
                        }}>
                            {Code}
                        </FontedText>

                        <TranslatedText
                            onPress={() => {
                                Clipboard.setString(Code)
                                LongToast('Copied')
                            }}
                            style={{ color: mainColor, borderLeftWidth: 1, borderLeftColor: textColor2, padding: 10 }}
                            text='Copy'
                        />
                    </CustomTouchable>

                    <CustomButton
                        onPress={() => {
                            this.props.onSubmitAffiliate()
                        }}
                        loading={false}
                        title={'InviteFriend'}
                    />

                    <CustomTouchable
                        style={{
                            marginVertical: 20,
                            alignSelf: 'center'
                        }}
                        onPress={() => this.props.navigation.navigate('TermsOfService')}
                    >
                        <TranslatedText
                            text='TermsAndService'
                            style={{
                                color: mainColor
                            }}
                        />
                    </CustomTouchable>

                    {this.renderHistory()}

                </ScrollView>

            </LazyContainer>
        )
    }
}
export default Affiliate