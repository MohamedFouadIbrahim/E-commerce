import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../containers/Login';
import Signup from '../containers/Signup';
import Walkthrough from '../containers/Walkthrough';
import SelectBasics from '../containers/SelectBasics';
import SelectInterests from '../containers/SelectInterests';
import PasswordForget from '../containers/PasswordForget';
import PasswordReset from '../containers/PasswordReset';
import PasswordVaildation from '../containers/PasswordVaildation';
import SignupVerify from '../containers/SignupVerify';
import CompleteProfile from '../containers/CompleteProfile';
import TermsOfService from '../containers/TermsOfService';
import EntitySelector from '../containers/EntitySelector';
import SecondarySplash from '../containers/SecondarySplash';

const Registration_Stack_Navigator = createStackNavigator()

const Registration_Stack = () => (
	<Registration_Stack_Navigator.Navigator
		headerMode="none">
		<Registration_Stack_Navigator.Screen name="Login" component={Login} />
		<Registration_Stack_Navigator.Screen name="Signup" component={Signup} />
		<Registration_Stack_Navigator.Screen name="EntitySelector" component={EntitySelector} />
		<Registration_Stack_Navigator.Screen name="PasswordForget" component={PasswordForget} />
		<Registration_Stack_Navigator.Screen name="PasswordReset" component={PasswordReset} />
		<Registration_Stack_Navigator.Screen name="PasswordVaildation" component={PasswordVaildation} />
		<Registration_Stack_Navigator.Screen name="SignupVerify" component={SignupVerify} />
		<Registration_Stack_Navigator.Screen name="TermsOfService" component={TermsOfService} />
	</Registration_Stack_Navigator.Navigator>
)

const Walkthrough_Stack_Navigator = createStackNavigator()

const Walkthrough_Stack = () => (
	<Walkthrough_Stack_Navigator.Navigator
		headerMode="none">
		<Walkthrough_Stack_Navigator.Screen name="Walkthrough" component={Walkthrough} />
	</Walkthrough_Stack_Navigator.Navigator>
)

const SecondarySplash_Stack_Navigator = createStackNavigator()

export const SecondarySplash_Stack = () => (
	<SecondarySplash_Stack_Navigator.Navigator
		headerMode="none">
		<SecondarySplash_Stack_Navigator.Screen name="SecondarySplash" component={SecondarySplash} />
	</SecondarySplash_Stack_Navigator.Navigator>
)

const SelectBasics_Stack_Navigator = createStackNavigator()

const SelectBasics_Stack = () => (
	<SelectBasics_Stack_Navigator.Navigator
		headerMode="none">
		<SelectBasics_Stack_Navigator.Screen name="SelectBasics" component={SelectBasics} />
	</SelectBasics_Stack_Navigator.Navigator>
)

const SelectInterests_Stack_Navigator = createStackNavigator()

export const SelectInterests_Stack = () => (
	<SelectInterests_Stack_Navigator.Navigator
		headerMode="none">
		<SelectInterests_Stack_Navigator.Screen name="SelectInterests" component={SelectInterests} />
	</SelectInterests_Stack_Navigator.Navigator>
)

const CompleteProfile_Stack_Navigator = createStackNavigator()

export const CompleteProfile_Stack = () => (
	<CompleteProfile_Stack_Navigator.Navigator
		headerMode="none">
		<CompleteProfile_Stack_Navigator.Screen name="CompleteProfile" component={CompleteProfile} />
		<CompleteProfile_Stack_Navigator.Screen name="EntitySelector" component={EntitySelector} />
	</CompleteProfile_Stack_Navigator.Navigator>
)

class AuthNavigator extends Component {
	render() {
		const {
			seen_walkthrough,
			selected_country,
			selected_language,
			is_skipped_secondary_splash,
			WalkThrow_01_3,
			Select_Language_Country_01_2,
			SplashScreenVideo,
			ShowVideoOnce,
			is_slpashScreenLocalSkiped
		} = this.props


		if ((SplashScreenVideo.Value != null && SplashScreenVideo.Value != '') && ((ShowVideoOnce.Value == false && is_slpashScreenLocalSkiped == false) ||
			(!is_skipped_secondary_splash && ShowVideoOnce.Value == true))) {
			return <SecondarySplash_Stack />
		}
		else if (Select_Language_Country_01_2.Enable.Value !== false && (!selected_country || !selected_language)) {
			return <SelectBasics_Stack />
		}
		else if (WalkThrow_01_3.Enable.Value !== false && WalkThrow_01_3.Images.Value.Length && !seen_walkthrough) {
			return <Walkthrough_Stack />
		}
		else {
			return (
				<Registration_Stack />
			)
		}
	}
}

const mapStateToProps = ({
	login: {
		is_logged_in,
	},
	walkthrough: {
		seen_walkthrough,
		selected_country,
		selected_language
	},
	secondarysplash: {
		is_skipped_secondary_splash,
	},
	navigation: {
		is_slpashScreenLocalSkiped
	},
	runtime_config: {
		runtime_config: {
			screens: {
				WalkThrow_01_3,
				Select_Language_Country_01_2,
				Splash_Screen_01_1
			}
		},
	},
}) => ({
	is_slpashScreenLocalSkiped,
	is_logged_in,
	seen_walkthrough,
	selected_country,
	selected_language,
	is_skipped_secondary_splash,
	WalkThrow_01_3,
	Select_Language_Country_01_2,
	...Splash_Screen_01_1,
})

export default connect(mapStateToProps)(AuthNavigator)