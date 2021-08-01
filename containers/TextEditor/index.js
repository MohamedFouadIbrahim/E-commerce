import React, { Component } from 'react'
import { connect } from 'react-redux'

class TextEditor extends Component {
	initEditorRef = (r) => {
		this.richtext = r
	}

	getEditorRef = () => this.richtext

	submit = () => {
		if (this.richtext) {
			this.richtext.getContentHtml().then(content => {
				this.props.route.params?.onFinishEditing(content)
				this.props.navigation.goBack()
			})
		}
	}

	editorInitializedCallback = () => {
		const { 
			onEditorInitialized, 
		} = this.props

		this.richtext.focusContentEditor();
		onEditorInitialized && onEditorInitialized()
	}

	render () {
		let PresentationalComponent = require('../../presentational_components/Common/TextEditor').default

		return (
			<PresentationalComponent
				initEditorRef={this.initEditorRef}
				getEditorRef={this.getEditorRef}
				submit={this.submit}
				editorInitializedCallback={this.editorInitializedCallback}
				{...this.props} />
		)
	}
}

const mapStateToProps = ({
	runtime_config: {
		runtime_config: {
			styles,
			colors,
		},
	},
}) => ({
	...styles,
	...colors,
})

export default connect(mapStateToProps)(TextEditor)