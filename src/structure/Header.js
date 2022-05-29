import React from 'react';
import iceCreamImg from '../assets/img/ultimate-ice-cream.svg';
import FocusLink from './FocusLink';

const Header = () => {
  return (
    <header>
      <h1>
        <img src={iceCreamImg} alt="" />
        Ultimate Ice Cream
      </h1>
      <nav>
        <FocusLink to={{ pathname: '/', state: { focus: true } }} exact="true">
          Menu
        </FocusLink>
        <FocusLink to="/ice-creams">Add Ice Cream</FocusLink>
      </nav>
    </header>
  );
};

export default Header;
