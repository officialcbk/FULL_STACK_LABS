import { employeeRepo } from '../apis/employeeRepo';

export const employeeService = {
  createEmployee: (firstName: string, department: string) => {
    const validDepts = employeeRepo.getDepartments();

    if (!validDepts.includes(department)) {
      return { success: false, field: 'department', message: 'That department doesnt exist' };
    }

    if (firstName.trim().length < 3) {
      return { success: false, field: 'firstName', message: 'First name needs at least 3 characters' };
    }

    employeeRepo.addEmployee({ firstName: firstName.trim(), lastName: '', department });
    return { success: true };
  },
};