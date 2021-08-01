import React, { Component } from 'react'
import { View, ScrollView, Image } from 'react-native'
import LazyContainer from '../../../partial_components/Common/LazyContainer';
import CustomButton from '../../../partial_components/Common/CustomButton';
import TranslatedText from '../../../partial_components/Common/TranslatedText';
import RoundedInput from '../../../partial_components/Theme26/RoundedInput';
import PhoneInput from '../../../partial_components/Theme26/PhoneInput';
import { SelectCountry } from '../../../utils/Places';
import CloseButton from '../../../partial_components/Theme26/CloseButton';
import { withLocalize } from 'react-localize-redux';
import { STRING_LENGTH_MEDIUM } from '../../../constants/Config';
import FontedText from '../../../partial_components/Common/FontedText';

class ResetPassword extends Component {
    constructor() {
        super()

        this.state = {}
    }

    submit = () => {
        this.props.onSubmit(this.state)
    }

    renderAccountInput = () => {
        const { SigninInput, pagePadding } = this.props

        if (SigninInput.Value === 1) {
            const { Email } = this.state

            return (
                <RoundedInput
                    maxLength={STRING_LENGTH_MEDIUM}
                    keyboardType='email-address'
                    containerStyle={{ marginBottom: pagePadding }}
                    value={Email}
                    title={'Email'}
                    onChangeText={(text) => { this.setState({ Email: text }) }}
                    placeholder='TypeEmailHerePlaceHolder' />
            )
        }
        else {
            const { Phone, PhoneCountry } = this.state

            return (
                <PhoneInput
                    title='Phone'
                    contentContainerStyle={{ marginBottom: pagePadding }}
                    countryId={PhoneCountry ? PhoneCountry.Id : undefined}
                    onPressFlag={() => {
                        SelectCountry(this.props.navigation, item => {
                            this.setState({ PhoneCountry: item })
                        })
                    }}
                    value={Phone}
                    onChangeText={(text) => { this.setState({ Phone: text }) }} />
            )
        }
    }

    render() {
        const {
            largePagePadding,
            submitLocked,
            mainColor,
            ShowTitle,
        } = this.props

        const { Email } = this.state

        return (
            <LazyContainer>
                <ScrollView
                    contentContainerStyle={{
                        padding: largePagePadding,
                    }}>
                    <View
                        style={{
                            alignItems: 'center',
                        }}>
                        <CloseButton
                            style={{
                                position: 'absolute',
                                top: 1,
                                right: 10,
                            }}
                            onPress={() => {
                                this.props.navigation.goBack()
                            }}
                        />
                        <Image
                            resizeMode='contain'
                            style={{
                                width: 70,
                                height: 70,
                            }}
                            source={require('../../../android/app/src/main/res/mipmap-xxxhdpi/ic_launcher_round.png')} />
                    </View>

                    <TranslatedText style={{ fontSize: 30, fontWeight: 'bold', textAlign: 'center', }} text="ResetPassword" />

                    {ShowTitle.Value && <TranslatedText style={{ fontSize: 14, textAlign: 'center', marginTop: 10 }} text="PasswordResetTitle" />}

                    {/* <RoundedInput
                        style={{ marginTop: largePagePadding, }}
                        value={Email}
                        onChangeText={(text) => { this.setState({ Email: text }) }}
                        title="Email"
                        placeholder="Email" /> */}

                    {this.renderAccountInput()}

                    <View
                        style={{
                            marginTop: largePagePadding,
                            flexDirection: 'row',
                            alignItems: 'center',
                        }}>
                        <CustomButton
                            style={{}}
                            fullWidth={true}
                            loading={submitLocked}
                            onPress={this.submit}
                            title="Reset"
                        />
                    </View>
                </ScrollView>
            </LazyContainer>
        )
    }
}

export default withLocalize(ResetPassword)