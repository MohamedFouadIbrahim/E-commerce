import React from 'react';
import { Linking, Platform } from 'react-native';
import AutoHeightWebView from 'react-native-autoheight-webview';
import { FixHtmlTextColor } from '../../../utils/Html';

class CustomWebView extends React.PureComponent {
    constructor () {
        super ()

        this.handleUrlNavigation = Platform.OS === 'android' ? true : false
    }

    render() {
        const { 
            style, 
            source, 
            textColor, 
            ...restProps 
        } = this.props

        return (
            <AutoHeightWebView
                style={style}
                onShouldStartLoadWithRequest={event => {
                    if (this.handleUrlNavigation) {
                        Linking.openURL(event.url)
                        return false
                    }
                    else {
                        this.handleUrlNavigation = true
                    }

                    return true
                }}
                source={{ html: FixHtmlTextColor(source, textColor), baseUrl: '' }}
                originWhitelist={['*']}
                {...restProps}
            />
        )
    }
}

export default CustomWebView;