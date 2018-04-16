import React from 'react';
import classes from './BuildControl.css'

const buildControl = (props) => (
  <div className={classes.BuildControl}>
    <div className={classes.Labrl}>{props.label}</div>
    <button
      className={classes.More}
      onClick={props.added}>More</button>
    <button className={classes.Less}>Less</button>
  </div>
);

export default buildControl;