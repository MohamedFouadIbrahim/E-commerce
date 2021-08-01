import React from 'react';
import { ActivityIndicator } from 'react-native';
import CustomChat from '../../../partial_components/Common/CustomChat';
import CustomHeader from '../../../partial_components/Common/CustomHeader';
import LazyContainer from '../../../partial_components/Common/LazyContainer';
import AntDesign from 'react-native-vector-icons/AntDesign';

export default class OrderList extends React.Component {

	constructor(props) {
		super(props)
	}

	render() {
		return (
			<LazyContainer>
				<CustomHeader
					navigation={this.props.navigation}
					title={'Support'}
					leftComponent='drawer'
					rightComponent={
						this.props.uploadingFile ? <ActivityIndicator size='small' color={this.props.textColor1} /> :
							<AntDesign name='addfile' style={{ paddingHorizontal: 5 }} color={this.props.textColor1} onPress={this.props.openPicker} size={18} />
					}
				/>

				<CustomChat
					CDNUrl={this.props.CDNUrl}
					onTextPress={(data) => { this.props.onTextPress(data) }}
					messages={this.props.messages}
					onSendMsg={(data) => { this.props.onSendMsg(data) }}
					reseverId={this.props.customerId}
				/>

			</LazyContainer>
		)
	}
}
