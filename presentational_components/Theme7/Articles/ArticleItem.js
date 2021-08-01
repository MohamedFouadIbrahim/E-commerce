import React from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'
import FontedText from '../../../partial_components/Common/FontedText';
import RemoteImage from '../../../partial_components/Common/RemoteImage';
import CustomTouchable from '../../../partial_components/Common/CustomTouchable';

class ArticleItem extends React.Component {
	render() {
		const {
			item,
			pagePadding,
			textColor2,
			mainColor,
			index,
			navigation,
			pushNavigation,
		} = this.props

		const {
			Id,
			Icon: { ImageUrl },
			Name,
			ShortDescription,
		} = item

		return (
			<CustomTouchable
				onPress={() => {
					  pushNavigation ? navigation.push('Article', { Id }) : navigation.navigate('Article', { Id })
				}}
				style={{ 
					flex: 1, 
					borderRadius: 2, 
					marginHorizontal: pagePadding / 2, 
				}}>
				<RemoteImage
					dimension={250}
					resizeMode='cover'
					style={{
						height: 180,
					}}
					uri={ImageUrl}
				/>

				<View
					style={{
						flex: 1,
						justifyContent: 'space-between',
						paddingVertical: pagePadding,
					}}>
					<View>
						<FontedText style={{ fontSize: 15, textAlign: 'left' }}>{Name}</FontedText>
						<FontedText style={{ color: textColor2, fontSize: 15, textAlign: 'left' }}>{ShortDescription}</FontedText>
					</View>
				</View>
			</CustomTouchable>
		)
	}
}

const mapStateToProps = ({
	runtime_config: {
		runtime_config: {
			styles,
			colors,
		},
	},
}) => ({
	...styles,
	...colors,
})

export default connect(mapStateToProps)(ArticleItem)