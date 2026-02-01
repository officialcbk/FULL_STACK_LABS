import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav>
      <NavLink to="/employees">Employees</NavLink>
      {' | '}
      <NavLink to="/organization">Organization</NavLink>
    </nav>
  );
};

export default Navbar;