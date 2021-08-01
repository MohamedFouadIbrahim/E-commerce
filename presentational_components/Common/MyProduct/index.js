import React, { Component } from 'react'
import { View, ActivityIndicator, Text, FlatList, I18nManager } from 'react-native'
import LazyContainer from '../../../partial_components/Common/LazyContainer';
import { screenWidth } from '../../../constants/Metrics';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomHeader from '../../../partial_components/Common/CustomHeader';
import { GetProductHome } from '../../../services/ProductService';
import HeaderSubmitButton from '../../../partial_components/Common/HeaderSubmitButton';
import { EventRegister } from 'react-native-event-listeners'
import ProductDescription from './ProductDescription';
import ProductMedia from './ProductMedia';
import ProductPricing from './ProductPricing';
import ProductHome from './ProductHome';
import ProductSettings from './ProductSettings';
import { withLocalize } from 'react-localize-redux';
import { shadowStyle0 } from '../../../constants/Style';
import TouchableIcon from '../../../partial_components/Common/TouchableIcon';
import CustomTouchable from '../../../partial_components/Common/CustomTouchable';
import StatusHistory from './ProductStatusHistory';
import FontedText from '../../../partial_components/Common/FontedText';

class Product extends Component {
	constructor(props) {
		super(props);
		const { translate } = props
		this.state = {
			product: null,
			fetching: true,
			submitting: false,
			tabPosition: 1,
			selectedTab: '0',
			tabItems: [
				{ Id: '0', Name: translate('Home'), selected: true },
				{ Id: '1', Name: translate('Pricing') },
				{ Id: '2', Name: translate('Settings') }, // the Same But Without Etag And Enable Review Question
				{ Id: '3', Name: translate('Description') },
				{ Id: '6', Name: translate('Media') },
				{ Id: '10', Name: translate('StatusHistory') },
				// { Id: '7', Name: translate('Options') },
			],
			currentTabIndex: 0,
			// TabWidth: 1,
			isAddOptionGroupVisible: false,
			isAddPhotosVisible: false,
		}

		this.listener = EventRegister.addEventListener('submitting', (submitting) => {
			this.setState({ submitting })
		})

		this.AddOptionGroupListener = EventRegister.addEventListener('isAddOptionGroupVisible', (isAddOptionGroupVisible) => {
			this.setState({ isAddOptionGroupVisible })
		})

		this.isAddPhotosVisibleListener = EventRegister.addEventListener('isAddPhotosVisible', (isAddPhotosVisible) => {
			this.setState({ isAddPhotosVisible })
		})
	}

	componentDidMount() {
		this.fetchHomeContent()
		// this.fetchFilters();
	}

	fetchHomeContent = () => {
		var Id = this.props.route.params?.ProductId

		this.cancelFetchDataGetProductHome = GetProductHome(Id, res => {
			// console.log(res.data)
			this.setState({ product: res.data, selectedStatus: res.data.Status, selectedVisibility: res.data.Visibility }, () => {
				this.setState({ fetching: false })
			})
		}, err => {
			//	alert('err')
		})
	}

	// componentWillUnmount() {
	// 	EventRegister.removeEventListener(this.listener)
	// 	EventRegister.removeEventListener(this.AddOptionGroupListener)
	// 	EventRegister.removeEventListener(this.isAddPhotosVisibleListener)
	// 	this.cancelFetchDataGetProductHome && this.cancelFetchDataGetProductHome()
	// 	this.cancelFetchDatagetFilters && this.cancelFetchDatagetFilters()
	// }

	onViewableItemsChanged = ({ viewableItems, changed }) => {
		// if(typeof viewableItems[viewableItems.length].index != 'undefined')
		this.setState({ currentTabIndex: viewableItems[0].index })
	}

	selectTab = (Id) => {
		var tabItems = this.state.tabItems
		tabItems.map((light) => {
			if (light.Id == Id)
				light.selected = true;
			else
				light.selected = false;
		})
		// this.lightsRef.scrollToIndex({index: Id, animated: true});
		this.setState({ tabItems, selectedTab: Id, })
	}

	renderTabContent = () => {
		const { product } = this.state;
		const { navigation, route } = this.props;
		switch (this.state.selectedTab) {
			case '0':
				return <ProductHome product={product} navigation={navigation} ProductId={route.params?.ProductId} {...this.props} />
			case '1':
				return <ProductPricing product={product} navigation={navigation} ProductId={route.params?.ProductId} {...this.props} />
			case '2':
				return <ProductSettings navigation={navigation} ProductId={route.params?.ProductId} {...this.props} />
			case '3':
				return <ProductDescription navigation={navigation} ProductId={route.params?.ProductId} {...this.props} />
			case '6':
				return <ProductMedia navigation={navigation} ProductId={route.params?.ProductId} {...this.props} />
			case '10':
				return <StatusHistory navigation={navigation} ProductId={route.params?.ProductId} {...this.props} />
			default:
				return null
		}
	}

	submit = () => {
		EventRegister.emit('currentPost', String(this.state.selectedTab))
	}


	handleScroll = (event) => {
		if (this.state.tabPosition == 0 && event.nativeEvent.contentOffset.y >= 100) {
			this.setState({ tabPosition: 1 }, () => {
				// this.refs.tabContent.scrollTo({x: 0, y: 1, animated: false})
				setTimeout(() => this.refs.tabContent.scrollTo({ x: 0, y: 1, animated: false }), 100)
			})
		}
		if (this.state.tabPosition == 1 && event.nativeEvent.contentOffset.y === 0.0) {
			this.setState({ tabPosition: 0 })
		}
		// else {
		// 	this.setState({ tabPosition: 0 })
		// }
	}

