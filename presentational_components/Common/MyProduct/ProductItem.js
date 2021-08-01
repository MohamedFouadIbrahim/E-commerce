import React, { PureComponent } from 'react';
import { Text, View } from 'react-native';
import StarRating from 'react-native-star-rating';
import { connect } from 'react-redux';
import CustomTouchable from '../../../partial_components/Common/CustomTouchable';
import CircularImage from '../../components/CircularImage/index.js';
import FontedText from '../../components/FontedText/index.js';
import TranslatedText from '../../components/TranslatedText/index.js';
import { numeral } from '../../utils/numeral.js';
import PriceText from '../../../partial_components/Common/PriceText';
class ProductItem extends PureComponent {
	render() {
		const { item, onPress, onLongPress, textColor2, largePagePadding, pagePadding, ...restProps } = this.props
		const { Icon: { ImageUrl }, Name, ShortDescription, Price, Type, LocalLocation, Rating } = item

		return (
			<CustomTouchable
				onPress={() => { onPress(item) }}
				onLongPress={() => { onLongPress(item) }}
				{...restProps}>
				<View>
					<View
						style={{
							justifyContent: 'center',
							alignItems: 'center',
							flexDirection: 'row',
							paddingVertical: pagePadding,
							paddingBottom: 20
						}}>
						<PriceText contentContainerStyle={{ justifyContent: 'center', alignItems: 'center', flex: .3 }}>{Price}</PriceText>
						
						<CircularImage
							uri={ImageUrl} />
						<View
							style={{
								flex: 1,
								paddingLeft: largePagePadding,
								justifyContent: 'center'
							}}>
							<FontedText numberOfLines={2} style={{}}>{Name}</FontedText>
							<FontedText numberOfLines={1} style={{ color: textColor2 }}>{ShortDescription}</FontedText>
						</View>
					</View>

					<View style={{ flexDirection: 'row', paddingHorizontal: 20, justifyContent: 'center', alignItems: 'center' }}>
						<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
							<TranslatedText style={{ color: textColor2, textAlign: 'center', }} text="Location" />
							<FontedText numberOfLines={1} style={{ color: textColor2, textAlign: 'center' }}>{LocalLocation && LocalLocation.length ? LocalLocation : '-'}</FontedText>
						</View>

						<View style={{ flex: .5, justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
							<TranslatedText style={{ color: textColor2, textAlign: 'center', }} text="Type" />
							<FontedText style={{ color: textColor2, textAlign: 'center' }}>{Type.Name}</FontedText>
						</View>

						<View style={{ flex: .5, justifyContent: 'center', alignItems: 'center' }}>
							<View
								style={{
									flexDirection: 'row',
									alignItems: 'center',
								}}>
								<TranslatedText style={{ color: textColor2, textAlign: 'center', }} text="Rating" />
								<FontedText style={{ color: textColor2, textAlign: 'center', }}>{` (${numeral(Rating)})`}</FontedText>
							</View>

							<StarRating
								disabled={true}
								maxStars={5}
								fullStarColor="#FFC600"
								starSize={15}
								rating={Rating}
							/>
						</View>
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
export default connect(mapStateToProps)(ProductItem)