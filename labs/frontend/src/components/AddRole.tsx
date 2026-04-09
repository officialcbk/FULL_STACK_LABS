import { useAuth } from '@clerk/clerk-react';
import { useRoleForm } from '../hooks/useRoleForm';

interface AddRoleProps {
  onRoleAdded: () => void;
}

const AddRole = ({ onRoleAdded }: AddRoleProps) => {
  const { getToken } = useAuth(); //  get token here
  const {
    firstName, lastName, roleTitle,
    firstNameError, lastNameError, roleError,
    handleFirstNameChange, handleLastNameChange, handleRoleChange,
    handleSubmit,
  } = useRoleForm(onRoleAdded);

  const onSubmit = async (e: React.FormEvent) => {
    const token = await getToken() ?? ''; //  fetch token on submit
    await handleSubmit(e, token);         //  pass it through
  };

  return (
    <section>
      <h3>Add Role</h3>
      <form onSubmit={(e) => { void onSubmit(e); }}>
        <div>
          <label>First Name</label>
          <input type="text" value={firstName} onChange={handleFirstNameChange} />
          {firstNameError && <p style={{ color: 'red' }}>{firstNameError}</p>}
        </div>
        <div>
          <label>Last Name</label>
          <input type="text" value={lastName} onChange={handleLastNameChange} />
          {lastNameError && <p style={{ color: 'red' }}>{lastNameError}</p>}
        </div>
        <div>
          <label>Role</label>
          <input type="text" value={roleTitle} onChange={handleRoleChange} />
          {roleError && <p style={{ color: 'red' }}>{roleError}</p>}
        </div>
        <button type="submit">Add Role</button>
      </form>
    </section>
  );
};

export default AddRole;