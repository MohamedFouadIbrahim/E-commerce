import React, { Component } from 'react';
import { connect } from 'react-redux'
import Feather from 'react-native-vector-icons/Feather';
import CustomTouchable from '../CustomTouchable';
import TranslatedText from '../TranslatedText';

class TextEditorInput extends Component {
	render() {
		const { 
			navigation, 
			value, 
			onFinishEditing, 
			pagePadding,
			textColor1, 
		} = this.props

		return (
			<CustomTouchable
				onPress={() => {
					// TextEditor route must exist in the same navigator

					navigation.navigate('TextEditor', {
						text: value,
						onFinishEditing: (text) => {
							onFinishEditing && onFinishEditing(text)
						}
					})
				}}
				style={{
					flexDirection: 'row',
					alignItems: 'center',
					paddingVertical: 15,
				}}>
				<Feather
					name={'edit'}
					size={26}
					color={textColor1}
					style={{ marginRight: pagePadding, }} />

				<TranslatedText style={{ color: textColor1 }} text='EditContentInEditor' />
			</CustomTouchable>
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

export default connect(mapStateToProps)(TextEditorInput)