import React, { PureComponent } from 'react'
import { View, TextInput, I18nManager, Image, Platform } from 'react-native'
import { connect } from 'react-redux'
import FontedText from '../../Common/FontedText';
import TranslatedText from '../../Common/TranslatedText';
import { GetCountryFlag } from '../../../utils/Places';
import CustomTouchable from '../../../partial_components/Common/CustomTouchable';

class PhoneInput extends PureComponent {
	constructor() {
		super()

		this.state = {
			isFocused: false,
		}
	}

	render() {
		const {
			country_id,
			textColor1,
			textColor2,
		} = this.props

		const {
			value,
			contentContainerStyle,
			style,
			countryId = country_id,
			countries,
			onPressFlag,
			placeholderTextColor = textColor2,
			mainColor,
			largeBorderRadius,
			bgColor2,
			bgColor1,
			borderRadius,
			title,
			titleStyle,
			...inputProps
		} = this.props

		const foundCountry = countries.find(item => item.Id === countryId)

		let anotherInputProps = {}

		if (I18nManager.isRTL) {

			anotherInputProps = {
				right: 0,
			}

		} else {
			anotherInputProps = {
				left: 0,
			}
		}

		let anotherFlagAndCountryNumber = {}

		if (I18nManager.isRTL) {

			anotherFlagAndCountryNumber = {
				marginRight: 0,
				marginLeft: 10
			}

		} else {
			anotherFlagAndCountryNumber = {
				marginRight: 10,
				marginLeft: 0
			}
		}

		return (
			<View
				style={[{
					borderColor: this.state.isFocused ? mainColor : bgColor2,
					borderWidth: 1,
					paddingHorizontal: 15,
					borderRadius,
					flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
					alignItems: 'center',

				}, contentContainerStyle]}>

				{title !== null && <TranslatedText style={[
					{
						fontSize: 14,
						marginBottom: Platform.OS === 'ios' ? 15 : 25,
						position: 'absolute',
						bottom: 11,
						zIndex: 1,
						marginHorizontal: 5,
						paddingHorizontal: 5,
						backgroundColor: bgColor1,
						color: this.state.isFocused ? mainColor : textColor1,
						...anotherInputProps
					},
					titleStyle
				]} text={title} />}

				<CustomTouchable
					onPress={onPressFlag}
					style={{
						flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
						alignItems: 'center',
						height: '100%',
					}}>
					{foundCountry ? <Image
						source={GetCountryFlag(foundCountry.ISOAlpha_2)}
						style={{
							// marginRight: 10,
							...anotherFlagAndCountryNumber,
							width: 30,
							height: 30,
							borderRadius: 10,
						}}
						resizeMode="contain" /> : <View style={{
							// marginRight: 10,
							...anotherFlagAndCountryNumber,
							width: 30,
							height: 30,
							borderRadius: 10,
							backgroundColor: textColor2,
						}} />}

					{foundCountry && <FontedText style={{ color: value ? textColor1 : textColor2, fontSize: 16, marginBottom: 1, }}>{foundCountry.PhoneCode}</FontedText>}
				</CustomTouchable>

				<View
					style={{
						flex: 1,
						justifyContent: 'center',
						paddingLeft: 5,
					}}>
					<TextInput
						{...inputProps}
						value={value}
						style={[{
							fontSize: 15,
							color: textColor1,
							textAlign: 'left',
							paddingLeft: 0,
							marginLeft: 0,
							paddingVertical: 8,
							width: '100%'
						}, style]}
						keyboardType='phone-pad'
						maxLength={15}
						placeholder={''}
						placeholderTextColor={textColor2}
						underlineColorAndroid='transparent'
						selectionColor={mainColor}
						onFocus={() => {
							this.setState({ isFocused: true })
						}}
						onBlur={() => {
							this.setState({ isFocused: false })
						}} />
				</View>
			</View>
		)
	}
}

const mapStateToProps = ({
	places: {
		countries,
	},
	login: {
		country_id,
	},
	runtime_config: {
		runtime_config: {
			colors,
			styles: {
				largeBorderRadius,
				borderRadius
			}
		}
	}
}) => ({
	countries,
	country_id,
	...colors,
	largeBorderRadius,
	borderRadius
})

export default connect(mapStateToProps)(PhoneInput)