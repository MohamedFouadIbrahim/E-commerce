import React, { Component } from 'react';
import { View } from 'react-native';
import { RichEditor, RichToolbar } from 'react-native-pell-rich-editor';
import CustomHeader from '../../../partial_components/Common/CustomHeader';
import HeaderSubmitButton from '../../../partial_components/Common/HeaderSubmitButton';
import LazyContainer from '../../../partial_components/Common/LazyContainer';

class TextEditor extends Component {
	constructor(props) {
		super(props)

		this.state = {
			text: this.props.route.params?.text,
		}
	}

	render() {
		const { 
			editorInitializedCallback, 
			initEditorRef,
			getEditorRef,
			submit,
			largePagePadding,
		} = this.props

		return (
			<LazyContainer style={{ flex: 1, backgroundColor: "#FFF", paddingTop: 0 }}>
				<CustomHeader
					navigation={this.props.navigation}
					title={"RichTextEditor"}
					rightComponent={<HeaderSubmitButton onPress={submit} />}
				/>

				<RichEditor
					style={{
						paddingTop: largePagePadding * 2,
						flex: 1,
					}}
					ref={initEditorRef}
					hiddenTitle={true}
					initialContentHTML={this.state.text}
					editorInitializedCallback={editorInitializedCallback}
				/>

				<View
					style={{
						position: 'absolute',
						top: 56,
						width: '100%'
					}}>
					<RichToolbar
						style={{
							backgroundColor: '#eeeeee',
						}}
						getEditor={getEditorRef}
						selectedIconTint="black"
						selectedButtonStyle={{
							backgroundColor: '#cccccc',
						}}
						unselectedButtonStyle={{
							backgroundColor: '#eeeeee',
						}}
						actions={[
							'bold',
							'italic',
							'underline',
							'unorderedList',
							'orderedList',
							'link',
							'SET_TEXT_COLOR',
							'SET_BACKGROUND_COLOR',
							'indent',
							'justifyFull',
							'justifyCenter',
						]}
					/>
				</View>
			</LazyContainer>
		)
	}
}

export default TextEditor 