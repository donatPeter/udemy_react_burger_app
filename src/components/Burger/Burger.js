import React from 'react';
import classes from './Burger.css'
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {

  const ingredientsArray = Object.keys(props.ingredients)
    .map(key => {
      return [...Array(props.ingredients[key])].map((_, i) => {
        return <BurgerIngredient key={key + i} type={key} />
      })
    });

  return (
    <div className={classes.Burger}>
      <BurgerIngredient type='bread-top' />
      {ingredientsArray}
      <BurgerIngredient type='bread-bottom' />
    </div>
  );
}

export default burger;