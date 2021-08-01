import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import CustomHeader, { headerHeight } from '../../../partial_components/Common/CustomHeader';
import LazyContainer from '../../../partial_components/Common/LazyContainer';
import MapView, { Marker } from 'react-native-maps';
import FontedText from '../../../partial_components/Common/FontedText';
import TranslatedText from '../../../partial_components/Common/TranslatedText';
import { shadowStyle4 } from '../../../constants/Style';
import CurrentLocationButton from '../../../partial_components/Common/CurrentLocationButton';
import PriceText from '../../../partial_components/Common/PriceText';
import PriceTextContainer from '../../../partial_components/Common/PriceTextContainer';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Foundation from 'react-native-vector-icons/Foundation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Zocial from 'react-native-vector-icons/Zocial';
import CustomMarker from '../../../partial_components/Common/CustomMarker';

export default class ShippingCostEstimator extends Component {

	renderIcon = () => {
		const { textColor1 } = this.props
		const {
			familyName,
			iconName
		} = this.handelIconNameAndFamily()

		const iconSize = 15
		switch (familyName) {
			case 'Ionicons':
				return <Ionicons
					style={{
						marginRight: 5,
						marginLeft: 2,
					}}
					color={textColor1} size={iconSize} name={iconName} />
			case 'AntDesign':
				return <AntDesign style={{
					marginRight: 5,
					marginLeft: 2,
				}} color={textColor1} size={iconSize} name={iconName} />
			case 'Entypo':
				return <Entypo style={{
					marginRight: 5,
					marginLeft: 2,
				}} color={textColor1} size={iconSize} name={iconName} />
			case 'EvilIcons':
				return <EvilIcons style={{
					marginRight: 5,
					marginLeft: 2,
				}} color={textColor1} size={iconSize} name={iconName} />
			case 'Feather':
				return <Feather style={{
					marginRight: 5,
					marginLeft: 2,
				}} color={textColor1} size={iconSize} name={iconName} />
			case 'FontAwesome':
				return <FontAwesome style={{
					marginRight: 5,
					marginLeft: 2,
				}} color={textColor1} size={iconSize} name={iconName} />
			case 'Foundation':
				return <Foundation style={{
					marginRight: 5,
					marginLeft: 2,
				}} color={textColor1} size={iconSize} name={iconName} />
			case 'MaterialCommunityIcons':
				return <MaterialCommunityIcons color={textColor1} style={{
					marginRight: 5,
					marginLeft: 2,
				}} size={iconSize} name={iconName} />
			case 'MaterialIcons':
				return <MaterialIcons style={{
					marginRight: 5,
					marginLeft: 2,
				}} color={textColor1} size={iconSize} name={iconName} />
			case 'Octicons':
				return <Octicons style={{
					marginRight: 5,
					marginLeft: 2,
				}} color={textColor1} size={iconSize} name={iconName} />
			case 'SimpleLineIcons':
				return <SimpleLineIcons style={{
					marginRight: 5,
					marginLeft: 2,
				}} color={textColor1} size={iconSize} name={iconName} />
			case 'Zocial':
				return <Zocial style={{
					marginRight: 5,
					marginLeft: 2,
				}} color={textColor1} size={iconSize} name={iconName} />

			default:
				return null
		}
	}

