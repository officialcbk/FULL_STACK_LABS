interface EmployeeProps {
  name: string;
  position: string;
}

const Employee = ({ name, position }: EmployeeProps) => {
  return (
    <div className="employee-card">
      <h3>{name}</h3>
      <p>{position}</p>
    </div>
  );
};

export default Employee;