import { types as InspectorReduxTypes } from '../redux/InspectorRedux.js';
import { unsubscribeFromAllTopics } from "../utils/FCM";
import { POST } from '../utils/Network.js';
import { types as BadgesReduxTypes } from './BadgesRedux.js';
import { types as CacheReduxTypes } from './CacheRedux.js';
import { types as RuntimeConfigReduxTypes } from './RuntimeConfigRedux.js';
import { GoogleSignin } from '@react-native-community/google-signin';
import { LoginManager } from 'react-native-fbsdk';

export const types = {
	IS_LOGGED_IN: 'IS_LOGGED_IN',
	IS_GUEST: 'IS_GUEST',
	DID_NEVER_LOGIN: 'DID_NEVER_LOGIN',
	SET_LOGIN_REQUIRED: 'SET_LOGIN_REQUIRED',
	SET_SIGNUP_REQUIRED: 'SET_SIGNUP_REQUIRED',
	SET_MAIN_TOKEN: 'SET_MAIN_TOKEN',
	SET_USER_ID: 'SET_USER_ID',
	SET_USER_DATA: 'SET_USER_DATA',
	SET_HELLO_DATA: 'SET_HELLO_DATA',
	SET_COUNTRY_ID: 'SET_COUNTRY_ID',
	SET_CITY_ID: 'SET_CITY_ID',
	SET_SELECTED_INTERESTS: 'SET_SELECTED_INTERESTS',
	SET_CURRENCY: 'SET_CURRENCY',
	SET_STORE_TYPE: 'SET_STORE_TYPE',
	SET_ISCOMPLETE_PROFILE: 'SET_ISCOMPLETE_PROFILE',
	SET_USER_NAME: 'SET_USER_NAME',
	SET_SUBSTORE_ID: 'SET_SUBSTORE_ID',
};

function ClearCache(dispatch) {
	dispatch({ type: CacheReduxTypes.CLEAR_ALL_CACHED_DATA })
	dispatch({ type: InspectorReduxTypes.SET_IS_DEVELOPER, is_developer: false })
	dispatch({ type: InspectorReduxTypes.CLEAR_INSPECTOR_LOG })
	dispatch({ type: BadgesReduxTypes.CLEAR_BADGES_DATA })
	dispatch({ type: types.SET_MAIN_TOKEN, main_token: null })
	dispatch({ type: types.SET_USER_ID, userId: null })
	dispatch({ type: types.SET_USER_DATA, user_data: null })
	dispatch({ type: types.SET_HELLO_DATA, hello_data: null })
	dispatch({ type: types.SET_SELECTED_INTERESTS, selected_interests: false })
	dispatch({ type: RuntimeConfigReduxTypes.SET_RUNTIME_CONFIG_VERSION, runtime_config_version: null })
	dispatch({ type: types.SET_CURRENCY, Currency: null })
	dispatch({ type: types.SET_STORE_TYPE, store_type: null })
	dispatch({ type: types.SET_ISCOMPLETE_PROFILE, completed_profile: false })
	dispatch({ type: types.SET_SUBSTORE_ID, subStoreId: null })

}

