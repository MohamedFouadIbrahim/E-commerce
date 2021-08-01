import React, { Component } from 'react';
import ActionSheet from 'react-native-actionsheet'
import { withLocalize } from 'react-localize-redux';
import withForwardedRef from 'react-with-forwarded-ref'

class CustomSelector extends Component {
	handelNoneSelect = () => {
		const { translate } = this.props

		if (this.props.notRequried === true) {
			return translate("NoneSelected")
		} else {
			return null
		}
	}

	render() {
		const { 
			translate, 
			options, 
			onSelect, 
			onDismiss,
			title,
			...restProps 
		} = this.props
		
		const cancelButtonIndex = options.length
		const filterOptions = this.props.notRequried == true ? [...options, translate('Cancel'), translate('NoneSelected')] : [...options, translate('Cancel')]
		const translatedTitle = translate(title || "Select")
		
		return (
			<ActionSheet
				{...restProps}
				title={translatedTitle}
				options={filterOptions}
				cancelButtonIndex={cancelButtonIndex}
				destructiveButtonIndex={cancelButtonIndex}
				ref={this.props.forwardedRef}
				onPress={(index) => {
					if (index === cancelButtonIndex) {
						onDismiss && onDismiss()
					}
					else {
						onSelect && onSelect(index)
					}
				}}
			/>
		)
	}
}

export default withForwardedRef(withLocalize(CustomSelector))