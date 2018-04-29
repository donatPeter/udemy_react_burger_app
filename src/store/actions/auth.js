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

export const checkAuthTimeout = (expTime) => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout());
    }, expTime * 1000);
  };
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('expDate');
  localStorage.removeItem('userId');
  return {
    type: actionTypes.AUTH_LOGOUT
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
        const expDate = new Date(Date.now() + res.data.expiresIn * 1000);
        localStorage.setItem('token', res.data.idToken);
        localStorage.setItem('expDate', expDate);
        localStorage.setItem('userId', res.data.localId);
        dispatch(authSuccess(res.data.idToken, res.data.localId));
        dispatch(checkAuthTimeout(res.data.expiresIn));
      })
      .catch(err => {
        console.log(err);
        dispatch(authFailed(err.response.data.error));
      });
  };
};

export const checkAuthenticationState = () => {
  return dispatch => {
    const token = localStorage.getItem('token');
    if (!token) {
      dispatch(logout());
    } else {
      const expDate = new Date(localStorage.getItem('expDate'));
      if (expDate > new Date()) {
        const userId = localStorage.getItem('userId');
        dispatch(authSuccess(token, userId));
        dispatch(checkAuthTimeout((expDate.getTime() - new Date().getTime()) / 1000));
      } else {
        dispatch(logout());
      }
    }
  };
};