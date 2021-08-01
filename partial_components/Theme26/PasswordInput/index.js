import React, { Component } from 'react'
import { TextInput, View, Platform, I18nManager } from 'react-native'
import { connect } from 'react-redux'
import TranslatedText from '../../Common/TranslatedText';
import { withLocalize } from 'react-localize-redux';
import Entypo from 'react-native-vector-icons/Entypo';

class PasswordInput extends Component {
    constructor() {
        super()

        this.state = {
            isFocused: false,
            showPassword: false
        }
    }

    render() {
        const { props } = this

        const {
            containerStyle,
            inputStyle,
            title,
            placeholder,
            translate,
            mainColor,
            largeBorderRadius,
            borderRadius,
            bgColor2,
            bgColor1,
            textColor1,
            textColor2,
        } = props

        return (
            <View
                style={containerStyle}>
                {title && <TranslatedText style={{
                    fontSize: 14,
                    marginBottom: 25,
                    position: 'absolute',
                    bottom: Platform.OS == 'android' ? 11 : 2,
                    zIndex: 1,
                    marginHorizontal: 5,
                    paddingHorizontal: 5,
                    backgroundColor: bgColor1,
                    color: this.state.isFocused ? mainColor : textColor1
                }} text={title} />}

                <TextInput
                    {...props}
                    style={[{
                        width: '100%',
                        fontSize: 16,
                        borderColor: this.state.isFocused ? mainColor : bgColor2,
                        borderWidth: 1,
                        paddingLeft: 10,
                        paddingRight: 40,
                        paddingVertical: 8,
                        borderRadius: borderRadius,
                        color: textColor1,
                        textAlign: I18nManager.isRTL ? 'right' : 'left'
                    }, inputStyle]}
                    placeholder={placeholder ? translate(placeholder) : ""}
                    placeholderTextColor={textColor2}
                    underlineColorAndroid='transparent'
                    selectionColor={mainColor}
                    secureTextEntry={!this.state.showPassword}
                    onFocus={() => {
                        this.setState({ isFocused: true })
                    }}
                    onBlur={() => {
                        this.setState({ isFocused: false })
                    }}
                />

                <Entypo name='eye'
                    size={18}
                    style={{ position: 'absolute', right: 10, top: Platform.OS == 'android' ? 14 : 10 }}
                    color={this.state.showPassword ? mainColor : bgColor2}
                    onPress={() => { this.setState({ showPassword: !this.state.showPassword }) }}
                />
            </View>
        )
    }
}

const mapStateToProps = ({
    runtime_config: {
        runtime_config: {
            colors,
            styles,
        },
    },
}) => ({
    ...colors,
    ...styles,
})

export default connect(mapStateToProps)(withLocalize(PasswordInput))