import React from 'react';
import { NavLink } from 'react-router-dom';

import classes from './NavigationItem.css';

const navigationItem = (props) => (
    <li className={classes.NavigationItem}>
        <NavLink
            // Due to CSS modules we need to use activeClassName because 'active'
            // in the CSS file is renamed internally with some hash variable
            activeClassName={classes.active}
            to={props.link}>{props.children}</NavLink>
    </li>
);

export default navigationItem;
