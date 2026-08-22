import { useNavigate } from "react-router-dom";

export default function EmployeeTable({
  employees,
}) {
  const navigate = useNavigate();

  return (
    <div className="wire-card table-wrapper">

      <table>

        <thead>
          <tr>
            <th>Employee</th>
            <th>Department</th>
            <th>Job Position</th>
            <th>Location</th>
            <th>Monthly Wage</th>
            <th>Status</th>
            <th />
          </tr>
        </thead>

        <tbody>

          {employees.map((employee) => (

            <tr
              key={employee.id}
              onClick={() =>
                navigate(
                  `/profile/${employee.id}`
                )
              }
            >

              <td>
                <strong>
                  {employee.name}
                </strong>

                <small>
                  {employee.id}
                </small>
              </td>

              <td>
                {employee.department}
              </td>

              <td>
                {employee.position}
              </td>

              <td>
                {employee.location}
              </td>

              <td>
                ₹{employee.wage.toLocaleString("en-IN")}
              </td>

              <td>
                <span className="status active">
                  Active
                </span>
              </td>

              <td>
                <button
                  className="arrow-button"
                  onClick={(e) => {
                    e.stopPropagation();

                    navigate(
                      `/profile/${employee.id}`
                    );
                  }}
                >
                  →
                </button>
              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}