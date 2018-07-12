import React from 'react';

// We are allowed to "import" images due to webpack
import burgerLogo from '../../assets/images/burger-logo.png';
import classes from './Logo.css';

const logo = (props) => (
    <div className={classes.Logo}>
        <img src={burgerLogo} alt="Burger Builder"/>
    </div>
);

export default logo;
