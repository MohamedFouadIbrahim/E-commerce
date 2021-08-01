import React from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'
import FontedText from '../../../partial_components/Common/FontedText';
import RemoteImage from '../../../partial_components/Common/RemoteImage';
import { formatDate } from '../../../utils/Date';
import CustomTouchable from '../../../partial_components/Common/CustomTouchable';

class ArticleItem extends React.Component {
	render() {
		const {
			item,
			pagePadding,
			textColor2,
			navigation,
			pushNavigation,
		} = this.props

		const {
			Id,
			Name,
			CreateDate,
			Status,
			Courier,
			OrderCode,
			ProductImage:{ ImageUrl } ,
		} = item

		return (
			<CustomTouchable
				onPress={() => {
					  pushNavigation ? navigation.push('Order', { Id }) : navigation.navigate('Order', { Id })
				}}
				style={{ flex: 1, borderRadius: 2, marginHorizontal: pagePadding / 2 }}>
				<RemoteImage
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
						alignItems: 'center',
					}}>
					<FontedText style={{ fontSize: 15, textAlign: 'left' }}>{Name}</FontedText>
					<FontedText style={{ color: textColor2, fontSize: 15, textAlign: 'left' }}>{formatDate(CreateDate)}</FontedText>
					<FontedText style={{ fontSize: 15, textAlign: 'left' }}>{Status.Name}</FontedText>
					<FontedText style={{ color: textColor2, fontSize: 15, textAlign: 'left' }}>{Courier.Name}</FontedText>
					<FontedText style={{ fontSize: 15, textAlign: 'left'}}>{OrderCode}</FontedText>
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