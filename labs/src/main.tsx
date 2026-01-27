import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { useState } from 'react';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)


const Main = () => {

  const [employees, setEmployees] = useState([
  { firstName: 'Zoë', lastName: 'Robins', department: 'Administration' },
  { firstName: 'Madeleine', lastName: 'Madden', department: 'Administration' },
  { firstName: 'Josha', lastName: 'Sadowski', department: 'Audit' },
  { firstName: 'Kate', lastName: 'Fleetwood', department: 'Audit' },
  { firstName: 'Priyanka', lastName: 'Bose', department: 'Banking Operations' },
  { firstName: 'Hammed', lastName: 'Animashuan', department: 'Banking Operations' },
  { firstName: 'Álvaro', lastName: 'Morte', department: 'Banking Operations' },
  { firstName: 'Taylor', lastName: 'Napier', department: 'Banking Operations' },
  { firstName: 'Alan', lastName: 'Simmonds', department: 'Banking Operations' },
  { firstName: 'Gil', lastName: 'Cardinal', department: 'Communications' },
  { firstName: 'Richard J.', lastName: 'Lewis', department: 'Communications' },
  { firstName: 'Randy', lastName: 'Bradshaw', department: 'Corporate Services' },
  { firstName: 'Tracey', lastName: 'Cook', department: 'Corporate Services' },
  { firstName: 'Lubomir', lastName: 'Mykytiuk', department: 'Corporate Services' },
  { firstName: 'Dakota', lastName: 'House', department: 'Facilities' },
  { firstName: 'Lori Lea', lastName: 'Okemah', department: 'Facilities' },
  { firstName: 'Renae', lastName: 'Morrisseau', department: 'Facilities' },
  { firstName: 'Rick', lastName: 'Belcourt', department: 'Facilities' },
  { firstName: 'Selina', lastName: 'Hanusa', department: 'Financial Services' },
  { firstName: 'Buffy', lastName: 'Gaudry', department: 'Financial Services' },
  { firstName: 'Shaneen Ann', lastName: 'Fox', department: 'Financial Services' },
  { firstName: 'Allan', lastName: 'Little', department: 'Financial Services' },
  { firstName: 'Danny', lastName: 'Rabbit', department: 'Financial Services' },
  { firstName: 'Jesse Ed', lastName: 'Azure', department: 'Human Resources' },
  { firstName: 'Stacy', lastName: 'Da Silva', department: 'Human Resources' },
  { firstName: 'Vladimír', lastName: 'Valenta', department: 'Human Resources' },
  { firstName: 'Samone', lastName: 'Sayeses-Whitney', department: 'Human Resources' },
  { firstName: 'Paul', lastName: 'Coeur', department: 'Human Resources' },
  { firstName: 'Graham', lastName: 'Greene', department: 'Information Technology' },
  { firstName: 'Sandika', lastName: 'Evergreen', department: 'Information Technology' },
  { firstName: 'Jennifer', lastName: 'Rodriguez', department: 'Information Technology' },
  { firstName: 'Aiyana', lastName: 'Littlebear', department: 'IT Technician' },
  { firstName: 'Inara', lastName: 'Thunderbird', department: 'IT Technician' },
  { firstName: 'Kaya', lastName: 'Runningbrook', department: 'IT Technician' },
  { firstName: 'Elara', lastName: 'Firehawk', department: 'IT Technician' },
  { firstName: 'Siona', lastName: 'Moonflower', department: 'IT Technician' },
  { firstName: 'Kaiyu', lastName: 'Greywolf', department: 'IT Technician' },
  { firstName: 'Ayawamat', lastName: 'Nightwind', department: 'IT Technician' },
  { firstName: 'Tala', lastName: 'Braveheart', department: 'IT Technician' },
  { firstName: 'Iniko', lastName: 'Stonebear', department: 'IT Technician' },
  { firstName: 'Onatah', lastName: 'Redhawk', department: 'IT Technician' },
]);

  const [formData, setFormData] = useState({ firstName: '', department: 'Administration' });
  const [error, setError] = useState('');

  const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (formData.firstName.length < 3) {
            setError('First name must be at least 3 characters long');
            return;
        }

        setEmployees([...employees, { firstName: formData.firstName, lastName: '', department: formData.department }]);

        setFormData({ firstName: '', department: 'Administration' });
        setError('');
    };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

  return (
    <main>
      <h2>Employee List</h2>
      <div>
        {employees.map((employee, index) => (
          <div key={index}>
            {employee.firstName} {employee.lastName} - {employee.department}
          </div>
          ))}
      </div>

      <div>
        <h3>Add New Employee</h3>
        <form onSubmit={handleFormSubmit}>
          <div>
            <label htmlFor="firstName">First Name:</label>
            <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                required
            />
          </div>

          <div>
          <label htmlFor="department">Department:</label>
          <select
            id="department"
            name="department"
            value={formData.department}
            onChange={handleInputChange}
            >
            <option value="Administration">Administration</option>
            <option value="Audit">Audit</option>
            <option value="Banking Operations">Banking Operations</option>
            <option value="Communications">Communications</option>
            <option value="Corporate Services">Corporate Services</option>
            <option value="Facilities">Facilities</option>
            <option value="Human Resources">Human Resources</option>
            <option value="Information Technology">Information Technology</option>
            <option value="IT Technician">IT Technician</option>
            </select>
          </div>

          {error && <p style={{ color: 'red' }}>{error}</p>}

          <button type="submit">Add Employee</button>

        </form>
      </div>
    </main>
  );
};

export default Main;