import React, { Component } from 'react'
import { WebView } from 'react-native-webview';

export default class AfterOrder extends Component {
	render() {
		return (
			<WebView
				scalesPageToFit={true}
				javaScriptEnabled={true}
				domStorageEnabled={true}
				onMessage={this.props.onWebViewMessage}
				source={{
					uri: this.props.route.params?.RedirectTo
				}}
				style={{ flex: 1 }}
			/>
		)
	}
}