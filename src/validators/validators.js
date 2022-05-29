export const validateDescription = (description) =>
  description ? null : 'You mush enter description';

export const validatePrice = (price) => {
  if (!price || parseFloat(price) <= 0) {
    return 'Price must be greater than zero';
  }
  if (!/^\d+(\.\d\d)$/.test(`${price}`)) {
    return 'Price must be a number';
  }
  return null;
};

export const validateQuantity = (quantity, inStock) =>
  inStock && parseInt(quantity) === 0
    ? 'In stock item must have a quantity'
    : null;
