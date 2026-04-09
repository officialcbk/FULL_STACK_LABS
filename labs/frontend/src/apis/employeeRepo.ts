import type { Employee } from "../Employee"

export interface DepartmentGroup {
  department: string;
  employees: Employee[];
}

const BASE_URL = 'http://localhost:3000/api/employees';

export const employeeRepo = {
  getEmployeesByDepartment: async (): Promise<DepartmentGroup[]> => {
    const res = await fetch(BASE_URL);
    if (!res.ok) throw new Error('Failed to fetch employees');
    return res.json() as Promise<DepartmentGroup[]>;
  },

  addEmployee: async (emp: Employee, token: string): Promise<void> => {
    const res = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(emp),
    });
    if (!res.ok) {
      const err = await res.json() as { message?: string };
      throw new Error(err.message ?? 'Failed to add employee');
    }
  },
};