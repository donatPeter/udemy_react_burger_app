import React, { Component } from 'react';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.css';

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
    formIsValid: false
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
    return (
      <div className={classes.Auth}>
        <form>
          {form}
          <Button btnType='Success' disabled={!this.state.formIsValid}>LogIn</Button>
        </form>
      </div>
    );
  }
}

export default Auth;
