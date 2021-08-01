import React from 'react'
import { View, Clipboard } from 'react-native'
import { connect } from 'react-redux'
import FontedText from '../../../partial_components/Common/FontedText';
import RemoteImage from '../../../partial_components/Common/RemoteImage';
import { formatDate } from '../../../utils/Date';
import { withLocalize } from 'react-localize-redux';
import { shadowStyle2 } from '../../../constants/Style';
import CustomTouchable from '../../../partial_components/Common/CustomTouchable';
import PriceText from '../../../partial_components/Common/PriceText';
import { LongToast } from '../../../utils/Toast';
class OrderItem extends React.Component {
	render() {
		const {
			item,
			pagePadding,
			navigation,
			pushNavigation,
			largePagePadding,
			translate,
			textColor2,
			smallBorderRadius,
			bgColor1,
			navigateFromInbox,
			onOrderInboxPress
		} = this.props

		const {
			Id,
			Name,
			CreateDate,
			Status,
			Courier,
			OrderCode,
			ProductImage: { ImageUrl },
			TotalPrice
		} = item

		return (
			<CustomTouchable
				onPress={() => {
					if (navigateFromInbox && navigateFromInbox == true) {

						onOrderInboxPress && onOrderInboxPress()

					} else {

						pushNavigation ? navigation.push('Order', { Id }) : navigation.navigate('Order', { Id })

					}
				}}
				style={{
					marginVertical: 5,
				}}>
				<View
					style={{
						flex: 1,
						borderRadius: 2,
						marginHorizontal: 3,
						flexDirection: 'row',
						justifyContent: 'space-between',
					}}>
					<View
						style={{
							height: '100%',
							height: 120,
							minHeight: 130,
							backgroundColor: bgColor1,
							borderRadius: smallBorderRadius,
							...shadowStyle2
						}}>
						<RemoteImage
							dimension={250}
							style={{
								height: '100%',
								width: 120,
								minHeight: 130,
								borderRadius: smallBorderRadius
							}}
							uri={ImageUrl}
						/>
					</View>

					<View
						style={{
							flex: 1,
							paddingLeft: largePagePadding,
							paddingVertical: pagePadding,
							justifyContent: 'center',
						}}>
						<FontedText style={{ fontSize: 15, fontWeight: 'bold' }} numberOfLines={3} >{Name}</FontedText>

						<View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 5, }} >
							<FontedText style={{ fontSize: 15, flex: 0.5 }}  >{Status.Name}</FontedText>
							<FontedText style={{ color: textColor2, fontSize: 15, flex: 0.5, textAlign: 'right' }} numberOfLines={3} > {translate('CreateDate')}</FontedText>
						</View>

						<View
							style={{
								flexDirection: 'row',
								justifyContent: 'space-between',

							}}>
							<FontedText style={{ fontSize: 15, fontWeight: 'bold' }}>{'#' + OrderCode}</FontedText>
							<FontedText style={{ color: textColor2, fontSize: 15 }}>{formatDate(CreateDate)}</FontedText>
						</View>
					</View>
				</View>

				<View
					style={{
						paddingVertical: pagePadding,
						justifyContent: 'space-between',
						flexDirection: 'row',
						marginLeft: largePagePadding,
						marginRight: largePagePadding
					}}>
					<FontedText style={{ fontSize: 15, textAlign: 'center' }}>{translate('Total')}</FontedText>
					<PriceText style={{ fontSize: 15, textAlign: 'center', fontWeight: 'bold', }}>{TotalPrice}</PriceText>
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

export default withLocalize(connect(mapStateToProps)(OrderItem)) 