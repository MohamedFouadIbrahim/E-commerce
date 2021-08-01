import React, { Component } from 'react'
import FontedText from '../FontedText';
import { withLocalize } from 'react-localize-redux';

class TranslatedText extends Component {
	render() {
		const { props } = this

		const { 
			text, 
			translate,
			uppercase = false,
		} = props

		const translatedText = text ? translate(text) : ''

		return (
			<FontedText {...props}>{uppercase ? translatedText.toUpperCase() : translatedText}</FontedText>
		)
	}
}

export default withLocalize(TranslatedText)