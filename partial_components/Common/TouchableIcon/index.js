import React, { PureComponent } from 'react'
import CustomTouchable from '../CustomTouchable';

export default class TouchableIcon extends PureComponent {
	render() {
		const { 
			style, 
			children, 
			...restProps 
		} = this.props

		return (
			<CustomTouchable
				{...restProps}
				style={[{
					flex: 1,
					height: '100%',
					padding: 5,
					justifyContent: 'center',
					alignItems: 'center',
				}, style]}>
				{children}
			</CustomTouchable>
		)
	}
}