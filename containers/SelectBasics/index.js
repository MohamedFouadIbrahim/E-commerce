import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ActivityIndicator } from 'react-native';
import { GetSelectBasics } from '../../services/SelectBasicsService';
import LazyContainer from '../../partial_components/Common/LazyContainer';
import { Languages as ConstantLanguages } from '../../constants/Languages';

class SelectBasics extends Component {
	constructor() {
		super()

		this.state = {
			didDataFetched: false
		}
	}

	componentDidMount() {
		GetSelectBasics(res => {
			const {
				switchLanguage,
				selectLanguage,
				currLang,
				storeCurrLangTranslation,
			} = this.props

			this.setState({
				Countries: res.data.Countires,
				Languages: ConstantLanguages.map(function (elem) {
					return {
						Id: elem.code,
						Name: elem.label,
						isSelected: elem.code === currLang
					}
				}),
				didDataFetched: true
			}, () => {
				selectLanguage(ConstantLanguages.filter(elem => elem.code === currLang)[0].key)
			})
		})
	}

	onPressCountry = (item, index) => {
		const { Countries } = this.state

		this.setState({
			Countries: Countries.map(country => country.Id === item.Id ? { ...country, isSelected: true } : { ...country, isSelected: false })
		})

		this.props.selectCountry(item.Id)
	}

	onPressLanguage = (item, index) => {
		const { Languages } = this.state

		this.setState({
			Languages: Languages.map(language => language.Id === item.Id ? { ...language, isSelected: true } : { ...language, isSelected: false })
		})
		const {
			switchLanguage,
			selectLanguage,
			currLang,
			storeCurrLangTranslation,
		} = this.props

		//curent lng
		let currentLngObj = ConstantLanguages.filter(a => a.code === currLang)[0];
		if (!currentLngObj)
			currentLngObj = ConstantLanguages.filter(a => a.isDefault === true)[0];
		if (!currentLngObj)
			currentLngObj = ConstantLanguages[0];

		//new lng
		let newLngObj = ConstantLanguages.filter(a => a.code === item.Id)[0];
		if (!newLngObj)
			newLngObj = ConstantLanguages.filter(a => a.isDefault === true)[0];
		if (!newLngObj)
			newLngObj = ConstantLanguages[0];

		if (currentLngObj.key != newLngObj.key) {
			selectLanguage(newLngObj.key)
			storeCurrLangTranslation(newLngObj.obj)
			switchLanguage(newLngObj.key, newLngObj.code, newLngObj.isRTL, true, true, null, true)
		}
	}

	render() {
		let PresentationalComponent = require('../../presentational_components/Common/SelectBasics').default

		const { Languages, Countries, didDataFetched } = this.state

		if (!didDataFetched) {
			return (
				<LazyContainer style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }} >
					<ActivityIndicator color={this.props.mainColor} size='large' />
				</LazyContainer>
			)
		}

		return (
			<PresentationalComponent
				onPressCountry={this.onPressCountry}
				onPressLanguage={this.onPressLanguage}
				Languages={Languages}
				Countries={Countries}
				{...this.props} />
		)
	}
}

const mapStateToProps = ({
	language: {

		currLang,
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

function mergeProps(stateProps, { dispatch }, ownProps) {
	const {
		actions: {
			selectCountry,
			selectLanguage,
		}
	} = require('../../redux/WalkthroughRedux.js');

	const {
		actions: {
			switchLanguage,
			storeCurrLangTranslation,
		}
	} = require('../../redux/LangRedux.js');

	return {
		...ownProps,
		...stateProps,
		selectCountry: (selected_country) => selectCountry(dispatch, selected_country),
		storeCurrLangTranslation: (translation_data) => storeCurrLangTranslation(dispatch, translation_data),
		selectLanguage: (selected_language) => selectLanguage(dispatch, selected_language),
		switchLanguage: (language_id, code, is_rtl, update_translations, restart, callback, changeLanguageAtStart) => switchLanguage(dispatch, language_id, code, is_rtl, update_translations, restart, callback, changeLanguageAtStart),
	};
}

export default connect(mapStateToProps, undefined, mergeProps)(SelectBasics)