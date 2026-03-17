import { useState, useEffect } from 'react';
import type { Role } from './Role';
import { roleService } from './services/roleService';
import AddRole from './components/AddRole';

const Organization = () => {
  const [roles, setRoles] = useState<Role[]>([]);
  const [loadError, setLoadError] = useState('');

  const loadRoles = async () => {
    try {
      const data = await roleService.getRoles();
      setRoles(data);
    } catch {
      setLoadError('Could not load roles. Is the backend running?');
    }
  };

  // Load roles on mount
  useEffect(() => {
    void loadRoles();
  }, []);

  const refreshRoles = () => {
    void loadRoles();
  };

  return (
    <main>
      <h2>Organization</h2>

      {loadError && <p style={{ color: 'red' }}>{loadError}</p>}

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
