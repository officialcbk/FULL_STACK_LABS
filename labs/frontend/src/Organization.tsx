import { useState, useEffect } from 'react';
import type { Role } from './Role';
import { roleService } from './services/roleService';
import AddRole from './components/AddRole';
import { SignedIn, SignedOut, SignInButton } from '@clerk/clerk-react';

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
      
      <SignedIn>
      <AddRole onRoleAdded={refreshRoles} />
      </SignedIn>

      <SignedOut>

        <div>
          <p>You must be logged in to add roles.</p>
          <SignInButton mode="modal">Log in</SignInButton>
        </div>
        
      </SignedOut>

    </main>
  );
};

export default Organization;
