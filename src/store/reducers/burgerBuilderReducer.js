import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

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
            return updateObject(state, {
                ingredients: {
                    salad: action.igs.salad,
                    bacon: action.igs.bacon,
                    cheese: action.igs.cheese,
                    meat: action.igs.meat,
                },
                error: false,
                totalPrice: 4,
            });
        case actionTypes.FETCH_INGREDIENTS_FAILED:
            return updateObject(state, { error: true });
        case actionTypes.ADD_INGREDIENT:
            const updatedIngredient = { [action.ig]: state.ingredients[action.ig] + 1 };
            const updatedIngredients = updateObject(state.ingredients, updatedIngredient)
            const updatedState = {
                ingredients: updatedIngredients,
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ig]
            };
            return updateObject(state, updatedState);
        case actionTypes.REMOVE_INGREDIENT:
            const updatedIng = { [action.ig]: state.ingredients[action.ig] - 1 };
            const updatedIngs = updateObject(state.ingredients, updatedIng)
            const updatedSt = {
                ingredients: updatedIngs,
                totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ig]
            };
            return updateObject(state, updatedSt);
        default:
            return state;
    }
};

export default reducer;