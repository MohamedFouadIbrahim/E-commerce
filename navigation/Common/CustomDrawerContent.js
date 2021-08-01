import React, { PureComponent } from 'react';
import { I18nManager, Linking, View, Platform, FlatList } from 'react-native';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import DeviceInfo from 'react-native-device-info';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import { shadowStyle0 } from '../../constants/Style';
import { redColor } from '../../constants/Theme26/Colors';
import CustomSelector from '../../partial_components/Common/CustomSelector';
import CustomTouchable from '../../partial_components/Common/CustomTouchable';
import FontedText from '../../partial_components/Common/FontedText';
import RemoteImage from '../../partial_components/Common/RemoteImage';
import RemoteImageBackground from '../../partial_components/Common/RemoteImageBackground';
import TranslatedText from '../../partial_components/Common/TranslatedText';
import { SetLanguage } from '../../services/CustomerService';
import { LongToast } from '../../utils/Toast';
import { ShareSomeThing } from '../../utils/Share';
import Icon from '../../partial_components/Common/Icon';
import RoxiitRefrence from '../../presentational_components/Common/Profile/RoxiitRefrence';
import { Languages as ConstantLanguages } from '../../constants/Languages';

export default class CustomDrawerContent extends PureComponent {
	constructor(props) {
		super(props)

		const {

			currLang,
		} = this.props

		this.state = {
			selectedLang: ConstantLanguages.find(item => item.code === currLang),
			Languages: ConstantLanguages,

		}

		this.LangSelectorRef = React.createRef()
	}

	onChangeLanguage = (lang) => {
		const { switchLanguage, currLang } = this.props

		//curent lng
		let currentLngObj = ConstantLanguages.filter(a => a.code === currLang)[0];
		if (!currentLngObj)
			currentLngObj = ConstantLanguages.filter(a => a.isDefault === true)[0];
		if (!currentLngObj)
			currentLngObj = ConstantLanguages[0];

		//new lng
		let newLngObj = ConstantLanguages.filter(a => a.key === lang.key)[0];
		if (!newLngObj)
			newLngObj = ConstantLanguages.filter(a => a.isDefault === true)[0];
		if (!newLngObj)
			newLngObj = ConstantLanguages[0];

		LongToast("PleaseWait")

		if (currentLngObj.key != newLngObj.key) {
			SetLanguage(newLngObj.key, () => {
				switchLanguage(newLngObj.key, newLngObj.code, newLngObj.isRTL, true, true)
			})
		}
	}

	onIconPress = (url) => {
		Linking.canOpenURL(url).then(isSuported => {
			if (isSuported) {
				Linking.openURL(url)
			} else {
				LongToast('CantOpenRightNow')
			}
		})
	}

	renderDrawerItem = ({ item, index }) => {
		const {
			bgColor2,
			textColor1,
			textColor2,
			largePagePadding,
			onDrawerItemPress,
			descriptors,
		} = this.props

		const {
			name,
			key,
		} = item
		const {
			drawerIcon,
			drawerLabel,
		} = descriptors[key].options

		return (
			<>
				<CustomTouchable
					onPress={() => {
						onDrawerItemPress(name)
					}}
					style={{
						flex: 1,
						flexDirection: 'row',
						alignItems: 'center',
						paddingVertical: largePagePadding,
						borderBottomColor: bgColor2,
						borderBottomWidth: 1,
						marginHorizontal: largePagePadding,
					}}>
					{drawerIcon()}

					<View
						style={{
							flex: 1,
							flexDirection: 'row',
							justifyContent: 'space-between',
							alignItems: 'center',
						}}>
						<FontedText
							style={{
								color: textColor1,
								fontSize: 14,
								marginRight: 5,
								marginLeft: largePagePadding,
							}}>{drawerLabel}</FontedText>

						<SimpleLineIcons
							name={I18nManager.isRTL ? 'arrow-left' : 'arrow-right'}
							color={textColor2}
							size={13} />
					</View>
				</CustomTouchable>
				{index == this.props.state.routes.length - 1 && this.renderArticles()}
			</>
		)
	}

