import React, { Component } from 'react';
import { connect } from 'react-redux';

import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';
import * as actions from '../../store/actions';

const mapStateToProps = state => {
    return {
        ingredients: state.ingredients,
        totalPrice: state.totalPrice,
        purchaseable: state.purchaseable,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onInitIngredients: (igs) => dispatch({type: actions.INIT_INGREDIENT, igs: igs}),
        onAddIngredient: (ig) => dispatch({type: actions.ADD_INGREDIENT, ig: ig}),
        onRemoveIngredient: (ig) => dispatch({type: actions.REMOVE_INGREDIENT, ig: ig}),
    };
};

class BurgerBuilder extends Component {
    state = {
        purchasing: false,
        loading: false,
        error: false,
    }

    componentDidMount() {
        axios.get('https://burger-builder-9.firebaseio.com/ingredients.json')
            .then(response => {
                this.props.onInitIngredients(response.data);
            })
            .catch(error => {
                this.setState({error: true});
            });
    }

    purchaseHandler = () => {
        this.setState({ purchasing: true })
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false })
    }

    // Must add ".json" to an endpoint for Firebase to work correctly
    purchaseContinueHandler = () => {
        const queryParams = [];
        for (let i in this.props.ingredients) {
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.props.ingredients[i]))
        }
        queryParams.push('price=' + this.props.totalPrice);
        const queryString = queryParams.join('&');
        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString,
        });
    }

    render() {
        // Each ingredient type is mapped to either true or false
        const disabledInfo = { ...this.props.ingredients };
        for (let key in disabledInfo)
            disabledInfo[key] = (disabledInfo[key] <= 0);

        let orderSummary = null;

        let burger = <Spinner />;

        if (this.state.error) {
            burger = <p style={{textAlign: 'center'}}>Ingredients can't be loaded!</p>;
        }

        if (this.props.ingredients) {
            burger = (
                <Auxiliary>
                    <Burger ingredients={this.props.ingredients} />
                    <BuildControls
                        price={this.props.totalPrice}
                        purchaseable={this.props.purchaseable}
                        ordered={this.purchaseHandler}
                        ingredientAdded={(ig) => this.props.onAddIngredient(ig)}
                        ingredientRemoved={(ig) => this.props.onRemoveIngredient(ig)}
                        disabled={disabledInfo} />
                </Auxiliary>
            );
            orderSummary = <OrderSummary
                ingredients={this.props.ingredients}
                price={this.props.totalPrice.toFixed(2)}
                purchaseCancel={this.purchaseCancelHandler}
                purchaseContinue={this.purchaseContinueHandler} />;
        }

        if (this.state.loading)
            orderSummary = <Spinner />;
        
        return (
            <Auxiliary>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Auxiliary>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
