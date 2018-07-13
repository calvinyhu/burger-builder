import React, { Component } from 'react';

import classes from './Modal.css';
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary';
import Backdrop from '../Backdrop/Backdrop';

// Did not use PureComponent here, since we do not need to check if modalClosed 
// has changed
class Modal extends Component {
    shouldComponentUpdate(nextProps, _) {
        return nextProps.show !== this.props.show;
    }

    render() {
        return (
            <Auxiliary>
                <Backdrop show={this.props.show} clicked={this.props.modalClosed} />
                <div style={{
                        transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                        opacity: this.props.show ? '1': '0',
                    }}
                    className={classes.Modal}>
                    {this.props.children}
                </div>
            </Auxiliary>
        );
    }
}

export default Modal;
