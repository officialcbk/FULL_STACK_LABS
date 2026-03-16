import { employeeRepository } from '../repositories/employeeRepository.js';
import type { Employee } from '../models/Employee.js';

export const employeeService = {
  getEmployeesGrouped: () => {
    const all = employeeRepository.findAll();
    const depts = employeeRepository.findDepartments();
    return depts.map(dept => ({
      department: dept,
      employees: all.filter(e => e.department === dept)
    }));
  },

  createEmployee: (firstName: string, lastName: string, department: string) => {
    if (!firstName || firstName.trim().length < 3) {
      throw new Error('First name needs at least 3 characters');
    }
    if (!department) {
      throw new Error('Department is required');
    }
    const newEmp: Employee = {
      firstName: firstName.trim(),
      lastName: lastName?.trim() ?? '',
      department
    };
    return employeeRepository.save(newEmp);
  }
};