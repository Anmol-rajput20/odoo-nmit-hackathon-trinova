import React, { useEffect, useState } from "react";
import "./MyProfile.css";
import Navbar from "../components/Navbar";
import { getEmployee, getMyPayroll } from "../services/api";

const MyProfile = () => {
  const [activeTab, setActiveTab] = useState("private");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [employee, setEmployee] = useState({
    name: "My Name",
    position: "Job Position",
    company: "Company",
    department: "Department",
    manager: "Manager",
    email: "email@example.com",
    mobile: "+91 9876543210",

    dob: "",
    address: "",
    nationality: "Indian",
    personalEmail: "",
    gender: "",
    maritalStatus: "",
    joiningDate: "",

    accountNumber: "",
    bankName: "",
    ifsc: "",
    pan: "",
    uan: "",
    employeeCode: "",

    wageType: "Fixed Wage",
    wage: 50000,

    basicType: "percentage",
    basicValue: 50,

    hraType: "percentage",
    hraValue: 50,

    standardAllowanceType: "percentage",
    standardAllowanceValue: 10,

    performanceBonusType: "fixed",
    performanceBonusValue: 0,

    leaveTravelType: "fixed",
    leaveTravelValue: 0,

    fixedAllowanceType: "fixed",
    fixedAllowanceValue: 0,

    pfRate: 12,
    professionalTax: 200,
  });

  useEffect(() => {
  const loadProfile = async () => {
    try {
      setLoading(true);
      setError("");

      // Temporary until authentication is connected
      const empId = "EMP001";

      const employeeData = await getEmployee(empId);

      console.log("Employee API response:", employeeData);

      setEmployee((prev) => ({
        ...prev,

        name: `${employeeData.profile?.first_name || ""} ${
          employeeData.profile?.last_name || ""
        }`.trim(),

        position: employeeData.profile?.job_title || "",
        department: employeeData.profile?.department || "",
        email: employeeData.email || "",
        mobile: employeeData.profile?.phone || "",
        address: employeeData.profile?.address || "",
        employeeCode: employeeData.emp_id || "",
      }));

      // Payroll will be connected separately
      // after we verify the employee API first.
    } catch (err) {
      console.error("Profile loading failed:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  loadProfile();
}, []);

  const updateField = (field, value) => {
    setEmployee((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const calculateComponent = (type, value, baseAmount) => {
    if (type === "percentage") {
      return (Number(value) / 100) * baseAmount;
    }

    return Number(value) || 0;
  };

  const basic = calculateComponent(
    employee.basicType,
    employee.basicValue,
    employee.wage
  );

  const hra = calculateComponent(
    employee.hraType,
    employee.hraValue,
    basic
  );

  const standardAllowance = calculateComponent(
    employee.standardAllowanceType,
    employee.standardAllowanceValue,
    employee.wage
  );

  const performanceBonus = calculateComponent(
    employee.performanceBonusType,
    employee.performanceBonusValue,
    employee.wage
  );

  const leaveTravel = calculateComponent(
    employee.leaveTravelType,
    employee.leaveTravelValue,
    employee.wage
  );

  const fixedAllowance = calculateComponent(
    employee.fixedAllowanceType,
    employee.fixedAllowanceValue,
    employee.wage
  );

  const totalComponents =
    basic +
    hra +
    standardAllowance +
    performanceBonus +
    leaveTravel +
    fixedAllowance;

  const remainingWage = employee.wage - totalComponents;

  const formatCurrency = (amount) => {
    return `₹${Number(amount || 0).toLocaleString("en-IN")}`;
  };

  const renderInput = (label, field, type = "text") => (
    <div className="form-group">
      <label>{label}</label>
      <input
        type={type}
        value={employee[field]}
        onChange={(e) => updateField(field, e.target.value)}
      />
    </div>
  );

  const renderSalaryComponent = (
    name,
    typeField,
    valueField,
    calculatedAmount
  ) => (
    <div className="salary-component">
      <div className="component-name">{name}</div>

      <select
        value={employee[typeField]}
        onChange={(e) => updateField(typeField, e.target.value)}
      >
        <option value="percentage">Percentage</option>
        <option value="fixed">Fixed Amount</option>
      </select>

      <input
        type="number"
        value={employee[valueField]}
        onChange={(e) => updateField(valueField, e.target.value)}
      />

      <div className="calculated-value">
        {formatCurrency(calculatedAmount)}
      </div>
    </div>
  );

  return (
    <div className="profile-page">
      <Navbar/>
      
      {loading && (
        <div className="profile-loading">
        Loading profile...
        </div>
      )}

      {error && (
        <div className="profile-error">
        {error}
        </div>
      )}
      {/* Page Title */}
      <div className="page-title">My Profile</div>

      {/* Profile Header */}
      <div className="profile-header">
        <div className="profile-photo">
          <span>✎</span>
        </div>

        <div className="profile-main-info">
          <input
            className="employee-name"
            value={employee.name}
            onChange={(e) => updateField("name", e.target.value)}
          />

          <input
            value={employee.position}
            onChange={(e) => updateField("position", e.target.value)}
          />

          <input
            value={employee.email}
            onChange={(e) => updateField("email", e.target.value)}
          />

          <input
            value={employee.mobile}
            onChange={(e) => updateField("mobile", e.target.value)}
          />
        </div>

        <div className="job-info">
          {renderInput("Company", "company")}
          {renderInput("Department", "department")}
          {renderInput("Manager", "manager")}
        </div>
      </div>

      {/* Tabs */}
      <div className="profile-tabs">
        <button
          className={activeTab === "resume" ? "active" : ""}
          onClick={() => setActiveTab("resume")}
        >
          Resume
        </button>

        <button
          className={activeTab === "private" ? "active" : ""}
          onClick={() => setActiveTab("private")}
        >
          Private Info
        </button>

        <button
          className={activeTab === "salary" ? "active" : ""}
          onClick={() => setActiveTab("salary")}
        >
          Salary Info
        </button>

        <button
          className={activeTab === "security" ? "active" : ""}
          onClick={() => setActiveTab("security")}
        >
          Security
        </button>
      </div>

      {/* Resume */}
      {activeTab === "resume" && (
        <div className="tab-content">
          <h2>Resume</h2>

          <div className="empty-section">
            Upload or add employee resume information here.
          </div>
        </div>
      )}

      {/* Private Info */}
      {activeTab === "private" && (
        <div className="tab-content">
          <div className="section-grid">
            <div className="section">
              <h2>Personal Information</h2>

              {renderInput("Date of Birth", "dob", "date")}
              {renderInput("Residing Address", "address")}
              {renderInput("Nationality", "nationality")}
              {renderInput("Personal Email", "personalEmail", "email")}
              {renderInput("Gender", "gender")}
              {renderInput("Marital Status", "maritalStatus")}
              {renderInput("Date of Joining", "joiningDate", "date")}
            </div>

            <div className="section">
              <h2>Bank Details</h2>

              {renderInput("Account Number", "accountNumber")}
              {renderInput("Bank Name", "bankName")}
              {renderInput("IFSC Code", "ifsc")}
              {renderInput("PAN No", "pan")}
              {renderInput("UAN No", "uan")}
              {renderInput("Employee Code", "employeeCode")}
            </div>
          </div>
        </div>
      )}

      {/* Salary Info */}
      {activeTab === "salary" && (
        <div className="tab-content">
          <h2>Salary Information</h2>

          <div className="salary-basic">
            <div className="form-group">
              <label>Wage Type</label>

              <select
                value={employee.wageType}
                onChange={(e) =>
                  updateField("wageType", e.target.value)
                }
              >
                <option>Fixed Wage</option>
              </select>
            </div>

            <div className="form-group">
              <label>Fixed Wage</label>

              <input
                type="number"
                value={employee.wage}
                onChange={(e) =>
                  updateField("wage", Number(e.target.value))
                }
              />
            </div>
          </div>

          <div className="salary-section">
            <h3>Salary Components</h3>

            <div className="component-header">
              <span>Component</span>
              <span>Calculation Type</span>
              <span>Value</span>
              <span>Calculated Amount</span>
            </div>

            {renderSalaryComponent(
              "Basic",
              "basicType",
              "basicValue",
              basic
            )}

            {renderSalaryComponent(
              "House Rent Allowance",
              "hraType",
              "hraValue",
              hra
            )}

            {renderSalaryComponent(
              "Standard Allowance",
              "standardAllowanceType",
              "standardAllowanceValue",
              standardAllowance
            )}

            {renderSalaryComponent(
              "Performance Bonus",
              "performanceBonusType",
              "performanceBonusValue",
              performanceBonus
            )}

            {renderSalaryComponent(
              "Leave Travel Allowance",
              "leaveTravelType",
              "leaveTravelValue",
              leaveTravel
            )}

            {renderSalaryComponent(
              "Fixed Allowance",
              "fixedAllowanceType",
              "fixedAllowanceValue",
              fixedAllowance
            )}
          </div>

          {/* Calculation Summary */}
          <div className="salary-summary">
            <div>
              <span>Total Wage</span>
              <strong>{formatCurrency(employee.wage)}</strong>
            </div>

            <div>
              <span>Total Components</span>
              <strong>{formatCurrency(totalComponents)}</strong>
            </div>

            <div>
              <span>Remaining Wage</span>
              <strong
                className={remainingWage < 0 ? "danger" : ""}
              >
                {formatCurrency(remainingWage)}
              </strong>
            </div>
          </div>

          {remainingWage < 0 && (
            <div className="salary-error">
              Total salary components cannot exceed the defined wage.
            </div>
          )}

          {/* Configuration */}
          <div className="configuration-section">
            <h3>Configuration</h3>

            <div className="config-grid">
              <div className="form-group">
                <label>PF Rate (%)</label>
                <input
                  type="number"
                  value={employee.pfRate}
                  onChange={(e) =>
                    updateField("pfRate", Number(e.target.value))
                  }
                />
              </div>

              <div className="form-group">
                <label>Professional Tax</label>
                <input
                  type="number"
                  value={employee.professionalTax}
                  onChange={(e) =>
                    updateField(
                      "professionalTax",
                      Number(e.target.value)
                    )
                  }
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Security */}
      {activeTab === "security" && (
        <div className="tab-content">
          <h2>Security</h2>

          <div className="security-box">
            <div>
              <strong>Password</strong>
              <p>Change your account password.</p>
            </div>

            <button>Change Password</button>
          </div>

          <div className="security-box">
            <div>
              <strong>Two Factor Authentication</strong>
              <p>Add an extra layer of security to your account.</p>
            </div>

            <button>Enable</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyProfile;