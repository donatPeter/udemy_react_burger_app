import * as actionTypes from '../actions/actionTypes';
import { updateState } from '../utility';

const initialState = {
  token: null,
  userId: null,
  error: null,
  loading: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH:
      return updateState(state, { error: null, loading: true });
    case actionTypes.AUTH_SUCCESS:
      return updateState(state, { token: action.token, userId: action.userId, error: null, loading: false });
    case actionTypes.AUTH_FAILED:
      return updateState(state, { error: action.error, loading: false });
    case actionTypes.AUTH_LOGOUT:
      return updateState(state, { token: null, userId: null });
    default:
      return state;
  }
};

export default reducer;
