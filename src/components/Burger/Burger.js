import React from 'react';
import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {
  let ingredientsArray = Object.keys(props.ingredients)
    .map(key => {
      return [...Array(props.ingredients[key])].map((_, i) => {
        return <BurgerIngredient key={key + i} type={key} />
      })
    }) 
    .reduce((prev, curr) => prev.concat(curr), []); // reduce the two dimensional array to get an array of ingrediednts


  if (ingredientsArray.length === 0) {
    ingredientsArray = <p>Please start adding ingredients!</p>;
  }

  return (
    <div className={classes.Burger}>
      <BurgerIngredient type='bread-top' />
      {ingredientsArray}
      <BurgerIngredient type='bread-bottom' />
    </div>
  );
};

export default burger;

