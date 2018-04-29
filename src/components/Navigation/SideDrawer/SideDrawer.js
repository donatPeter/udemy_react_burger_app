import React from 'react';

import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.css';
import BackDrop from '../../UI/BackDrop/BackDrop';
import Aux from '../../../hoc/Auxiliary';

const sideDrawer = (props) => {

  let attachedClasses = [classes.SideDrawer, classes.Close].join(' ');
  if (props.open) {
    attachedClasses = [classes.SideDrawer, classes.Open].join(' ');
  }

  return (
    <Aux>
      <BackDrop show={props.open} clicked={props.closed} />
      <div className={attachedClasses} onClick={props.closed}>
        <div className={classes.Logo}>
          <Logo />
        </div>
        <nav>
          <NavigationItems isAuthenticated={props.isAuthenticated} />
        </nav>
      </div>
    </Aux>
  );
};

export default sideDrawer;
