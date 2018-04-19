import React, { Component } from 'react';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContactData.css';
import axios from '../../../axiosOrders';

class ContactData extends Component {

  state = {
    name: '',
    email: '',
    loading: false
  }

  orderHandler = (event) => {
    event.preventDefault();

    this.setState({ loading: true });
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      customer: {
        name: 'Test',
        address: {
          street: 'Test'
        }
      }
    };
    axios.post('/orders.json', order)
      .then(() => {
        this.setState({ loading: false });
        this.props.history.push('/');
      })
      .catch(() => {
        this.setState({ loading: false });
      });
  }

  render() {
    let form = (
      <form>
        <input className={classes.Input} type="text" name="name" placeholder="Name" />
        <input className={classes.Input} type="email" name="email" placeholder="Email" />
        <Button
          btnType="Success"
          clicked={this.orderHandler}>Order</Button>
      </form>
    );
    if (this.state.loading) {
      form = <Spinner />;
    }
    return (
      <div className={classes.ContactData}>
        <h4>Enter your contact data</h4>
        {form}
      </div>
    );
  }
}

export default ContactData;
