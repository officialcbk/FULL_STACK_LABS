import { useState, useEffect } from 'react';
import type { Role } from './Role';
import { roleService } from './services/roleService';
import AddRole from './components/AddRole';
import { SignedIn, SignedOut, SignInButton } from '@clerk/clerk-react';
import { useClerk } from '@clerk/clerk-react';

const Organization = () => {
  const [roles, setRoles] = useState<Role[]>([]);
  const [loadError, setLoadError] = useState('');
  const { openSignIn } = useClerk();

  const loadRoles = async () => {
    try {
      const data = await roleService.getRoles();
      setRoles(data);
    } catch {
      setLoadError('Could not load roles. Is the backend running?');
    }
  };

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

      <SignedOut>
        <div>
          <p>You must be logged in to add roles.</p>
          <button type="button" onClick={() => openSignIn()}>Log in</button>
        </div>
      </SignedOut>

      <SignedIn>
        <AddRole onRoleAdded={refreshRoles} />
      </SignedIn>

    </main>
  );
};

export default Organization;