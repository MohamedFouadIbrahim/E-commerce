import React, { PureComponent } from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import CircularImage from '../../../partial_components/Common/CircularImage/index.js';
import FontedText from '../../../partial_components/Common/FontedText/index.js';
import { formatDate } from '../../../utils/Date.js';
import PriceText from '../../../partial_components/Common/PriceText/index.js';

class SalesItem extends PureComponent {
	render() {
		const { item, pagePadding, largePagePadding, textColor2, ...restProps } = this.props
		const {
			Id,
			OrderCode,
			Name,
			CreateDate,
			Country,
			City,
			Courier,
			Status,
			CustomerId,
			TotalPrice,
			ProductImage: {
				ImageUrl
			}
		} = item

		return (
			<View
				{...restProps}>
				<View
					style={{
						justifyContent: 'center',
						alignItems: 'center',
						flexDirection: 'row',
						paddingVertical: pagePadding,
						paddingBottom: 20,
						flex: 1
					}}>
					<PriceText contentContainerStyle={{ justifyContent: 'center', alignItems: 'center', paddingHorizontal: 5 }}>{TotalPrice}</PriceText>

					<CircularImage
						uri={ImageUrl} />

					<View
						style={{
							paddingLeft: largePagePadding,
							justifyContent: 'center',
							width: '50%'
						}}>
						<FontedText numberOfLines={2}>{Name}</FontedText>
						<FontedText numberOfLines={2}>{formatDate(CreateDate)}</FontedText>
					</View>

					<View
						style={{
							paddingLeft: largePagePadding,
							justifyContent: 'center',
						}}>
						<FontedText numberOfLines={2}>{Status.Name}</FontedText>
						<FontedText numberOfLines={2}>{Country.Name}</FontedText>
					</View>

				</View>

			</View>
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

export default connect(mapStateToProps)(SalesItem)