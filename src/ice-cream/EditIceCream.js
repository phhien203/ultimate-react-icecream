import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate, useParams } from 'react-router-dom';
import { getMenuItem, updateMenuItem } from '../data/iceCreamData';
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

  const onChangeHandler = (e) => {
    const newMenuItemData = {
      ...menuItem,
      [e.target.name]:
        e.target.type === 'checkbox' ? e.target.checked : e.target.value,
    };

    if (e.target.name === 'quantity') {
      newMenuItemData.inStock = e.target.value !== '0';
    }

    if (e.target.name === 'inStock' && !e.target.checked) {
      newMenuItemData.quantity = '0';
    }

    setMenuItem(newMenuItemData);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();

    const newMenuItem = {
      ...menuItem,
      price: parseFloat(menuItem.price),
      quantity: parseInt(menuItem.quantity),
    };

    updateMenuItem(newMenuItem).then(() => {
      navigate('/');
    });
  };

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
            <form onSubmit={onSubmitHandler}>
              <label>Description :</label>
              <textarea
                name="description"
                rows="3"
                value={menuItem.description}
                onChange={onChangeHandler}
              ></textarea>

              <label>In stock :</label>
              <div className="checkbox-wrapper">
                <input
                  type="checkbox"
                  name="inStock"
                  checked={menuItem.inStock}
                  onChange={onChangeHandler}
                />
                <div className="checkbox-wrapper-checked"></div>
              </div>

              <label>Quantity :</label>
              <select
                name="quantity"
                value={menuItem.quantity}
                onChange={onChangeHandler}
              >
                <option value="0">0</option>
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="30">30</option>
                <option value="40">40</option>
                <option value="50">50</option>
              </select>

              <label>Price :</label>
              <input
                type="number"
                step="0.01"
                name="price"
                value={menuItem.price}
                onChange={onChangeHandler}
              />

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