	renderLogoutButton = () => {
		const {
			pagePadding,
			logout,
			is_guest,
			largePagePadding,
			textColor2,
		} = this.props

		return (
			<CustomTouchable
				onPress={logout}
				style={{
					paddingVertical: pagePadding,
					flexDirection: 'row',
					alignItems: 'center',
					marginRight: largePagePadding,
				}}>
				<SimpleLineIcons
					name='logout'
					color={redColor}
					size={20}
					style={{
						marginHorizontal: largePagePadding,
					}} />

				<View
					style={{
						flexDirection: 'row',
						flex: 1,
						justifyContent: 'space-between',
						alignItems: 'center',
					}}>
					<TranslatedText style={{ color: redColor, fontSize: 14, }} text={is_guest ? "Login" : "Logout"} />

					<SimpleLineIcons
						name={I18nManager.isRTL ? 'arrow-left' : 'arrow-right'}
						color={textColor2}
						size={13} />
				</View>
			</CustomTouchable>
		)
	}

	renderDrawerItems = () => {
		return (
			<FlatList
				ListFooterComponent={this.renderLogoutButton}
				data={this.props.state.routes}
				renderItem={this.renderDrawerItem} />
		)
	}

	dialCall = (number) => {
		let phoneNumber = '';
		if (Platform.OS === 'android') { phoneNumber = `tel:${number}`; }
		else { phoneNumber = `telprompt:${number}`; }
		this.onIconPress(phoneNumber)
	};

	renderArticle = ({ item, index }) => {
		const {
			largePagePadding,
			textColor1,
			bgColor2,
			textColor2,
			onPressArticle
		} = this.props

		const {
			Id,
			Name,
			IconFamily
		} = item

		return (
			<CustomTouchable
				onPress={() => {
					onPressArticle(Id)
				}}
				style={{
					flex: 1,
					flexDirection: 'row',
					alignItems: 'center',
					paddingVertical: largePagePadding,
					borderBottomColor: bgColor2,
					borderBottomWidth: 1,
					marginHorizontal: largePagePadding,
				}}>

				<Icon
					size={20}
					family={IconFamily}
					name={item.Icon}
				/>

				<View
					style={{
						flex: 1,
						flexDirection: 'row',
						justifyContent: 'space-between',
						alignItems: 'center',
					}}>
					<FontedText
						style={{
							color: textColor1,
							fontSize: 14,
							marginRight: 5,
							marginLeft: largePagePadding,
						}}>{Name}</FontedText>

					<SimpleLineIcons
						name={I18nManager.isRTL ? 'arrow-left' : 'arrow-right'}
						color={textColor2}
						size={13} />
				</View>
			</CustomTouchable>
		)
	}

