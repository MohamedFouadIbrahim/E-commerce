import React, { PureComponent } from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'
import CircularImage from '../../../partial_components/Common/CircularImage/index.js';
import FontedText from '../../../partial_components/Common/FontedText/index.js';
import TranslatedText from '../../../partial_components/Common/TranslatedText/index.js';
import CustomStar from '../../../partial_components/Theme26/CustomStar';
import PriceText from '../../../partial_components/Common/PriceText/index.js';

class ProductItem extends PureComponent {
	render() {
		const { item, onPress, onLongPress, pagePadding, largePagePadding, textColor2, ...restProps } = this.props
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
								<FontedText style={{ color: textColor2, textAlign: 'center', }}>{` (${Rating})`}</FontedText>
							</View>

							<CustomStar rating={Rating} />
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