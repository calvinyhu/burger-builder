import React, { Component } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import * as actions from './store/actions/index';

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignUp: () => dispatch(actions.authCheckState())
  }
}

class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignUp()
  }

  render() {
    // Routes for unauthenticated users
    let routes = (
      <Switch>
        <Route path='/burger-builder' component={BurgerBuilder}/>
        <Route path='/auth' component={Auth}/>
        <Redirect to='/burger-builder' />
      </Switch>
    )

    // Route guards for frontend
    if (this.props.isAuthenticated) {
      // Routes for authenticated users
      routes = (
        <Switch>
          <Route path='/burger-builder' component={BurgerBuilder}/>
          <Route path='/checkout' component={Checkout}/>
          <Route path='/orders' component={Orders}/>
          <Route path='/auth' component={Auth}/>
          <Route path='/logout' component={Logout}/>
          <Redirect to='/burger-builder' />
        </Switch>
      )
    }

    return (
      <div>
        <Layout>
          <Switch>
            {routes}
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
