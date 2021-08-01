import React, { Component } from 'react'
import LazyContainer from '../../../partial_components/Common/LazyContainer';
import { View, ScrollView } from 'react-native'
import CustomHeader from '../../../partial_components/Common/CustomHeader';
import CustomSelector from '../../../partial_components/Common/CustomSelector';
import CustomButton from '../../../partial_components/Theme7/CustomButton';
import CustomStar from '../../../partial_components/Theme7/CustomStar';
import TranslatedText from '../../../partial_components/Common/TranslatedText';
import SwitchItem from '../../../partial_components/Common/SwitchItem';
import ArrowItem from '../../../partial_components/Common/ArrowItem';
import { SelectEntity } from '../../../utils/EntitySelector';
import { getFilters } from '../../../services/FilterService';
import CustomMultiSlider from '../../../partial_components/Common/CustomMultiSlider';
import FontedText from '../../../partial_components/Common/FontedText';
import ProductOptionsList from '../../../partial_components/Common/ProductOptionsList';

export default class SearchFilters extends Component {
	constructor(props) {
		super(props)

		if (this.props.route.params) {
			this.currentFilters = this.props.route.params?.currentFilters
			Object.keys(this.currentFilters).forEach((key) => (this.currentFilters[key] == null) && delete this.currentFilters[key])
		}

		this.defaultFilters = {
			Category: null,
			Brand: null,
			ETags: [],
			Gender: null,
			Type: null,
			SubStore: null,
			IncludeSearchProducts: false,
			MinPrice: 5,
			MaxPrice: 3000,
			MinRating: 0,
			MaxRating: 5,
			ProductOptions: [],
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
			productOption: this.state.ProductOptions.length ? false : true,
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
			ProductOptions,
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
			ProductOptions,
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
			largePagePadding,
			textColor1,
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
					marginHorizontal={largePagePadding * 2}
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
					<FontedText style={{ fontSize: 14, color: textColor1, }}>{MinPrice}</FontedText>
					<FontedText style={{ fontSize: 14, color: textColor1, }}>{MaxPrice}</FontedText>
				</View>
			</View>
		)
	}

	renderOption = (item, index) => {
		const { Members, Name, Type } = item
		const {
			largePagePadding,
			pagePadding,
			bgColor1,
		} = this.props

		return (
			<View
				key={index}
				style={{
					backgroundColor: bgColor1,
					marginBottom: largePagePadding,
					padding: pagePadding,
				}}>
				<FontedText style={{ fontWeight: 'bold', marginBottom: pagePadding }}>{Name}</FontedText>
				
				<ProductOptionsList
					type={Type.Id}
					selection={2}
					onSelect={(items) => {
						this.setState({
							ProductOptions: this.state.ProductOptions.map(mapItem => ({
								...mapItem,
								Members: item.Id === mapItem.Id ? items : mapItem.Members
							}))
						})
					}}
					data={Members} />
			</View>
		)
	}

	renderOptions = () => {
		const {
			ProductOptions,
		} = this.state

		if (ProductOptions) {
			return (
				<View>
					{ProductOptions.map(this.renderOption)}
				</View>
			)
		}
	}

	resetFilters = () => {
		this.setState({
			...this.defaultFilters
		})

		this.cancelFetchData = getFilters({
			productOption: true,
		}, res => {
			this.setState({
				...res.data,
			})
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
			largePagePadding,
			pagePadding,
			translate,
			textColor1,
			bgColor2,
		} = this.props

		return (
			<LazyContainer>
				<CustomHeader
					navigation={this.props.navigation}
					title={"Filters"}
					leftComponent="back" />
					
				<ScrollView
					contentContainerStyle={{
						padding: largePagePadding,
					}}>
					<View
						style={{
							marginBottom: largePagePadding,
							padding: pagePadding,
						}}>
						<TranslatedText style={{ fontWeight: 'bold' }} text={"PriceRange"} />
						{this.renderSliderComponent()}
					</View>

					<View 
						style={{ 
							marginBottom: largePagePadding, 
							padding: pagePadding, 
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
							<TranslatedText style={{ color: textColor1 }} text={"MaxRating"} />

							<CustomStar
								disabled={false}
								selectedStar={(rating) => {
									this.setState({
										MaxRating: rating
									})
								}}
								rating={MaxRating}
								starSize={25} />
						</View>
					</View>

					{this.renderOptions()}

					<CustomButton
						onPress={this.submit}
						title="Apply" />

					<CustomButton
						style={{
							marginTop: pagePadding,
						}}
						backgroundColor={bgColor2}
						onPress={this.resetFilters}
						title="Reset" />
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