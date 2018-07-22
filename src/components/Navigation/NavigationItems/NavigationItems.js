import React from 'react';

import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => (
    <ul className={classes.NavigationItems}>
        {props.isAuthenticated
            ? <NavigationItem link='/logout'>Logout</NavigationItem>
            : <NavigationItem link='/auth'>Authenticate</NavigationItem>}
        <NavigationItem link='/burger-builder'>Burger Builder</NavigationItem>
        {props.isAuthenticated
            ? <NavigationItem link='/checkout' >Checkout</NavigationItem>
            : null}
        {props.isAuthenticated
            ? <NavigationItem link='/orders' >Orders</NavigationItem>
            : null}
    </ul>
);

export default navigationItems;
