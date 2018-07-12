import React from 'react';

import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    { label: 'Salad', type: 'salad' },
    { label: 'Bacon', type: 'bacon' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Meat', type: 'meat' },
];

const buildControls = (props) => (
    <div className={classes.BuildControls}>
        <p>Current Price: <strong>{props.price.toFixed(2)}</strong></p>
        {controls.map(ctrl => 
            <BuildControl
                key={ctrl.label}
                label={ctrl.label}
                // We pass in ctrl.type into @ingredientAdded here, and not in
                // BuildControl because it is redundant to have @type as an 
                // extra prop that is passed to BuildControl. We can short 
                // circuit the call starting here, since we know the type that
                // is first clicked here
                added={() => props.ingredientAdded(ctrl.type)}
                removed={() => props.ingredientRemoved(ctrl.type)}
                disabled={props.disabled[ctrl.type]} /> 
        )}
    </div>
);

export default buildControls;
