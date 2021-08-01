import React, { Component } from 'react'
import { View, StatusBar, Image, ActivityIndicator } from 'react-native'
import RemoteImageBackground from '../../../partial_components/Common/RemoteImageBackground';
import CustomTouchable from '../../../partial_components/Common/CustomTouchable';
import FontedText from '../../../partial_components/Common/FontedText';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Ionicons from 'react-native-vector-icons/Ionicons'
import CustomButton from '../../../partial_components/Common/CustomButton';
import { getStatusBarStyle } from '../../../utils/Misc';
import { shadowStyle0 } from '../../../constants/Style';
class LoginCover extends Component {
	renderContent = () => {
		const {
			submitLocked,
		} = this.props

		if (submitLocked) {
			const {
				bgColor1,
				largePagePadding,
			} = this.props

			return (
				<View
					style={{
						flex: 1,
						justifyContent: 'center',
						alignItems: 'center',
						padding: largePagePadding,
					}}>
					<ActivityIndicator
						size="large"
						color={bgColor1} />
				</View>
			)
		}
		else {
			const {
				EnableGuestLogin,
				submitGuest,
				largePagePadding,
				navigateToSignup,
				hideLoginCover,
				textColor2,
				bgColor1,
				mainColor,
				mainColorText,
				borderRadius,
				pagePadding,
				EnableFacebookLogin,
				EnableGooglePlusLogin,
				submitFacebook,
				submitGoogle,
			} = this.props

			return (
				<View
					style={{
						justifyContent: 'flex-end',
						alignItems: 'center',
						padding: largePagePadding,
					}}>
					<CustomButton
						onPress={hideLoginCover}
						style={{
							paddingHorizontal: largePagePadding,
							paddingVertical: pagePadding,
							borderRadius,
							marginBottom: largePagePadding,
						}}
						textStyle={{
							fontSize: 18,
						}}
						fullWidth={true}
						backgroundColor={mainColor}
						color={mainColorText}
						title="Signin" />

					<View
						style={{
							flexDirection: 'row',
							justifyContent: 'space-between',
							alignItems: 'center',
						}}>
						<CustomButton
							onPress={navigateToSignup}
							style={{
								flex: 1,
								paddingHorizontal: largePagePadding,
								paddingVertical: pagePadding,
								borderRadius,
							}}
							textStyle={{
								fontSize: 18,
							}}
							backgroundColor={bgColor1}
							color={textColor2}
							title="Signup" />

						{EnableGuestLogin.Value && <CustomButton
							onPress={submitGuest}
							style={{
								flex: 1,
								paddingHorizontal: largePagePadding,
								paddingVertical: pagePadding,
								borderRadius,
								marginLeft: pagePadding,
							}}
							textStyle={{
								fontSize: 18,
							}}
							backgroundColor={bgColor1}
							color={textColor2}
							title="Guest" />}
					</View>

					{(EnableFacebookLogin.Value || EnableGooglePlusLogin.Value) && <View
						style={{
							marginTop: largePagePadding * 2,
							flexDirection: 'row',
							justifyContent: 'space-between',
							alignItems: 'flex-end',
						}}>
						{EnableFacebookLogin.Value && <CustomTouchable
							onPress={submitFacebook}
							style={{
								justifyContent: 'center',
								alignItems: 'center',
								width: 44,
								height: 44,
								borderRadius: 22,
								backgroundColor: "#1778F2",
							}}>
							<FontAwesome
								name="facebook-f"
								color="white"
								size={20} />
						</CustomTouchable>}

						{EnableGooglePlusLogin.Value && <CustomTouchable
							onPress={submitGoogle}
							style={{
								justifyContent: 'center',
								alignItems: 'center',
								width: 44,
								height: 44,
								borderRadius: 22,
								backgroundColor: "#dd4b39",
								marginLeft: largePagePadding,
							}}>
							<FontAwesome
								name="google"
								color="white"
								size={20} />
						</CustomTouchable>}
					</View>}
				</View>
			)
		}
	}

	render() {
		const {
			largePagePadding,
			Background,
			bgColor2,
			submitLocked,
			smallBorderRadius,
			iconColor1,
			ShowLanguageSelector
		} = this.props

		return (
			<RemoteImageBackground
				blurRadius={submitLocked ? 20 : null}
				dimension={1080}
				original={true}
				uri={Background && Background.Value ? Background.Value.ImageUrl : 'https://'}
				resizeMode={"cover"}
				style={{
					flex: 1,
					backgroundColor: bgColor2,
				}}>
				<StatusBar
					backgroundColor={"transparent"}
					barStyle={getStatusBarStyle()}
					translucent={true} />

				<View
					style={{
						flex: 1,
						justifyContent: 'space-between',
					}}>
					<View
						style={{
							justifyContent: 'center',
							alignItems: 'center',
							paddingTop: 50,
							paddingHorizontal: largePagePadding,
							paddingBottom: largePagePadding,
						}}>
						<Image
							resizeMode='contain'
							style={{
								width: 100,
								height: 100,
							}}
							source={require('../../../android/app/src/main/res/mipmap-xxxhdpi/ic_launcher_round.png')} />

						{ShowLanguageSelector.Value == true ? <CustomTouchable
							onPress={() => {
								const { openLanguageSelectore } = this.props
								openLanguageSelectore()
							}}
							style={{
								position: 'absolute',
								left: largePagePadding,
								flexDirection: 'row',
								justifyContent: 'center',
								alignItems: 'center',
								paddingHorizontal: 10,
								paddingVertical: 6,
								backgroundColor: bgColor2,
								borderRadius: smallBorderRadius,
								...shadowStyle0
							}}>
							<FontedText style={{ color: iconColor1, fontSize: 11, }}>{this.props.selectedLang ? this.props.selectedLang.label || this.props.selectedLang.Name : null}</FontedText>

							<Ionicons
								name={"md-arrow-dropdown"}
								size={18}
								color={iconColor1}
								style={{
									marginLeft: 5,
								}} />
						</CustomTouchable> : null}
					</View>

					{this.renderContent()}
				</View>
			</RemoteImageBackground>
		)
	}
}

export default LoginCover