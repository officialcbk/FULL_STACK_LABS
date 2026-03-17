import { useState, useEffect } from 'react';
import { useFormInput } from './hooks/useFormInput';
import { employeeService } from './services/employeeService';
import type { DepartmentGroup } from './apis/employeeRepo';

// Departments list for the dropdown — fetched once from backend
const DEPARTMENTS = [
  'Administration',
  'Audit',
  'Banking Operations',
  'Communications',
  'Corporate Services',
  'Facilities',
  'Financial Services',
  'Human Resources',
  'Information Technology',
  'IT Technician',
];

const Employees = () => {
  const [departmentGroups, setDepartmentGroups] = useState<DepartmentGroup[]>([]);
  const [loadError, setLoadError] = useState('');

  const firstName = useFormInput('');
  const lastName = useFormInput('');
  const department = useFormInput(DEPARTMENTS[0]);

  // Load employees on mount
  useEffect(() => {
    const load = async () => {
      try {
        const data = await employeeService.getEmployeesByDepartment();
        setDepartmentGroups(data);
      } catch {
        setLoadError('Could not load employees. Is the backend running?');
      }
    };
    void load();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const isValid = firstName.validate((val) => {
      if (val.trim().length < 3) return 'First name needs at least 3 characters';
      return '';
    });

    if (!isValid) return;

    const result = await employeeService.createEmployee(
      firstName.value,
      lastName.value,
      department.value
    );

    if (!result.success) {
      if (result.field === 'firstName') firstName.validate(() => result.message ?? '');
      if (result.field === 'department') department.validate(() => result.message ?? '');
      return;
    }

    // Refresh list from backend after successful add
    const updated = await employeeService.getEmployeesByDepartment();
    setDepartmentGroups(updated);

    firstName.reset();
    lastName.reset();
    department.reset(DEPARTMENTS[0]);
  };

  return (
    <main>
      <h2>Employee List</h2>

      {loadError && <p style={{ color: 'red' }}>{loadError}</p>}

      <div>
        {departmentGroups.map((group) =>
          group.employees.length > 0 && (
            <div key={group.department}>
              <h3>{group.department}</h3>
              {group.employees.map((emp, i) => (
                <p key={i}>{emp.firstName} {emp.lastName}</p>
              ))}
            </div>
          )
        )}
      </div>

      <div>
        <h3>Add Employee</h3>
        <form onSubmit={(e) => { void handleSubmit(e); }}>

          <div>
            <label>First Name</label>
            <input
              type="text"
              value={firstName.value}
              onChange={firstName.handleChange}
            />
            {firstName.message && <p style={{ color: 'red' }}>{firstName.message}</p>}
          </div>

          <div>
            <label>Last Name</label>
            <input
              type="text"
              value={lastName.value}
              onChange={lastName.handleChange}
            />
          </div>

          <div>
            <label>Department</label>
            <select value={department.value} onChange={department.handleChange}>
              {DEPARTMENTS.map((dept) => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
            {department.message && <p style={{ color: 'red' }}>{department.message}</p>}
          </div>

          <button type="submit">Add</button>

        </form>
      </div>
    </main>
  );
};

export default Employees;
