import React, { Component } from 'react';

import CheckoutSummary from '../../components/Order/CheckoutSummery/CheckoutSummery';

class Checkout extends Component {

  state = {
    ingredients: {
      meat: 1
    }
  }

  render() {
    return (
      <div>
        <CheckoutSummary ingredients={this.state.ingredients} />
      </div>
    );
  }
}

export default Checkout;
