import React, { Component } from 'react';
import { withLocalize } from 'react-localize-redux';
import { KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';
import { EventRegister } from 'react-native-event-listeners';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { connect } from 'react-redux';
import { screenHeight } from '../../../constants/Metrics';
import ArrowItem from '../../../partial_components/Common/ArrowItem';
import CustomSelector from '../../../partial_components/Common/CustomSelector';
import HorizontalInput from '../../../partial_components/Common/HorizontalInput';
import RoundedSelector from '../../../partial_components/Common/RoundedSelector';
import RoundedInput from '../../../partial_components/Theme26/RoundedInput';
import ItemSeparator from '../../../partial_components/Common/ItemSeparator';
import LazyContainer from '../../../partial_components/Common/LazyContainer';
import TranslatedText from '../../../partial_components/Common/TranslatedText';
import { getFilters } from '../../../services/FilterService';
import { EditProductDescription, GetProductDescription } from '../../../services/ProductService.js';
import { LongToast } from '../../../utils/Toast';
import { Languages as ConstantLanguages } from '../../../constants/Languages';

class ProductDescription extends Component {
	constructor(props) {
		super(props)
		const { currLang } = props
		this.state = {
			didFetchData: false,
			Language: ConstantLanguages.find(item => item.code === currLang),
		}

		this.languageSelectorRef = React.createRef();

		this.listener = EventRegister.addEventListener('currentPost', (currentPost) => {
			if (currentPost == '3') {
				this.submitDesc()
			}
		})
	}

	componentDidMount() {

		this.fetchFilters()
	}

	fetchFilters = () => {
		this.cancelFetchDatagetFilters = getFilters({ languages: true }, res => {
			this.setState({ Languages: res.data.Languages }, this.fetchContent)
		})
	}

	fetchContent = (languageId = this.state.Language.key) => {
		this.setState({ didFetchData: false })
		this.cancelFetchDataGetProductDescription = GetProductDescription(this.props.ProductId, languageId, res => {
			this.setState({
				...res.data,
				Language: {
					key: res.data.Language.Id, label: res.data.Language.Name
				},
				didFetchData: true,
			})
		})
	}

	componentWillUnmount() {
		EventRegister.removeEventListener(this.listener)
		this.cancelFetchData && this.cancelFetchData()
		this.cancelFetchDataGetProductDescription && this.cancelFetchDataGetProductDescription()
		this.cancelFetchDataEditProductDescription && this.cancelFetchDataEditProductDescription()
		this.cancelFetchDatagetFilters && this.cancelFetchDatagetFilters()
	}

	submitDesc = () => {
		const { Name, ShortDescription, Description, Language } = this.state
		const { ProductId } = this.props
		EventRegister.emit('submitting', true)

		if (!Name) {
			EventRegister.emit('submitting', false)
			return LongToast('CantHaveEmptyInputs')
		} else {
			this.cancelFetchDataEditProductDescription = EditProductDescription({
				Id: ProductId,
				Language: Language.key,
				Name,
				ShortDescription,
				HtmlDescription: "",
				SigninHtmlDescription: ""
			}, res => {
				LongToast('DataSaved')
				EventRegister.emit('submitting', false)
			}, err => {
				EventRegister.emit('submitting', false)
			})
		}
	}

	renderContent = () => {

		if (this.state.didFetchData) {
			const { Languages, Language } = this.state;
			const {
				mainColor,
				textColor1,
				textColor2,
				secondTextColor,
				pagePadding
			} = this.props;

			return (
				<ScrollView
					contentContainerStyle={Platform.OS == 'ios' ? { height: screenHeight, paddingHorizontal: 20 } : { paddingHorizontal: 20 }}>
					<RoundedSelector
						onPress={() => {
							this.languageSelectorRef.current.show()
						}}
						containerStyle={{ marginTop: 20 }}
						title={'Language'}
						value={Language ? Language.label : ''} />

					<RoundedInput
						// maxLength={STRING_LENGTH_MEDIUM}
						title='Name'
						placeholder='Name'
						value={this.state.Name}
						onChangeText={(text) => { this.setState({ Name: text }) }} />


					<RoundedInput
						// maxLength={STRING_LENGTH_MEDIUM}
						title='ShortDescription'
						placeholder='ShortDescription'
						value={this.state.ShortDescription}
						onChangeText={(text) => { this.setState({ ShortDescription: text }) }} />


					{this.state.Name != null && this.state.Name != undefined && this.state.Name != '' && <View style={{
						paddingVertical: 15,
						paddingHorizontal: 20,
						// height: 200
					}} >
						<TranslatedText style={{
							color: secondTextColor
						}} text={'Description'} />

						<CustomTouchable
							onPress={() => {
								this.props.navigation.navigate('ProductDescriptionRichText', { ProductId: this.props.ProductId, PassingLanguage: this.state.Language })
							}}
							style={{
								flexDirection: 'row',
								alignItems: 'center',
								backgroundColor: 'white',
								paddingVertical: 15,
								paddingHorizontal: 20,
							}}>
							<AntDesign
								name={'edit'}
								size={26}
								color={'black'}
								style={{ marginRight: pagePadding, }} />

							<TranslatedText style={{ color: 'black' }} text='EditContentInEditor' />
						</CustomTouchable>

					</View>}


					{/* <HorizontalInput
						label="Sigin Description"
						value={this.state.SigninHtmlDescription}
						onChangeText={(text) => { this.setState({ SiginDescription: text }) }} /> */}
				</ScrollView>
			)
		}
	}

	render() {
		const { Languages } = this.state;

		return (
			<LazyContainer>
				{
					Platform.OS == 'ios' ?

						<KeyboardAvoidingView behavior='padding' enabled
							style={{ flex: 1 }}
							shouldRasterizeIOS
							keyboardVerticalOffset={150}
						>
							{this.renderContent()}
						</KeyboardAvoidingView> :

						this.renderContent()

				}
				{/* {this.renderContent()} */}

				{
					Languages && <CustomSelector
						ref={this.languageSelectorRef}
						options={Languages.map(item => item.Name)}
						onSelect={(index) => {
							this.setState({
								Language: Languages[index]
							}, () => {
								this.fetchContent(Languages[index].Id)
							})
						}}
						onDismiss={() => { }}
					/>
				}
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
			// colors,
			styles,
		},
	},
}) => ({
	currLang,
	...styles
})

export default connect(mapStateToProps)(withLocalize(ProductDescription))