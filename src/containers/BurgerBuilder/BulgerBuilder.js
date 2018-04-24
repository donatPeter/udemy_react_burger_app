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
import * as actionTypes from '../../store/actions';

class BurgerBuilder extends Component {

  state = {
    ordering: false,
    loading: false,
    error: false
  }

  componentDidMount() {
    // axios.get('/ingredients.json')
    //   .then(res => {
    //     this.setState({ ingredients: res.data });
    //   })
    //   .catch(err => {
    //     console.log(err);
    //     this.setState({ error: true });
    //   });
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
    this.setState({ ordering: true });
  }

  orderCancelHandler = () => {
    this.setState({ ordering: false });
  }

  orderContinueHandler = () => {
    const queryParams = [];
    for (let ingredient in this.props.ings) {
      queryParams.push(encodeURIComponent(ingredient) + '=' + encodeURIComponent(this.props.ings[ingredient]));
    }
    queryParams.push('price=' + this.props.price);
    const queryString = queryParams.join('&');
    this.props.history.push({
      pathname: '/checkout',
      search: '?' + queryString
    });
  }

  render() {
    const disableButtonMap = { ...this.props.ings };
    for (const ingredient in disableButtonMap) {
      disableButtonMap[ingredient] = disableButtonMap[ingredient] <= 0;
    }

    let orderSummary = null;
    let burger = <Spinner />;
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
            price={this.props.price} />
        </Aux>
      );

      orderSummary = <OrderSummary
        ingredients={this.props.ings}
        price={this.props.price}
        orderCancelled={this.orderCancelHandler}
        orderContinued={this.orderContinueHandler} />;
    }

    if (this.state.loading) {
      orderSummary = <Spinner />;
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
    ings: state.ingredients,
    price: state.totalPrice
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: (ingName) => dispatch({ type: actionTypes.ADD_INGREDIENT, ingredientName: ingName }),
    onIngredientRemoved: (ingName) => dispatch({ type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));