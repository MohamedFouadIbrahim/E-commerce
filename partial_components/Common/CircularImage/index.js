import React from 'react';
import RemoteImage from '../RemoteImage';

export default (props) => {
	const {
		style,
		size = 56,
		uri,
		...otherProps
	} = props;
	
	return (
		<RemoteImage
			uri={uri}
			style={{
				width: size,
				height: size,
				borderRadius: size / 2,
				...style
			}} 
			dimension={size}
			wide={false}
			{...otherProps} />
	)
}