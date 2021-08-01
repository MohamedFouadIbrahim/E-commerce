export const types = {
    SKIP_SecondarySplash: 'SKIP_SecondarySplash',
};

export const actions = {
    skipSecondarySplash: (dispatch, is_skipped_secondary_splash) => {
        dispatch({ type: types.SKIP_SecondarySplash, is_skipped_secondary_splash })
    },
};

const initialState = {
    is_skipped_secondary_splash: false
}

export const reducer = (state = initialState, action) => {
    const { is_skipped_secondary_splash } = action;

    switch (action.type) {
        case types.SKIP_SecondarySplash:
            return { ...state, is_skipped_secondary_splash };
        default:
            return state
    }
}