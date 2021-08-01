import React, { Component } from 'react'
import { View, ScrollView } from 'react-native'
import CustomHeader from '../../../partial_components/Common/CustomHeader';
import RemoteScalableImage from '../../../partial_components/Common/RemoteScalableImage';
import GridProductsList from '../../../partial_components/Theme26/GridProductsList';
import LazyContainer from '../../../partial_components/Common/LazyContainer';
import FontedText from '../../../partial_components/Common/FontedText';
import { withLocalize } from 'react-localize-redux';
import { hideVirtualizedListWarning } from '../../../utils/Misc';
import ExploreHeader from './ExploreHeader';
import ExploreTopContent from './ExploreTopContent';
import HorizontalProductsList from '../../../partial_components/Theme26/HorizontalProductsList';
import CustomModal from '../../../partial_components/Common/CustomModal';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { screenWidth } from '../../../constants/Metrics';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { shadowStyle0 } from '../../../constants/Style';
import { isValidURL } from '../../../utils/Validation';
import CustomButton from '../../../partial_components/Common/CustomButton';
import ItemSeparator from '../../../partial_components/Common/ItemSeparator';
hideVirtualizedListWarning()

class Explore extends Component {
	state = {
		showModal: false
	}
	renderTopContent = () => {
		return (
			<ExploreTopContent
				HomeProductOffersSize={this.props.HomeProductOffersSize}
				{...this.props} />
		)
	}

	renderPopUps = () => {
		const {
			largePagePadding,
			iconColor1,
			bgColor1,
			Popups = {},
			onPressSliderImage,
			bgColor2
		} = this.props

		let isImage = false

		const target = Popups

		if (target && target.Icon) {
			isImage = true
		}

		const {
			showModal
		} = this.state

		if (!target) {
			return null
		}

		if (isImage) {
			return (
				<CustomModal
					visible={showModal}
					style={{ justifyContent: 'center' }}
					contentContainerStyle={{ backgroundColor: 'none', padding: 0 }}
				>

					<CustomTouchable
						onPress={() => { this.setState({ showModal: false }) }}
						style={{
							top: 10,
							right: 0,
							position: 'absolute',
							zIndex: 1,
							backgroundColor: bgColor1,
							borderRadius: 20,
							width: 40,
							height: 40,
							justifyContent: 'center',
							alignItems: 'center',
							borderColor: bgColor2,
							borderWidth: 1,
							...shadowStyle0
						}}>
						<Ionicons name='ios-close' color={iconColor1} size={30} />
					</CustomTouchable>

					<TouchableWithoutFeedback onPress={() => {
						this.setState({ showModal: false }, () => onPressSliderImage(target))
					}}>

						<RemoteScalableImage
							dimension={720}
							wide={true}
							original={true}
							item={target.Icon}
							uri={target.Icon.ImageUrl}
							width={screenWidth - largePagePadding}
						// style={{ zIndex: 1, }}
						/>

					</TouchableWithoutFeedback>

				</CustomModal>
			)
		} else {
			return (
				<CustomModal
					visible={showModal}
					style={{ justifyContent: 'center' }}
					contentContainerStyle={{ padding: 0 }}
					onClose={() => {
						this.setState({ showModal: false })
					}}
				>

					<CustomTouchable
						onPress={() => { this.setState({ showModal: false }) }}
						style={{
							top: 5,
							right: 10,
							position: 'absolute',
							zIndex: 2,
							backgroundColor: bgColor1,
							borderRadius: 20,
							width: 40,
							height: 40,
							justifyContent: 'center',
							alignItems: 'center',
							borderColor: bgColor2,
							borderWidth: 1,
							...shadowStyle0
						}}>
						<Ionicons name='ios-close' color={iconColor1} size={30} />
					</CustomTouchable>

					{target?.Title && <FontedText style={{ fontSize: 15, alignSelf: 'flex-start', marginLeft: largePagePadding, marginTop: largePagePadding, fontWeight: 'bold' }} >{target.Title}</FontedText>}

					<ItemSeparator style={{ width: '90%', marginTop: largePagePadding }} />

					{target?.Body && <FontedText style={{ marginVertical: largePagePadding, alignSelf: 'flex-start', fontSize: 15, marginLeft: largePagePadding }} >{target.Body}</FontedText>}

					<ItemSeparator style={{ width: '90%', marginBottom: largePagePadding }} />

					<CustomButton title='letsGo' onPress={() => {
						this.setState({ showModal: false }, () => onPressSliderImage(target))
					}} style={{ alignSelf: 'flex-end', right: 10, marginBottom: 10, paddingVertical: 7, ...shadowStyle0 }} />

				</CustomModal>
			)
		}
	}

