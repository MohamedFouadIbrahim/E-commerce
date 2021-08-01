import React from 'react'
import { View, TextInput, I18nManager,  Image } from 'react-native'
import { connect } from 'react-redux'
import FontedText from '../../Common/FontedText';
import { GetCountryFlag } from '../../../utils/Places';
import CustomTouchable from '../../../partial_components/Common/CustomTouchable';

const PhoneInput = (props) => {
	const {
		country_id,
		textColor1,
		textColor2,
	} = props

	const { 
		value, 
		contentContainerStyle,
		style, 
		countryId = country_id,
		countries,
		onPressFlag,
		placeholderTextColor = textColor2,  
		mainColor,
		...inputProps
	} = props

	const foundCountry = countries.find(item => item.Id === countryId)

	return (
		<View
			style={[{
				paddingVertical: 10,
				paddingHorizontal: 14,
				flexDirection: 'row',
				alignItems: 'center',
			}, contentContainerStyle]}>
			<CustomTouchable
				onPress={onPressFlag}
				style={{
					flexDirection: 'row',
					alignItems: 'center',
					height: '100%',
				}}>
				{foundCountry ? <Image
					source={GetCountryFlag(foundCountry.ISOAlpha_2)}
					style={{
						marginRight: 10,
						width: 40,
						height: 40,
						borderRadius: 10,
					}}
					resizeMode="contain" /> : <View style={{
						marginRight: 10,
						width: 40,
						height: 40,
						borderRadius: 10,
						backgroundColor: textColor2,
					}} />}

				{foundCountry && <FontedText style={{ color: value ? textColor1 : textColor2, fontSize: 16, marginBottom: 3, }}>{foundCountry.PhoneCode}</FontedText>}
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
						textAlign: I18nManager.isRTL ? 'right' : 'left',
						paddingLeft: 0,
						marginLeft: 0,
					}, style]}
					keyboardType='phone-pad'
					maxLength={15}
					placeholder={''}
					placeholderTextColor={placeholderTextColor}
					underlineColorAndroid='transparent'
					selectionColor={mainColor} />
			</View>
		</View>
	)
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
			colors
		}
	}
}) => ({
	countries,
	country_id,
	...colors,
})

export default connect(mapStateToProps)(PhoneInput)