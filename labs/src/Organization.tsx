import { useState } from 'react';
import type { Role } from './Role';
import { roleRepo } from './apis/roleRepo';
import AddRole from './components/AddRole';

const Organization = () => {
  const [roles, setRoles] = useState<Role[]>(roleRepo.getRoles());

  const refreshRoles = () => {
    setRoles(roleRepo.getRoles());
  };

  return (
    <main>
      <h2>Organization</h2>

      <div>
        {roles.map((person) => (
          <div key={`${person.firstName}-${person.lastName}-${person.role}`}>
            {person.firstName} {person.lastName} - {person.role}
          </div>
        ))}
      </div>

      <AddRole onRoleAdded={refreshRoles} />
    </main>
  );
};

export default Organization;