import React from 'react';
import { withLocalize } from 'react-localize-redux';
import { View, FlatList } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { shadowStyle3 } from '../../../constants/Style';
import ArrowItem from '../../../partial_components/Common/ArrowItem';
import CustomButton from '../../../partial_components/Common/CustomButton';
import CustomHeader, { headerHeight } from '../../../partial_components/Common/CustomHeader';
import CustomSelector from '../../../partial_components/Common/CustomSelector';
import ItemSeparator from '../../../partial_components/Common/ItemSeparator';
import LazyContainer from '../../../partial_components/Common/LazyContainer';
import RemoteDataContainer from '../../../partial_components/Common/RemoteDataContainer';
import SearchBar from '../../../partial_components/Common/SearchBar';
import TouchableIcon from '../../../partial_components/Common/TouchableIcon';
import { getFilters } from '../../../services/FilterService';
import SalesItem from './SalesItem';
import { isValidSearchKeyword } from '../../../utils/Validation';

class MySells extends React.Component {
	constructor() {
		super()

		this.state = {
			data: null,
			triggerRefresh: false,
			searchBarShown: false,
			searchingFor: "",
			showCustomSelectorForDeleteref: false,
			isPopupVisible: false,
		}

		this.statusSelectorRef = React.createRef();
		this.visibilitySelectorRef = React.createRef();
	}

	componentWillUnmount() {
		this.cancelFetchData && this.cancelFetchData()
	}

	componentDidMount() {
		this.cancelFetchData = getFilters({
			ProductVisability: true,
			productStatus: true
		}, res => {
			const {
				ProductStatus,
				ProductVisability,
			} = res.data

			this.setState({
				ProductStatus,
				ProductVisability,
			})
		})
	}


	renderItem = ({ item }) => {
		return (
			<SalesItem
				item={item}
				style={{
					paddingRight: 5,
				}} />
		)
	}

	addParamsSeparator = (params) => {
		return params.length ? '&' : ''
	}

	getParams = () => {
		let params = ''

		const { searchingFor, Status } = this.state

		if (isValidSearchKeyword(searchingFor)) {
			params += `${this.addParamsSeparator(params)}search=${searchingFor}`
		}

		if (Status) {
			params += `${this.addParamsSeparator(params)}statusId=${Status.Id}`
		}


		return params
	}

	renderSearch = () => {
		return (
			<SearchBar
				visible={this.state.searchBarShown}
				onPressClose={() => { this.setState({ searchBarShown: !this.state.searchBarShown }) }}
				onSubmitEditing={(text) => {
					this.setState({ searchingFor: text })
				}} />
		)
	}

	onChildChange = () => {
		this.setState({ triggerRefresh: !this.state.triggerRefresh })
	}

	hidePopup = () => {
		this.setState({ isPopupVisible: false })
	}

	renderPopup = () => {
		let { pos_y, pos_x, isPopupVisible } = this.state

		if (!isPopupVisible || pos_x === undefined || pos_y === undefined) {
			return null
		}

		// Can cause bugs on iOS?
		pos_x -= 29

		const { largePagePadding, pagePadding, bgColor1 } = this.props
		const { Visibility, Status } = this.state

		return (
			<View
				style={{
					position: 'absolute',
					top: pos_y + headerHeight + 2,
					right: pos_x,
					backgroundColor: bgColor1,
					borderRadius: 15,
					paddingVertical: largePagePadding,
					width: 250,
					...shadowStyle3,
				}}>

				<ArrowItem
					onPress={() => {
						this.statusSelectorRef.current.show()
					}}
					style={{ paddingHorizontal: largePagePadding }}
					title={'Status'}
					info={Status ? Status.Name : ''} />

				<CustomButton
					onPress={() => {
						this.hidePopup()
						this.setState({
							Status: null,
							Visibility: null,
						})
					}}
					style={{
						marginTop: pagePadding + 10,
						marginHorizontal: largePagePadding,
					}}
					title='Clear' />
			</View>
		)
	}

	render() {
		const { ProductStatus } = this.state
		const {
			iconColor1
		} = this.props

		return (
			<LazyContainer>
				<CustomHeader
					leftComponent={null}
					leftComponent={this.props.main ? 'drawer' : 'back'}
					navigation={this.props.navigation}
					rightNumOfItems={2}
					rightComponent={
						<View
							style={{
								flexDirection: 'row',
								alignItems: 'center',
							}}>
							<TouchableIcon
								onPress={() => { this.setState({ searchBarShown: !this.state.searchBarShown }) }}>
								<Ionicons
									name={`ios-search`}
									size={24}
									color={iconColor1} />
							</TouchableIcon>

							<TouchableIcon
								onLayout={({ nativeEvent: { layout: { x, y } } }) => {
									this.setState({ pos_x: x, pos_y: y })
								}}
								onPress={() => { this.setState({ isPopupVisible: !this.state.isPopupVisible }) }}>
								<AntDesign
									name={`filter`}
									size={24}
									color={iconColor1} />
							</TouchableIcon>

						</View>
					}
					title="MySales" />

				{this.renderSearch()}

				<RemoteDataContainer
					url={"Sells"}
					cacheName={"Sells"}
					triggerRefresh={this.state.triggerRefresh}
					params={this.getParams()}
					onDataFetched={(data) => {
						this.setState({ data })
					}}
					updatedData={this.state.data}
					keyExtractor={({ Id }) => `${Id}`}
					ItemSeparatorComponent={() => <ItemSeparator style={{ marginTop: 15 }} />}
					renderItem={this.renderItem} />

				{this.renderPopup()}


				{ProductStatus && <CustomSelector
					ref={this.statusSelectorRef}
					options={ProductStatus.map(item => item.Name)}
					onSelect={(index) => { this.setState({ Status: ProductStatus[index] }) }}
					onDismiss={() => { }}
				/>}
			</LazyContainer>
		)
	}
}
export default withLocalize(MySells)
