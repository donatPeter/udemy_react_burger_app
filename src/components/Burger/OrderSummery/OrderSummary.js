import React from 'react';

import Aux from '../../../hoc/Auxiliary';
import Button from '../../UI/Button/Button';

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
      <p><strong>Total Price: {props.price.toFixed(2)}</strong></p>
      <p>Checkout?</p>
      <Button btnType="Danger" clicked={props.orderCancelled}>Cancel</Button>
      <Button btnType="Success" clicked={props.orderContinued}>Continue</Button>
    </Aux>
  )
};

export default orderSummary;
