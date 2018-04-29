import reducer from './auth';
import * as actionTypes from '../actions/actionTypes';

describe('auth reducer', () => {

  const initState = {
    token: null,
    userId: null,
    error: null,
    loading: false
  };

  it('should return the initial state in case of invalid action type', () => {
    expect(reducer(undefined, {})).toEqual(initState);
  });
  it('should store the token after login', () => {
    expect(reducer(initState, {
      type: actionTypes.AUTH_SUCCESS,
      token: 'testToken',
      userId: 'testUserId'
    })).toEqual({
      token: 'testToken',
      userId: 'testUserId',
      error: null,
      loading: false
    });
  });
});