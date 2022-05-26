import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

const LoaderMessage = ({ isLoading, doneMessage, loadingMessage }) => {
  const [showLoadingMessage, setShowLoadingMessage] = useState(false);
  const [showDoneMessage, setShowDoneMessage] = useState(false);
  const isLoadingPreviousValue = useRef(null);

  useEffect(() => {
    let timeout;
    let showDoneDelay;
    if (isLoading) {
      timeout = setTimeout(() => {
        setShowLoadingMessage(true);
      }, 400);
    } else {
      if (isLoadingPreviousValue.current) {
        setShowDoneMessage(true);
        showDoneDelay = setTimeout(() => {
          setShowDoneMessage(false);
        }, 300);
      }
    }

    isLoadingPreviousValue.current = isLoading;

    return () => {
      clearTimeout(timeout);
      clearTimeout(showDoneDelay);
      setShowLoadingMessage(false);
      setShowDoneMessage(false);
    };
  }, [isLoading]);

  return (
    <div aria-live="assertive" aria-atomic="true">
      {showLoadingMessage && <p className="loading">{loadingMessage}</p>}
      {showDoneMessage && <p className="visually-hidden">{doneMessage}</p>}
    </div>
  );
};

LoaderMessage.propTypes = {
  loadingMessage: PropTypes.string.isRequired,
  doneMessage: PropTypes.string.isRequired,
  isLoading: PropTypes.bool,
};

export default LoaderMessage;
