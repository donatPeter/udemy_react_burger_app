import * as actionTypes from './../actions/actionTypes';
import { updateState } from '../utility';

const initialTotalPrice = 4;

const initialState = {
  ingredients: null,
  totalPrice: initialTotalPrice,
  error: false
};

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
};

const reducer = (state = initialState, action) => {
  let updatedIngredients;
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      updatedIngredients = updateState(state.ingredients, { [action.ingredientName]: state.ingredients[action.ingredientName] + 1 });
      return updateState(state, { ingredients: updatedIngredients, totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName] });
    case actionTypes.REMOVE_INGREDIENT:
      updatedIngredients = updateState(state.ingredients, { [action.ingredientName]: state.ingredients[action.ingredientName] - 1 });
      return updateState(state, { ingredients: updatedIngredients, totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName] });
    case actionTypes.SET_INGREDIENTS:
      return updateState(state, { ingredients: action.ingredients, error: false, totalPrice: initialTotalPrice });
    case actionTypes.FETCH_INGREDIENTS_FAILED:
      return updateState(state, { error: true });
    default:
      return state;
  }
};

export default reducer;