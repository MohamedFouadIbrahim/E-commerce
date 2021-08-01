import React, { Component } from 'react'
import LazyContainer from '../../../partial_components/Common/LazyContainer';
import { View, ScrollView } from 'react-native'
import CustomHeader from '../../../partial_components/Common/CustomHeader';
import CloseButton from '../../../partial_components/Theme26/CloseButton';
import ArrowItem from '../../../partial_components/Common/ArrowItem';
import TranslatedText from '../../../partial_components/Common/TranslatedText';
import CustomStar from '../../../partial_components/Theme26/CustomStar';
import FontedText from '../../../partial_components/Common/FontedText';
import CustomButton from '../../../partial_components/Common/CustomButton';
import { getFilters } from '../../../services/FilterService';
import { SelectEntity } from '../../../utils/EntitySelector';
import CustomSelector from '../../../partial_components/Common/CustomSelector';
import CustomMultiSlider from '../../../partial_components/Common/CustomMultiSlider';
import SwitchItem from '../../../partial_components/Common/SwitchItem';

export default class SearchFilters extends Component {
	constructor(props) {
		super(props)

		if (this.props.route.params) {
			this.currentFilters = this.props.route.params?.currentFilters
			this.defaultFilters = this.props.route.params?.defaultFilters
			Object.keys(this.currentFilters).forEach((key) => (this.currentFilters[key] == null) && delete this.currentFilters[key])
		}

		this.state = {
			...this.defaultFilters,
			...this.currentFilters,
			didFetchData: false,
		}

		this.gendersSelectorRef = React.createRef()
		this.typesSelectorRef = React.createRef()
		this.storesSelectorRef = React.createRef()
	}

	componentDidMount() {
		this.cancelFetchData = getFilters({
			productTypes: true,
			genders: true,
			subStores: true,
			FilterParams: true,
		}, res => {
			this.setState({
				...res.data,
				didFetchData: true,
			})
		})
	}

	componentWillUnmount() {
		this.cancelFetchData && this.cancelFetchData()
	}

	submit = () => {
		const {
			Category,
			Brand,
			Gender,
			Type,
			SubStore,
			IncludeSearchProducts,
			ETags,
			MinPrice,
			MaxPrice,
			MinRating,
			MaxRating,
		} = this.state

		const response = {
			Category,
			Brand,
			Gender,
			Type,
			SubStore,
			IncludeSearchProducts,
			ETags,
			MinPrice,
			MaxPrice,
			MinRating,
			MaxRating,
		}

		this.props.route.params?.onResponse
			&& this.props.route.params?.onResponse(response)

		this.props.navigation.goBack()
	}

	onPricesChange = (prices) => {
		this.setState({
			MinPrice: prices[0],
			MaxPrice: prices[1],
		})
	}

	renderSliderComponent = () => {
		if (!this.state.didFetchData) {
			return null
		}

		const {
			pagePadding,
			textColor2,
		} = this.props

		const {
			MinPrice,
			MaxPrice,
			FilterParams: {
				filterMaxPrice,
				filterMinPrice,
			}
		} = this.state

		return (
			<View
				style={{
					justifyContent: 'center',
					paddingTop: pagePadding,
				}}>
				<CustomMultiSlider
					values={[
						MinPrice,
						MaxPrice,
					]}
					onValuesChangeFinish={this.onPricesChange}
					min={filterMinPrice}
					max={filterMaxPrice}
					step={10}
					minMarkerOverlapDistance={100}
					allowOverlap={false}
				/>

				<View
					style={{
						flexDirection: 'row',
						justifyContent: 'space-between',
						alignItems: 'center',
					}}>
					<FontedText style={{ fontSize: 14, color: textColor2, }}>{MinPrice}</FontedText>
					<FontedText style={{ fontSize: 14, color: textColor2, }}>{MaxPrice}</FontedText>
				</View>
			</View>
		)
	}

