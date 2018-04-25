import * as actionTypes from './../actions/actionTypes';
import { updateState } from '../utility';

const initialState = {
  orders: [],
  loading: false,
  purchased: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PURCHASE_INIT:
      return updateState(state, { purchased: false });
    case actionTypes.PURCHASE_BURGER:
      return updateState(state, { loading: true, purchased: true });
    case actionTypes.PURCHASE_BURGER_SUCCESS:
      return updateState(state, { loading: false, purchased: true, orders: updateState(action.orderData, { id: action.orderID }) });
    case actionTypes.PURCHASE_BURGER_FAILED:
      return updateState(state, { loading: false });
    case actionTypes.FETCH_ORDERS:
      return updateState(state, { loading: true });
    case actionTypes.FETCH_ORDERS_SUCCESS:
      return updateState(state, { loading: false, orders: action.orders });
    case actionTypes.FETCH_ORDERS_FAILED:
      return updateState(state, { loading: false });
    default:
      return state;
  }
};

export default reducer;