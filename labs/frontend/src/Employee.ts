export interface Employee {
  firstName: string;
  lastName: string;
  department: string;
}

export interface DepartmentGroup {
  department: string;
  employees: Employee[];
}
