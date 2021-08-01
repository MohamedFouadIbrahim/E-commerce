import React, { Component, Fragment } from 'react';
import { SafeAreaView, Linking, Platform, Image } from 'react-native';
import { connect } from 'react-redux';
import AppNavigator from './AppNavigator';
import AuthNavigator, { SelectInterests_Stack, CompleteProfile_Stack, SecondarySplash_Stack } from './AuthNavigator';
import { FAB, Portal, Provider } from 'react-native-paper';
import { LongToast } from '../utils/Toast';

class RootNavigation extends Component {

	onStateChange = ({ open }) => this.props.setOpenFab(open)
	onIconPress = (url) => {
		Linking.canOpenURL(url).then(isSuported => {
			if (isSuported) {
				Linking.openURL(url)
			} else {
				LongToast('CantOpenRightNow')
			}
		})
	}

	dialCall = (number) => {
		let phoneNumber = '';
		if (Platform.OS === 'android') { phoneNumber = `tel:${number}`; }
		else { phoneNumber = `telprompt:${number}`; }
		this.onIconPress(phoneNumber)
	};

	socialMediaArray = [
		{
			color: 'white',
			icon: 'facebook',
			label: 'Facebook',
			onPress: () => { this.onIconPress(this.props.Navigation_Bar_10_2.FacebookUrl.Value.toLowerCase()) },
			style: { backgroundColor: '#3256a8' }
		},
		{
			color: 'white',
			icon: 'google',
			label: 'Google',
			onPress: () => { this.onIconPress(this.props.Navigation_Bar_10_2.GooglePlusUrl.Value.toLowerCase()) },
			style: { backgroundColor: '#d34836' }
		},
		{
			color: 'white',
			icon: 'twitter',
			label: 'Twitter',
			onPress: () => { this.onIconPress(this.props.Navigation_Bar_10_2.TwitterUrl.Value.toLowerCase()) },
			style: { backgroundColor: '#00acee' }
		},
		{
			color: 'white',
			icon: 'youtube',
			label: 'Youtube',
			onPress: () => { this.onIconPress(this.props.Navigation_Bar_10_2.YouetubeUrl.Value.toLowerCase()) },
			style: { backgroundColor: '#c4302b' }
		},
		{
			color: 'white',
			icon: 'instagram',
			label: 'Instagram',
			onPress: () => { this.onIconPress(this.props.Navigation_Bar_10_2.InstgramUrl.Value.toLowerCase()) },
			style: { backgroundColor: '#3f729b' }
		},
		{
			color: 'white',
			icon: 'whatsapp',
			label: 'Whatsapp',
			onPress: () => { this.onIconPress(`https://wa.me/${this.props.Navigation_Bar_10_2.Whatsapp.Value}`) },
			style: { backgroundColor: '#25D366' }
		},
		{
			color: 'white',
			icon: 'snapchat',
			label: 'Snapchat',
			onPress: () => { this.onIconPress(this.props.Navigation_Bar_10_2.Snapchat.Value.toLowerCase()) },
			style: { backgroundColor: '#e6e600' }
		},
		{
			color: this.props.textColor2,
			icon: 'phone',
			label: 'Phone',
			onPress: () => { this.dialCall(this.props.Navigation_Bar_10_2.PhoneNumber.Value) },
			style: { backgroundColor: this.props.bgColor1 }
		}
	]

	getFabActions = () => {
		const {
			FacebookUrl,
			TwitterUrl,
			YouetubeUrl,
			GooglePlusUrl,
			InstgramUrl,
			Snapchat,
			Whatsapp,
			PhoneNumber,
		} = this.props.Navigation_Bar_10_2

		const actions = []
		if (FacebookUrl && FacebookUrl.Value != null && FacebookUrl.Value != '') {
			actions.push(this.socialMediaArray[0])
		}
		if (TwitterUrl && TwitterUrl.Value != null && TwitterUrl.Value != '') {
			actions.push(this.socialMediaArray[1])
		}
		if (YouetubeUrl && YouetubeUrl.Value != null && YouetubeUrl.Value != '') {
			actions.push(this.socialMediaArray[2])

		}
		if (GooglePlusUrl && GooglePlusUrl.Value != null && GooglePlusUrl.Value != '') {
			actions.push(this.socialMediaArray[3])
		}
		if (InstgramUrl && InstgramUrl.Value != null && InstgramUrl.Value != '') {
			actions.push(this.socialMediaArray[4])
		}
		if (Snapchat && Snapchat.Value != null && Snapchat.Value != '') {
			actions.push(this.socialMediaArray[5])
		}
		if (Whatsapp && Whatsapp.Value != null && Whatsapp.Value != '') {
			actions.push(this.socialMediaArray[6])
		}
		if (PhoneNumber && PhoneNumber.Value != null && PhoneNumber.Value != '') {
			actions.push(this.socialMediaArray[7])
		}
		return actions
	}

