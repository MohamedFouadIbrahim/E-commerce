export const types = {
	SET_RUNTIME_CONFIG_VERSION: 'SET_RUNTIME_CONFIG_VERSION',
	SET_RUNTIME_CONFIG: 'SET_RUNTIME_CONFIG',
};

export const actions = {
	setRuntimeConfigVersion: (dispatch, runtime_config_version) => {
		dispatch({ type: types.SET_RUNTIME_CONFIG_VERSION, runtime_config_version })
	},
	setRuntimeConfig: (dispatch, runtime_config) => {
		dispatch({ type: types.SET_RUNTIME_CONFIG, runtime_config })
	},
};

const initialState = {
	runtime_config_version: null,
	runtime_config: null,
}

export const reducer = (state = initialState, action) => {
	const { 
		runtime_config_version,
		runtime_config,
	} = action;

	switch (action.type) {
		case types.SET_RUNTIME_CONFIG_VERSION:
			return { ...state, runtime_config_version };
		case types.SET_RUNTIME_CONFIG:
			let modifiedRuntimeConfig = runtime_config
			modifiedRuntimeConfig["screens"]["Product_Details_09_5"]["PadScalingColor"]["Value"] = modifiedRuntimeConfig["screens"]["Product_Details_09_5"]["PadScalingColor"]["Value"].substr(1)

			return { ...state, runtime_config: modifiedRuntimeConfig };
		default: 
			return state
	}
}