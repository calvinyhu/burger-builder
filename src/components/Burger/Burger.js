import React from 'react';
// import { withRouter } from 'react-router-dom';

import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {
    if (!props.ingredients)
        return null;
    // An array of strings of the keys of props.ingredients
    const uniqueIngredients = Object.keys(props.ingredients);
    const deNestArrays = (arr, el) => arr.concat(el);
    // Below is equivalent to above
    // const reducer = (arr, el) => {
    //     return arr.concat(el);
    // };
    const initialValue = [];

    // An array of all ingredients
    let allIngredients = uniqueIngredients.map(igKey => {
        // The count of each unique ingredient
        const numIngredients = props.ingredients[igKey];
        // Return an array that is filled with the correct number of unique 
        // ingredients, by first filling an @Array with @numIngredient number of
        // undefined values, then mapping over each undefined element and 
        // turning it into a @BurgerIngredient
        return [...Array(numIngredients)].map((_, index) => {
            return <BurgerIngredient key={igKey + index} type={igKey} />;
        });
    }).reduce(deNestArrays, initialValue);

    if (allIngredients.length === 0)
        allIngredients = <p>Please start adding ingredients!</p>;

    return (
        <div className={classes.Burger}>
            <BurgerIngredient type='bread-top' />
            {allIngredients}
            <BurgerIngredient type='bread-bottom' />
        </div>
    );
};

// export default withRouter(burger);
export default burger;
