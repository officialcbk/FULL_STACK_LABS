import { employeeRepo } from '../apis/employeeRepo';
import type { DepartmentGroup } from '../apis/employeeRepo';

export const employeeService = {
  getEmployeesByDepartment: async (): Promise<DepartmentGroup[]> => {
    return employeeRepo.getEmployeesByDepartment();
  },

  createEmployee: async (
    firstName: string,
    lastName: string,
    department: string,
    token: string
  ): Promise<{ success: boolean; field?: string; message?: string }> => {
    if (firstName.trim().length < 3) {
      return { success: false, field: 'firstName', message: 'First name needs at least 3 characters' };
    }
    if (!department) {
      return { success: false, field: 'department', message: 'Department is required' };
    }

    try {
      await employeeRepo.addEmployee(
        { firstName: firstName.trim(), lastName: lastName.trim(), department },
        token
      );
      return { success: true };
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      return { success: false, field: 'general', message };
    }
  },
};