import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate, useParams } from 'react-router-dom';
import { getMenuItem } from '../data/iceCreamData';
import LoaderMessage from '../structure/LoaderMessage';

const EditIceCream = () => {
  const [menuItem, setMenuItem] = useState({});
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
          navigate('/', { replace: true });
        }
      });
  }, [menuItemId, navigate]);

  return (
    <main>
      <Helmet>
        <title>Update this beauty | Ultimate Ice Cream</title>
      </Helmet>
      <h1 className="main-heading">Update this beauty</h1>
      <LoaderMessage
        loadingMessage="Loading ice cream"
        doneMessage="Ice cream loaded."
        isLoading={isLoading}
      />
    </main>
  );
};

export default EditIceCream;
