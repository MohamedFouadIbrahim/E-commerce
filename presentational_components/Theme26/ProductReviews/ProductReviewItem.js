import React, { PureComponent } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import FontedText from '../../../partial_components/Common/FontedText';
import RemoteImage from '../../../partial_components/Common/RemoteImage';
import CustomStar from '../../../partial_components/Theme26/CustomStar';
import { formatDate } from '../../../utils/Date';

class ProductReviewItem extends PureComponent {
	render() {
		const {
			pagePadding,
			item,
			textColor1,
			textColor2,
		} = this.props

		const { CustomerImage: { ImageUrl }, Customer: { Name }, Rating, Review, ReviewDate } = item

		return (
			<View
				style={{
					paddingVertical: pagePadding 
				}}>
				<View
					style={{
						flexDirection: 'row',
						justifyContent: 'space-between',
						alignItems: 'center',
					}}>

					<View
						style={{
							flexDirection: 'row',
							justifyContent: 'space-between',
							alignItems: 'center',
						}}
					>
						<RemoteImage
							dimension={250}
							style={{ width: 40, height: 40, borderRadius: 20, marginTop: 8 }}
							uri={ImageUrl} />

						<View>
							<FontedText style={{ color: textColor1, fontSize: 16, marginHorizontal: 10 }}>{Name}</FontedText>
							<View
								style={{
									flexDirection: 'row',
									alignItems: 'center',
									// marginVertical: pagePadding,
									marginHorizontal: 10 
								}}>
								<CustomStar rating={Rating} />
								<FontedText style={{ color: textColor2, fontSize: 16, marginLeft: pagePadding, }}>{`(${Rating}.0)`}</FontedText>

							</View>
						</View>

					</View>

					<FontedText style={{ color: textColor2, fontSize: 16, }}>{formatDate(ReviewDate)}</FontedText>
				</View>

				<FontedText style={{ fontSize: 16 }}>{Review}</FontedText>

			</View>
		)
	}
}

const mapStateToProps = ({
	runtime_config: {
		runtime_config: {
			colors,
			styles,
		},
	},
}) => ({
	...colors,
	...styles,
})

export default connect(mapStateToProps)(ProductReviewItem)