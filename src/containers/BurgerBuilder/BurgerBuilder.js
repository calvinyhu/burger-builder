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
import * as burgerBuilderActions from '../../store/actions/index';

const mapStateToProps = state => {
    return {
        ingredients: state.ingredients,
        totalPrice: state.totalPrice,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onInitIngredients: (igs) => dispatch(burgerBuilderActions.initIngredient(igs)),
        onAddIngredient: (ig) => dispatch(burgerBuilderActions.addIngredient(ig)),
        onRemoveIngredient: (ig) => dispatch(burgerBuilderActions.removeIngredient(ig)),
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

    updatePurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            }).reduce((sum, el) => sum + el, 0);
        return sum > 0;
    }

    purchaseHandler = () => {
        this.setState({ purchasing: true })
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false })
    }

    purchaseContinueHandler = () => {
        this.props.history.push('/checkout');
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
                        purchaseable={this.updatePurchaseState(this.props.ingredients)}
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
