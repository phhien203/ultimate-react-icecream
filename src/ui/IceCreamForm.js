import React, { useEffect, useRef, useState } from 'react';
import IceCreamImage from './IceScreamImage';
import ErrorContainer from './ErrorContainer';
import useUniqueIds from '../hooks/useUniqueIds';
import { useValidation } from '../hooks/useValidation';
import {
  validateDescription,
  validatePrice,
  validateQuantity,
} from '../utils/validators';
import PropTypes from 'prop-types';

const IceCreamForm = ({
  iceCream = {},
  description = '',
  inStock = false,
  quantity = '0',
  price = '0.00',
  onSubmit,
  onDelete,
}) => {
  const [iceCreamFormData, setIceCreamFormData] = useState({
    description: '',
    inStock: true,
    quantity: '0',
    price: '0.00',
  });
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const formRef = useRef(null);

  const [
    descriptionId,
    descriptionErrorId,
    inStockId,
    quantityId,
    quantityErrorId,
    priceId,
    priceErrorId,
  ] = useUniqueIds(7);

  const [priceError, priceErrorConfig] = useValidation(
    iceCreamFormData.price,
    priceErrorId,
    hasSubmitted,
    validatePrice,
    true
  );
  const [quantityError, quantityErrorConfig] = useValidation(
    iceCreamFormData.quantity,
    quantityErrorId,
    hasSubmitted,
    validateQuantity,
    false,
    iceCreamFormData.inStock
  );
  const [descriptionError, descriptionErrorConfig] = useValidation(
    iceCreamFormData.description,
    descriptionErrorId,
    hasSubmitted,
    validateDescription,
    true
  );

  useEffect(() => {
    setIceCreamFormData({
      description,
      inStock,
      price: price,
      quantity: quantity.toString(),
    });
  }, [description, inStock, quantity, price]);

  const onChangeHandler = (e) => {
    const newIceCreamFormData = {
      ...iceCreamFormData,
      [e.target.name]:
        e.target.type === 'checkbox' ? e.target.checked : e.target.value,
    };

    if (e.target.name === 'quantity') {
      newIceCreamFormData.inStock = e.target.value !== '0';
    }

    if (e.target.name === 'inStock' && !e.target.checked) {
      newIceCreamFormData.quantity = '0';
    }

    setIceCreamFormData(newIceCreamFormData);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();

    setHasSubmitted(true);

    if (priceError || quantityError || descriptionError) {
      setTimeout(() => {
        const errorControl = formRef.current.querySelector(
          '[aria-invalid="true"]'
        );
        errorControl.focus();
      });
      return;
    }

    const newIceCreamFormData = {
      ...iceCreamFormData,
      iceCream,
      price: parseFloat(iceCreamFormData.price),
      quantity: parseInt(iceCreamFormData.quantity),
    };

    onSubmit(newIceCreamFormData);
  };

  return (
    <div className="form-frame">
      <div className="image-container">
        <IceCreamImage iceCreamId={iceCream.id} />
      </div>
      <div className="form-container">
        <dl>
          <dt>Name :</dt>
          <dd>{iceCream.name}</dd>
        </dl>
        <form onSubmit={onSubmitHandler} ref={formRef} noValidate>
          {/*description*/}
          <label htmlFor={descriptionId}>
            Description<span aria-hidden="true">*</span> :
          </label>
          <ErrorContainer
            hasSubmitted={hasSubmitted}
            errorText={descriptionError}
            errorId={descriptionErrorId}
          >
            <textarea
              id={descriptionId}
              name="description"
              rows="3"
              value={iceCreamFormData.description}
              onChange={onChangeHandler}
              {...descriptionErrorConfig}
            ></textarea>
          </ErrorContainer>

          {/*in stock*/}
          <label htmlFor={inStockId}>In stock :</label>
          <div className="checkbox-wrapper">
            <input
              id={inStockId}
              type="checkbox"
              name="inStock"
              checked={iceCreamFormData.inStock}
              onChange={onChangeHandler}
            />
            <div className="checkbox-wrapper-checked"></div>
          </div>

          {/*quantity*/}
          <label htmlFor={quantityId}>Quantity :</label>
          <ErrorContainer
            hasSubmitted={hasSubmitted}
            errorText={quantityError}
            errorId={quantityErrorId}
          >
            <select
              id={quantityId}
              name="quantity"
              value={iceCreamFormData.quantity}
              onChange={onChangeHandler}
              {...quantityErrorConfig}
            >
              <option value="0">0</option>
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="30">30</option>
              <option value="40">40</option>
              <option value="50">50</option>
            </select>
          </ErrorContainer>

          {/*price*/}
          <label htmlFor={priceId}>
            Price<span aria-hidden="true">*</span> :
          </label>
          <ErrorContainer
            hasSubmitted={hasSubmitted}
            errorText={priceError}
            errorId={priceErrorId}
          >
            <input
              id={priceId}
              type="number"
              step="0.01"
              name="price"
              value={iceCreamFormData.price}
              onChange={onChangeHandler}
              {...priceErrorConfig}
            />
          </ErrorContainer>

          <div className="button-container">
            <button className="ok" type="submit">
              Save
            </button>

            {onDelete && (
              <button className="warning" type="button" onClick={onDelete}>
                Delete
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

IceCreamForm.propTypes = {
  iceCream: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  }),
  description: PropTypes.string,
  inStock: PropTypes.bool,
  quantity: PropTypes.string,
  price: PropTypes.string,
  onSubmit: PropTypes.func,
  onDelete: PropTypes.func,
};

export default IceCreamForm;
