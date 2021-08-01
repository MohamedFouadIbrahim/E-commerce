import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux'
import FastImage from 'react-native-fast-image'

// Refer to:
// https://dev.azure.com/Roxiit-Doc/Public/_wiki/wikis/Public.wiki?pagePath=%2FRoxiit%2FRoxiit%20%252D%20Hello%20world%2FTechnical%20Note&pageId=11&wikiVersion=GBwikiMaster
// https://dev.azure.com/Roxiit-Mobile/Admin/_workitems/edit/202

class RemoteImage extends React.Component {
	constructor(props) {
		super(props)
		this.state = { firstLoad: true };
	}

	render() {
		let {
			dimension = 250,
			wide = false,
			original = false,
			uri,
			ImageScalingType,
			PadScalingColor,
			style,
			...otherProps
		} = this.props

		return (
			<FastImage
				{...otherProps}

				style={[{

				}, style]}

				onLoad={e => {
					if (this.state.firstLoad) {
						this.setState({ firstLoad: false })
					}
				}}

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

export default connect(mapStateToProps)(RemoteImage)