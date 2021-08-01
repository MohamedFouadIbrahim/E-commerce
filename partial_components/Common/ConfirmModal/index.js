import React, { Component } from 'react';
import ActionSheet from 'react-native-actionsheet'
import { withLocalize } from 'react-localize-redux';
import withForwardedRef from 'react-with-forwarded-ref'

class ConfirmModal extends Component {
	render () {
		const {
			translate,
		} = this.props

		const { 
			onResponse, 
			onConfirm, 
			title = translate("AreYouSure"),
		} = this.props
		const cancelButtonIndex = 1

		return (
			<ActionSheet
				{...this.props}
				title={title}
				options={[translate("Confirm"), translate("Cancel")]}
				cancelButtonIndex={cancelButtonIndex}
				destructiveButtonIndex={cancelButtonIndex}
				ref={this.props.forwardedRef}
				onPress={(index) => {
					if (index === cancelButtonIndex) {
						onResponse && onResponse(false)
					}
					else {
						onResponse && onResponse(true)
						onConfirm && onConfirm()
					}
				}}
			/>
		)
	}
}

export default withForwardedRef(withLocalize(ConfirmModal))