export const actions = {
	setIsLoggedIn: (dispatch, is_logged_in, do_not_call_api = false) => {
		dispatch({ type: types.IS_LOGGED_IN, is_logged_in })

		if (!is_logged_in) {
			unsubscribeFromAllTopics(() => {
				if (!do_not_call_api) {
					POST('Signout', {}, res => {
						ClearCache(dispatch)
					}, err => {
						ClearCache(dispatch)
					});

					LoginManager.logOut();

					try {
						GoogleSignin.configure()
						GoogleSignin.revokeAccess();
						GoogleSignin.signOut();
					} catch (error) {
						console.error(error);
					}
				}
				else {
					ClearCache(dispatch)
				}
			})
		}
	},
	setIsGuest: (dispatch, is_guest, do_not_call_api = false) => {
		dispatch({ type: types.IS_GUEST, is_guest })

		// The following block has to come after dispatch
		if (!is_guest) {
			unsubscribeFromAllTopics(() => {
				if (!do_not_call_api) {
					POST('Signout', {}, res => {
						ClearCache(dispatch)
					}, err => {
						ClearCache(dispatch)
					});
				}
				else {
					ClearCache(dispatch)
				}
			})
		}
	},
	setDidNeverLogin: (dispatch, did_never_log_in) => {
		dispatch({ type: types.DID_NEVER_LOGIN, did_never_log_in })
	},
	setLoginRequired: (dispatch, required_login) => {
		dispatch({ type: types.SET_LOGIN_REQUIRED, required_login })
	},
	setSignupRequired: (dispatch, required_signup) => {
		dispatch({ type: types.SET_SIGNUP_REQUIRED, required_signup })
	},
	setMainToken: (dispatch, main_token) => {
		dispatch({ type: types.SET_MAIN_TOKEN, main_token })
	},
	setUserID: (dispatch, userId) => {
		dispatch({ type: types.SET_USER_ID, userId })
	},
	setUserData: (dispatch, user_data) => {
		dispatch({ type: types.SET_USER_DATA, user_data })
	},
	setHelloData: (dispatch, hello_data) => {
		dispatch({ type: types.SET_HELLO_DATA, hello_data })
	},
	setCountryId: (dispatch, country_id) => {
		dispatch({ type: types.SET_COUNTRY_ID, country_id })
	},
	setCity: (dispatch, city) => {
		dispatch({ type: types.SET_CITY_ID, city })
	},
	setSelectedInterests: (dispatch, selected_interests) => {
		dispatch({ type: types.SET_SELECTED_INTERESTS, selected_interests })
	},
	setCurrency: (dispatch, Currency) => {
		dispatch({ type: types.SET_CURRENCY, Currency })
	},
	setStoreType: (dispatch, store_type) => {
		dispatch({ type: types.SET_STORE_TYPE, store_type })
	},
	setCompleteProfile: (dispatch, completed_profile) => {
		dispatch({ type: types.SET_ISCOMPLETE_PROFILE, completed_profile })
	},
	setUserName: (dispatch, user_name) => {
		dispatch({ type: types.SET_USER_NAME, user_name })
	},
	setSubStoreId: (dispatch, subStoreId) => {
		dispatch({ type: types.SET_SUBSTORE_ID, subStoreId })
	},
};


const initialState = {
	did_never_log_in: true,
	is_logged_in: false,
	is_guest: false,
	selected_interests: false,
	required_login: false,
	required_signup: false,
	main_token: null,
	userId: null,
	user_data: null,
	country_id: null,
	city: null,
	Currency: { Id: 0, Name: ',,' },
	store_type: null,
	completed_profile: false,
	subStoreId: null,
}

export const reducer = (state = initialState, action) => {
	const {
		is_logged_in,
		is_guest,
		selected_interests,
		main_token,
		did_never_log_in,
		required_login,
		required_signup,
		userId,
		user_data,
		hello_data,
		country_id,
		city,
		store_type,
		Currency,
		completed_profile,
		user_name,
		subStoreId,
	} = action;

	switch (action.type) {
		case types.IS_LOGGED_IN:
			return { ...state, is_logged_in };
		case types.IS_GUEST:
			return {
				...state,
				is_guest,
				guest_token: state.main_token
			};
		case types.DID_NEVER_LOGIN:
			return { ...state, did_never_log_in };
		case types.SET_LOGIN_REQUIRED:
			return { ...state, required_login };
		case types.SET_SIGNUP_REQUIRED:
			return { ...state, required_signup };
		case types.SET_MAIN_TOKEN:
			return { ...state, main_token };
		case types.SET_USER_ID:
			return { ...state, userId };
		case types.SET_USER_DATA:
			return { ...state, user_data };
		case types.SET_HELLO_DATA:
			return { ...state, hello_data };
		case types.SET_COUNTRY_ID:
			return { ...state, country_id };
		case types.SET_CITY_ID:
			return { ...state, city };
		case types.SET_SELECTED_INTERESTS:
			return { ...state, selected_interests };
		case types.SET_CURRENCY:
			return { ...state, Currency };
		case types.SET_STORE_TYPE:
			return { ...state, store_type };
		case types.SET_ISCOMPLETE_PROFILE:
			return { ...state, completed_profile };
		case types.SET_USER_NAME:
			const NewCustomerData = {
				...state.user_data,
				FullName: user_name
			}
			return { ...state, user_data: NewCustomerData };
		case types.SET_SUBSTORE_ID:
			return { ...state, subStoreId }
		default:
			return state
	}
}