import { setActiveLanguage, addTranslationForLanguage } from 'react-localize-redux';
import { Languages } from '../constants/Languages';
import { GET } from '../utils/Network';
import { I18nManager } from 'react-native';
import RNRestart from 'react-native-restart';

const types = {
	RESET_LANGUAGE_TO: 'RESET_LANGUAGE_TO',
	SWITCH_LANGUAGE: 'SWITCH_LANGUAGE',
	STORE_LANGUAGES_DATA: 'STORE_LANGUAGES_DATA',
	STORE_CURRENT_LANGUAGE_TRANSLATION: 'STORE_CURRENT_LANGUAGE_TRANSLATION',
	STORE_CURRENT_LANGUAGE_DIRECTION: 'STORE_CURRENT_LANGUAGE_DIRECTION',
	STORE_TRANSLATIONS_VERSION: 'STORE_TRANSLATIONS_VERSION',
	STORE_LANGUAGES_VERSION: 'STORE_LANGUAGES_VERSION',
	RESET_LANGUAGES_TRANSLATIONS: 'RESET_LANGUAGES_TRANSLATIONS',
	IS_CHANGE_LANGUAGEFROM_SIGNUP: 'IS_CHANGE_LANGUAGEFROM_SIGNUP',
};

export const actions = {
	resetLanguageTo: (dispatch, code, is_rtl) => {
		dispatch({ type: types.SWITCH_LANGUAGE, currLang: code, })
		dispatch({ type: types.STORE_CURRENT_LANGUAGE_DIRECTION, is_rtl })
		dispatch({ type: types.STORE_TRANSLATIONS_VERSION, translations_version: null })
	},
	switchLanguage: (dispatch, language_id, code, is_rtl, update_translations = true, restart = false, callback, changeLanguageAtStart = false) => {
		const changeActiveLanguage = () => {
			dispatch(setActiveLanguage(code));
			dispatch({ type: types.SWITCH_LANGUAGE, currLang: code, changeLanguageAtStart })
			dispatch({ type: types.STORE_CURRENT_LANGUAGE_DIRECTION, is_rtl })

			// set layout directions
			if (is_rtl) {
				I18nManager.forceRTL(true)
				I18nManager.allowRTL(true)
			} else {
				I18nManager.forceRTL(false)
				I18nManager.allowRTL(false)
			}
			if (restart) {
				setTimeout(() => { requestAnimationFrame(() => RNRestart.Restart()) }, 200)
			}
		}

		if (update_translations) {
			GET(`Translations?languageId=${language_id}`, res => {
				const translations_data = res.data

				dispatch({ type: types.STORE_CURRENT_LANGUAGE_TRANSLATION, translation_data: translations_data })
				dispatch(addTranslationForLanguage(translations_data, code))
				changeActiveLanguage()
				callback && callback()
			}, () => {
				changeActiveLanguage()
				callback && callback()
			})
		}
		else {
			changeActiveLanguage()
			callback && callback()
		}
	},
	storeCurrLangTranslation: (dispatch, translation_data) => {
		dispatch({ type: types.STORE_CURRENT_LANGUAGE_TRANSLATION, translation_data })
	},
	storeLanguagesData: (dispatch, languages_data) => {
		dispatch({ type: types.STORE_LANGUAGES_DATA, languages_data })
	},
	storeTranslationsVersion: (dispatch, translations_version) => {
		dispatch({ type: types.STORE_TRANSLATIONS_VERSION, translations_version })
	},
	storeLanguagesVersion: (dispatch, languages_version) => {
		dispatch({ type: types.STORE_LANGUAGES_VERSION, languages_version })
	},
	resetLanguagesTranslations: (dispatch) => {
		dispatch({ type: types.RESET_LANGUAGES_TRANSLATIONS })
	},
	changeLanguageFromSignup: (dispatch, isChangeLanguageFromSignup) => {
		dispatch({ type: types.IS_CHANGE_LANGUAGEFROM_SIGNUP, isChangeLanguageFromSignup })
	}
};

const initialState = {
	currLang: Languages.filter(a => a.isDefault)[0].code,
	is_rtl: Languages.filter(a => a.isDefault)[0].isRTL,
	languages_data: Languages,
	translations_version: null,
	languages_version: null,
	translation_data: Languages.filter(a => a.isDefault)[0].obj,
	changeLanguageAtStart: undefined,
	isChangeLanguageFromSignup: false
}

export const reducer = (state = initialState, action) => {
	const {
		currLang,
		is_rtl,
		translation_data,
		languages_data,
		translations_version,
		languages_version,
		changeLanguageAtStart,
		isChangeLanguageFromSignup
	} = action;

	switch (action.type) {
		case types.SWITCH_LANGUAGE:
			return { ...state, currLang, changeLanguageAtStart };
		case types.STORE_CURRENT_LANGUAGE_TRANSLATION:
			return { ...state, translation_data };
		case types.STORE_CURRENT_LANGUAGE_DIRECTION:
			return { ...state, is_rtl };
		case types.STORE_LANGUAGES_DATA:
			return { ...state, languages_data };
		case types.STORE_TRANSLATIONS_VERSION:
			return { ...state, translations_version };
		case types.IS_CHANGE_LANGUAGEFROM_SIGNUP:
			return { ...state, isChangeLanguageFromSignup };
		case types.STORE_LANGUAGES_VERSION:
			return { ...state, languages_version };
		case types.RESET_LANGUAGES_TRANSLATIONS:
			return {
				...state,
				languages_data: Languages,
				translations_version: null,
				languages_version: null,
				translation_data: en
			};
		default:
			return state
	}
}