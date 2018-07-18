import React, { Component } from 'react';

import Order from '../../../components/Order/Order';
import axios from '../../../axios-orders';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';

class Orders extends Component {
    state = {
        orders: [],
        loading: true,
    }

    // Only fetch orders when this component is loaded
    componentDidMount() {
        axios.get('/orders.json')
            .then(response => {
                const fetchedOrders = [];
                for (let key in response.data) {
                    fetchedOrders.push({
                        ...response.data[key],
                        id: key
                    });
                }
                console.log(fetchedOrders);
                this.setState({loading: false, orders: fetchedOrders});
            })
            .catch(error => {
                this.setState({loading: false});
            });
    }

    render() {
        return (
            <div>
                <Order/>
                <Order/>
            </div>
        );
    }
}

export default withErrorHandler(Orders, axios);