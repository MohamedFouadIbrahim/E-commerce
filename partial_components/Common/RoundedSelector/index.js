import React, { Component } from 'react'
import { View, I18nManager } from 'react-native'
import { connect } from 'react-redux'
import TranslatedText from '../../Common/TranslatedText';
import { withLocalize } from 'react-localize-redux';
import CustomTouchable from '../CustomTouchable';
import FontedText from '../FontedText';
import { TrimText } from '../../../utils/Text';
import Ionicons from 'react-native-vector-icons/Ionicons';
class RoundedSelector extends Component {
    constructor() {
        super()

        this.state = {
            isFocused: false,
        }
    }

    render() {
        const { props } = this

        const {
            containerStyle,
            titleStyle,
            title,
            placeholder,
            translate,
            bgColor2,
            bgColor1,
            textColor1,
            textColor2,
            onPress,
            borderRadius,
            textStyle,
            value,
            trimText,
            arrow,
            disable,
            resetIcon, 
            onPressReset
        } = props

        return (
            <View
                style={containerStyle}>
                {title && <TranslatedText style={[{
                    fontSize: 14,
                    top: 9,
                    alignSelf: 'flex-start',
                    zIndex: 1,
                    marginHorizontal: 5,
                    paddingHorizontal: 5,
                    backgroundColor: bgColor1
                }, titleStyle]} text={title} />}

                <CustomTouchable
                    onPress={onPress}
                    style={{
                        borderColor: bgColor2,
                        borderWidth: 1,
                        paddingHorizontal: 10,
                        paddingVertical: 10,
                        borderRadius: borderRadius,
                        justifyContent: 'space-between',
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}
                    disabled={disable}
                >
                    <FontedText
                        style={[{
                            color: textColor1,
                            fontSize: 16,
                            color: value ? textColor1 : textColor2,
                        }, textStyle]}
                    >
                        {value ? trimText == false ? value : TrimText(value, 17) : placeholder ? translate(placeholder) : ''}
                    </FontedText>

                    {arrow == true && <Ionicons
                        name={I18nManager.isRTL ? 'ios-arrow-back' : 'ios-arrow-forward'}
                        size={20}
                        color={textColor1}
                    />}

                    {resetIcon && <CustomTouchable style={{paddingHorizontal: 5}}  onPress={onPressReset} >
                        <Ionicons
                            name='ios-close'
                            size={25}
                            color={textColor1}
                        />
                    </CustomTouchable>}

                </CustomTouchable>
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

export default connect(mapStateToProps)(withLocalize(RoundedSelector))