	renderArticles = () => {

		const {
			sidemenuarticle,
			navbararticle
		} = this.props

		return (
			<FlatList
				keyExtractor={({ Id }) => String(Id)}
				renderItem={this.renderArticle}
				data={sidemenuarticle}
			/>
		)
	}
	render() {
		const {
			is_developer,
			user_data,
			mainColor,
			pagePadding,
			smallBorderRadius,
			HelpUrl,
			BackgroundImage,
			bgColor1,
			bgColor2,
			iconColor1,
			ShowChangeLanguage,
			largePagePadding,
			Side_Menu_10_1,
			AppUrl,
			user_data: {
				Secret
			},
			EnabelShareStatics,
			userId
		} = this.props

		const shareAppUrl = `${AppUrl.Url}${EnabelShareStatics.Value ? `/c/${userId}/${Secret}` : ''}`

		const {
			FullName,
			Image: { ImageUrl, TextColor }
		} = user_data

		let imageUrl, textColor

		const {
			FacebookUrl,
			TwitterUrl,
			YouetubeUrl,
			GooglePlusUrl,
			InstgramUrl,
			Snapchat,
			Description,
			Whatsapp,
			PhoneNumber,
			ShowShareButton
		} = Side_Menu_10_1

		if (BackgroundImage && BackgroundImage.Value) {
			imageUrl = BackgroundImage.Value.ImageUrl
			textColor = BackgroundImage.Value.TextColor
		}
		else {
			imageUrl = ImageUrl
			textColor = TextColor
		}

		return (
			<DrawerContentScrollView
				contentContainerStyle={{
					backgroundColor: bgColor1,
					paddingTop: 0,
					flexGrow: 1
				}}>
				<View
					style={{
						alignItems: 'center'
					}}>
					<RemoteImageBackground
						uri={imageUrl}
						dimension={250}
						wide={true}
						resizeMode={"cover"}
						blurRadius={5}
						style={{
							flexDirection: 'row',
							justifyContent: 'space-between',
							alignItems: 'center',
							backgroundColor: mainColor,
							width: '100%',
							paddingVertical: 30,
						}}>
						<CustomTouchable
							disabled={HelpUrl && HelpUrl.Value ? false : true}
							onPress={() => {
								Linking.openURL(HelpUrl.Value)
							}}
							style={{
								justifyContent: 'center',
								alignItems: 'center',
								backgroundColor: bgColor2,
								width: 35,
								height: 35,
								borderRadius: 17.5,
								opacity: HelpUrl && HelpUrl.Value ? 1.0 : 0.0,
								marginLeft: 15,
								...shadowStyle0
							}}>
							<Ionicons name="ios-help" color={iconColor1} size={24} />
						</CustomTouchable>

						<View
							style={{
								width: 80,
								justifyContent: 'center',
								alignItems: 'center',
							}}>
							<RemoteImage
								dimension={250}
								style={{
									width: 80,
									height: 80,
									borderRadius: 40,
								}}
								uri={ImageUrl} />

							<FontedText
								numberOfLines={1}
								ellipsizeMode="middle"
								style={{
									color: textColor,
									marginTop: 5,
									textAlign: 'center',
								}}>{FullName}</FontedText>
						</View>

						<CustomTouchable
							onPress={this.props.onPressLogout}
							style={{
								justifyContent: 'center',
								alignItems: 'center',
								backgroundColor: bgColor2,
								width: 35,
								height: 35,
								borderRadius: 17.5,
								marginRight: 15,
								...shadowStyle0
							}}>
							<Ionicons name="ios-log-out" color={iconColor1} size={18} />
						</CustomTouchable>

						<CustomTouchable
							onPress={() => {
								if (is_developer) {
									const { setInspectorEnabled } = this.props
									setInspectorEnabled(true)
								}
							}}
							style={{
								position: 'absolute',
								top: 10,
								right: 10,
								padding: 5,
							}}>
							<FontedText
								style={{
									color: textColor,
									fontSize: 9,
								}}>v{DeviceInfo.getVersion()}</FontedText>
						</CustomTouchable>

						{ShowChangeLanguage.Value && <CustomTouchable
							onPress={() => {
								this.LangSelectorRef.current.show()
							}}
							style={{
								position: 'absolute',
								bottom: 10,
								left: 10,
								flexDirection: 'row',
								justifyContent: 'center',
								alignItems: 'center',
								paddingHorizontal: 10,
								paddingVertical: 6,
								backgroundColor: bgColor2,
								borderRadius: smallBorderRadius,
								...shadowStyle0
							}}>
							<FontedText style={{ color: iconColor1, fontSize: 11, }}>{this.state.selectedLang ? this.state.selectedLang.label.slice(0, 10) : null}</FontedText>

							<Ionicons
								name={"md-arrow-dropdown"}
								size={18}
								color={iconColor1}
								style={{
									marginLeft: 5,
								}} />
						</CustomTouchable>}
					</RemoteImageBackground>
				</View>

				{this.renderDrawerItems()}

				{ShowShareButton.Value == true && shareAppUrl ? <CustomTouchable style={{
					backgroundColor: mainColor,
					marginHorizontal: largePagePadding,
					borderRadius: smallBorderRadius,
					paddingVertical: 7,
					justifyContent: 'center',
					flexDirection: 'row',
					marginTop: 25,
					marginBottom: 10,
					borderColor: this.props.textColor1,
					borderWidth: 0.1
				}} onPress={() => {
					ShareSomeThing(`${shareAppUrl}`)
				}} >

					<SimpleLineIcons
						name={"share-alt"}
						size={20}
					/>
					<TranslatedText
						text='ShareYourApp'
						style={{ marginHorizontal: largePagePadding, paddingTop: 2, color: this.props.textColor1 }}
					/>
				</CustomTouchable> : null}

				{
					Description.Value && <View
						style={{
							paddingHorizontal: largePagePadding,
							paddingTop: pagePadding + 5
						}}>
						<FontedText>{Description.Value}</FontedText>
					</View>
				}

				<View
					style={{
						flexDirection: 'row',
						flexWrap: 'wrap',
						paddingHorizontal: largePagePadding,
						paddingVertical: largePagePadding,
					}} >
					{FacebookUrl && FacebookUrl.Value != '' && FacebookUrl.Value != null ?
						<CustomTouchable style={{ marginRight: pagePadding / 2 }} onPress={() => { this.onIconPress(FacebookUrl.Value.toLowerCase()) }} >
							<Entypo
								name='facebook-with-circle'
								size={40}
								color={'#3256a8'}
							/>
						</CustomTouchable>
						: null}

					{GooglePlusUrl && GooglePlusUrl.Value != '' && GooglePlusUrl.Value != null ?
						<CustomTouchable style={{ marginRight: pagePadding / 2 }} onPress={() => { this.onIconPress(GooglePlusUrl.Value.toLowerCase()) }} >
							<Entypo
								name='google--with-circle'
								size={40}
								color={'#d34836'}
							/>
						</CustomTouchable>
						: null}

					{TwitterUrl && TwitterUrl.Value != '' && TwitterUrl.Value != null ?
						<CustomTouchable style={{ marginRight: pagePadding / 2 }} onPress={() => { this.onIconPress(TwitterUrl.Value.toLowerCase()) }} >
							< Entypo
								name='twitter-with-circle'
								size={40}
								color={'#00acee'}
							/>
						</CustomTouchable>
						: null}

					{YouetubeUrl && YouetubeUrl.Value != '' && YouetubeUrl.Value != null ?
						<CustomTouchable style={{ marginRight: pagePadding / 2 }} onPress={() => { this.onIconPress(YouetubeUrl.Value.toLowerCase()) }} >
							<Entypo
								name='youtube-with-circle'
								size={40}
								color={'#c4302b'}
							/>
						</CustomTouchable>
						: null}

					{InstgramUrl && InstgramUrl.Value != '' && InstgramUrl.Value != null ?
						<CustomTouchable style={{ marginRight: pagePadding / 2 }} onPress={() => { this.onIconPress(InstgramUrl.Value.toLowerCase()) }} >
							< Entypo
								name='instagram-with-circle'
								size={40}
								color={'#3f729b'}
							/>
						</CustomTouchable>
						: null}

					{Whatsapp && Whatsapp.Value != '' && Whatsapp.Value != null ?
						<CustomTouchable style={{ marginRight: pagePadding / 2 }} onPress={() => { this.onIconPress(`https://wa.me/${Whatsapp.Value}`) }} >
							<MaterialCommunityIcons
								name='whatsapp'
								size={40}
								color={'#25D366'}
							/>
						</CustomTouchable>
						: null}

					{Snapchat && Snapchat.Value != '' && Snapchat.Value != null ?
						<CustomTouchable style={{ marginRight: pagePadding / 2 }} onPress={() => { this.onIconPress(Snapchat.Value.toLowerCase()) }} >
							<FontAwesome
								name='snapchat'
								size={40}
								color={'#e6e600'}
							/>
						</CustomTouchable>
						: null}

					{PhoneNumber && PhoneNumber.Value != '' && PhoneNumber.Value != null ?
						<CustomTouchable style={{
							marginRight: pagePadding / 2,
							backgroundColor: 'black',
							borderRadius: 20,
							marginTop: 2,
							height: 40,
							width: 40,
							justifyContent: 'center',
							alignItems: 'center',
						}} onPress={() => {
							this.dialCall(PhoneNumber.Value)
						}} >
							<Ionicons
								name='md-call'
								size={20}
								color={'white'}
							/>
						</CustomTouchable>
						: null}

				</View>

				{this.props.RoxiitInSideMenu.Value && <RoxiitRefrence justPowredBy={true} />}

				<CustomSelector
					ref={this.LangSelectorRef}
					options={ConstantLanguages.map(item => item.label)}
					onSelect={(index) => {
						this.setState({ selectedLang: ConstantLanguages[index] }, () => {
							this.onChangeLanguage(this.state.selectedLang)
						})
					}}
					onDismiss={() => { }} />
			</DrawerContentScrollView >
		);
	}
}