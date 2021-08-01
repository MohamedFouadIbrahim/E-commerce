export const types = {
	LOG_NAVIGATION: 'LOG_NAVIGATION',
	SKIP_SPLASHSCREEN: 'SKIP_SPLASHSCREEN',
	SET_IS_HELLO_LOADED: 'SET_IS_HELLO_LOADED',
	SET_SHOW_UPDATE_MODAL: 'SET_SHOW_UPDATE_MODAL',
	SET_SHOW_RATING_MODAL: 'SET_SHOW_RATING_MODAL',
	SET_OPEN_FAB: 'SET_OPEN_FAB',
}

export const actions = {
	logNavigation: (dispatch, route_name) => {
		dispatch({ type: types.LOG_NAVIGATION, route_name })
	},
	skipSplashScreenLocal: (dispatch, is_slpashScreenLocalSkiped) => {
		dispatch({ type: types.SKIP_SPLASHSCREEN, is_slpashScreenLocalSkiped })
	},
	setIsHelloLoaded: (dispatch, isHelloLoaded) => {
		dispatch({ type: types.SET_IS_HELLO_LOADED, isHelloLoaded })
	},
	setShowUpdateModal: (dispatch, showUpdateModal) => {
		dispatch({ type: types.SET_SHOW_UPDATE_MODAL, showUpdateModal })
	},
	setShowRatingModal: (dispatch, showRatingModal) => {
		dispatch({ type: types.SET_SHOW_RATING_MODAL, showRatingModal })
	},
	setOpenFab: (dispatch, openFab) => {
		dispatch({ type: types.SET_OPEN_FAB, openFab })
	}
};

const initialState = {
	navigation_logs: [],
	is_slpashScreenLocalSkiped: false,
	isHelloLoaded: false,
	showUpdateModal: false,
	showRatingModal: false,
	openFab: false,
}

export const reducer = (state = initialState, action) => {
	const {
		route_name,
		is_slpashScreenLocalSkiped,
		isHelloLoaded,
		showUpdateModal,
		showRatingModal,
		openFab,
	} = action;

	switch (action.type) {
		case types.LOG_NAVIGATION:
			let updated_logs = state.navigation_logs

			updated_logs.unshift({
				key: `${updated_logs.length}`,
				route: route_name,
				date: new Date().toISOString(),
			})

			if (updated_logs.length > 10) {
				updated_logs.pop()
			}

			return { ...state, navigation_logs: updated_logs };
		case types.SKIP_SPLASHSCREEN:
			return { ...state, is_slpashScreenLocalSkiped };
		case types.SET_IS_HELLO_LOADED:
			return { ...state, isHelloLoaded };
		case types.SET_SHOW_UPDATE_MODAL:
			return { ...state, showUpdateModal };
		case types.SET_SHOW_RATING_MODAL:
			return { ...state, showRatingModal };
		case types.SET_OPEN_FAB:
			return { ...state, openFab };
		default:
			return state
	}
}