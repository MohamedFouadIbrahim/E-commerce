import React, { Component } from 'react'
import { ScrollView } from 'react-native'
import LazyContainer from '../../../partial_components/Common/LazyContainer'
import { withLocalize } from 'react-localize-redux';
import HeaderSubmitButton from '../../../partial_components/Common/HeaderSubmitButton/index.js';
import CustomHeader from '../../../partial_components/Common/CustomHeader';
import RoundedInput from '../../../partial_components/Theme26/RoundedInput';

class UserChangePassword extends Component {
    constructor(props) {
        super(props)

        this.state = {
            lockSubmit: false,
            password: null,
            confirmPassword: null,
        }

        this.lockSubmit = false
    }


    renderContent = () => {
        const { password, confirmPassword } = this.state
        const { largePagePadding } = this.props
        return (
            <ScrollView
                contentContainerStyle={{
                    padding: largePagePadding
                }}>
                <RoundedInput
                    // maxLength={STRING_LENGTH_MEDIUM}
                    title="Password"
                    placeholder="TypePasswordHerePlaceHolder"
                    secureTextEntry={true}
                    value={password}
                    onChangeText={(text) => { this.setState({ password: text }) }} />


                <RoundedInput
                    // maxLength={STRING_LENGTH_MEDIUM}
                    placeholder="TypePasswordHerePlaceHolder"
                    title="ConfirmPassword"
                    secureTextEntry={true}
                    value={confirmPassword}
                    onChangeText={(text) => { this.setState({ confirmPassword: text }) }} />
            </ScrollView>
        )
    }

    render() {
        const { password, confirmPassword } = this.state
        const { Id } = this.props

        return (
            <LazyContainer>
                <CustomHeader
                    navigation={this.props.navigation}
                    leftComponent="back"
                    title='ChangePassword'
                    rightComponent={
                        <HeaderSubmitButton
                            isLoading={this.props.lockSubmit}
                            onPress={() => {
                                this.props.ChangePassword({ Id, password, confirmPassword })
                            }} />
                    } />


                {this.renderContent()}
            </LazyContainer>
        )
    }
}

export default withLocalize(UserChangePassword)