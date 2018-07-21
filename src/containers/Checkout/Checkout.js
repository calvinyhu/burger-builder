import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';

const mapStateToProps = state => {
    return {
        ingredients: state.ingredients,
    };
};

class Checkout extends Component {
    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render() {
        let summary = <Redirect to='/burger-builder' />;
        if (this.props.ingredients) {
            summary = (
                <Auxiliary>
                    <CheckoutSummary
                        ingredients={this.props.ingredients}
                        checkoutCancelled={this.checkoutCancelledHandler}
                        checkoutContinued={this.checkoutContinuedHandler}/>
                    <Route
                        path={this.props.match.path + '/contact-data'}
                        component={ContactData}/>
                </Auxiliary>
            );
        }

        return summary;
    }
}

export default connect(mapStateToProps)(Checkout);