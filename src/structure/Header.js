import React from 'react';
import iceCreamImg from '../assets/img/ultimate-ice-cream.svg';
import { NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <header>
      <h1>
        <img src={iceCreamImg} alt="" />
        Ultimate Ice Cream
      </h1>
      <nav>
        <NavLink to="/" exact="true">Menu</NavLink>
      </nav>
    </header>
  );
};

export default Header;
