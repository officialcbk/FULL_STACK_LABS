import { useState } from 'react';

export const useFormInput = (startValue: string) => {
  const [value, setValue] = useState(startValue);
  const [message, setMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setValue(e.target.value);
  };

  const validate = (check: (val: string) => string) => {
    const result = check(value);
    setMessage(result);
    return result === '';
  };

  const reset = (newValue: string = '') => {
    setValue(newValue);
    setMessage('');
  };

  return { value, message, handleChange, validate, reset };
};