import { NavLink } from 'react-router-dom';
import { SignedIn, SignedOut, UserButton, SignInButton } from '@clerk/clerk-react';

const Navbar = () => {
  return (
    <nav>
      <NavLink to="/employees">Employees</NavLink>
      {' | '}
      <NavLink to="/organization">Organization</NavLink>
      <SignedOut>
        <SignInButton mode="modal" />
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </nav>
  );
};

export default Navbar;