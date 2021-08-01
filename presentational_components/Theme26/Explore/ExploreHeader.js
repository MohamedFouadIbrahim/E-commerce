import React, { PureComponent } from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'
import TranslatedText from '../../../partial_components/Common/TranslatedText'
import { headerLargeFontSize } from '../../../partial_components/Common/CustomHeader'

class ExploreHeader extends PureComponent {
	render() {
		const { style, title, color, HomeTitleStyle } = this.props

		return (
			<View
				style={[{
				}, style]}>

				{
					HomeTitleStyle.Value == 'lg' ?
						<TranslatedText style={{ color, fontSize: headerLargeFontSize, fontWeight: 'bold', }} text={title} /> :
						HomeTitleStyle.Value == 'md' ?
							<TranslatedText style={{ color, fontSize: 20, fontWeight: 'bold', }} text={title} /> :
							HomeTitleStyle.Value == 'sm' ?
								<TranslatedText style={{ color, fontSize: 16, fontWeight: 'bold', }} text={title} /> :
								null
				}
			</View>
		)
	}
}

const mapStateToProps = ({
	runtime_config: {
		runtime_config: {
			screens: {
				Home_12_1: {
					HomeTitleStyle
				},
			},
		},
	},
}) => ({
	HomeTitleStyle,
})
export default connect(mapStateToProps)(ExploreHeader)