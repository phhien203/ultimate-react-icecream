import React from 'react';
import IceCreamImage from './IceScreamImage';
import FocusLink from '../structure/FocusLink';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const IceCreamCard = ({ children, to, iceCreamId, heading: heading }) => {
  const navigate = useNavigate();

  const onItemClickHandler = () => {
    navigate(to, { focus: true });
  };

  return (
    <section className="card" onClick={onItemClickHandler}>
      <div className="image-container">
        <IceCreamImage iceCreamId={iceCreamId} />
      </div>
      <div className="text-container">
        <h3>
          <FocusLink
            to={to}
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            {heading}
          </FocusLink>
        </h3>
        {children}
      </div>
    </section>
  );
};

IceCreamCard.propTypes = {
  iceCreamId: PropTypes.number.isRequired,
  heading: PropTypes.string.isRequired,
  children: PropTypes.node,
  to: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      pathname: PropTypes.string.isRequired,
      focus: PropTypes.bool,
    }),
  ]),
};

export default IceCreamCard;
