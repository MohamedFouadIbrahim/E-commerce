import React from 'react';
import { TextInput, I18nManager, View } from 'react-native';
import { withLocalize } from 'react-localize-redux';

class CustomTextInputForFastReply extends React.Component {
    render() {
        const { translate } = this.props
        return (
            <View style={this.props.containerStyle} >
                <TextInput
                    placeholder={translate(this.props.placeholder)}
                    {... this.props}
                    style={[{
                        fontSize: 15,
                        textAlign: I18nManager.isRTL ? 'right' : 'left',
                    }, this.props.style]}
                />
            </View>
        )
    }
}

export default withLocalize(CustomTextInputForFastReply);