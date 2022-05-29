import { useEffect, useState } from 'react';

export const useValidation = (value, validatorFn, compareValue = null) => {
  const [error, setError] = useState('');

  useEffect(() => {
    setError(validatorFn(value, compareValue));
  }, [value, validatorFn, compareValue]);

  return error;
};
