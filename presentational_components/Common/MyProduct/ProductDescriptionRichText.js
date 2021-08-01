import React, { Component } from 'react';
import { View } from 'react-native';
import { RichEditor, RichToolbar } from 'react-native-pell-rich-editor';
import { connect } from 'react-redux';
import CustomHeader from '../../../partial_components/Common/CustomHeader';
import ArrowItem from '../../../partial_components/Common/ArrowItem';
import CustomSelector from '../../../partial_components/Common/CustomSelector';
import HeaderSubmitButton from '../../../partial_components/Common/HeaderSubmitButton';
import LazyContainer from '../../../partial_components/Common/LazyContainer';
import { AddRichTextDescription, GETRichTextDescription } from '../../../services/ProductService';
import { LongToast } from '../../../utils/Toast';
import { Languages as ConstantLanguages } from '../../../constants/Languages';

class TextEditor extends Component {

	constructor(props) {
		super(props)

		this.languageSelectorRef = React.createRef()

		this.state = {
			Languages: ConstantLanguages,
			Language: this.props.route.params?.PassingLanguage,
			didDataFitched: false,
			isLoading: false
		}

		this.isLoading = false
		this.ProductId = this.props.route.params?.ProductId

	}

	componentDidMount() {
		GETRichTextDescription(this.ProductId, this.state.Language.key, res => {
			this.setState({ Description: res.data.Description, didDataFitched: true })
		})

	}

	onChangeLangue = (language) => {

		this.setState({ Language: language })

		GETRichTextDescription(this.ProductId, language.key, res => {

			this.richtext.setContentHTML(res.data.Description)

			this.setState({ Description: res.data.Description })
		})

	}
	render() {
		const { largePagePadding } = this.props
		const { Languages, Language } = this.state;

		if (!this.state.didDataFitched) {
			return null
		}

		return (
			<LazyContainer style={{ flex: 1, backgroundColor: "#FFF", paddingTop: 0 }}>
				<CustomHeader
					navigation={this.props.navigation}
					title={"RichTextEditor"}
					rightComponent={<HeaderSubmitButton
						isLoading={this.state.isLoading}
						onPress={() => {

							if (this.isLoading) {
								return
							}

							this.richtext.getContentHtml().then(content => {

								this.setState({ isLoading: true })
								this.isLoading = true

								AddRichTextDescription({
									Id: this.ProductId,
									Language: this.state.Language.key,
									Description: content
								}, res => {

									this.setState({ isLoading: false })
									this.isLoading = false

									LongToast('DataSaved')
									this.props.navigation.goBack()

								}, err => {

									this.setState({ isLoading: false })
									this.isLoading = false

									if (err.status == 400) {
										LongToast('EnterFirstNameFirst')
										return true

									}
								})
							})
						}} />}

				/>

				<ArrowItem
					style={{ padding: largePagePadding }}
					onPress={() => {
						this.languageSelectorRef.current.show()
					}}
					title={'Language'}
					info={Language ? Language.label : ''} />

				<RichEditor
					style={{
						paddingTop: largePagePadding * 2,
						flex: 1
					}}
					ref={(r) => this.richtext = r}
					hiddenTitle={true}
					initialContentHTML={this.state.Description}
					onFinishEditing={(Description) => { this.setState({ Description }) }}
					editorInitializedCallback={() => {
						// this.richtext.blurContentEditor();
						// onEditorInitialized && onEditorInitialized()
					}}
				/>

				<View
					style={{
						position: 'absolute',
						top: 100,
						width: '100%',

					}}>
					<RichToolbar
						style={{
							backgroundColor: '#eeeeee',
						}}
						getEditor={() => this.richtext}
						selectedIconTint="black"
						selectedButtonStyle={{
							backgroundColor: '#cccccc',
						}}
						unselectedButtonStyle={{
							backgroundColor: '#eeeeee',
						}}
						actions={[
							'bold',
							'italic',
							'underline',
							'unorderedList',
							'orderedList',
							'INST_LINK',
							'SET_TEXT_COLOR',
							'SET_BACKGROUND_COLOR',
							'indent',
							'justifyFull',
							'justifyFull',
							'justifyCenter',
						]}
					/>
				</View>
				{Languages && <CustomSelector
					ref={this.languageSelectorRef}
					options={Languages.map(item => item.label)}
					onSelect={(index) => {
						this.setState({
							Language: Languages[index]
						}, () => {
							this.onChangeLangue(Languages[index])
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
export default connect(mapStateToProps)(TextEditor)