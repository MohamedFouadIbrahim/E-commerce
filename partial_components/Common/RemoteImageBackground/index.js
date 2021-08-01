import React from 'react';
import { connect } from 'react-redux'
import FastImage from 'react-native-fast-image'
import { ImageBackground } from 'react-native'

// Refer to:
// https://dev.azure.com/Roxiit-Doc/Public/_wiki/wikis/Public.wiki?pagePath=%2FRoxiit%2FRoxiit%20%252D%20Hello%20world%2FTechnical%20Note&pageId=11&wikiVersion=GBwikiMaster
// https://dev.azure.com/Roxiit-Mobile/Admin/_workitems/edit/202


class RemoteImageBackground extends React.Component {
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
			children,
			blurRadius,
			style,
			...otherProps
		} = this.props

		let ImageComponent = blurRadius ? ImageBackground : FastImage

		return (
			<ImageComponent
				source={{
					uri: `${uri}?size=${(this.state.firstLoad ? (dimension >= 720 ? 250 : 100) : dimension)}&wide=${wide}&keepOriginalSize=${original}&ImageScalingType=${ImageScalingType.Value}&PadScalingColor=${PadScalingColor.Value}`,
					priority: FastImage.priority.high,
				}}

				style={[{
				}, style]}

				onLoad={e => {
					if (this.state.firstLoad) {
						this.setState({ firstLoad: false })
					}
				}}

				blurRadius={blurRadius}
				{...otherProps}>
				{children}
			</ImageComponent>
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

export default connect(mapStateToProps)(RemoteImageBackground)