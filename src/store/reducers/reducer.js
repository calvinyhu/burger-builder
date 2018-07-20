import * as actions from '../actions';

const initialState = {
    ingredients: null,
    totalPrice: 4,
    purchaseable: false,
};

const INGREDIENT_PRICES = {
    salad: 0.5,
    bacon: 0.7,
    cheese: 0.4,
    meat: 1.3,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case (actions.INIT_INGREDIENT):
            return {
                ...state,
                ingredients: action.igs
            };
        case (actions.ADD_INGREDIENT):
            const newIngredients = {...state.ingredients};
            newIngredients[action.ig] = state.ingredients[action.ig] + 1;
            const sum = Object.keys(newIngredients)
                .map(igKey => {
                    return newIngredients[igKey];
                }).reduce((sum, el) => sum + el, 0);
            return {
                ...state,
                ingredients: newIngredients,
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ig],
                purchaseable: sum > 0
            };
        case (actions.REMOVE_INGREDIENT):
            const newIngredients2 = {...state.ingredients};
            newIngredients2[action.ig] = state.ingredients[action.ig] - 1;
            const sum2 = Object.keys(newIngredients2)
                .map(igKey => {
                    return newIngredients2[igKey];
                }).reduce((sum2, el) => sum2 + el, 0);
            return {
                ...state,
                ingredients: newIngredients2,
                totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ig],
                purchaseable: sum2 > 0
            };
        default:
            return state;
    }
};

export default reducer;