import React from 'react';
import LazyContainer from '../../../partial_components/Common/LazyContainer';
import TouchableIcon from '../../../partial_components/Common/TouchableIcon';
import Ionicons from 'react-native-vector-icons/Ionicons';
import RemoteDataContainer from '../../../partial_components/Common/RemoteDataContainer';
import OrderListItem from './OrderListItem';
import ItemSeparator from '../../../partial_components/Common/ItemSeparator';
import CustomHeader, { secondHeaderIconSize } from '../../../partial_components/Common/CustomHeader';

export default class OrderList extends React.Component {

	constructor(props) {

		super(props)

	}

	onChildChange = () => {
		this.props.onChildChange()
	}

	onPressItem = (item) => {
		this.props.onPressItem(item)
	}

	renderItem = ({ item, index }) => {
		return (
			<OrderListItem
				{...this.props}
				onOrderPress={() => { this.onPressItem(item) }}
				Item={item}
			/>
		)
	}

	render() {
		const { iconColor1 } = this.props
		return (
			<LazyContainer  >

				<CustomHeader
					navigation={this.props.navigation}
					title={'Inbox'}
					leftComponent={"drawer"}
					rightComponent={
						<TouchableIcon
							onPress={() => {
								this.props.navigation.navigate('Orders_Alt')
							}}>
							<Ionicons
								name={`ios-add`}
								size={secondHeaderIconSize}
								color={iconColor1} />
						</TouchableIcon>
					}
				/>

				<RemoteDataContainer
					onDataFetched={(data) => {
						this.setState({ data })
					}}
					updatedData={this.state.data}
					triggerRefresh={this.props.triggerRefresh}
					ItemSeparatorComponent={() => <ItemSeparator />}
					url={"Orders/Inbox"}
					pagination={false}
					keyExtractor={({ Order: { Id } }) => `${Id}`}
					renderItem={this.renderItem}
				/>

			</LazyContainer>
		)
	}
}
