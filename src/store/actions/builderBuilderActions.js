import * as actionTypes from './actionTypes';

export const initIngredient = (igs) => {
    return {
        type: actionTypes.INIT_INGREDIENT,
        igs: igs
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