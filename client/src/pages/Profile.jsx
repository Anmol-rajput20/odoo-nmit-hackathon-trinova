import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faPen,
  faUser,
  faLock,
  faMoneyBill,
  faFileLines,
} from "@fortawesome/free-solid-svg-icons";

function Profile() {
  const [activeTab, setActiveTab] = useState("resume");

  /*
   * Logged-in ADMIN information.
   *
   * Replace these values later with your
   * authenticated admin/user data.
   */
  const admin = {
    name: "My Name",
    loginId: "ADMIN001",
    email: "admin@dayflow.com",
    mobile: "+91 98765 43210",

    company: "Dayflow",
    department: "Human Resources",
    manager: "Administrator",
    location: "Bengaluru",

    dateOfBirth: "15 August 2000",
    joiningDate: "01 January 2024",

    address: "Bengaluru, Karnataka",
    nationality: "Indian",
    gender: "Not specified",
    maritalStatus: "Not specified",

    personalEmail: "personal@example.com",

    bankDetails: {
      accountNumber: "XXXX XXXX 1234",
      bankName: "HDFC Bank",
      ifsc: "HDFC0001234",
      pan: "ABCDE1234F",
      uan: "100123456789",
      employeeCode: "ADMIN001",
    },

    salary: {
      monthlyWage: 50000,
      workingDays: 5,
      breakTime: 1,

      basicPercentage: 50,

      standardAllowance: 4167,

      performanceBonusPercentage: 8.33,

      leaveTravelAllowancePercentage: 8.33,

      fixedAllowance: 2918,

      employeePFPercentage: 12,
      employerPFPercentage: 12,

      professionalTax: 200,
    },
  };

  /* ==========================================
     SALARY CALCULATIONS
  ========================================== */

  const basicSalary =
    (admin.salary.monthlyWage *
      admin.salary.basicPercentage) /
    100;

  const houseRentAllowance =
    basicSalary * 0.5;

  const performanceBonus =
    (admin.salary.monthlyWage *
      admin.salary.performanceBonusPercentage) /
    100;

  const leaveTravelAllowance =
    (admin.salary.monthlyWage *
      admin.salary.leaveTravelAllowancePercentage) /
    100;

  const employeePF =
    (basicSalary *
      admin.salary.employeePFPercentage) /
    100;

  const employerPF =
    (basicSalary *
      admin.salary.employerPFPercentage) /
    100;

  const grossSalary =
    basicSalary +
    houseRentAllowance +
    admin.salary.standardAllowance +
    performanceBonus +
    leaveTravelAllowance +
    admin.salary.fixedAllowance;

  const netSalary =
    grossSalary -
    employeePF -
    admin.salary.professionalTax;


  /* ==========================================
     TAB CONTENT
  ========================================== */

  const renderResume = () => (
    <div className="admin-profile-content">

      <div className="admin-profile-grid">

        <div className="admin-profile-box">

          <div className="admin-box-title">
            About
            <FontAwesomeIcon icon={faPen} />
          </div>

          <p>
            Lorem Ipsum is simply dummy text of the
            printing and typesetting industry. Lorem
            Ipsum has been the industry's standard
            dummy text ever since the 1500s.
          </p>

          <h4>
            What I like about my job
          </h4>

          <p>
            Working with people, managing HR
            activities and helping employees have
            a smooth workplace experience.
          </p>

          <h4>
            My interests and hobbies
          </h4>

          <p>
            Reading, learning new technologies,
            travelling and exploring new ideas.
          </p>

        </div>


        <div>

          <div className="admin-profile-box">

            <div className="admin-box-title">
              Skills
            </div>

            <div className="skill-list">

              <span>HR Management</span>
              <span>Payroll</span>
              <span>Recruitment</span>
              <span>Employee Relations</span>

            </div>

            <button className="add-item-button">
              + Add Skills
            </button>

          </div>


          <div className="admin-profile-box">

            <div className="admin-box-title">
              Certification
            </div>

            <button className="add-item-button">
              + Add Certification
            </button>

          </div>

        </div>

      </div>

    </div>
  );


  const renderPrivateInfo = () => (
    <div className="admin-profile-content">

      <div className="admin-info-columns">

        <div>

          <div className="admin-info-row">
            <span>Date of Birth</span>
            <strong>{admin.dateOfBirth}</strong>
          </div>

          <div className="admin-info-row">
            <span>Residential Address</span>
            <strong>{admin.address}</strong>
          </div>

          <div className="admin-info-row">
            <span>Nationality</span>
            <strong>{admin.nationality}</strong>
          </div>

          <div className="admin-info-row">
            <span>Personal Email</span>
            <strong>{admin.personalEmail}</strong>
          </div>

          <div className="admin-info-row">
            <span>Gender</span>
            <strong>{admin.gender}</strong>
          </div>

          <div className="admin-info-row">
            <span>Marital Status</span>
            <strong>{admin.maritalStatus}</strong>
          </div>

          <div className="admin-info-row">
            <span>Date of Joining</span>
            <strong>{admin.joiningDate}</strong>
          </div>

        </div>


        <div>

          <div className="admin-bank-heading">
            Bank Details
          </div>

          <div className="admin-info-row">
            <span>Account Number</span>
            <strong>
              {admin.bankDetails.accountNumber}
            </strong>
          </div>

          <div className="admin-info-row">
            <span>Bank Name</span>
            <strong>
              {admin.bankDetails.bankName}
            </strong>
          </div>

          <div className="admin-info-row">
            <span>IFSC Code</span>
            <strong>
              {admin.bankDetails.ifsc}
            </strong>
          </div>

          <div className="admin-info-row">
            <span>PAN No</span>
            <strong>
              {admin.bankDetails.pan}
            </strong>
          </div>

          <div className="admin-info-row">
            <span>UAN No</span>
            <strong>
              {admin.bankDetails.uan}
            </strong>
          </div>

          <div className="admin-info-row">
            <span>Emp Code</span>
            <strong>
              {admin.bankDetails.employeeCode}
            </strong>
          </div>

        </div>

      </div>

    </div>
  );


  const renderSalaryInfo = () => (
    <div className="admin-salary-content">

      <div className="salary-admin-header">

        <div>
          <h3>
            Salary Info
          </h3>

          <p>
            Salary information is visible only to
            Admin / HR Officer.
          </p>
        </div>

        <div className="admin-only-badge">
          ADMIN ONLY
        </div>

      </div>


      {/* GENERAL SALARY */}

      <div className="salary-general">

        <div className="salary-general-item">
          <span>Month Wage</span>

          <strong>
            ₹{admin.salary.monthlyWage.toLocaleString("en-IN")}
          </strong>
        </div>

        <div className="salary-general-item">
          <span>/ Month</span>
        </div>

        <div className="salary-general-item">
          <span>No. of working days in a week</span>

          <strong>
            {admin.salary.workingDays}
          </strong>
        </div>

        <div className="salary-general-item">
          <span>Break Time</span>

          <strong>
            {admin.salary.breakTime} hrs
          </strong>
        </div>

      </div>


      {/* SALARY COMPONENTS */}

      <div className="salary-two-column">

        <div>

          <h4 className="salary-column-title">
            Salary Components
          </h4>


          {/* BASIC */}

          <div className="salary-component">

            <div className="salary-component-heading">
              <span>Basic Salary</span>

              <strong>
                ₹{basicSalary.toLocaleString("en-IN")}
              </strong>

              <em>
                {admin.salary.basicPercentage}%
              </em>
            </div>

            <p>
              Define Basic salary from company cost
              computed based on monthly wages.
            </p>

          </div>


          {/* HRA */}

          <div className="salary-component">

            <div className="salary-component-heading">
              <span>House Rent Allowance</span>

              <strong>
                ₹{houseRentAllowance.toLocaleString("en-IN")}
              </strong>

              <em>
                50.00%
              </em>
            </div>

            <p>
              HRA provided to employees as 50% of
              the basic salary.
            </p>

          </div>


          {/* STANDARD ALLOWANCE */}

          <div className="salary-component">

            <div className="salary-component-heading">
              <span>Standard Allowance</span>

              <strong>
                ₹
                {admin.salary.standardAllowance.toLocaleString(
                  "en-IN"
                )}
              </strong>

              <em>
                8.33%
              </em>
            </div>

            <p>
              A standard allowance is a predetermined,
              fixed amount provided to employees.
            </p>

          </div>


          {/* PERFORMANCE BONUS */}

          <div className="salary-component">

            <div className="salary-component-heading">
              <span>Performance Bonus</span>

              <strong>
                ₹
                {performanceBonus.toLocaleString(
                  "en-IN",
                  {
                    maximumFractionDigits: 2,
                  }
                )}
              </strong>

              <em>
                {admin.salary.performanceBonusPercentage}%
              </em>
            </div>

            <p>
              Variable amount paid during payroll.
            </p>

          </div>


          {/* LTA */}

          <div className="salary-component">

            <div className="salary-component-heading">
              <span>Leave Travel Allowance</span>

              <strong>
                ₹
                {leaveTravelAllowance.toLocaleString(
                  "en-IN",
                  {
                    maximumFractionDigits: 2,
                  }
                )}
              </strong>

              <em>
                {admin.salary.leaveTravelAllowancePercentage}%
              </em>
            </div>

            <p>
              LTA is paid to employees to cover
              travel expenses.
            </p>

          </div>


          {/* FIXED ALLOWANCE */}

          <div className="salary-component">

            <div className="salary-component-heading">
              <span>Fixed Allowance</span>

              <strong>
                ₹
                {admin.salary.fixedAllowance.toLocaleString(
                  "en-IN"
                )}
              </strong>

              <em>
                Fixed
              </em>
            </div>

            <p>
              Fixed allowance portion of wages.
            </p>

          </div>

        </div>


        {/* RIGHT SIDE */}

        <div>

          <h4 className="salary-column-title">
            Provident Fund (PF) Contribution
          </h4>


          <div className="pf-row">

            <span>Employee</span>

            <strong>
              ₹
              {employeePF.toLocaleString(
                "en-IN",
                {
                  maximumFractionDigits: 2,
                }
              )}
            </strong>

            <em>
              {admin.salary.employeePFPercentage}%
            </em>

          </div>


          <p className="pf-description">
            PF is calculated based on the basic salary.
          </p>


          <div className="pf-row">

            <span>Employer</span>

            <strong>
              ₹
              {employerPF.toLocaleString(
                "en-IN",
                {
                  maximumFractionDigits: 2,
                }
              )}
            </strong>

            <em>
              {admin.salary.employerPFPercentage}%
            </em>

          </div>


          <p className="pf-description">
            PF contribution by employer based on
            basic salary.
          </p>


          {/* TAX */}

          <h4 className="salary-column-title tax-title">
            Tax Deductions
          </h4>


          <div className="pf-row">

            <span>Professional Tax</span>

            <strong>
              ₹
              {admin.salary.professionalTax.toLocaleString(
                "en-IN"
              )}
            </strong>

            <em>
              / month
            </em>

          </div>


          {/* GROSS */}

          <div className="salary-total-box">

            <span>Gross Salary</span>

            <strong>
              ₹
              {grossSalary.toLocaleString(
                "en-IN",
                {
                  maximumFractionDigits: 2,
                }
              )}
            </strong>

          </div>


          {/* NET */}

          <div className="salary-net-box">

            <span>Net Salary</span>

            <strong>
              ₹
              {netSalary.toLocaleString(
                "en-IN",
                {
                  maximumFractionDigits: 2,
                }
              )}
            </strong>

            <small>
              After deductions
            </small>

          </div>

        </div>

      </div>

    </div>
  );


  const renderSecurity = () => (
    <div className="admin-profile-content">

      <div className="security-grid">

        <div className="security-item">

          <div className="security-icon">
            <FontAwesomeIcon icon={faLock} />
          </div>

          <div>
            <strong>
              Password
            </strong>

            <p>
              Last changed recently
            </p>
          </div>

          <button>
            Change
          </button>

        </div>


        <div className="security-item">

          <div className="security-icon">
            <FontAwesomeIcon icon={faUser} />
          </div>

          <div>
            <strong>
              Login ID
            </strong>

            <p>
              {admin.loginId}
            </p>
          </div>

        </div>

      </div>

    </div>
  );


  return (
    <div className="admin-my-profile">

      {/* =========================================
          PAGE TITLE
      ========================================== */}

      <div className="my-profile-title">
        My Profile
      </div>


      {/* =========================================
          PROFILE HEADER
      ========================================== */}

      <div className="admin-profile-header">

        <div className="admin-avatar-wrapper">

          <div className="admin-avatar">
            <FontAwesomeIcon icon={faUser} />
          </div>

          <button className="avatar-edit">
            <FontAwesomeIcon icon={faPen} />
          </button>

        </div>


        <div className="admin-basic-info">

          <h1>
            {admin.name}
          </h1>

          <div className="admin-basic-grid">

            <div>
              <span>Login ID</span>
              <strong>{admin.loginId}</strong>
            </div>

            <div>
              <span>Company</span>
              <strong>{admin.company}</strong>
            </div>

            <div>
              <span>Email</span>
              <strong>{admin.email}</strong>
            </div>

            <div>
              <span>Department</span>
              <strong>{admin.department}</strong>
            </div>

            <div>
              <span>Mobile</span>
              <strong>{admin.mobile}</strong>
            </div>

            <div>
              <span>Manager</span>
              <strong>{admin.manager}</strong>
            </div>

            <div>
              <span></span>
              <strong></strong>
            </div>

            <div>
              <span>Location</span>
              <strong>{admin.location}</strong>
            </div>

          </div>

        </div>

      </div>


      {/* =========================================
          TABS
      ========================================== */}

      <div className="admin-profile-tabs">

        <button
          className={
            activeTab === "resume"
              ? "admin-tab active"
              : "admin-tab"
          }
          onClick={() =>
            setActiveTab("resume")
          }
        >
          <FontAwesomeIcon icon={faFileLines} />
          Resume
        </button>


        <button
          className={
            activeTab === "private"
              ? "admin-tab active"
              : "admin-tab"
          }
          onClick={() =>
            setActiveTab("private")
          }
        >
          <FontAwesomeIcon icon={faUser} />
          Private Info
        </button>


        <button
          className={
            activeTab === "salary"
              ? "admin-tab active salary-tab"
              : "admin-tab salary-tab"
          }
          onClick={() =>
            setActiveTab("salary")
          }
        >
          <FontAwesomeIcon icon={faMoneyBill} />
          Salary Info
        </button>


        <button
          className={
            activeTab === "security"
              ? "admin-tab active"
              : "admin-tab"
          }
          onClick={() =>
            setActiveTab("security")
          }
        >
          <FontAwesomeIcon icon={faLock} />
          Security
        </button>

      </div>


      {/* =========================================
          TAB CONTENT
      ========================================== */}

      <div className="admin-profile-tab-content">

        {activeTab === "resume" &&
          renderResume()}

        {activeTab === "private" &&
          renderPrivateInfo()}

        {activeTab === "salary" &&
          renderSalaryInfo()}

        {activeTab === "security" &&
          renderSecurity()}

      </div>

    </div>
  );
}

export default Profile;