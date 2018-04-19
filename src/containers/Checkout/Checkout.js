import React, { Component } from 'react';

import CheckoutSummary from '../../components/Order/CheckoutSummery/CheckoutSummery';

class Checkout extends Component {

  state = {
    ingredients: {
      meat: 1
    }
  }

  checkoutCancelledHandler = () => {
    this.props.history.goBack();
  }

  checkoutContinuedHandler = () => {
    this.props.history.replace('/checkout/checkout-data');
  }

  componentDidMount() {
    const query = new URLSearchParams(this.props.location.search);
    const ingredients = {};
    for (let param of query.entries()) {
      ingredients[param[0]] = +param[1];
    }
    this.setState({ ingredients: ingredients });
  }

  render() {
    return (
      <div>
        <CheckoutSummary
          ingredients={this.state.ingredients}
          checkoutCancelled={this.checkoutCancelledHandler}
          checkoutContinued={this.checkoutContinuedHandler} />
      </div>
    );
  }
}

export default Checkout;
