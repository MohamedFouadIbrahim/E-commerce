import React from 'react';
import { ActivityIndicator } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import CustomChat from '../../../partial_components/Common/CustomChat';
import CustomHeader from '../../../partial_components/Common/CustomHeader';
import LazyContainer from '../../../partial_components/Common/LazyContainer';

class OrderChat extends React.Component {
	render() {
		return (
			<LazyContainer>
				<CustomHeader
					title='Chat'
					navigation={this.props.navigation}
					rightComponent={
						this.props.uploadingFile ? <ActivityIndicator size='small' color={this.props.textColor1} /> :
							<AntDesign name='addfile' style={{ paddingHorizontal: 5 }} color={this.props.textColor1} onPress={this.props.openPicker} size={18} />
					}
				/>

				<CustomChat
					CDNUrl={this.props.CDNUrl}
					onTextPress={this.props.onTextPress}
					messages={this.props.messages}
					onSendMsg={this.props.onSendMsg}
					reseverId={this.props.customerId}
				/>
			</LazyContainer>
		)
	}
}

export default OrderChat