	componentDidMount() {
		const {
			Popups = {},
		} = this.props

		if (Popups) {
			setTimeout(() => {
				this.setState({ showModal: true })
			}, 2000);
		}
	}

	renderListHeader = () => {
		const {
			largePagePadding,
			pagePadding,
			textColor1,
			YouMayLikeProductsStyle,
			mainColor,
			translate
		} = this.props

		return (
			<View>
				{this.renderTopContent()}
				{YouMayLikeProductsStyle.Value == 2/*horizantial*/ ?
					<View style={{
						flexDirection: 'row',
						justifyContent: 'space-between',

						alignContent: 'center',
						marginTop: largePagePadding,
						marginBottom: pagePadding,
					}}>
						<ExploreHeader
							title={'YouMayLike'}
							color={textColor1}
						/>
						<CustomTouchable
							onPress={() => { this.props.navigation.navigate('Search') }}
							style={{
								justifyContent: 'center',
								alignItems: 'center',
								marginRight: largePagePadding
							}}>
							<FontedText style={{ color: mainColor, fontSize: 16, }}>{translate('SeeAll')}</FontedText>
						</CustomTouchable>
					</View>
					:

					<ExploreHeader
						style={{
							marginTop: largePagePadding,
							marginBottom: pagePadding,
							paddingHorizontal: pagePadding
						}}
						title={'YouMayLike'}
						color={textColor1}
					/>
				}

			</View>
		)
	}

	renderContent = () => {
		const {
			ScrollableProducts,
			ShowYouMayLike,
			largePagePadding,
			pagePadding
		} = this.props

		const showYouMayLike = ShowYouMayLike.Value && ScrollableProducts && ScrollableProducts.Data.length

		if (showYouMayLike) {
			const {

				Images,
				YouMayLikeProductsStyle,
				DefaultProductSize
			} = this.props

			if (YouMayLikeProductsStyle.Value == 2) {
				return (
					<ScrollView
						style={{
							//paddingHorizontal: pagePadding,
							backfaceVisibility: '#F00',
							paddingBottom: pagePadding,
						}}>
						{this.renderListHeader()}
						<HorizontalProductsList
							url={"Products"}
							skip={1}
							refresh={false}
							// specificProductSize={this.props.HomeProductOffersSize}
							contentContainerStyle={{
								paddingBottom: largePagePadding,
							}}
							style={{
								// paddingHorizontal: largePagePadding
							}}
							initialData={ScrollableProducts.Data}
							navigation={this.props.navigation}
						/>
					</ScrollView>
				)

			} else { // Vertical
				return (
					<GridProductsList
						ListHeaderComponent={this.renderListHeader}
						ListHeaderComponentStyle={{
							marginVertical: 0,

							marginHorizontal: -1 * pagePadding,
							paddingHorizontal: 0,
							paddingBottom: pagePadding,
							paddingTop: 0,
						}}

						url={"Products"}
						skip={1}
						refresh={false}
						contentContainerStyle={{
							paddingBottom: largePagePadding,

							marginHorizontal: 0,
							paddingHorizontal: pagePadding,

							marginVertical: 0,
							paddingVertical: 0,
						}}
						initialData={ScrollableProducts.Data}
						navigation={this.props.navigation}
					/>
				)
			}
		}
		else {
			return (
				<ScrollView style={{
				}} >
					<View>
						{this.renderTopContent()}
						{/* this view added to add some padding between the bottom of the content and the navigation abr */}
						<View style={{ height: largePagePadding }}></View>
					</View>
				</ScrollView>
			)
		}
	}

	render() {
		const {
			mainScreen,
			HeaderStyle,
			HomeSliderStyle
		} = this.props

		return (
			<LazyContainer>
				<CustomHeader
					showShadow={HeaderStyle.Value != 'classic' && HomeSliderStyle.Value != 'classic' ? false : true}
					navigation={this.props.navigation}
					mainScreen={mainScreen}
					modernHeader={true}
					title={HeaderStyle.Value == 'classic' ? 'Explore' : "SearchFor"}
					leftComponent="drawer" />

				{this.renderContent()}
				{this.renderPopUps()}
			</LazyContainer>
		)
	}
}

export default withLocalize(Explore)