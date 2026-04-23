import { useState, useEffect } from 'react';
import type { Role } from './Role';
import { roleService } from './services/roleService';
import AddRole from './components/AddRole';
import { SignedIn, SignedOut, SignInButton } from '@clerk/clerk-react';
import { useIsAdmin } from './hooks/useIsAdmin';

const Organization = () => {
  const [roles, setRoles] = useState<Role[]>([]);
  const [loadError, setLoadError] = useState('');
  const isAdmin = useIsAdmin();

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
      {isAdmin ? (
          // Admin sees the AddRole form
          <AddRole onRoleAdded={refreshRoles} />
        ) : (
          // Logged in but not admin: show message
          <p>You must be an administrator to add roles.</p>
        )}
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
