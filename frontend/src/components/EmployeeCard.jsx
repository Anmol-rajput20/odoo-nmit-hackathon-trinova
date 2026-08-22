import { useNavigate } from "react-router-dom";

function EmployeeCard({ employee }) {
  const navigate = useNavigate();

  const getStatusClass = () => {
    if (employee.status === "Present") return "status-green";
    if (employee.status === "Leave") return "status-blue";
    return "status-yellow";
  };

  return (
    <div
      className="employee-card"
      onClick={() => navigate(`/employees/${employee.id}`)}
    >
      <div className="employee-card-top">
        <img
          src={employee.image}
          alt={employee.name}
          className="employee-avatar"
        />

        <span className={`status-dot ${getStatusClass()}`} />
      </div>

      <div className="employee-name">
        {employee.name}
      </div>

      <div className="employee-role">
        {employee.designation}
      </div>
    </div>
  );
}

export default EmployeeCard;