	resetFilters = () => {
		this.setState({
			...this.defaultFilters
		})
	}

	render() {
		const {
			Genders,
			ProductTypes,
			SubStores,
			Category,
			Brand,
			Gender,
			Type,
			SubStore,
			IncludeSearchProducts,
			ETags,
			MaxRating,
		} = this.state

		const {
			mainColor,
			textColor1,
			largePagePadding,
			translate,
		} = this.props

		return (
			<LazyContainer>
				<CustomHeader
					navigation={this.props.navigation}
					hideMiddleComponent={true}
					rightComponent={<CloseButton onPress={this.resetFilters} />}
				/>

				<ScrollView
					contentContainerStyle={{
						padding: largePagePadding,
					}}>
					<ArrowItem
						onPress={() => {
							SelectEntity(this.props.navigation, data => {
								this.setState({ Category: data })
							}, 'Categories/Simple', null, false, 1)
						}}
						title={'Category'}
						info={Category ? Category.Name : translate('NoneSelected')} />

					<ArrowItem
						onPress={() => {
							SelectEntity(this.props.navigation, data => {
								this.setState({ Brand: data })
							}, 'Brands/Simple', null, false, 1)
						}}
						title={'Brand'}
						info={Brand ? Brand.Name : translate('NoneSelected')} />

					<ArrowItem
						onPress={() => {
							SelectEntity(this.props.navigation, data => {
								this.setState({ ETags: data })
							}, 'ETags/Simple', null, false, 2, ETags)
						}}
						title={'ETags'}
						info={ETags ? ETags.length : translate('NoneSelected')} />

					<ArrowItem
						onPress={() => {
							this.typesSelectorRef.current.show();
						}}
						title={"Type"}
						info={Type ? Type.Name : null}
					/>

					<ArrowItem
						onPress={() => {
							this.storesSelectorRef.current.show();
						}}
						title={"SubStore"}
						info={SubStore ? SubStore.Name : null}
					/>

					<ArrowItem
						onPress={() => {
							this.gendersSelectorRef.current.show();
						}}
						title={"Gender"}
						info={Gender ? Gender.Name : null}
					/>

					<SwitchItem
						title="IncludeSearchProducts"
						value={IncludeSearchProducts}
						onValueChange={(value) => {
							this.setState({
								IncludeSearchProducts: value
							})
						}} />

					<View
						style={{
							flexDirection: 'row',
							justifyContent: 'space-between',
							alignItems: 'center',
							paddingVertical: 15,
						}}>
						<TranslatedText style={{}} text={"MaxRating"} />

						<CustomStar
							disabled={false}
							selectedStar={(rating) => {
								this.setState({
									MaxRating: rating
								})
							}}
							rating={MaxRating}
							starSize={30} />
					</View>

					<TranslatedText
						style={{
							color: textColor1,
							fontSize: 34,
							fontWeight: 'bold',
						}}
						text="PriceRange" />

					{this.renderSliderComponent()}

					<CustomButton
						onPress={this.submit}
						style={{
							marginTop: largePagePadding * 2,
						}}
						loading={false}
						title="Apply" />
				</ScrollView>

				{Genders && <CustomSelector
					ref={this.gendersSelectorRef}
					options={Genders.map(item => item.Name)}
					onSelect={(index) => { this.setState({ Gender: Genders[index] }) }}
					onDismiss={() => { }}
				/>}

				{ProductTypes && <CustomSelector
					ref={this.typesSelectorRef}
					options={ProductTypes.map(item => item.Name)}
					onSelect={(index) => { this.setState({ Type: ProductTypes[index] }) }}
					onDismiss={() => { }}
				/>}

				{SubStores && <CustomSelector
					ref={this.storesSelectorRef}
					options={SubStores.map(item => item.Name)}
					onSelect={(index) => { this.setState({ SubStore: SubStores[index] }) }}
					onDismiss={() => { }}
				/>}
			</LazyContainer>
		)
	}
}