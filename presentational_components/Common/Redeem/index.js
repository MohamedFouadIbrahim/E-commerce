import React from "react";
import { Image, View, ScrollView } from 'react-native';
import LazyContainer from '../../../partial_components/Common/LazyContainer';
import CustomHeader from '../../../partial_components/Common/CustomHeader';
import TranslatedText from "../../../partial_components/Common/TranslatedText";
import CustomButton from "../../../partial_components/Common/CustomButton";
import RoundedInput from "../../../partial_components/Theme26/RoundedInput";
import CustomTouchable from "../../../partial_components/Common/CustomTouchable";

class Redeem extends React.Component {

    render() {
        const {
            Code,
            lockSubmit,
            onSubmitRedeem,
            onRedeemInputChange,
            largePagePadding,
            textColor2,
            mainColor
        } = this.props

        return (
            <LazyContainer>

                <CustomHeader
                    navigation={this.props.navigation}
                    title={"Redeem"}
                    leftComponent="back" />

                <ScrollView
                    style={{ paddingHorizontal: largePagePadding }}
                >
                    <TranslatedText
                        text='ItsNiceToSeeYou'
                        style={{
                            fontWeight: 'bold',
                            marginVertical: 25,
                            alignSelf: 'center',
                            color: textColor2
                        }}
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
                        text='RedeemTextDescription'
                        style={{
                            marginVertical: 5,
                            alignSelf: 'center',
                            color: textColor2
                        }}
                    />

                    <RoundedInput
                        containerStyle={{
                            marginVertical: 20
                        }}
                        value={Code}
                        onChangeText={onRedeemInputChange}
                        title="Redeem"
                        placeholder="RedeemPlaceHolder" />

                    <CustomButton
                        onPress={onSubmitRedeem}
                        loading={lockSubmit}
                        title={'Redeem'}
                    />
                    <CustomTouchable
                        style={{
                            marginVertical: 20,
                            alignSelf: 'center'
                        }}
                        onPress={() => this.props.navigation.navigate('TermsOfService')}
                    >
                        <TranslatedText style={{ color: mainColor }}
                            text='TermsAndService'
                        />
                    </CustomTouchable>
                </ScrollView>

            </LazyContainer>
        )
    }
}
export default Redeem