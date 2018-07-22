import React, { Component } from 'react';

import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        token: state.auth.token,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: (token) => dispatch(actions.fetchOrders(token)),
    };
};

class Orders extends Component {
    state = {

    }

    // Only fetch orders when this component is loaded
    componentDidMount() {
        this.props.onFetchOrders(this.props.token)
    }

    render() {
        let orders = this.props.orders.map(order => (
            <Order key={order.id} ingredients={order.ingredients} price={order.totalPrice}/>
        ));

        if (this.props.loading)
            orders = <Spinner />;

        return orders;
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));