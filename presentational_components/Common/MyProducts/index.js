import React from 'react';
import { View } from 'react-native';
import LazyContainer from '../../../partial_components/Common/LazyContainer';
import ArrowItem from '../../../partial_components/Common/ArrowItem';
import CustomHeader, { headerHeight, secondHeaderIconSize } from '../../../partial_components/Common/CustomHeader';
import SearchBar from '../../../partial_components/Common/SearchBar';
import ProductItem from './ProductItem';
import ItemSeparator from '../../../partial_components/Common/ItemSeparator';
import RemoteDataContainer from '../../../partial_components/Common/RemoteDataContainer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import CustomButton from '../../../partial_components/Common/CustomButton';
import { shadowStyle3 } from '../../../constants/Style';
import { getFilters } from '../../../services/FilterService';
import { DeleteProduct } from '../../../services/ProductService';
import CustomSelector from '../../../partial_components/Common/CustomSelector';
import CustomSelectorForDeleteAndEdit from '../../../partial_components/Common/CustomSelectorForDeleteAndEdit';
import { LongToast } from '../../../utils/Toast';
import { withLocalize } from 'react-localize-redux';
import TouchableIcon from '../../../partial_components/Common/TouchableIcon';
import { isValidSearchKeyword } from '../../../utils/Validation';

class MyProducts extends React.Component {
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

	onPressItem = (item) => {
		const { Id } = item
		this.props.navigation.navigate('MyProduct', {
			ProductId: Id,
			onChildChange: this.onChildChange
		})
	}

	onLongPressItem = (item) => {
		const { Id } = item
		this.DeleteOrEditId = Id
		this.setState({ showCustomSelectorForDeleteref: true })
	}

	renderItem = ({ item }) => {
		return (
			<ProductItem
				item={item}
				onPress={this.onPressItem}
				onLongPress={this.onLongPressItem}
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

		const { searchingFor, Status, Visibility } = this.state

		if (isValidSearchKeyword(searchingFor)) {
			params += `${this.addParamsSeparator(params)}search=${searchingFor}`
		}

		if (Status) {
			params += `${this.addParamsSeparator(params)}statusId=${Status.Id}`
		}

		if (Visibility) {
			params += `${this.addParamsSeparator(params)}visiblityId=${Visibility.Id}`
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
						this.visibilitySelectorRef.current.show()
					}}
					title={'Type'}
					style={{ paddingHorizontal: largePagePadding }}
					info={Visibility ? Visibility.Name : ''} />

				<ItemSeparator />

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
		const { ProductVisability, ProductStatus } = this.state
		const {
			mainScreen,
			iconColor1
		} = this.props

		return (
			<LazyContainer>
				<CustomHeader
					mainScreen={mainScreen}
					leftComponent={mainScreen ? "drawer" : "back"}
					navigation={this.props.navigation}
					rightNumOfItems={3}
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

							<TouchableIcon
								onPress={() => {
									this.props.navigation.navigate('NewProduct', {
										onChildChange: this.onChildChange
									})
								}}>
								<Ionicons
									name={`ios-add`}
									size={secondHeaderIconSize}
									color={iconColor1} />
							</TouchableIcon>
						</View>
					}
					title="MyProducts" />

				{this.renderSearch()}

				<CustomSelectorForDeleteAndEdit
					showCustomSelectorForDeleteref={this.state.showCustomSelectorForDeleteref}
					justForDelete={true}
					onCancelDelete={() => {
						this.setState({ showCustomSelectorForDeleteref: false })
					}}
					onCancelConfirm={() => {
						this.setState({ showCustomSelectorForDeleteref: false })
					}}
					onDelete={() => {
						this.setState({ Loading: true, showCustomSelectorForDeleteref: false })
						DeleteProduct(this.DeleteOrEditId, (res) => {
							this.setState({
								data: this.state.data.filter(filterItem => filterItem.Id !== this.DeleteOrEditId),
								showCustomSelectorForDeleteref: false,
								Loading: false,
								triggerRefresh: !this.state.triggerRefresh
							})
							LongToast('dataDeleted')
						}, () => {
							this.setState({ Loading: false })
						})
					}}
				/>

				<RemoteDataContainer
					url={"ProductsMng"}
					cacheName={"myproducts"}
					triggerRefresh={this.state.triggerRefresh}
					params={this.getParams()}
					onDataFetched={(data) => {
						this.setState({ data })
					}}
					updatedData={this.state.data}
					keyExtractor={({ Id }) => `${Id}`}


					renderItem={this.renderItem} />

				{this.renderPopup()}

				{ProductVisability && <CustomSelector
					ref={this.visibilitySelectorRef}
					options={ProductVisability.map(item => item.Name)}
					onSelect={(index) => { this.setState({ Visibility: ProductVisability[index] }) }}
					onDismiss={() => { }}
				/>}

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
export default withLocalize(MyProducts)
