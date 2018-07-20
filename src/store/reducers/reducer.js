import * as actions from '../actions';

const initialState = {
    ingredients: null,
    totalPrice: 4,
};

const INGREDIENT_PRICES = {
    salad: 0.5,
    bacon: 0.7,
    cheese: 0.4,
    meat: 1.3,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.INIT_INGREDIENT:
            return {
                ...state,
                ingredients: action.igs
            };
        case actions.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ig]: state.ingredients[action.ig] + 1
                },
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ig]
            };
        case actions.REMOVE_INGREDIENT:
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