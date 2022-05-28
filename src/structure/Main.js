import React, { useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

const Main = ({ children, headingText, headingLevel = 2 }) => {
  const H = `h${headingLevel}`;
  const heading = useRef(null);
  const location = useLocation();

  useEffect(() => {
    if (location.state && location.state.focus) {
      heading.current.focus();
    }
    window.scrollTo(0, 0);
  }, [location.state]);

  return (
    <main>
      <Helmet>
        <title>{headingText} | Ultimate Ice Cream</title>
      </Helmet>
      <H className="main-heading" ref={heading} tabIndex="-1">
        {headingText}
      </H>
      {children}
    </main>
  );
};

Main.propTypes = {
  headingText: PropTypes.string.isRequired,
  headingLevel: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  children: PropTypes.node.isRequired,
};

export default Main;
