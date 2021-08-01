import React from 'react';
import { connect } from 'react-redux'
import { View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { setNativeExceptionHandler } from 'react-native-exception-handler';

// Refer to:
// https://dev.azure.com/Roxiit-Doc/Public/_wiki/wikis/Public.wiki?pagePath=%2FRoxiit%2FRoxiit%20%252D%20Hello%20world%2FTechnical%20Note&pageId=11&wikiVersion=GBwikiMaster
// https://dev.azure.com/Roxiit-Mobile/Admin/_workitems/edit/202

class RemoteScalableImage extends React.Component {
	constructor(props) {
		super(props)
		this.state = { firstLoad: true };
	}

	render() {
		const {
			dimension = 250,
			wide = false,
			original = false,
			uri,
			ImageScalingType,
			PadScalingColor,
			item,
			style,
			width,
			...otherProps
		} = this.props

		let imageHeight, imageWidth

		if (original) {
			const ratio = item.WHRatio > 0 ? item.WHRatio : 1

			imageWidth = dimension
			imageHeight = Math.round(dimension / ratio)
		}
		else {
			if (wide) {
				imageWidth = dimension
				imageHeight = Math.round(dimension / 1.618)
			}
			else {
				imageWidth = dimension
				imageHeight = dimension
			}
		}
		const height = imageHeight * (width / imageWidth)

		return (
			<FastImage
				{...otherProps}
				onLoad={e => {
					if (this.state.firstLoad) {
						this.setState({ firstLoad: false })
					}
				}}
				style={[{
					width,
					height,

				}, style]}
				source={{
					uri: `${uri}?size=${(this.state.firstLoad ? (dimension >= 720 ? 250 : 100) : dimension)}&wide=${wide}&keepOriginalSize=${original}&ImageScalingType=${ImageScalingType.Value}&PadScalingColor=${PadScalingColor.Value}`,
					priority: FastImage.priority.high,
				}} />
		)
	}
}

const mapStateToProps = ({
	runtime_config: {
		runtime_config: {
			screens: {
				Product_Details_09_5: {
					ImageScalingType,
					PadScalingColor,
				}
			},
		},
	},
}) => ({
	ImageScalingType,
	PadScalingColor,
})

export default connect(mapStateToProps)(RemoteScalableImage)