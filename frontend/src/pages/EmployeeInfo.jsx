import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { ArrowLeft, Mail, Phone, MapPin, Briefcase } from "lucide-react";

const employees = {
  1: {
    name: "Anmol Rajput",
    designation: "Software Engineer",
    department: "Engineering",
    email: "anmol@example.com",
    phone: "+91 98765 43210",
    location: "Patiala, India",
    employeeId: "EMP001",
    joiningDate: "15/07/2025",
    manager: "Rahul Sharma",
    status: "Present",
    image: "https://i.pravatar.cc/150?img=12",
  },

  2: {
    name: "Priya Sharma",
    designation: "HR Manager",
    department: "Human Resources",
    email: "priya@example.com",
    phone: "+91 98765 43211",
    location: "Chandigarh, India",
    employeeId: "EMP002",
    joiningDate: "10/03/2024",
    manager: "Admin",
    status: "On Leave",
    image: "https://i.pravatar.cc/150?img=47",
  },

  3: {
    name: "Rahul Kumar",
    designation: "Frontend Developer",
    department: "Engineering",
    email: "rahul@example.com",
    phone: "+91 98765 43212",
    location: "Delhi, India",
    employeeId: "EMP003",
    joiningDate: "20/08/2025",
    manager: "Anmol Rajput",
    status: "Absent",
    image: "https://i.pravatar.cc/150?img=11",
  },
};

function EmployeeInfo() {
  const { id } = useParams();
  const navigate = useNavigate();

  const employee = employees[id];

  if (!employee) {
    return (
      <div className="app">
        <Navbar />

        <main className="page">
          <h1>Employee Not Found</h1>

          <button
            className="back-button"
            onClick={() => navigate("/employees")}
          >
            <ArrowLeft size={17} />
            Back to Employees
          </button>
        </main>
      </div>
    );
  }

  return (
    <div className="app">
      <Navbar />

      <main className="employee-info-page">

        <button
          className="back-button"
          onClick={() => navigate("/employees")}
        >
          <ArrowLeft size={17} />
          Back to Employees
        </button>

        <div className="employee-profile-card">

          {/* Profile Header */}

          <div className="employee-profile-header">

            <img
              src={employee.image}
              alt={employee.name}
              className="employee-large-avatar"
            />

            <div className="employee-profile-title">
              <h1>{employee.name}</h1>

              <p>{employee.designation}</p>

              <span
                className={`employee-status ${
                  employee.status === "Present"
                    ? "present"
                    : employee.status === "On Leave"
                    ? "leave"
                    : "absent"
                }`}
              >
                <span className="status-small-dot"></span>

                {employee.status}
              </span>
            </div>

          </div>

          {/* Basic Information */}

          <section className="employee-info-section">

            <h2>Basic Information</h2>

            <div className="employee-info-grid">

              <div className="info-field">
                <span>Employee ID</span>
                <strong>{employee.employeeId}</strong>
              </div>

              <div className="info-field">
                <span>Department</span>
                <strong>{employee.department}</strong>
              </div>

              <div className="info-field">
                <span>Designation</span>
                <strong>{employee.designation}</strong>
              </div>

              <div className="info-field">
                <span>Joining Date</span>
                <strong>{employee.joiningDate}</strong>
              </div>

              <div className="info-field">
                <span>Reporting Manager</span>
                <strong>{employee.manager}</strong>
              </div>

            </div>

          </section>

          {/* Contact Information */}

          <section className="employee-info-section">

            <h2>Contact Information</h2>

            <div className="contact-grid">

              <div className="contact-item">
                <Mail size={19} />

                <div>
                  <span>Email</span>
                  <strong>{employee.email}</strong>
                </div>
              </div>

              <div className="contact-item">
                <Phone size={19} />

                <div>
                  <span>Phone</span>
                  <strong>{employee.phone}</strong>
                </div>
              </div>

              <div className="contact-item">
                <MapPin size={19} />

                <div>
                  <span>Location</span>
                  <strong>{employee.location}</strong>
                </div>
              </div>

              <div className="contact-item">
                <Briefcase size={19} />

                <div>
                  <span>Department</span>
                  <strong>{employee.department}</strong>
                </div>
              </div>

            </div>

          </section>

          <div className="view-only-notice">
            Employee information is displayed in view-only mode.
          </div>

        </div>

      </main>
    </div>
  );
}

export default EmployeeInfo;