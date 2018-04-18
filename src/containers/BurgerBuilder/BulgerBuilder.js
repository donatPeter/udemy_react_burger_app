import React, { Component } from 'react';

import Aux from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummery/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler';
import axios from '../../axiosOrders';

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
}

class BurgerBuilder extends Component {

  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    },
    totalPrice: 4,
    burgerOrderable: false,
    ordering: false,
    loading: false
  }

  addIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;
    const updatedIngredients = { ...this.state.ingredients };
    updatedIngredients[type] = updatedCount;

    const priceAddition = INGREDIENT_PRICES[type];
    const newPrice = this.state.totalPrice + priceAddition;

    this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
    this.updateOrderStat(updatedIngredients);
  }

  removeIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    if (oldCount <= 0) return;
    const updatedCount = oldCount - 1;
    const updatedIngredients = { ...this.state.ingredients };
    updatedIngredients[type] = updatedCount;

    const priceDeduction = INGREDIENT_PRICES[type];
    const newPrice = this.state.totalPrice - priceDeduction;

    this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
    this.updateOrderStat(updatedIngredients);
  }

  updateOrderStat = (ingredients) => {
    const ingredientCount = Object.keys(ingredients)
      .map(key => {
        return ingredients[key];
      })
      .reduce((currSum, currElement) => currSum + currElement, 0);
    this.setState({ burgerOrderable: ingredientCount > 0 });
  }

  orderHandler = () => {
    this.setState({ ordering: true });
  }

  orderCancelHandler = () => {
    this.setState({ ordering: false });
  }

  orderContinueHandler = () => {
    this.setState({ loading: true });
    const order = {
      ingredient: this.state.ingredients,
      price: this.state.totalPrice,
      customer: {
        name: 'Test',
        address: {
          street: 'Test'
        }
      }
    };
    axios.post('/orders.json', order)
      .then(res => {
        this.setState({ loading: false, ordering: false });
      })
      .catch(err => {
        this.setState({ loading: false, ordering: false });
      })
  }

  render() {
    const disableButtonMap = { ...this.state.ingredients };
    for (const ingredient in disableButtonMap) {
      disableButtonMap[ingredient] = disableButtonMap[ingredient] <= 0;
    }

    let orderSummary = <OrderSummary
      ingredients={this.state.ingredients}
      price={this.state.totalPrice}
      orderCancelled={this.orderCancelHandler}
      orderContinued={this.orderContinueHandler} />
    if (this.state.loading) {
      orderSummary = <Spinner />
    }

    return (
      <Aux>
        <Modal show={this.state.ordering} modalClosed={this.orderCancelHandler}>
          {orderSummary}
        </Modal>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          ingredientAdded={this.addIngredientHandler}
          ingredientRemoved={this.removeIngredientHandler}
          orderable={this.state.burgerOrderable}
          ordered={this.orderHandler}
          disabled={disableButtonMap}
          price={this.state.totalPrice} />
      </Aux>
    );
  }
}

export default withErrorHandler(BurgerBuilder, axios);