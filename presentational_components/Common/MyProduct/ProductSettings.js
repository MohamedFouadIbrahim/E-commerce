import React, { Component } from 'react'
import { ScrollView, View, ActivityIndicator, Switch } from 'react-native'
import LazyContainer from '../../../partial_components/Common/LazyContainer'
import ItemSeparator from '../../../partial_components/Common/ItemSeparator';
import { withLocalize } from 'react-localize-redux';
import { screenHeight } from '../../../constants/Metrics.js';
import { GetProductSettings, EditProductSettings } from '../../../services/ProductService.js';
import { EventRegister } from 'react-native-event-listeners'
import ArrowItem from '../../../partial_components/Common/ArrowItem';
import CustomSelector from '../../../partial_components/Common/CustomSelector';
import { getFilters } from '../../../services/FilterService.js';
import { SelectMultiLevel } from '../../../utils/EntitySelector.js';
import { LongToast } from '../../../utils/Toast';

class ProductSettings extends Component {
	constructor(props) {
		super(props)
		this.state = {
			didFetchData: false,
			productSettings: null,
			Categories: null,
			Etags: null,
			selectedBrand: null,
			selectedGender: null,
			selectedCategories: [],
			selectedEtags: [],
		}
		this.availableBrandsRef = React.createRef()
		this.availableGendersRef = React.createRef()

		this.listener = EventRegister.addEventListener('currentPost', (currentPost) => {
			if (currentPost == '2') {
				this.submitSettings()
				EventRegister.emit('submitting', true)
			}
		})
	}

	componentDidMount() {
		this.fetchCatsAndEtags();
	}

	fetchCatsAndEtags = () => {
		this.cancelFetchData = getFilters({
			categories: true,

		}, res => {
			const {
				Categories,

			} = res.data

			this.setState({
				Categories,

			}, this.fetchProductSettings)
		})
	}

	fetchProductSettings = () => {
		this.cancelFetchDataGetProductSettings = GetProductSettings(this.props.ProductId, (res) => {
			this.setState({
				productSettings: res.data,
				selectedBrand: res.data.BrandId ? res.data.availableBrands.filter(item => item.Id == res.data.BrandId)[0] : null,
				selectedGender: res.data.GenderId ? res.data.availableGenders.filter(item => item.Id == res.data.GenderId)[0] : null,
				selectedCategories: res.data.selectedCategories,
				selectedEtags: res.data.selectedEtags.length > 0 ? res.data.selectedEtags.map(item => { return { Id: item, Name: this.state.Etags.filter(tag => tag.Id == item)[0] } }) : [],
				didFetchData: true
			})
		})
	}

	componentWillUnmount() {
		EventRegister.removeEventListener(this.listener)
		this.cancelFetchData && this.cancelFetchData()
		this.cancelFetchDataGetProductSettings && this.cancelFetchDataGetProductSettings()
		this.cancelFetchDataEditProductSettings && this.cancelFetchDataEditProductSettings()
	}

	submitSettings = () => {
		const { selectedCategories, selectedEtags, selectedBrand, selectedGender, productSettings } = this.state
		const { EnableQuestions, EnableReview } = productSettings
		const { ProductId, translate } = this.props

		this.cancelFetchDataEditProductSettings = EditProductSettings({
			Id: ProductId,
			selectedCategories: selectedCategories.map(item => item.Id),
			selectedEtags: selectedEtags.map(item => item.Id),
			BrandId: selectedBrand ? selectedBrand.Id : null,
			GenderId: selectedGender ? selectedGender.Id : null,
			EnableQuestions,
			EnableReview
		}, (res) => {
			LongToast('DataSaved')
			EventRegister.emit('submitting', false)
		}, (err) => {
			EventRegister.emit('submitting', false)
		})
	}

	renderContent = () => {
		const { 
			selectedBrand, 
			selectedGender,
			selectedCategories 
		} = this.state
		
		const { translate } = this.props
		
		if (this.state.didFetchData) {
			return (
				<ScrollView>
					<ArrowItem
						onPress={() => {
							this.availableBrandsRef.current.show()
						}}
						title={'Brand'}
						info={selectedBrand ? selectedBrand.Name : translate('NoneSelected')} />
					<ItemSeparator />

					<ArrowItem
						onPress={() => {
							this.availableGendersRef.current.show()
						}}
						title={'Gender'}
						info={selectedGender ? selectedGender.Name : translate('NoneSelected')} />
					<ItemSeparator />
					
					<ArrowItem
						onPress={() => {
							SelectMultiLevel(this.props.navigation, selectedCategories => {
								this.setState({ selectedCategories })

							}, 'ProductsMng/Category', null, 2, selectedCategories, { canSelectParents: true })
						}}
						title={'Category'}
						info={`(${selectedCategories.length}) ${translate('selected')}`} />
				</ScrollView>
			)
		} 
		else {
			return (
				<View style={{ flex: 1, minHeight: screenHeight / 2, alignItems: 'center', justifyContent: 'center' }}>
					<ActivityIndicator />
				</View>
			)
		}
	}

	render() {
		const { productSettings } = this.state
		return (
			<LazyContainer style={{ paddingHorizontal: this.props.largePagePadding }}>
				{this.renderContent()}

				{productSettings && <CustomSelector
					notRequried={true}
					ref={this.availableBrandsRef}
					options={productSettings.availableBrands.map(item => item.Name)}
					onSelect={(index) => { this.setState({ selectedBrand: productSettings.availableBrands[index] }) }}
					onDismiss={() => { }}
				/>}
				{productSettings && <CustomSelector
					ref={this.availableGendersRef}
					options={productSettings.availableGenders.map(item => item.Name)}
					onSelect={(index) => { this.setState({ selectedGender: productSettings.availableGenders[index] }) }}
					onDismiss={() => { }}
				/>}
			</LazyContainer>
		)
	}
}

export default withLocalize(ProductSettings)