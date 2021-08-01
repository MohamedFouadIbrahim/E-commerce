import React from 'react';
import { View } from 'react-native';
import RemoteDataContainer from '../../../partial_components/Common/RemoteDataContainer';
import ItemSeparator from '../../../partial_components/Common/ItemSeparator'
import FontedText from '../../../partial_components/Common/FontedText'
import LazyContainer from '../../../partial_components/Common/LazyContainer'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import CustomSelector from '../../../partial_components/Common/CustomSelector';
import ConfirmModal from '../../../partial_components/Common/ConfirmModal';
import CustomHeader from '../../../partial_components/Common/CustomHeader';
import TouchableIcon from '../../../partial_components/Common/TouchableIcon';
import TranslatedText from '../../../partial_components/Common/TranslatedText';
import CustomTouchable from '../../../partial_components/Common/CustomTouchable';

class AdressIndex extends React.Component {
	constructor(props) {
		super(props)

		this.OptionSelectorRef = React.createRef()
		this.confirmRef = React.createRef()
		this.options = [
			{ Id: 1, Name: 'Delete' },
			{ Id: 2, Name: 'SetDefault' }
		]
	}

	state = {
		triggerRefresh: false
	}

	onLongPressItem = (item) => {
		const { Id } = item
		this.DeleteOrEditId = Id
		this.OptionSelectorRef.current.show()
	}

	onTriggerRefresh = (item) => {
		const callback = this.props.route.params?.onChildChange
		callback && callback(item)

		this.setState({ triggerRefresh: !this.state.triggerRefresh })
	}

	renderItem = ({ item, index }) => {
		const { isDefault, FirstName, SecondName, Id, FullAddress, Country } = item
		const { mainColor, mainColorText } = this.props

		return (
			<CustomTouchable
				onPress={() => {
					this.props.navigation.navigate('Addres', {
						onChildChange: this.onTriggerRefresh,
						AdressID: Id
					})
				}}
				// onLongPress={() => {
				// 	this.onLongPressItem(item)
				// }}
				style={{
					flexDirection: 'row',
					paddingVertical: 20,
					justifyContent: 'space-between',
					flex: 1
				}}>
				<View>
					<MaterialIcons
						name={`gps-fixed`}
						size={25} />
				</View>
				<View style={{ flex: 0.9 }}>

					<FontedText style={{ fontWeight: 'bold' }}>
						{FirstName + ' ' + `, ${Country.Name}`}
					</FontedText>

					<FontedText style={{ alignContent: 'space-between', paddingVertical: 5, lineHeight: 20 }}>{FullAddress}</FontedText>
				</View>
				<View>
					{isDefault === true ?
						<View style={{ backgroundColor: mainColor, borderRadius: 4, marginTop: 5, justifyContent: 'center' }}>
							<TranslatedText style={{ fontSize: 12, color: mainColorText, textAlign: 'center', paddingVertical: 4, paddingHorizontal: 6 }} text="Default" />
						</View> : null
					}
				</View>
				<View>
					<CustomTouchable
						onPress={() => {
							this.onLongPressItem(item)
						}}
						style={{
							alignItems: 'center',
							paddingHorizontal: 5,
							paddingVertical: 0,
						}}>
						<MaterialIcons
							name={`more-vert`}
							size={25} />
					</CustomTouchable>
				</View>
			</CustomTouchable>
		)
	}

	renderEmptyComponent = () => {
		const { mainColor } = this.props

		return (
			<View
				style={{
					flex: 1,
					justifyContent: 'center',
					alignItems: 'center',
					marginTop: 60,
				}}>
				<TranslatedText style={{ fontSize: 18, marginTop: 15, }} text="NoContent" />

				<CustomTouchable
					onPress={() => {
						this.props.navigation.navigate('Addres', {
							onChildChange: this.onTriggerRefresh,
						})
					}}
					style={{
						flexDirection: 'row',
						alignItems: 'center',
					}}>
					<Ionicons name={`ios-add`} size={25} color={mainColor} />
					<TranslatedText style={{ color: mainColor, marginLeft: 5, }} text={'NewAddress'} />
				</CustomTouchable>
			</View>
		)
	}

	render() {
		const {
			iconColor1,
		} = this.props

		return (
			<LazyContainer>
				<CustomHeader
					leftComponent="back"
					navigation={this.props.navigation}
					title='Address'
					rightComponent={
						<TouchableIcon
							onPress={() => {
								this.props.navigation.navigate('Addres', {
									onChildChange: this.onTriggerRefresh,
								})
							}}>
							<Ionicons
								name={`ios-add`}
								size={25}
								color={iconColor1} />
						</TouchableIcon>
					} />

				<RemoteDataContainer
					ListEmptyComponent={this.renderEmptyComponent()}
					pagination={false}
					url={'Address/ListFD'}
					onDataFetched={(data) => {
						this.setState({ data })
					}}
					updatedData={this.state.data}
					keyExtractor={({ Id }) => `${Id}`}
					ItemSeparatorComponent={() => { return <ItemSeparator /> }}
					renderItem={this.renderItem}
					triggerRefresh={this.state.triggerRefresh}
				/>

				<CustomSelector
					ref={this.OptionSelectorRef}
					options={this.options.map(item => item.Name)}
					onSelect={(index) => {
						if (index == 0) {
							this.confirmRef.current.show();
						} else if (index == 1) {
							this.props.onSetDefault(this.DeleteOrEditId, () => { this.onTriggerRefresh() })
						}
					}}
					onDismiss={this.props.onCancelDelete}
				/>

				<ConfirmModal
					ref={this.confirmRef}
					onConfirm={() => {
						this.props.onDelete(this.DeleteOrEditId, () => { this.onTriggerRefresh() })
					}}
					onResponse={(check) => {

					}}
				/>
			</LazyContainer>
		);
	}
}

export default AdressIndex