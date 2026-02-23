import employeeRepo from '../apis/employeeRepo'; 

const employeeService = {
  // Method for creating an employee with validation
  createEmployee: async (employee: { firstName: string, lastName: string,department: string }) => {

    const validDepartments = [
      'Administration', 
      'Audit', 
      'Banking Operations', 
      'Communications', 
      'Corporate Services', 
      'Facilities', 
      'Human Resources', 
      'Information Technology', 
      'IT Technician'
    ]; 

    // Validate department exists
    if (!validDepartments.includes(employee.department)) {
      return 'Department does not exist';  
    }

    // Validate first name (at least 3 characters)
    if (employee.firstName.length < 3) {
      return 'First name must be at least 3 characters long';  
    }

    // Validation to add employee
    return employeeRepo.addEmployee(employee);  
  },
};

export default employeeService;