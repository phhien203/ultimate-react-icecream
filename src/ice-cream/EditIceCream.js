import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  deleteMenuItem,
  getMenuItem,
  updateMenuItem,
} from '../data/iceCreamData';
import LoaderMessage from '../structure/LoaderMessage';
import Main from '../structure/Main';
import IceCreamForm from './IceCreamForm';

const EditIceCream = () => {
  const [menuItem, setMenuItem] = useState({
    iceCream: {},
    description: '',
    inStock: true,
    quantity: '0',
    price: '0.00',
  });
  const [isLoading, setIsLoading] = useState(false);

  const { menuItemId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    getMenuItem(menuItemId)
      .then((menuItem) => {
        setMenuItem(menuItem);
        setIsLoading(false);
      })
      .catch((err) => {
        if (err.response.status === 404) {
          navigate('/', { replace: true, focus: true });
        }
      });
  }, [menuItemId, navigate]);

  const onSubmitHandler = (iceCreamData) => {
    const newMenuItem = {
      ...iceCreamData,
      price: parseFloat(iceCreamData.price),
      quantity: parseInt(iceCreamData.quantity),
      id: +menuItemId,
    };

    updateMenuItem(newMenuItem).then(() => {
      navigate('/', { focus: true });
    });
  };

  const onDeleteEventHandler = () => {
    deleteMenuItem(menuItemId).then(() => {
      navigate('/', { focus: true, replace: true });
    });
  };

  return (
    <Main headingText="Update this beauty">
      <LoaderMessage
        loadingMessage="Loading ice cream"
        doneMessage="Ice cream loaded."
        isLoading={isLoading}
      />
      {!isLoading && (
        <IceCreamForm
          {...menuItem}
          onSubmit={onSubmitHandler}
          onDelete={onDeleteEventHandler}
        />
      )}
    </Main>
  );
};

export default EditIceCream;
