import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { addMenuItem, getIceCream, } from '../../data/iceCreamData';
import LoaderMessage from '../../structure/LoaderMessage';
import Main from '../../structure/Main';
import IceCreamForm from '../../ui/IceCreamForm';

const AddIceCream = () => {
  const [iceCream, setIceCream] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    getIceCream(searchParams.get('iceCreamId'))
      .then((iceCream) => {
        setIceCream(iceCream);
        setIsLoading(false);
      })
      .catch((err) => {
        if (err.response.status === 404) {
          navigate('/', { replace: true, focus: true });
        }
      });
  }, [searchParams, navigate]);

  const onSubmitHandler = (menuItemData) => {
    addMenuItem(menuItemData).then(() => {
      navigate('/', { focus: true });
    });
  };

  return (
    <Main headingText="Add some goodness to the menu">
      <LoaderMessage
        loadingMessage="Loading ice cream"
        doneMessage="Ice cream loaded."
        isLoading={isLoading}
      />
      {!isLoading && (
        <IceCreamForm iceCream={iceCream} onSubmit={onSubmitHandler} />
      )}
    </Main>
  );
};

export default AddIceCream;
