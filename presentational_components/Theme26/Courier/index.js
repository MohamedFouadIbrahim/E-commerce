import React from 'react';
import CustomHeader from '../../../partial_components/Common/CustomHeader';
import CustomTouchable from '../../../partial_components/Common/CustomTouchable';
import FontedText from '../../../partial_components/Common/FontedText';
import TranslatedText from '../../../partial_components/Common/TranslatedText';
import ItemSeparator from '../../../partial_components/Common/ItemSeparator';
import { View, I18nManager, BackHandler } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { connect } from 'react-redux';

class Courier extends React.Component {

	constructor(props) {
		super(props)

		this.state = {
			item: null,
			AskForWarehouse: false,
			Warehouses: []
		}

		this.addBackHandlerListener()
	}


	addBackHandlerListener = () => {
		this.BackHandler = BackHandler.addEventListener('hardwareBackPress', () => {
			this.props.navigation.navigate('Cart')
			return false;
		});
	}

	componentWillUnmount() {
		this.BackHandler.remove()
	}
	
	onSelect = (item, Warehouse) => {

		const {
			onChangeShipping,
			isNavigateToNewAddress,
			navigateToAddNewAddress
		} = this.props.route.params


		const {
			SelectCourierBeforeCheckout: { Value }
		} = this.props

		onChangeShipping && onChangeShipping(item, Warehouse)

		if (isNavigateToNewAddress && (!Value || item.IsAddressRequired)) {
			navigateToAddNewAddress && navigateToAddNewAddress()
		} else {
			this.props.navigation.goBack()
		}

	}

	expandList = (item, index) => {

		const {
			ShippingMethods,
		} = this.props.route.params?.data

		const {
			pagePadding,
			bgColor1,
			mainColor
		} = this.props

		const { Name, AskForWarehouse, Warehouses, Id } = item

		return (
			<View key={index} >
				<CustomTouchable
					style={{
						paddingVertical: 10,
						flexDirection: 'row',
						justifyContent: 'space-between',
						paddingHorizontal: pagePadding,
						alignItems: 'center',
						// flex: 1
					}}
					onPress={() => {
						if (AskForWarehouse) {
							this.setState({ item, Warehouses, AskForWarehouse })
						}
						else {
							this.setState({ item: null, Warehouses: [], AskForWarehouse: false }, () => {
								this.onSelect(item)
							})
						}
					}}
				>
					<FontedText style={{ fontSize: 12, }}>{Name}</FontedText>

					<View
						style={{ flexDirection: 'row' }}
					>

						{this.state.item && this.state.item.Id == Id && <MaterialIcons name='done' color={mainColor} size={18} />}

						<Ionicons
							style={{
								marginHorizontal: 10
							}}
							name={I18nManager.isRTL ? 'ios-arrow-back' : 'ios-arrow-forward'}
							size={20}
							color={this.props.textColor2} />
					</View>

				</CustomTouchable>
				{ShippingMethods.length - 1 == index ? null : <ItemSeparator style={{ backgroundColor: bgColor1, marginHorizontal: pagePadding }} />}
			</View>
		)

	}

	renderWareHouseList = () => {

		const { pagePadding, largePagePadding, textColor1, bgColor2, smallBorderRadius } = this.props
		const { Warehouses } = this.state

		if (Warehouses.length == 0) {
			return null
		}

		return (
			< View
				style={{
					marginHorizontal: largePagePadding,
					marginTop: pagePadding
				}
				}>

				<TranslatedText style={{ color: textColor1, fontSize: 24, fontWeight: 'bold', marginBottom: pagePadding, }} text={'ShippingWarehouse'} />
				<View style={{
					backgroundColor: bgColor2,
					borderRadius: smallBorderRadius
				}}>
					{Warehouses.map(this.renderWareHouseItem)}
				</View>
			</View >
		)
	}

	renderWareHouseItem = (item, index) => {
		const { pagePadding, bgColor1 } = this.props
		const { Name } = item
		return (
			<View key={index} >
				<CustomTouchable
					style={{
						paddingVertical: 10,
						flexDirection: 'row',
						justifyContent: 'space-between',
						paddingHorizontal: pagePadding,
						alignItems: 'center',
					}}

					onPress={() => { this.onSelect(this.state.item, item) }}
				>
					<FontedText style={{ fontSize: 12, }}>{Name}</FontedText>

					<Ionicons
						style={{
							marginLeft: 10,
						}}
						name={I18nManager.isRTL ? 'ios-arrow-back' : 'ios-arrow-forward'}
						size={20}
						color={this.props.textColor2} />

				</CustomTouchable>
				{this.state.Warehouses.length - 1 == index ? null : <ItemSeparator style={{ backgroundColor: bgColor1, marginHorizontal: pagePadding }} />}
			</View>
		)
	}

	render() {
		const { data } = this.props.route.params
		const {
			ShippingMethods,
		} = data

		const { Warehouses } = this.state
		const { textColor1, bgColor2, bgColor1, smallBorderRadius, pagePadding, largePagePadding } = this.props

		return (
			<View style={{ flex: 1, backgroundColor: bgColor1 }} >
				<CustomHeader
					navigation={this.props.navigation}
					title="Shipping"
					goTo={'Cart'}
				/>

				<View
					style={{
						marginHorizontal: largePagePadding,
						marginTop: pagePadding
					}}>

					<TranslatedText style={{ color: textColor1, fontSize: 24, fontWeight: 'bold', marginBottom: pagePadding, }} text={'Shipping'} />
					<View style={{
						backgroundColor: bgColor2,
						borderRadius: smallBorderRadius
					}}>
						{ShippingMethods.map(this.expandList)}
					</View>

				</View>

				{this.renderWareHouseList()}
			</View>
		)

	}
}

const mapStateToProps = ({

	runtime_config: {
		runtime_config: {
			screens: {
				Cart_Index_06_1: {
					SelectCourierBeforeCheckout,
				}
			},
		},
	},
}) => ({
	SelectCourierBeforeCheckout
})

export default connect(mapStateToProps)(Courier)
