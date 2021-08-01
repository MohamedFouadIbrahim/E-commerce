import { Component } from 'react'
import RNBootSplash from "react-native-bootsplash";
import { getLocales } from "react-native-localize";
import { connect } from 'react-redux'
import { withLocalize } from "react-localize-redux";
import { Languages as ConstantLanguages } from './constants/Languages';
import { GET } from './utils/Network';
import { GetHello } from './services/HelloService';
import { I18nManager } from 'react-native';

const onMissingTranslation = ({ translationId, languageCode }) => {
	// will come here on evey key, inlilizer will be seeded with online version of translations
	// and any missing key from online version will be loaded from local files
	let detectedLng = ConstantLanguages.filter(a => a.code == languageCode)[0];
	if (detectedLng) {
		if (detectedLng.obj[translationId]) {
			return detectedLng.obj[translationId]
		}
	}
	detectedLng = ConstantLanguages.filter(a => a.isDefault)[0];
	if (detectedLng) {
		if (detectedLng.obj[translationId]) {
			return detectedLng.obj[translationId]
		}
	}

	detectedLng = ConstantLanguages[0];
	if (detectedLng) {
		if (detectedLng.obj[translationId]) {
			return detectedLng.obj[translationId]
		}
	}

	return `${translationId},,`
}

class LanguageInitializer extends Component {
	constructor(props) {
		super(props)
		this.initTranslation()
	}

	hideSplash = () => {
		RNBootSplash.hide({ duration: 250 })
	}

	loadDefaultLanguage = () => {
		const code = getLocales()[0].languageTag.slice(0, 2).toLowerCase()

		let detectedLng = ConstantLanguages.filter(a => a.code === code)[0];
		if (!detectedLng) {
			detectedLng = ConstantLanguages.filter(a => a.isDefault === true)[0];
			if (!detectedLng) {
				detectedLng = ConstantLanguages[0];
			}
		}
		this.initLanguage(detectedLng.code, ConstantLanguages, detectedLng.obj, I18nManager.isRTL != detectedLng.isRTL)
	}

	loadLocallyStoredLanguage = () => {
		const {
			currLang,
			translation_data,
		} = this.props;

		this.initLanguage(currLang, ConstantLanguages, translation_data)
	}

	checkLanguageVersion = (tr_version, lng_version) => {
		const {
			translations_version,
			languages_version,
		} = this.props;

		if (tr_version === translations_version && lng_version === languages_version) {
			this.checkLastStoredLanguage()
			this.hideSplash()
		}
		else {
			this.updateLanguages(tr_version, lng_version, tr_version !== translations_version)
		}
	}

	updateLanguages = (tr_version, lng_version, did_translations_change) => {
		const { storeLanguagesData, storeTranslationsVersion, storeLanguagesVersion, currLang } = this.props

		storeLanguagesData(ConstantLanguages)
		storeLanguagesVersion(lng_version)

		let detectedLng = ConstantLanguages.filter(a => a.code === currLang)[0];
		if (!detectedLng) {
			detectedLng = ConstantLanguages.filter(a => a.isDefault === true)[0];
			if (!detectedLng) {
				detectedLng = ConstantLanguages[0];
			}
		}

		if (did_translations_change) {
			GET(`Translations?languageId=${detectedLng.key}`, res => {

				storeTranslationsVersion(tr_version)
				this.initLanguage(detectedLng.code, ConstantLanguages, res.data)
			}, err => {
				this.checkLastStoredLanguage()
				this.hideSplash()
			})
		}
		else {
			this.checkLastStoredLanguage()
			this.hideSplash()
		}
	}

	checkLastStoredLanguage = () => {
		const { did_never_log_in, changeLanguageAtStart } = this.props

		//at very begning changeLanguageAtStart this will be null, but after set language for one time this parameter will be true of false
		if (changeLanguageAtStart === undefined) {
			this.loadDefaultLanguage()
		}
		else {
			this.loadLocallyStoredLanguage()
		}
	}

	initTranslation = () => {
		const { is_logged_in, is_guest, force_logged_in, translation_version, language_version } = this.props

		if (is_logged_in || is_guest || force_logged_in) {
			if (translation_version && language_version) {
				this.checkLanguageVersion(translation_version, language_version)
			}
			else {
				GetHello(res => {
					const { tr, lng } = res.data.vrsn
					this.checkLanguageVersion(tr, lng)
				}, err => {
					this.checkLastStoredLanguage()
					this.hideSplash()
				})
			}
		}
		else {
			this.checkLastStoredLanguage()
			this.hideSplash()
		}
	}

	getLanguageRTLFromCode = (code) => {

		const foundLanguage = ConstantLanguages.find(item => item.code === code)
		return foundLanguage ? foundLanguage.isRTL : false
	}

	getLanguageIdFromCode = (code) => {

		const foundLanguage = ConstantLanguages.find(item => item.code === code)
		return foundLanguage ? foundLanguage.key : 0
	}

	initLanguage = (code, languages, translation, restart = false) => {
		const {
			initialize,
			addTranslationForLanguage,
			storeCurrLangTranslation,
			switchLanguage,
			onLanguageInit,
			OnLanguageIniliyFinish
		} = this.props;

		var lngs = ConstantLanguages.map(function (elem) {
			return {
				code: elem.code,
				name: elem.label,
			}
		})
		initialize({
			languages: lngs,
			options: {
				renderToStaticMarkup: false,
				defaultLanguage: code,
				onMissingTranslation: onMissingTranslation,
			}
		});

		addTranslationForLanguage(translation, code)
		ConstantLanguages.filter(a => a.code !== code).map(a => {
			addTranslationForLanguage(a.obj, a.code)
		})

		storeCurrLangTranslation(translation)
		switchLanguage(this.getLanguageIdFromCode(code), code, this.getLanguageRTLFromCode(code), false, restart, () => {
			onLanguageInit && onLanguageInit()
			OnLanguageIniliyFinish && OnLanguageIniliyFinish()
			this.hideSplash()
		})
	}

	render() {
		return null
	}
}

const mapStateToProps = ({
	login: {
		did_never_log_in,
		is_logged_in,
		is_guest,
	},
	language: {
		currLang,

		translation_data,
		translations_version,
		languages_version,
		changeLanguageAtStart
	},
}) => ({
	currLang,

	translation_data,
	translations_version,
	languages_version,
	did_never_log_in,
	is_logged_in,
	is_guest,
	changeLanguageAtStart
})

function mergeProps(stateProps, { dispatch }, ownProps) {
	const {
		actions: {
			storeLanguagesData,
			switchLanguage,
			storeCurrLangTranslation,
			storeTranslationsVersion,
			storeLanguagesVersion,
		}
	} = require('./redux/LangRedux.js');

	return {
		...ownProps,
		...stateProps,
		storeLanguagesData: (languages_data) => storeLanguagesData(dispatch, languages_data),
		storeCurrLangTranslation: (translation_data) => storeCurrLangTranslation(dispatch, translation_data),
		storeTranslationsVersion: (translations_version) => storeTranslationsVersion(dispatch, translations_version),
		storeLanguagesVersion: (languages_version) => storeLanguagesVersion(dispatch, languages_version),
		switchLanguage: (language_id, code, is_rtl, update_translations, restart, callback) => switchLanguage(dispatch, language_id, code, is_rtl, update_translations, restart, callback),
	};
}

export default connect(mapStateToProps, undefined, mergeProps)(withLocalize(LanguageInitializer))