	handelIconNameAndFamily = () => {
		const { ShippingEstimatorICon: { Value } } = this.props

		if (Value) {
			const commaIndex = Value.indexOf(',')
			const familyName = Value.substr(0, commaIndex);
			const iconName = Value.substr(commaIndex + 1, Value.length);

			return {
				familyName,
				iconName
			}
		}

	}
	renderMyPositionButton = () => {
		const { largePagePadding, resetUserLocation } = this.props
		return (
			<CurrentLocationButton
				size={35}
				style={{
					position: 'absolute',
					right: largePagePadding,
					top: headerHeight + 15,
					borderRadius: 30,
					paddingHorizontal: 2
				}}
				onPress={resetUserLocation}
			/>
		)
	}
	renderEstimation = () => {
		const {
			CostFrom,
			CostTo,
			ProcessTime,
			ShippingTime,
			didFetchData,
		} = this.props

		if (CostFrom !== null && CostTo !== null && ProcessTime !== null && ShippingTime !== null) {
			const {
				largePagePadding,
				pagePadding,
				borderRadius,
				bgColor1,
				textColor1,
				translate,
				Warehouse,
				Timemin
			} = this.props

			const isCostEqual = CostFrom === CostTo

			return (
				<View
					style={{
						position: 'absolute',
						bottom: largePagePadding,
						alignSelf: 'center',
						backgroundColor: bgColor1,
						padding: pagePadding,
						marginHorizontal: largePagePadding,
						borderRadius,
						...shadowStyle4,
					}}>
					<View
						style={{
							flexDirection: 'row',
							alignItems: 'center',
							marginBottom: 5,
						}}>
						<Feather
							name={'clock'}
							color={textColor1}
							size={15}
							style={{
								marginRight: 5
							}} />

						{/* <FontedText style={{ fontSize: 13, color: textColor1 }}>{translate("ProcessTime")} {ProcessTime} {translate("CountDownMin")}</FontedText> */}
						<FontedText style={{ fontSize: 13, color: textColor1 }}>{translate("Timemin")} {Timemin} {translate("CountDownMin2")}</FontedText>
					</View>

					{/* show only if process time and prepration time has value */}
					{(ProcessTime > 0 && ShippingTime > 0) && <View
						style={{
							flexDirection: 'row',
							alignItems: 'center',
						}}>
						<FontedText style={{ fontSize: 13, color: textColor1 }}>{`(${ProcessTime} ${translate('CountDownMin2')}) ${translate("ProcessTime2")}`}</FontedText>
						<FontedText style={{ fontSize: 13, color: textColor1 }}>{` ${ProcessTime > 0 ? '+' : ''} (${ShippingTime} ${translate('CountDownMin2')}) ${translate("ShippingTime2")} `}</FontedText>
					</View>}

					<View
						style={{
							flexDirection: 'row',
							alignItems: 'center',
							marginTop: 5
						}}>
						<FontAwesome
							name={'money'}
							color={textColor1}
							size={16}
							style={{
								marginRight: 5
							}} />

						<PriceTextContainer>
							<TranslatedText style={{ fontSize: 13, color: textColor1, marginHorizontal: 1, }} text="ShippingCost" />
							<PriceText style={{ fontSize: 13, color: textColor1 }}>{CostFrom}</PriceText>
							{!isCostEqual && <FontedText style={{ fontSize: 13, color: textColor1 }}> ~ </FontedText>}
							{!isCostEqual && <PriceText style={{ fontSize: 13, color: textColor1 }}>{CostTo}</PriceText>}
						</PriceTextContainer>
					</View>

					{Warehouse && <View
						style={{
							flexDirection: 'row',
							alignItems: 'center',
							marginTop: 5,
						}}>

						{this.props.ShippingEstimatorICon.Value ?
							this.renderIcon() :
							<Feather
								name={'truck'}
								color={textColor1}
								size={15}
								style={{
									marginRight: 5,
									marginLeft: 2,
								}} />
						}


						<FontedText style={{ fontSize: 13, color: textColor1 }}>{`${translate("Warehouse")} ${Warehouse.Name}`}</FontedText>
					</View>}

					{/* <TranslatedText style={{ fontSize: 13, color: textColor1, marginTop: pagePadding, }} text="ShippingCostEstimatorTitle" /> */}
				</View >
			)
		}
		else if (didFetchData) {
			const {
				largePagePadding,
				pagePadding,
				borderRadius,
				bgColor1,
				textColor1,
			} = this.props

			return (
				<View
					style={{
						position: 'absolute',
						bottom: largePagePadding,
						alignSelf: 'center',
						backgroundColor: bgColor1,
						padding: pagePadding,
						marginHorizontal: largePagePadding,
						borderRadius,
						...shadowStyle4,
					}}>
					<TranslatedText style={{ fontSize: 13, color: textColor1 }} text="ShippingCostEstimatorFail" />
				</View>
			)
		}
	}

	render() {
		const {
			UserLat,
			UserLng,
			MarkerLat,
			MarkerLng,
			mainColor,
			getMapRef,
			lat,
			lng,
			Warehouse,
			onRegionChangeComplete,
			latitudeDelta,
			longitudeDelta,
			enableButtonState
		} = this.props

		return (
			<LazyContainer>
				<CustomHeader
					navigation={this.props.navigation}
					title={"ShippingCostEstimator"}
					leftComponent="drawer" />

				{UserLat && UserLng && <MapView
					ref={getMapRef}
					style={{
						marginTop: headerHeight,
						...StyleSheet.absoluteFillObject,
					}}

					initialRegion={{
						latitude: UserLat,
						longitude: UserLng,
						latitudeDelta,
						longitudeDelta,
					}}

					onRegionChangeComplete={(e) => {

						if (this.time)
							clearTimeout(this.time)

						this.time = setTimeout(() => {
							onRegionChangeComplete(e)
						}, 1500)
					}}

					region={enableButtonState ? {
						latitude: UserLat,
						longitude: UserLng,
						latitudeDelta,
						longitudeDelta,
					} : undefined}

					showsUserLocation={false}
					followsUserLocation={false}>


					{lat && lng && Warehouse && [<Marker
						key={`Warehouse_1`}
						pinColor={mainColor}
						coordinate={{
							latitude: lat,
							longitude: lng,
						}}
					/>,
					<Marker
						key={`Warehouse_2`}
						pinColor={mainColor}
						coordinate={{
							latitude: lat,
							longitude: lng,
						}}>
						<FontedText style={{ color: 'black', marginBottom: 50, }} >
							{Warehouse.Name}
						</FontedText>
					</Marker>]}
				</MapView>}
				<CustomMarker
					color={mainColor}
					style={{
						position: 'absolute',
						top: '49%',
						left: '47%',
					}}
					size={40}
				/>
				{this.renderMyPositionButton()}
				{this.renderEstimation()}
			</LazyContainer>
		)
	}
}