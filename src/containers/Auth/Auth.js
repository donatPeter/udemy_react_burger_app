import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import classes from './Auth.css';
import * as actions from '../../store/actions/actions';

class Auth extends Component {

  state = {
    authForm: {
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Your mail'
        },
        value: '',
        validation: {
          required: true,
          isEmail: true
        },
        valid: false,
        touched: false
      },
      password: {
        elementType: 'input',
        elementConfig: {
          type: 'password',
          placeholder: 'Your password'
        },
        value: '',
        validation: {
          required: true,
          minLength: 7
        },
        valid: false,
        touched: false
      },
    },
    formIsValid: false,
    isSignUp: true
  }

  inputValidationHandler = (value, rules) => {
    let isValid = true;
    if (rules && rules.required) {
      isValid = value.trim() !== '' && isValid;
    }

    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }

    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }

    if (rules && rules.isEmail) {
      const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
      isValid = pattern.test(value) && isValid;
    }

    if (rules.isNumeric) {
      const pattern = /^\d+$/;
      isValid = pattern.test(value) && isValid;
    }

    return isValid;
  }

  inputChangedHandler = (event, inputId) => {
    const updatedAuthForm = JSON.parse(JSON.stringify(this.state.authForm));
    updatedAuthForm[inputId].value = event.target.value;
    updatedAuthForm[inputId].valid = this.inputValidationHandler(updatedAuthForm[inputId].value, updatedAuthForm[inputId].validation);
    updatedAuthForm[inputId].touched = true;

    let formIsValid = true;
    for (let inputIdentifier in updatedAuthForm) {
      if (updatedAuthForm[inputIdentifier].validation) {
        formIsValid = updatedAuthForm[inputIdentifier].valid && formIsValid;
      }
    }

    this.setState({ authForm: updatedAuthForm, formIsValid: formIsValid });
  }

  submitHandler = (event) => {
    event.preventDefault();
    this.props.onAuthentication(this.state.authForm.email.value, this.state.authForm.password.value, this.state.isSignUp);
  }

  switchAuthModeHandler = () => {
    this.setState(prevState => {
      return { isSignUp: !prevState.isSignUp };
    });
  }

  render() {
    const formElementsArray = [];
    for (let key in this.state.authForm) {
      formElementsArray.push({
        id: key,
        config: this.state.authForm[key]
      });
    }

    let form = formElementsArray.map(formElement => (
      <Input
        key={formElement.id}
        elementType={formElement.config.elementType}
        elementConfig={formElement.config.elementConfig}
        value={formElement.config.value}
        invalid={!formElement.config.valid}
        shouldValidate={formElement.config.validation}
        touched={formElement.config.touched}
        changed={(event) => this.inputChangedHandler(event, formElement.id)}
      />
    ));

    if (this.props.loading) {
      form = <Spinner />;
    }

    let errorMessage = null;
    if (this.props.error) {
      errorMessage = (
        <p>{this.props.error.message}</p>
      );
    }

    let redirect = null;
    if (this.props.isAuthenticated) {
      redirect = <Redirect to='/' />;
    }

    return (
      <div className={classes.Auth}>
        {redirect}
        {errorMessage}
        <form onSubmit={this.submitHandler}>
          {form}
          <Button btnType='Success' disabled={!this.state.formIsValid}>{this.state.isSignUp ? 'Sign up' : 'Sign in'}</Button>
        </form>
        <Button
          btnType='Danger'
          clicked={this.switchAuthModeHandler}>Switch to {this.state.isSignUp ? 'Sign in' : 'Sign up'}
        </Button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAuthentication: (id, pw, isSignUp) => dispatch(actions.auth(id, pw, isSignUp))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
