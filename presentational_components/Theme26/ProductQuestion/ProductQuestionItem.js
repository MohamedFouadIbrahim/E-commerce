import React, { PureComponent } from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'
import FontedText from '../../../partial_components/Common/FontedText';
import TranslatedText from '../../../partial_components/Common/TranslatedText';
import RemoteImage from '../../../partial_components/Common/RemoteImage';
import CustomTouchable from '../../../partial_components/Common/CustomTouchable';
import AntDesign from 'react-native-vector-icons/AntDesign';

class ProductQuestionItem extends PureComponent {
	render() {
		const {
			pagePadding,
			item,
			textColor2,
			onPress,
			mainColor
		} = this.props
		return (
			<CustomTouchable
				onPress={onPress}
				style={{
					flexDirection: 'row',
					paddingVertical: 7
				}}>
				<View style={{
					flex: 0.2,
					alignItems: 'center'
				}}>
					<RemoteImage
						dimension={250}
						style={{ width: 40, height: 40, borderRadius: 20, marginTop: 8 }}
						uri={item.CustomerImage.ImageUrl} />

				</View>

				<View style={{
					flex: 1.5,
					paddingHorizontal: pagePadding,
					flexWrap: 'wrap',
					marginTop: 3
				}}>
					<View
						style={{ justifyContent: 'space-between', flexDirection: 'row' }}
					>

						<FontedText style={{ fontWeight: 'bold', }}>{item.Customer.Name}</FontedText>
						{
							item.answersCount == 0 && <TranslatedText style={{ color: mainColor }} text={'BeFirstOne'} />
						}

					</View>
					<View
						style={{
							flexDirection: 'row',
							alignItems: 'center'
						}}
					>

						<View
							style={{
								flexDirection: 'row',
								alignItems: 'center'
							}}
						>
							<FontedText style={{ color: textColor2, fontSize: 14, marginLeft: 5 }}>{item.LikesCount}</FontedText>
							<AntDesign name={'like1'} color={textColor2} style={{ marginHorizontal: 10 }} />
						</View>

						{item.answersCount != 0 && <View
							style={{
								flexDirection: 'row',
								alignItems: 'center'
							}}
						>
							<FontedText style={{ color: textColor2, fontSize: 14, marginLeft: 5 }}>{item.answersCount}</FontedText>
							<TranslatedText style={{ color: textColor2, fontSize: 14, marginLeft: 5 }} text={'Answers'} />
						</View>}

					</View>
					<FontedText style={{ color: textColor2, textAlign: 'justify', fontSize: 14, marginTop: 6, marginLeft: 5 }}>{item.QuestionText}</FontedText>
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

export default connect(mapStateToProps)(ProductQuestionItem)
