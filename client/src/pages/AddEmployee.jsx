import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddEmployee() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    employeeId: "",
    email: "",
    mobile: "",
    department: "",
    position: "",
    manager: "",
    location: "",
    wage: "",
    joiningDate: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Required fields
    if (
      !form.name.trim() ||
      !form.employeeId.trim() ||
      !form.department.trim() ||
      !form.position.trim() ||
      !form.wage
    ) {
      alert("Please fill all required fields.");
      return;
    }

    // Get existing employees saved in browser
    const savedEmployees =
      JSON.parse(
        localStorage.getItem("employees")
      ) || [];

    // Create employee in the SAME structure
    // your EmployeeTable expects
    const newEmployee = {
      id: form.employeeId,
      name: form.name,
      email: form.email,
      mobile: form.mobile,

      department: form.department,
      position: form.position,
      manager: form.manager,
      location: form.location,

      wage: Number(form.wage),

      joiningDate: form.joiningDate,

      status: "Active",

      // Useful for profile/payroll later
      basicSalary:
        Number(form.wage) * 0.5,

      allowances:
        Number(form.wage) * 0.5,

      deductions: 0,
    };

    // Add new employee
    const updatedEmployees = [
      ...savedEmployees,
      newEmployee,
    ];

    // Save to browser
    localStorage.setItem(
      "employees",
      JSON.stringify(updatedEmployees)
    );

    alert(
      `${form.name} has been added successfully.`
    );

    // Go back to employees
    navigate("/employees");
  };

  return (
    <section className="page">

      <div className="page-header">

        <div>

          <span className="eyebrow">
            FOR ADMIN
          </span>

          <h1>
            Add Employee
          </h1>

          <p>
            Create a new employee record and configure
            their basic information.
          </p>

        </div>

        <button
          className="secondary-button"
          type="button"
          onClick={() =>
            navigate("/employees")
          }
        >
          ← Back to Employees
        </button>

      </div>


      <form
        className="employee-form"
        onSubmit={handleSubmit}
      >

        {/* =========================================
            BASIC INFORMATION
        ========================================= */}

        <div className="form-section">

          <div className="form-section-header">

            <h2>
              Basic Information
            </h2>

            <p>
              Employee identification and contact details
            </p>

          </div>


          <div className="form-grid">

            <div className="form-group">

              <label>
                Employee Name *
              </label>

              <input
                type="text"
                name="name"
                placeholder="Enter employee name"
                value={form.name}
                onChange={handleChange}
              />

            </div>


            <div className="form-group">

              <label>
                Employee ID *
              </label>

              <input
                type="text"
                name="employeeId"
                placeholder="EMP001"
                value={form.employeeId}
                onChange={handleChange}
              />

            </div>


            <div className="form-group">

              <label>
                Email
              </label>

              <input
                type="email"
                name="email"
                placeholder="employee@company.com"
                value={form.email}
                onChange={handleChange}
              />

            </div>


            <div className="form-group">

              <label>
                Mobile
              </label>

              <input
                type="tel"
                name="mobile"
                placeholder="+91 XXXXX XXXXX"
                value={form.mobile}
                onChange={handleChange}
              />

            </div>

          </div>

        </div>


        {/* =========================================
            JOB INFORMATION
        ========================================= */}

        <div className="form-section">

          <div className="form-section-header">

            <h2>
              Job Information
            </h2>

            <p>
              Department, position and workplace details
            </p>

          </div>


          <div className="form-grid">

            <div className="form-group">

              <label>
                Department *
              </label>

              <input
                type="text"
                name="department"
                placeholder="Engineering"
                value={form.department}
                onChange={handleChange}
              />

            </div>


            <div className="form-group">

              <label>
                Job Position *
              </label>

              <input
                type="text"
                name="position"
                placeholder="Software Developer"
                value={form.position}
                onChange={handleChange}
              />

            </div>


            <div className="form-group">

              <label>
                Manager
              </label>

              <input
                type="text"
                name="manager"
                placeholder="Manager name"
                value={form.manager}
                onChange={handleChange}
              />

            </div>


            <div className="form-group">

              <label>
                Location
              </label>

              <input
                type="text"
                name="location"
                placeholder="Bangalore"
                value={form.location}
                onChange={handleChange}
              />

            </div>


            <div className="form-group">

              <label>
                Date of Joining
              </label>

              <input
                type="date"
                name="joiningDate"
                value={form.joiningDate}
                onChange={handleChange}
              />

            </div>

          </div>

        </div>


        {/* =========================================
            SALARY INFORMATION
        ========================================= */}

        <div className="form-section">

          <div className="form-section-header">

            <h2>
              Salary Information
            </h2>

            <p>
              Define the employee's monthly wage
            </p>

          </div>


          <div className="form-grid">

            <div className="form-group">

              <label>
                Monthly Wage *
              </label>

              <div className="input-with-prefix">

                <span>
                  ₹
                </span>

                <input
                  type="number"
                  name="wage"
                  placeholder="50000"
                  value={form.wage}
                  onChange={handleChange}
                  min="0"
                />

              </div>

            </div>

          </div>

        </div>


        {/* =========================================
            ACTIONS
        ========================================= */}

        <div className="form-actions">

          <button
            type="button"
            className="secondary-button"
            onClick={() =>
              navigate("/employees")
            }
          >
            Cancel
          </button>


          <button
            type="submit"
            className="primary-button"
          >
            + Add Employee
          </button>

        </div>

      </form>

    </section>
  );
}