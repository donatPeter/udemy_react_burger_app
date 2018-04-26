import * as actionTypes from './actionTypes';
import axios from '../../axiosAuth';

export const authStart = () => {
  return {
    type: actionTypes.AUTH
  };
};

export const authSuccess = (token, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    token: token,
    userId: userId
  };
};

export const authFailed = (error) => {
  return {
    type: actionTypes.AUTH_FAILED,
    error: error
  };
};

export const auth = (email, password, isSignUp) => {
  return dispatch => {
    dispatch(authStart());
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true
    };
    let url = '/signupNewUser?key=AIzaSyBawpYGTKM3PIRu__He_W3csGlfDRanpiU';
    if (!isSignUp) url = '/verifyPassword?key=AIzaSyBawpYGTKM3PIRu__He_W3csGlfDRanpiU';
    axios.post(url, authData)
      .then(res => {
        dispatch(authSuccess(res.data.idToken, res.data.localId));
      })
      .catch(err => {
        console.log(err);
        dispatch(authFailed(err.response.data.error));
      });
  };
};