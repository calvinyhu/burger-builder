import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

// Synchronous action creator
export const setIngredients = (igs) => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        igs: igs
    };
};

export const fetchIngredientsFailed = () => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAILED
    };
};

// Asynchronous action creator
// Once this function is done, @setIngredients is called
export const initIngredients = () => {
    return dispatch => {
        axios.get('https://burger-builder-9.firebaseio.com/ingredients.json')
            .then(response => {
                dispatch(setIngredients(response.data));
            })
            .catch(error => {
                dispatch(fetchIngredientsFailed());
            });
    };
};

export const addIngredient = (ig) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ig: ig
    };
};

export const removeIngredient = (ig) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ig: ig
    };
};