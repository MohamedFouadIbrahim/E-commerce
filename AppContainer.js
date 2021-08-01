import React, { Component } from 'react'
import { View, Platform } from 'react-native'
import firebase from 'react-native-firebase';
import RootNavigation from './navigation/RootNavigation';
import Offline from './presentational_components/Common/Offline'
import InternalServerError from './presentational_components/Common/ServerRedirects/InternalServerError';
import FloodServerError from './presentational_components/Common/ServerRedirects/FloodServerError';
import NotFoundServerError from './presentational_components/Common/ServerRedirects/NotFoundServerError';
import Hello from './Hello';
import { processPressedNotification } from './utils/Notifications';
import Inspector from './containers/Inspector';
import { withLocalize } from 'react-localize-redux';
import { NavigationContainer } from '@react-navigation/native';
import { getActiveRouteName } from './utils/Navigation';
import { connect } from 'react-redux';
import UpdateModal from './presentational_components/Theme26/UpdateModal';
import RatingModal from './presentational_components/Theme26/RatingModal'
import DeviceInfo from 'react-native-device-info'

class AppContainer extends Component {
	constructor() {
		super()

		this.state = {
			loadedHello: false,
		}

		this.didInitNotifications = false
		this._navigator = React.createRef()
	}

	componentDidUpdate() {
		if (!this.didInitNotifications) {
			if (this._navigator) {
				// Clear badge
				firebase.notifications().setBadge(0);

				// Check permission and listen for notifications
				this.checkFCMPermission()
				this.didInitNotifications = true
			}
		}
	}

	componentWillUnmount() {
		// Remove listeners

		this.notificationOpenedListener && this.notificationOpenedListener();
		this.notificationListener && this.notificationListener();
	}

	checkFCMPermission = () => {
		firebase.messaging().hasPermission()
			.then(enabled => {
				if (enabled) {
					// User has permissions
					this.listenForNotifications()
				}
				else {
					firebase.messaging().requestPermission()
						.then(() => {
							// User has authorised
							this.listenForNotifications()
						})
						.catch(() => {
						});
				}
			});
	}

	createFCMChannelForApp = () => {
		const channel = new firebase.notifications.Android.Channel('roxiit-channel', 'Roxiit Channel', firebase.notifications.Android.Importance.Max).setDescription('Roxiit Application FCM Channel');
		firebase.notifications().android.createChannel(channel);
	}

	listenForNotifications = () => {
		this.createFCMChannelForApp();

		firebase.notifications().getInitialNotification()
			.then((notificationOpen/*: NotificationOpen*/) => {
				if (notificationOpen) {
					// App was opened by a notification
					// Get the action triggered by the notification being opened
					//const action = notificationOpen.action;
					// Get information about the notification that was opened
					const notification/*: Notification*/ = notificationOpen.notification;

					this.onPressNotification(notification)
				}
			});

		this.notificationListener = firebase.notifications().onNotification((notification/*: Notification*/) => {
			// Process your notification as required
			if (Platform.OS === 'android') {
				notification.android.setChannelId('roxiit-channel');
				notification.android.setAutoCancel(true);
			}
			else {
				notification.setNotificationId(new Date().valueOf().toString())
					.setSound("default")
				notification.ios.badge = 1
			}
			firebase.notifications().displayNotification(notification)
		});

		this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen/*: NotificationOpen*/) => {
			// Get the action triggered by the notification being opened
			//const action = notificationOpen.action;
			// Get information about the notification that was opened
			const notification/*: Notification*/ = notificationOpen.notification;

			this.onPressNotification(notification)
		});
	}

	onPressNotification = (notification) => {
		processPressedNotification(notification, this._navigator, true)
	}

	renderContent = () => {
		if (this.state.loadedHello) {
			return (
				<View style={{ flex: 1 }}>
					<RootNavigation />
					<Inspector />
					<InternalServerError />
					<FloodServerError />
					<NotFoundServerError />
					<Offline />
					<UpdateModal />
					<RatingModal />
				</View>
			)
		}
	}
	onFinishHello = () => {
		this.setState({ loadedHello: true })
		const { setShowUpdateModal, setShowRatingModal, is_logged_in, is_guest } = this.props
		const currentBuildVersion = parseFloat(DeviceInfo.getBuildNumber())
		if (global.latestBuildVersion > currentBuildVersion) {
			setShowUpdateModal(true)
		}
		if (is_logged_in || is_guest) {
			setShowRatingModal(true)                   //UNCOMMENT HERE TO ACTVATE RATING POP UP
		}
	}

	render() {
		return (
			<NavigationContainer
				ref={this._navigator}
				onStateChange={state => {
					const currentRouteName = getActiveRouteName(state)

					if (this.previousRouteName !== currentRouteName) {
						const { logNavigation } = this.props
						logNavigation(currentRouteName)
					}

					this.previousRouteName = currentRouteName;
				}}>
				<View style={{ flex: 1 }}>
					<Hello
						onFinish={this.onFinishHello} />

					{this.renderContent()}
				</View>
			</NavigationContainer>
		)
	}
}


const mapStateToProps = ({
	login: {
		is_logged_in,
		is_guest,
	},
}) => ({
	is_logged_in,
	is_guest,
})

function mergeProps(stateProps, { dispatch }, ownProps) {
	const {
		actions: {
			logNavigation,
			setShowUpdateModal,
			setShowRatingModal,
		}
	} = require('./redux/NavigationRedux.js');

	return {
		...ownProps,
		...stateProps,
		logNavigation: (route_name) => logNavigation(dispatch, route_name),
		setShowUpdateModal: (showUpdateModal) => setShowUpdateModal(dispatch, showUpdateModal),
		setShowRatingModal: (showRatingModal) => setShowRatingModal(dispatch, showRatingModal),
	};
}

export default connect(mapStateToProps, undefined, mergeProps)(withLocalize(AppContainer))