	render() {
		const { product } = this.state
		const { mainColor, bgColor1 } = this.props

		if (product == null) {
			return (
				<View style={{
					backgroundColor: bgColor1,
					justifyContent: 'center',
					flex: 1,
					alignItems: 'center',
				}}>
					<ActivityIndicator size="large" color={mainColor} />
				</View>
			)
		}
		else {
			const { iconColor1 } = this.props

			return (
				<LazyContainer>
					<CustomHeader
						navigation={this.props.navigation}
						rightNumOfItems={1}
						rightComponent={
							<View style={{ flexDirection: 'row', alignItems: 'center', }}>
								{
									this.state.selectedTab == '6' ?
										<>
											{
												this.state.isAddOptionGroupVisible ?
													this.state.isAddPhotosVisible ?
														this.state.submitting ?
															<TouchableIcon
																onPress={() => {
																	EventRegister.emit('uploadOptionImage', true)
																}} >
																<Ionicons name='ios-add-circle-outline' size={18} color={iconColor1} />
															</TouchableIcon> :
															<TouchableIcon
																onPress={() => {
																	EventRegister.emit('uploadOptionImage', true)
																}} >
																<Ionicons name='ios-add-circle-outline' size={18} color={iconColor1} />
															</TouchableIcon>
														: null
													:
													this.state.submitting && this.state.selectedTab != '6' ? <ActivityIndicator /> :
														<TouchableIcon
															onPress={() => {
																if (this.state.selectedTab == '6') {
																	EventRegister.emit('uploadMedia', true)
																} else {
																	if (this.state.isAddPhotosVisible) {
																		EventRegister.emit('uploadOptionImage', true)
																	} else {
																		this.setState({ isAddOptionGroupVisible: true }, () => {
																			EventRegister.emit('isAddOptionGroupVisible', true)
																		})
																	}
																}
															}} >
															<Ionicons name='ios-add-circle-outline' size={18} color={iconColor1} />
														</TouchableIcon>
											}
											{
												this.state.isAddOptionGroupVisible && this.state.isAddPhotosVisible == false ?
													<HeaderSubmitButton
														style={{ flex: 1 }}
														isLoading={this.state.submitting}
														onPress={this.submit} /> : null
											}
										</>
										:
										// hide save button on some tabs
										this.state.selectedTab == '0' || this.state.selectedTab == '6' || this.state.selectedTab == '10' ?

											null
											:
											<HeaderSubmitButton
												isLoading={this.state.submitting}
												onPress={this.submit} />
								}
							</View>
						}
						title="Products" />

					<View style={{
						width: screenWidth,
						height: 51,
						marginTop: 2,
						backgroundColor: this.props.bgColor1,
						flexDirection: "row",
						zIndex: 4,
						...shadowStyle0
					}}>
						<View style={{ flex: this.state.currentTabIndex > 0 ? 0.1 : 0, justifyContent: "center", alignItems: "center", height: 50 }}>
							{
								this.state.currentTabIndex > 0 ?
									<CustomTouchable
										style={{ width: "100%", height: "100%", justifyContent: "center", alignItems: "center" }}
										onPress={() => {
											this.setState({
												currentTabIndex: this.state.currentTabIndex - 1
											}, () => {
												this.lightsRef.scrollToIndex({ index: this.state.currentTabIndex, animated: true });
											})
										}}>
										<Ionicons name={I18nManager.isRTL ? 'ios-arrow-forward' : "ios-arrow-back"} size={18} color={this.props.mainColorText} />
									</CustomTouchable>
									: null
							}
						</View>
						<View style={{ flex: 1, width: screenWidth, height: 50, }}>
							<FlatList
								style={{ flex: 1, }}
								ref={(ref) => { this.lightsRef = ref; }}
								data={this.state.tabItems}
								extraData={this.state}
								keyExtractor={(item) => item.Id}
								showsHorizontalScrollIndicator={false}
								initialScrollIndex={0}
								onViewableItemsChanged={this.onViewableItemsChanged}
								viewabilityConfig={{
									itemVisiblePercentThreshold: 10
								}}
								horizontal
								renderItem={({ item }) => (
									<CustomTouchable onPress={() => this.selectTab(item.Id)} style={{ width: screenWidth / 4, justifyContent: "center", alignItems: "center", flex: 1 }}>
										<FontedText style={{ fontSize: 16, fontWeight: item.selected ? "bold" : "normal", opacity: item.selected ? 1 : .7 }}>{item.Name}</FontedText>
									</CustomTouchable>
								)}
							/>
						</View>
						<View style={{ flex: 0.1, justifyContent: "center", alignItems: "center", height: 50 }}>
							{
								this.state.currentTabIndex < this.state.tabItems.length - 3 ?
									<CustomTouchable style={{ width: "100%", height: "100%", justifyContent: "center", alignItems: "center" }} onPress={() => {
										this.setState({ currentTabIndex: this.state.currentTabIndex + 1 }, () => {
											this.lightsRef.scrollToIndex({ index: this.state.currentTabIndex, animated: true });
										})
									}}>
										<Ionicons name={I18nManager.isRTL ? 'ios-arrow-back' : "ios-arrow-forward"} size={18} color={this.props.mainColorText} />
									</CustomTouchable>
									: null
							}
						</View>
					</View>
					<View style={{ flex: 1, }} >
						<View style={{ width: screenWidth, flex: 1 }}>
							{this.renderTabContent()}
						</View>
					</View>
				</LazyContainer>
			)
		}
	}
}
export default withLocalize(Product)
