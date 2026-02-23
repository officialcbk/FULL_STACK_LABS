import { useState } from 'react';

function useFormInput(initialValue: string, validate: (value: string) => string | null) {
  const [value, setValue] = useState(initialValue);  
  const [error, setError] = useState('');  

  // Update the value of the input field
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  // Validate the input and set an error message if invalid
  const validateInput = () => {
    const validationError = validate(value); 
    setError(validationError || ''); 
    return validationError;  
  };

  return {
    value,
    error,
    handleChange,
    validateInput,
  };
}

export default useFormInput;