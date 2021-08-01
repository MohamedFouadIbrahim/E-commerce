export const types = {
	SET_IS_DEVELOPER: 'SET_IS_DEVELOPER',
	SET_INSPECTOR_ENABLED: 'SET_INSPECTOR_ENABLED',
	SET_INSPECTOR_COLLAPSED: 'SET_INSPECTOR_COLLAPSED',
	LOG_INSPECTOR: 'LOG_INSPECTOR',
	CLEAR_INSPECTOR_LOG: 'CLEAR_INSPECTOR_LOG',
	SET_LAST_REQUEST_TIME: 'SET_LAST_REQUEST_TIME',
};

export const actions = {
	setIsDeveloper: (dispatch, is_developer) => {
		dispatch({ type: types.SET_IS_DEVELOPER, is_developer })
	},
	setInspectorEnabled: (dispatch, is_inspector_enabled) => {
		dispatch({ type: types.SET_INSPECTOR_ENABLED, is_inspector_enabled })
	},
	setInspectorCollapsed: (dispatch, is_inspector_collapsed) => {
		dispatch({ type: types.SET_INSPECTOR_COLLAPSED, is_inspector_collapsed })
	},
	logInspector: (dispatch, log_item_message, log_item_data) => {
		dispatch({ type: types.LOG_INSPECTOR, log_item_message, log_item_data })
	},
	clearInspectorLog: (dispatch) => {
		dispatch({ type: types.CLEAR_INSPECTOR_LOG })
	},
	setLastRequestTime: (dispatch, last_request_time, last_query_count) => {
		dispatch({ type: types.SET_LAST_REQUEST_TIME, last_request_time, last_query_count })
	},
};

const initialState = {
	is_developer: false,
	is_inspector_enabled: false,
	is_inspector_collapsed: false,
	last_request_time: null,
	last_query_count: null,
	inspector_logs: [],
}

export const reducer = (state = initialState, action) => {
	const {
		is_developer,
		is_inspector_enabled,
		is_inspector_collapsed,
		log_item_message,
		log_item_data,
		last_request_time,
		last_query_count,
	} = action;

	switch (action.type) {
		case types.SET_IS_DEVELOPER:
			return { ...state, is_developer };
		case types.SET_INSPECTOR_ENABLED:
			return { ...state, is_inspector_enabled };
		case types.SET_INSPECTOR_COLLAPSED:
			return { ...state, is_inspector_collapsed };
		case types.LOG_INSPECTOR:
			let updated_logs = state.inspector_logs

			updated_logs.unshift({
				key: `${updated_logs.length}`,
				message: log_item_message,
				data: log_item_data,
			})

			return { ...state, inspector_logs: updated_logs };
		case types.CLEAR_INSPECTOR_LOG:
			return { ...state, inspector_logs: [] };
		case types.SET_LAST_REQUEST_TIME:
			return { ...state, last_request_time, last_query_count };
		default: 
			return state
	}
}