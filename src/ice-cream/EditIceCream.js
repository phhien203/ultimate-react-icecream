import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate, useParams } from 'react-router-dom';
import { getMenuItem } from '../data/iceCreamData';
import LoaderMessage from '../structure/LoaderMessage';
import '../styles/form-spacer.scss';
import IceCreamImage from './IceScreamImage';

const EditIceCream = () => {
  const [menuItem, setMenuItem] = useState({
    price: '0.00',
    inStock: true,
    quantity: '0',
    description: '',
    iceCream: {},
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
      {!isLoading && (
        <div className="form-frame">
          <div className="image-container">
            <IceCreamImage iceCreamId={menuItem.iceCream.id} />
          </div>
          <div className="form-container">
            <dl>
              <dt>Name :</dt>
              <dd>{menuItem.iceCream.name}</dd>
            </dl>
            <form>
              <label>Description :</label>
              <textarea name="description" rows="3"></textarea>

              <label>In stock :</label>
              <div className="checkbox-wrapper">
                <input type="checkbox" name="inStock" />
                <div className="checkbox-wrapper-checked"></div>
              </div>

              <label>Quantity :</label>
              <select name="quantity">
                <option value="0">0</option>
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="30">30</option>
                <option value="40">40</option>
                <option value="50">50</option>
              </select>

              <label>Price :</label>
              <input type="number" step="0.01" name="price" />

              <div className="button-container">
                <button className="ok" type="submit">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
};

export default EditIceCream;
