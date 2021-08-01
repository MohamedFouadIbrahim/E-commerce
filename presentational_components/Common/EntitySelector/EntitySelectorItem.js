import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import FontedText from '../../../partial_components/Common/FontedText/index.js';
import CheckBox from '../../../partial_components/Common/CheckBox/index.js';
import CustomTouchable from '../../../partial_components/Common/CustomTouchable';

class EntitySelectorItem extends PureComponent {
	render() {
		const { item, onPress, index, textColor2, ...restProps } = this.props
		const { Name, isSelected } = item

		return (
			<CustomTouchable
				onPress={() => { onPress(item, index) }}
				{...restProps}>
				<FontedText style={{ color: textColor2, flex: 1 }}>{Name}</FontedText>

				<CheckBox style={{ flex: .2 }}
					selected={isSelected} />
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

export default connect(mapStateToProps)(EntitySelectorItem)