import { useState } from 'react';
import { useFormInput } from './hooks/useFormInput';
import { employeeService } from './services/employeeService';
import { employeeRepo, type DepartmentGroup } from './apis/employeeRepo';

const Employees = () => {

  const [departmentGroups, setDepartmentGroups] = useState<DepartmentGroup[]>(employeeRepo.getEmployeesByDepartment());

  const departments = employeeRepo.getDepartments();

  const firstName = useFormInput('');
  const department = useFormInput(departments[0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const isValid = firstName.validate((val) => {
      if (val.trim().length < 3) return 'First name needs at least 3 characters';
      return '';
    });

    if (!isValid) return;

    const result = employeeService.createEmployee(firstName.value, department.value);

    if (!result.success) {
      if (result.field === 'firstName') firstName.validate(() => result.message!);
      if (result.field === 'department') department.validate(() => result.message!);
      return;
    }

    setDepartmentGroups(employeeRepo.getEmployeesByDepartment());
    firstName.reset();
    department.reset(departments[0]);
  };

  return (
    <main>
      <h2>Employee List</h2>

      <div>
        {departmentGroups.map((group) => (
          group.employees.length > 0 && (
            <div key={group.department}>
              <h3>{group.department}</h3>
              {group.employees.map((emp, i) => (
                <p key={i}>{emp.firstName} {emp.lastName}</p>
              ))}
            </div>
          )
        ))}
      </div>

      <div>
        <h3>Add Employee</h3>
        <form onSubmit={handleSubmit}>

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
            <label>Department</label>
            <select value={department.value} onChange={department.handleChange}>
              {departments.map((dept) => (
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