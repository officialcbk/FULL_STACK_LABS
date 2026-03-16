import { useState } from 'react';
import { roleService } from '../services/roleService';

export const useRoleForm = (onSuccess: () => void) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName]   = useState('');
  const [roleTitle, setRoleTitle] = useState('');

  const [firstNameError, setFirstNameError] = useState('');
  const [lastNameError, setLastNameError]  = useState('');
  const [roleError, setRoleError] = useState('');

  const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFirstName(e.target.value);
    setFirstNameError('');
  };

  const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLastName(e.target.value);
    setLastNameError('');
  };

  const handleRoleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRoleTitle(e.target.value);
    setRoleError('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setFirstNameError('');
    setLastNameError('');
    setRoleError('');

    if (firstName.trim().length < 3) {
      setFirstNameError('First name needs at least 3 characters');
      return;
    }

    const result = roleService.createRole(firstName, lastName, roleTitle);

    if (!result.success) {
      if (result.field === 'firstName') {
        setFirstNameError(result.message || '');
      }
      if (result.field === 'role') {
        setRoleError(result.message || '');
      }
      return;
    }

    setFirstName('');
    setLastName('');
    setRoleTitle('');

    onSuccess();
  };

  return {
    firstName,
    lastName,
    roleTitle,
    firstNameError,
    lastNameError,
    roleError,
    handleFirstNameChange,
    handleLastNameChange,
    handleRoleChange,
    handleSubmit,
  };
};
