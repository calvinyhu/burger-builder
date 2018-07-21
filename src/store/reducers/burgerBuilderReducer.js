import * as actionTypes from '../actions/actionTypes';

const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false,
    loading: false
};

const INGREDIENT_PRICES = {
    salad: 0.5,
    bacon: 0.7,
    cheese: 0.4,
    meat: 1.3,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_INGREDIENTS:
            return {
                ...state,
                ingredients: {
                    salad: action.igs.salad,
                    bacon: action.igs.bacon,
                    cheese: action.igs.cheese,
                    meat: action.igs.meat,
                },
                error: false
            };
        case actionTypes.FETCH_INGREDIENTS_FAILED:
            return {
                ...state,
                error: true
            };
        case actionTypes.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ig]: state.ingredients[action.ig] + 1
                },
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ig]
            };
        case actionTypes.REMOVE_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ig]: state.ingredients[action.ig] - 1
                },
                totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ig]
            };
        default:
            return state;
    }
};

export default reducer;