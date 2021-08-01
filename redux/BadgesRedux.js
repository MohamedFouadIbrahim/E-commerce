export const types = {
	SET_BADGES_DATA: 'SET_BADGES_DATA',
	CLEAR_BADGES_DATA: 'CLEAR_BADGES_DATA',
	SET_CART_COUNT: 'SET_CART_COUNT',
	INCREMENT_CART_COUNT: 'INCREMENT_CART_COUNT',
	DECREMENT_CART_COUNT: 'DECREMENT_CART_COUNT',
};

export const actions = {
	setBadgesData: (dispatch, badges_data) => {
		dispatch({ type: types.SET_BADGES_DATA, badges_data })
	},
	clearBadgesData: (dispatch) => {
		dispatch({ type: types.CLEAR_BADGES_DATA })
	},
	setCartCount: (dispatch, cart_count) => {
		dispatch({ type: types.SET_CART_COUNT, cart_count })
	},
	incrementCartCount: (dispatch) => {
		dispatch({ type: types.INCREMENT_CART_COUNT })
	},
	decrementCartCount: (dispatch) => {
		dispatch({ type: types.DECREMENT_CART_COUNT })
	},
};

const initialState = {
	badges_data: {
		
	},
	cart_count: 0,
}

export const reducer = (state = initialState, action) => {
	const { 
		badges_data,
		cart_count,
	} = action;

	switch (action.type) {
		case types.SET_BADGES_DATA:
			return { ...state, badges_data };
		case types.CLEAR_BADGES_DATA:
			return { ...state, ...initialState };
		case types.SET_CART_COUNT:
			return { ...state, cart_count };
		case types.INCREMENT_CART_COUNT:
			return { 
				...state, 
				cart_count: state.cart_count + 1,
			};
		case types.DECREMENT_CART_COUNT:
			return {
				...state,
				cart_count: state.cart_count > 0 ? state.cart_count - 1 : 0,
			};
		default: 
			return state
	}
}