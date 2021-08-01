import React, { Component } from 'react'
import CustomHeader, { headerIconSize } from '../../../partial_components/Common/CustomHeader';
import LazyContainer from '../../../partial_components/Common/LazyContainer'
import RemoteDataContainer from '../../../partial_components/Common/RemoteDataContainer';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import { processPressedNotification } from '../../../utils/Notifications.js';
import NotificationItem from './NotificationItem.js';
import { GET } from "../../../utils/Network"
import TouchableIcon from '../../../partial_components/Common/TouchableIcon';

export default class Notifications extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: [],
			triggerRefresh: false,
		}
	}

	readAllNotifications = () => {
		GET('Notification/ReadAll', res => {
			this.onChildChange()
		}, err => {
		})
	}

	readNotification = (NotificationId) => {
		GET(`Notification/Read?notificationId=${NotificationId}`, res => {
			// alert(JSON.stringify(res))
			var data = this.state.data;
			data.map((notification) => {
				if (notification.NotificationId == NotificationId) {
					notification.ReadDate = this.getCurrentDate()
				}
			})
			this.setState({ data })
		}, err => {
		})
	}
	onChildChange = () => {
		this.setState({ triggerRefresh: !this.state.triggerRefresh })
	}
	getCurrentDate = () => {
		var today = new Date();
		var hr = today.getHours();
		var min = today.getMinutes();
		var sec = today.getSeconds();
		var dd = today.getDate();
		var mm = today.getMonth() + 1; //January is 0!

		var yyyy = today.getFullYear();
		if (dd < 10) {
			dd = '0' + dd;
		}
		if (mm < 10) {
			mm = '0' + mm;
		}
		// 2019-06-20T16:56:19.967
		// 2019-06-20T10:8:52
		var standard = yyyy + '-' + mm + '-' + dd + 'T' + hr + ':' + min + ':' + sec
		return standard
	}

	onPressNotification = (notification) => {
		processPressedNotification(notification, this.props.navigation, false)
	}

	onPressItem = (item) => {
		if (!item.ReadDate) {
			this.readNotification(item.NotificationId)
		}

		this.onPressNotification(item)
	}

	renderItem = ({ item }) => {
		const {
			bgColor2,
		} = this.props

		return (
			<NotificationItem
				item={item}
				onPress={this.onPressItem}
				style={{
					paddingVertical: 10,
					flexDirection: 'row',
					justifyContent: 'space-between',
					backgroundColor: item.ReadDate ? 'transparent' : bgColor2,
				}} />
		)
	}

	render() {
		const {
			iconColor1,
			mainScreen,
		} = this.props

		return (
			<LazyContainer>
				<CustomHeader
					mainScreen={mainScreen}
					title={"Notifications"}
					leftComponent="drawer"
					navigation={this.props.navigation}
					rightComponent={
						<TouchableIcon
							onPress={() => {
								this.props.onReadAllNotification(() => {
									this.onChildChange()
								})
							}}>
							<SimpleLineIcons size={headerIconSize} color={iconColor1} name="eye" />
						</TouchableIcon>
					} />

				<RemoteDataContainer
					url={"Notifications"}
					cacheName={"notifications"}
					initalData={[]}
					triggerRefresh={this.state.triggerRefresh}
					onDataFetched={(data) => {
						this.setState({ data })
					}}

					contentContainerStyle={{
						paddingHorizontal: 0,
						paddingVertical: 0,
					}}

					keyExtractor={({ NotificationId }) => NotificationId.toString()}
					renderItem={this.renderItem} />
			</LazyContainer>
		)
	}
}