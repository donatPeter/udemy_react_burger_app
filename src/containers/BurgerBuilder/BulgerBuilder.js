import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummery/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler';
import axios from '../../axiosOrders';
import * as actions from '../../store/actions/actions';

class BurgerBuilder extends Component {

  state = {
    ordering: false
  }

  componentDidMount() {
    this.props.onFetchIngredients();
  }

  updateOrderStat = (ingredients) => {
    const ingredientCount = Object.keys(ingredients)
      .map(key => {
        return ingredients[key];
      })
      .reduce((currSum, currElement) => currSum + currElement, 0);
    return ingredientCount > 0;
  }

  orderHandler = () => {
    if (this.props.isAuthenticated) {
      this.setState({ ordering: true });
    } else {
      this.props.history.push('/auth');
    }
  }

  orderCancelHandler = () => {
    this.setState({ ordering: false });
  }

  orderContinueHandler = () => {
    this.props.onInitPurchase();
    this.props.history.push('/checkout');
  }

  render() {
    const disableButtonMap = { ...this.props.ings };
    for (const ingredient in disableButtonMap) {
      disableButtonMap[ingredient] = disableButtonMap[ingredient] <= 0;
    }

    let orderSummary = null;
    let burger = this.props.error ? <p>Ingredients cannot be loaded</p> : <Spinner />;
    if (this.props.ings) {
      burger = (
        <Aux>
          <Burger ingredients={this.props.ings} />
          <BuildControls
            ingredientAdded={this.props.onIngredientAdded}
            ingredientRemoved={this.props.onIngredientRemoved}
            orderable={this.updateOrderStat(this.props.ings)}
            ordered={this.orderHandler}
            disabled={disableButtonMap}
            isAuthenticated={this.props.isAuthenticated}
            price={this.props.price} />
        </Aux>
      );

      orderSummary = <OrderSummary
        ingredients={this.props.ings}
        price={this.props.price}
        orderCancelled={this.orderCancelHandler}
        orderContinued={this.orderContinueHandler} />;
    }

    return (
      <Aux>
        <Modal show={this.state.ordering} modalClosed={this.orderCancelHandler}>
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    isAuthenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
    onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
    onFetchIngredients: () => dispatch(actions.fetchingInitIngredients()),
    onInitPurchase: () => dispatch(actions.purchaseInit())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));