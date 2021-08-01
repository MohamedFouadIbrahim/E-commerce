import React, { Component } from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'
import FontedText from '../../Common/FontedText';
import RemoteImageBackground from '../../Common/RemoteImageBackground';
import { shadowStyle2 } from '../../../constants/Style';
import PriceText from '../../Common/PriceText';

class Deal extends Component {
	render() {
		const {
			Icon: { ImageUrl },
			Name, 
			Brand,
			Price,
			SalePrice,
			ShortDescription, 
			color, 
			style,
			mainColor,
			borderRadius, 
			largePagePadding,
			bgColor2,
		} = this.props

		return (
			<RemoteImageBackground
				borderRadius={15}
				style={[{
					height: 350,
					borderRadius: 15,
					...shadowStyle2
				}, style]}
				uri={ImageUrl}>
				<View
					style={{
						flex: 1,
						padding: largePagePadding,
						justifyContent: 'space-between',
					}}>
					<View
						style={{
							paddingRight: 40,
						}}>
						{Brand && <FontedText style={{ color: bgColor2, fontSize: 15, textAlign: 'left', }}>{Brand.Name}</FontedText>}
						<FontedText style={{ color: color, fontSize: 24, fontWeight: 'bold', marginTop: 5, textAlign: 'left', }}>{Name}</FontedText>
						<FontedText style={{ color: color, fontSize: 14, marginTop: 10, textAlign: 'left', }}>{ShortDescription}</FontedText>
					</View>

					<View
						style={{
							flexDirection: 'row',
							justifyContent: 'flex-end',
							alignItems: 'center',
						}}>
						{SalePrice && <PriceText style={{ color: bgColor2, fontSize: 15, }}>{Price - SalePrice}</PriceText>}

						<View
							style={{
								backgroundColor: mainColor,
								borderRadius,
								justifyContent: 'center',
								alignItems: 'center',
								paddingVertical: 7,
								paddingHorizontal: 5,
								minWidth: 50,
								marginLeft: 10,
							}}>
							<PriceText style={{ fontSize: 15, }}>{Price}</PriceText>
						</View>
					</View>
				</View>
			</RemoteImageBackground>
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

export default connect(mapStateToProps)(Deal)