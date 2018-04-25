import * as actionTypes from './actionTypes';
import axios from '../../axiosOrders';

export const orderBurgerSuccess = (id, orderData) => {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    orderID: id,
    orderData: orderData
  };
};

export const orderBurgerFailed = (error) => {
  return {
    type: actionTypes.PURCHASE_BURGER_FAILED,
    error: error
  };
};

export const orderBurgerStart = () => {
  return {
    type: actionTypes.PURCHASE_BURGER
  };
};

export const orderBurger = (orderData) => {
  return dispatch => {
    dispatch(orderBurgerStart());
    axios.post('/orders.json', orderData)
      .then(res => {
        dispatch(orderBurgerSuccess(res.data.name, orderData));
      })
      .catch(err => {
        dispatch(orderBurgerFailed(err));
      });
  };
};