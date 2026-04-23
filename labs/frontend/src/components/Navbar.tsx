import { NavLink } from 'react-router-dom';
import { SignedIn, SignedOut, UserButton, useClerk } from '@clerk/clerk-react';

const Navbar = () => {
  const { openSignIn } = useClerk();

  return (
    <nav>
      <NavLink to="/employees">Employees</NavLink>
      {' | '}
      <NavLink to="/organization">Organization</NavLink>
      {' | '}
      <SignedOut>
        <button type="button" onClick={() => openSignIn()}>Log in</button>
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </nav>
  );
};

export default Navbar;