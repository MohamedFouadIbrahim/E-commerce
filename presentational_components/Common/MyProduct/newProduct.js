import React, { Component } from 'react'
import { KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';
import { connect } from 'react-redux'
import CustomHeader from '../../../partial_components/Common/CustomHeader';
import LazyContainer from '../../../partial_components/Common/LazyContainer'
import RoundedSelector from '../../../partial_components/Common/RoundedSelector';
import RoundedInput from '../../../partial_components/Theme26/RoundedInput';
import Ionicons from 'react-native-vector-icons/Ionicons'
import CircularImage from '../../../partial_components/Common/CircularImage';
// import { showImagePicker } from '../../../utils/Image';
import { withLocalize } from 'react-localize-redux';
import { STRING_LENGTH_MEDIUM } from '../../../constants/Config';
import { SelectMultiLevel } from '../../../utils/EntitySelector.js';
import CustomSelector from '../../../partial_components/Common/CustomSelector';
import { AddProduct } from '../../../services/ProductService';
import CustomLoader from '../../../partial_components/Common/CustomLoader';
import CustomTouchable from '../../../partial_components/Common/CustomTouchable';
import TranslatedText from '../../../partial_components/Common/TranslatedText';
import HeaderSubmitButton from '../../../partial_components/Common/HeaderSubmitButton';
import { LongToast } from '../../../utils/Toast';
import TextEditorInput from '../../../partial_components/Common/TextEditorInput';
import MultiImageUplaoder from '../../../partial_components/Common/CustomMultiImageUploader';
import { Languages as ConstantLanguages } from '../../../constants/Languages';
import { showImagePicker, OpenMultiSelectImagePicker, OpenCamera } from '../../../utils/Image';

class newProduct extends Component {
	constructor(props) {
		super(props)

		const { currLang } = this.props

		this.state = {
			picker_image_uri: null,
			lockSubmit: false,
			didFetchData: true,
			selectedCategories: [],
			Language: ConstantLanguages.find(item => item.code === currLang),
			Images: []
		}

		this.LibraryOrCameraOptions = [{ Id: 0, Name: this.props.translate('Camera') }, { Id: 1, Name: this.props.translate('Library') }]
		this.LibraryOrCameraRef = React.createRef()
		this.deleteImageRef = React.createRef()
		if (this.props.route.params && this.props.route.params?.Id) {
			this.editMode = true
			this.articleId = this.props.route.params?.Id
		}
		else {
			this.editMode = false
		}

		this.lockSubmit = false

		this.typeSelectorRef = React.createRef();
		this.statusSelectorRef = React.createRef();
		this.visibilitySelectorRef = React.createRef();
		this.languageSelectorRef = React.createRef();
		this.SubStoresRef = React.createRef()
		this.didDisplaySelector = false
	}

	displayLanguageSelector = () => {
		if (this.props.showDrawer) {

		} else {
			if (!this.didDisplaySelector) {
				this.didDisplaySelector = true
				this.languageSelectorRef.current.show()
			}
		}
	}

	renderImage = () => {
		const imageSize = 90

		const { picker_image_uri } = this.state
		const { largePagePadding, bgColor2, textColor1 } = this.props

		return (
			<CustomTouchable
				onPress={() => {
					showImagePicker(({ uri }) => {
						this.setState({ picker_image_uri: uri, ImageData: uri })
					})
				}}
				style={{
					alignSelf: 'center',
					justifyContent: 'center',
					alignItems: 'center',
					backgroundColor: bgColor2,
					margin: largePagePadding,
					width: imageSize,
					height: imageSize,
					borderRadius: imageSize / 2,
				}}>
				{picker_image_uri ? <CircularImage
					uri={picker_image_uri}
					size={imageSize} /> : <Ionicons
						name={`ios-add`}
						size={45}
						color={textColor1} />}

				{this.state.uploadingImage ?
					<CustomLoader
						size={imageSize - 30}
						progress={this.state.prossesEvent == 0 ? this.state.prossesEvent : this.state.prossesEvent}
					/>
					: null
				}
			</CustomTouchable>
		)

	}

	AddEditImage = (index, IsEditMode, chosseindex) => {
		const { Images = [] } = this.state
		if (IsEditMode) { // Edit Image Uri

			showImagePicker((Data) => {
				if (Data) {
					const { uri, path } = Data
					const OurImages = Images
					OurImages[index] = {
						...Data,
						Id: index,
						picker_image_uri: uri,
						picker_image_Path: path,
						IsLoading: false,
						prossesEvent: 0
					}

					const newArray = OurImages.map((item, index) => ({ ...item, Id: index }))
					this.setState({ Images: newArray })
					// this.props.onTabDataChange(this.tabIndex, {
					// 	...this.props.data,
					// 	Images: newArray,
					// })
				}
			})
		} else {
			if (chosseindex == 0) {
				OpenCamera(imags => {
					if (imags) {
						const { path } = imags
						const OurImages = Images

						OurImages[index] = {
							...imags,
							Id: index,
							picker_image_uri: path,
							picker_image_Path: path,
							IsLoading: false,
							prossesEvent: 0
						}

						const newArray = OurImages.map((item, index) => ({ ...item, Id: index }))

						this.setState({ Images: newArray })

						// this.props.onTabDataChange(this.tabIndex, {
						// 	...this.props.data,
						// 	Images: newArray,
						// })
					}
				})
			}
			else {
				OpenMultiSelectImagePicker(imags => {
					if (imags && imags.length) {
						const NewImage = imags.map(item => ({
							...item,
							Id: index,
							picker_image_uri: `data:${item.mime};base64,${item.data}`,
							picker_image_Path: item.path,
							IsLoading: false,
							prossesEvent: 0
						}))

						const NewData = [...NewImage, ...Images].map((item, index) => ({ ...item, Id: index }))

						this.setState({ Images: NewData })

						// this.props.onTabDataChange(this.tabIndex, {
						// 	...this.props.data,
						// 	Images: NewData,
						// })
					}
				})
			}
		}
	}
	submit = () => {
		if (this.lockSubmit) {
			return
		}

		const {
			Name,
			ShortDescription,
			Description,
			Price,
			Language,
			selectedCategories,
			ImageData,
			Images
		} = this.state

		if (!Name || !Price || !Language) {
			LongToast('CantHaveEmptyInputs')
			return
		}

		this.setState({
			lockSubmit: true,
			uploadingImage: ImageData ? true : false,
			prossesEvent: 0
		})

		AddProduct({
			Name,
			ShortDescription,
			Description,
			Price,
			selectedCategories: selectedCategories.map(item => item.Id),
			languageId: Language.key,
			Images
		}, res => {
			LongToast('MyProductReviewMessage')

			this.setState({
				lockSubmit: false,
				uploadingImage: false,
				prossesEvent: 0,
				Images: [],
				Name: null,
				ShortDescription: null,
				Description: null,
				Price: null,
				selectedCategories: [],
			})
			if (this.props.showDrawer) {

			} else {
				this.props.route.params?.onChildChange && this.props.route.params?.onChildChange()
				this.props.navigation.replace('MyProduct', {
					ProductId: res.data,
					onChildChange: this.props.route.params?.onChildChange
				})
			}

		}, () => {
			this.setState({
				lockSubmit: false,
				uploadingImage: false,
				prossesEvent: 0
			})

			this.lockSubmit = false
		}, (re) => {
			this.setState({ prossesEvent: re * 0.01 })
		})
	}

	displayLanguageToast = (language) => {
		const { translate } = this.props
		LongToast(`${translate("EditingInLanguage")} ${language.label}`, false)
	}

	renderContent = () => {
		const { textColor1 } = this.props

		if (this.state.didFetchData) {
			const {
				Name,
				ShortDescription,
				Description,
				Language,
				Price,
				selectedCategories,
				lockSubmit,
				prossesEvent,
				Images
			} = this.state

			return (
				<ScrollView
					contentContainerStyle={{
						padding: 20
					}}>

					<RoundedSelector
						// containerStyle={{ marginHorizontal: 25 }}
						onPress={() => {
							this.languageSelectorRef.current.show()
						}}
						title={'Language'}
						value={Language.label} />


					{/* {this.renderImage()} */}

					<MultiImageUplaoder
						IsLoading={lockSubmit}
						prossesEvent={prossesEvent}
						onContentSizeChange={(weight, hieght) => {
							this.setState({
								x: hieght,
								y: weight
							})
						}}
						refrence={(f) => { this.MultiImageUplaoderRef = f }}
						Images={Images}
						onPress={(index, IsEditMode) => {
							this.imagIndex = index;
							this.IsEditMode = IsEditMode;
							if (IsEditMode == true) {

								this.AddEditImage(index, IsEditMode)

							} else {
								this.LibraryOrCameraRef.current.show()
							}
						}}
						onLongPress={(id) => {
							this.DeleteId = id
							this.deleteImageRef.current.show()
						}}
					/>

					<CustomSelector
						ref={this.LibraryOrCameraRef}
						options={this.LibraryOrCameraOptions.map(item => item.Name)}
						onSelect={(chosseindex) => {
							this.AddEditImage(this.imagIndex, this.IsEditMode, chosseindex)
						}}
						onDismiss={() => { }}
					/>

					<CustomSelector
						ref={this.deleteImageRef}
						options={[this.props.translate('Delete')]}
						onSelect={(index) => {
							const { Images = [] } = this.state
							const NewData = Images.filter(item => item.Id != Images[this.DeleteId].Id).map((item, index) => ({ ...item, Id: index }))
							this.setState({ Images: NewData })

							// this.props.onTabDataChange(this.tabIndex, {
							// 	...this.props.data,
							// 	Images: NewData
							// })
						}}
						onDismiss={() => { }}
					/>

					<RoundedInput
						maxLength={STRING_LENGTH_MEDIUM}
						title='Name'
						placeholder='Name'
						value={Name}
						onChangeText={(text) => { this.setState({ Name: text }) }} />


					<RoundedInput
						maxLength={STRING_LENGTH_MEDIUM}
						title="ShortDescription"
						placeholder='ShortDescription'
						value={ShortDescription}
						onChangeText={(text) => { this.setState({ ShortDescription: text }) }} />

					<View
						style={{
							paddingVertical: 15,
							flexDirection: 'row',
							alignItems: 'center',
						}}>
						<View
							style={{
								justifyContent: 'center',
								flex: 2,
							}}>
							<TranslatedText style={{ color: textColor1 }} text={'Description'} />
						</View>

						<View
							style={{
								flex: 5,
								justifyContent: 'center',
								alignItems: 'flex-end',
								paddingLeft: 70,
							}}>
							<TextEditorInput
								navigation={this.props.navigation}
								value={Description || ''}
								onFinishEditing={(text) => { this.setState({ Description: text }) }}
								{...this.props}
							/>
						</View>
					</View>

					<RoundedInput
						title="Price"
						placeholder='Price'
						keyboardType="numeric"
						value={Price}
						onChangeText={(text) => { this.setState({ Price: text }) }} />


					<RoundedSelector
						containerStyle={{ marginTop: 20 }}
						onPress={() => {
							SelectMultiLevel(this.props.navigation, selectedCategories => {
								this.setState({ selectedCategories })
							}, 'ProductsMng/Category', null, 2, selectedCategories, { canSelectParents: true })
						}}
						title={'Category'}
						placeholder='Category'
						value={selectedCategories.length ? `${selectedCategories.length}` : null} />

				</ScrollView>
			)
		}
	}

	render() {
		const { ProductTypes, ProductStatus, ProductVisibility, SubStores } = this.state
		const { showDrawer } = this.props

		return (
			<LazyContainer>
				<CustomHeader
					navigation={this.props.navigation}
					title={"Products"}
					leftComponent={showDrawer ? 'drawer' : 'back'}
					rightComponent={
						<HeaderSubmitButton
							isLoading={this.state.lockSubmit}
							didSucceed={this.state.didSucceed}
							onPress={() => { this.submit() }} />
					} />

				{
					Platform.OS == 'ios' ?

						<KeyboardAvoidingView behavior='padding' enabled
							style={{ flex: 1 }}
							keyboardVerticalOffset={40}
						>
							{this.renderContent()}
						</KeyboardAvoidingView> :

						this.renderContent()

				}

				{ProductTypes && <CustomSelector
					ref={this.typeSelectorRef}
					options={ProductTypes.map(item => item.Name)}
					onSelect={(index) => { this.setState({ Type: ProductTypes[index] }) }}
					onDismiss={() => { }}
				/>}

				{ProductStatus && <CustomSelector
					ref={this.statusSelectorRef}
					options={ProductStatus.map(item => item.Name)}
					onSelect={(index) => { this.setState({ status: ProductStatus[index] }) }}
					onDismiss={() => { }}
				/>}

				{ProductVisibility && <CustomSelector
					ref={this.visibilitySelectorRef}
					options={ProductVisibility.map(item => item.Name)}
					onSelect={(index) => { this.setState({ visibility: ProductVisibility[index] }) }}
					onDismiss={() => { }}
				/>}

				<View
					onLayout={this.displayLanguageSelector}>
					<CustomSelector
						ref={this.languageSelectorRef}
						title="SelectLanguage"
						options={ConstantLanguages.map(item => item.label)}
						onSelect={(index) => {
							this.setState({
								Language: ConstantLanguages[index]
							})

							this.displayLanguageToast(ConstantLanguages[index])
						}}
						onDismiss={() => {
							this.displayLanguageToast(this.state.Language)
						}}
					/>
				</View>

				{SubStores && <CustomSelector
					ref={this.SubStoresRef}
					options={SubStores.map(item => item.Name)}
					onSelect={(index) => { this.setState({ SubStore: SubStores[index] }) }}
					onDismiss={() => { }}
				/>}
			</LazyContainer>
		)
	}
}

const mapStateToProps = ({
	language: {

		currLang
	},
	runtime_config: {
		runtime_config: {
			colors,
			styles,
		},
	},
}) => ({

	currLang,
	...colors,
	...styles,
})


export default connect(mapStateToProps)(withLocalize(newProduct))