	render() {
		const { is_logged_in, is_guest } = this.props
		if (is_logged_in || is_guest) {
			const {
				Select_Main_Interest_02_8,
				selected_interests,
				AskToCompleteProfilrAfterSignup,
				completed_profile,
				SplashScreenVideo,
				ShowVideoOnce,
				is_slpashScreenLocalSkiped,
				is_skipped_secondary_splash,
			} = this.props

			if ((SplashScreenVideo.Value != null && SplashScreenVideo.Value != '') &&
				((ShowVideoOnce.Value == false && is_slpashScreenLocalSkiped == false) ||
					(!is_skipped_secondary_splash && ShowVideoOnce.Value == true))) {
				return <SecondarySplash_Stack />
			}
			else if (Select_Main_Interest_02_8.Enable.Value !== false && !selected_interests) {
				return <SelectInterests_Stack />
			}
			else if (AskToCompleteProfilrAfterSignup.Value !== false && !completed_profile) {
				return <CompleteProfile_Stack />
			}
			else {
				const { bgColor1, textColor2 } = this.props

				return (
					<Fragment>
						<SafeAreaView style={{ flex: 0, backgroundColor: bgColor1 }} />
						<SafeAreaView style={{ flex: 1, backgroundColor: bgColor1 }}>
							<Provider>
								<Portal>
									<FAB.Group
										fabStyle={{
											backgroundColor: bgColor1,
										}}
										style={{ paddingBottom: 50, marginRight: -10 }}
										visible={this.getFabActions().length != 0}
										open={this.props.openFab}
										icon={this.props.openFab ? 'close' : 'comment-question'}
										color={textColor2}
										actions={
											this.getFabActions()
										}
										onStateChange={this.onStateChange}
									/>

								</Portal>
								<AppNavigator />

							</Provider>
						</SafeAreaView>
					</Fragment>
				)
			}
		}
		else {
			const { bgColor1 } = this.props

			return (
				<Fragment>
					<SafeAreaView style={{ flex: 0, backgroundColor: bgColor1 }} />
					<SafeAreaView style={{ flex: 1, backgroundColor: bgColor1 }}>
						<AuthNavigator />
					</SafeAreaView>
				</Fragment>
			)
		}
	}
}

const mapStateToProps = ({
	login: {
		is_logged_in,
		is_guest,
		selected_interests,
		completed_profile,
	},
	secondarysplash: {
		is_skipped_secondary_splash,
	},
	navigation: {
		is_slpashScreenLocalSkiped,
		openFab,
	},
	runtime_config: {
		runtime_config: {
			screens: {
				Navigation_Bar_10_2,
				Select_Main_Interest_02_8,
				Splash_Screen_01_1,
				Signup_02_1: {
					AskToCompleteProfilrAfterSignup
				}
			},
			colors: {
				bgColor1
			},
		},
	},
}) => ({
	bgColor1,
	is_logged_in,
	is_guest,
	selected_interests,
	Select_Main_Interest_02_8,
	AskToCompleteProfilrAfterSignup,
	completed_profile,
	is_slpashScreenLocalSkiped,
	is_skipped_secondary_splash,
	Navigation_Bar_10_2,
	openFab,
	...Splash_Screen_01_1,
})

function mergeProps(stateProps, { dispatch }, ownProps) {
	const {
		actions: {
			setOpenFab,
		}
	} = require('../redux/NavigationRedux.js');

	return {
		...ownProps,
		...stateProps,
		setOpenFab: (openFab) => setOpenFab(dispatch, openFab),
	};
}

export default connect(mapStateToProps, undefined, mergeProps)(RootNavigation)