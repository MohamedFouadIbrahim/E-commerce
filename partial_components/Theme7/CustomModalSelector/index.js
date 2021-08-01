import React, { PureComponent } from 'react';
import { withLocalize } from 'react-localize-redux';
import ModalSelector from 'react-native-modal-selector'

class CustomModalSelector extends PureComponent {
	render() {
		const { translate, children, ...restProps } = this.props

		return (
			<ModalSelector
				{...restProps}
				supportedOrientations={['portrait']}
				accessible={true}
				scrollViewAccessibilityLabel={'Scrollable options'}
				cancelButtonAccessibilityLabel={'Cancel Button'}
				cancelText={translate("Cancel")}>
				{children}
			</ModalSelector>
		)
	}
}

export default withLocalize(CustomModalSelector)