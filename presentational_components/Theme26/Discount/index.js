import React, { Component } from 'react'
import { View } from 'react-native'
import LazyContainer from '../../../partial_components/Common/LazyContainer';
import CustomHeader from '../../../partial_components/Common/CustomHeader';
import GridProductsList from '../../../partial_components/Theme26/GridProductsList';
import FontedText from '../../../partial_components/Common/FontedText';
import TranslatedText from '../../../partial_components/Common/TranslatedText';
import { formatDate } from '../../../utils/Date';
import QRCode from 'react-native-qrcode-svg';
import { screenWidth } from '../../../constants/Metrics';

export default class Discount extends Component {
	constructor () {
		super ()

		this.codeComponentWidth = screenWidth * 0.55
	}

	renderListHeader = () => {
		const {
			ApplyDate,
            ExpiryDate,
            textColor2,
			largePagePadding,
			Code,
		} = this.props

		return (
			<View
				style={{
					paddingHorizontal: largePagePadding,
					marginBottom: largePagePadding,
				}}>
				<View
					style={{
						justifyContent: 'center',
						alignItems: 'center',
						marginBottom: largePagePadding,
					}}>
					<QRCode
						size={this.codeComponentWidth}
						value={Code} />
				</View>

				<View
					style={{
						flexDirection: 'row',
					}}>
					<View
						style={{
							flex: 1,
						}}>
                    	<TranslatedText style={{ fontSize: 15, textAlign: 'left' }} text="ApplyDate" />
					</View>

					<View
						style={{
							flex: 1,
							alignItems: 'flex-end',
						}}>
                    	<FontedText style={{ color: textColor2, fontSize: 15, textAlign: 'left' }}>{formatDate(ApplyDate)}</FontedText>
					</View>
				</View>

				<View
					style={{
						flexDirection: 'row',
					}}>
					<View
						style={{
							flex: 1,
						}}>
                    	<TranslatedText style={{ fontSize: 15, textAlign: 'left' }} text="ExpiryDate" />
					</View>

					<View
						style={{
							flex: 1,
							alignItems: 'flex-end',
						}}>
                    	<FontedText style={{ color: textColor2, fontSize: 15, textAlign: 'left' }}>{formatDate(ExpiryDate)}</FontedText>
					</View>
				</View>
			</View>
		)
	}

	render() {
		const {
			DiscountId,
			Code,
			largePagePadding,
		} = this.props

		return (
			<LazyContainer>
				<CustomHeader
					navigation={this.props.navigation}
					title={Code}
					translateTitle={false}
					leftComponent="back" />

				<GridProductsList
					ListHeaderComponent={this.renderListHeader}
					url={"Products"}
					params={`freeInDiscounts=${DiscountId}`}
					navigation={this.props.navigation}
					contentContainerStyle={{
						paddingVertical: largePagePadding,
					}} />
			</LazyContainer>
		)
	}
}