import React, { PureComponent } from 'react'
import FontedText from '../../../partial_components/Common/FontedText/index.js';
import { connect } from 'react-redux';
import CustomTouchable from '../../../partial_components/Common/CustomTouchable';
import { shadowStyle2 } from '../../../constants/Style.js';

class LanguageItem extends PureComponent {
	render() {
		const { 
			item, 
			onPress, 
			index,
			mainColor, 
			bgColor2, 
			textColor1, 
			mainColorText, 
			...restProps 
		} = this.props
		const { Name, isSelected } = item

		return (
			<CustomTouchable
				onPress={() => { onPress(item, index) }}
				style={{
					backgroundColor: isSelected ? mainColor : bgColor2,
					marginTop: 20,
					justifyContent: 'center',
					alignItems: 'center',
					height: 100,
					borderRadius: 20,
					padding: 5,
					margin: 5,
					flex: 1,
					...shadowStyle2,
				}}
				{...restProps}>
				<FontedText style={{ color: isSelected ? mainColorText : textColor1 }}>{Name}</FontedText>
			</CustomTouchable>
		)
	}
}


const mapStateToProps = ({
	runtime_config: {
		runtime_config: {
			colors,
		},
	},
}) => ({
	...colors,
})

export default connect(mapStateToProps)(LanguageItem)