import React from 'react';
import { connect } from 'react-redux'
import {
	Text
} from 'react-native';

const FontedText = ({
	style,
	children,
	fontFamily,
	textColor1,
	...otherProps
}) => {
	return (
		<Text
			style={[
				fontFamily ? { 
					fontFamily, 
					color: textColor1,
					textAlign: 'left',
				} : { 
					color: textColor1,
					textAlign: 'left', 
				}, 
				style
			]}
			{...otherProps}>
			{children}
		</Text>
	);
}

const mapStateToProps = ({
	runtime_config: {
		runtime_config: {
			styles: {
				fontFamily
			},
			colors: {
				textColor1
			},
		},
	},
}) => ({
	textColor1,
	fontFamily,
})

export default connect(mapStateToProps)(FontedText)