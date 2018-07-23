import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import burgerBuilderReducer from './store/reducers/burgerBuilderReducer';
import orderReducer from './store/reducers/orderReducer';
import authReducer from './store/reducers/authReducer';

const rootReducer = combineReducers({
    burgerBuilder: burgerBuilderReducer,
    order: orderReducer,
    auth: authReducer,
});

// Redux Devtools only available in developement environment
const composeEnhancers = (process.env.NODE_ENV === 'developement' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null) || compose;

const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(thunk)
));

// @Provider should wrap both @BrowserRouter AND @App
const app = (
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
);

ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
