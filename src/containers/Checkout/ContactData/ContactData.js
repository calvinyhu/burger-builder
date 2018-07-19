import React, { Component } from 'react';

import classes from './ContactData.css';
import Button from '../../../components/UI/Button/Button';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Name'
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP Code'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5,
                },
                valid: false,
                touched: false,
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Email'
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'}
                    ]
                },
                value: 'fastest',
                validation: {},
                valid: true,
            },
        },
        formIsValid: false,
        loading: false,
    }

    orderHandler = (event) => {
        // @event.preventDefault prevents @<form> from automatically sending in a request
        event.preventDefault();
        this.setState({loading: true});
        // formData = name: value, street: value,...
        const formData = {};
        // formElementIdentifier = name, email, country...
        for (let formElementIdentifier in this.state.orderForm) {
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        }
        const order = {
            ingredients: this.props.ingredients,
            // On a real app, you would recalculate the price based on the 
            // number of ingredients on the server and not the user
            price: this.props.price,
            orderData: formData,
        };
        // Comment out this post to see the spinner a bit longer.
        axios.post('/orders.json', order)
            .then(response => {
                this.setState({loading: false});
                this.props.history.push('/burger-builder');
            })
            .catch(error => {
                this.setState({loading: false});
            });
    }

    checkValidity(value, rules) {
        let isValid = true;

        if (!rules)
            return true;

        if (rules.required)
            isValid = value.trim() !== '' && isValid;

        if (rules.minLength)
            isValid = value.length >= rules.minLength && isValid;

        if (rules.maxLength)
            isValid = value.length <= rules.maxLength && isValid;

        return isValid;
    }

    inputChangedHandler = (event, inputIdentifier) => {
        console.log(event.target.value);
        // First shallow copy the entire order form
        const updatedOrderForm = {
            ...this.state.orderForm
        };
        // Then shallow copy a specific order form element using the input 
        // identifier we passed to the inputChangedHandler
        const updatedFormElement = {
            ...updatedOrderForm[inputIdentifier]
        };
        // Then we do the mutating
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        // Then we update the order form element
        updatedOrderForm[inputIdentifier] = updatedFormElement;
        
        // Check if the entire form is valid
        let formIsValid = true;
        for (let inputIdentifier in updatedOrderForm)
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
        
        // Finally we update the original orderForm by setting it equal to the 
        // updated copy of the order form, and update whether or not the entire
        // form is valid
        this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid});
    }

    render() {
        const formElementsArray = [];
        for (let key in this.state.orderForm) {
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }

        let form = (
            <form onSubmit={this.orderHandler}>
                {formElementsArray.map(formElement => (
                    <Input
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        invalid={!formElement.config.valid}
                        shouldValidate={formElement.config.validation}
                        touched={formElement.config.touched}
                        changed={(event) => this.inputChangedHandler(event, formElement.id)}/>
                ))}
                <Button btnType='Success' clicked={this.orderHandler} disabled={!this.state.formIsValid}>ORDER</Button>
            </form>
        );

        if (this.state.loading)
            form = <Spinner />;
        
        return (
            <div className={classes.ContactData}>
                <h4>Enter your contact data</h4>
                {form}
            </div>
        );
    }
}

export default ContactData;