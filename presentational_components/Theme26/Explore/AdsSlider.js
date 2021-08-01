import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import CustomImagesSlider from '../../../partial_components/Theme26/CustomImagesSlider';

class AdsSlider extends PureComponent {
	render() {
		const {
			imageStyle,
			borderRadius,
			largePagePadding,
			name,
			images = [],
			height,
			...restProps
		} = this.props

		if (images && images.map(item => item.Icon).filter(item => item != null).length > 0) {
			return (
				<CustomImagesSlider
					name={name}
					original={true}
					imageStyle={[{
						borderRadius,
					},
						imageStyle]}
					images={images.map(item => item.Icon).filter(item => item != null)}
					{...restProps} />
			)
		}
		return null
	}
}

const mapStateToProps = ({
	runtime_config: {
		runtime_config: {
			styles,
		},
	},
}) => ({
	...styles,
})

export default connect(mapStateToProps)(AdsSlider)