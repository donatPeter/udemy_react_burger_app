import React from 'react';

import Aux from '../../../hoc/Auxiliary';

const orderSummary = (props) => {
  const ingredientSummary = Object.keys(props.ingredients)
    .map(key => {
      return (
        <li key={key}>
          <span
            style={{ textTransform: 'capitalize' }}>{key}
          </span>: {props.ingredients[key]}
        </li>)
    })
  return (
    <Aux>
      <h3>Your order</h3>
      <p>With a following ingredients:</p>
      <ul>
        {ingredientSummary}
      </ul>
      <p>Checkout?</p>
    </Aux>
  )
};

export default orderSummary;
