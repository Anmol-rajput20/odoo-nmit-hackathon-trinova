import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faChartColumn,
  faUsers,
  faMoneyBill,
  faClock,
} from "@fortawesome/free-solid-svg-icons";

import StatCard from "../components/StatCard";

import {
  employees,
  attendanceData,
} from "../data/mockData";


function Reports() {

  /* ================================
     PAYROLL CALCULATION
  ================================= */

  const totalPayroll =
    employees.reduce(
      (total, employee) =>
        total +
        employee.basicSalary +
        employee.allowances -
        employee.deductions,
      0
    );


  /* ================================
     ATTENDANCE CALCULATION
  ================================= */

  const present =
    attendanceData.filter(
      (item) =>
        item.status === "Present"
    ).length;


  const absent =
    attendanceData.filter(
      (item) =>
        item.status === "Absent"
    ).length;


  const leave =
    attendanceData.filter(
      (item) =>
        item.status === "Leave"
    ).length;


  const totalAttendance =
    attendanceData.length;


  const attendanceRate =
    totalAttendance > 0
      ? Math.round(
          (present /
            totalAttendance) *
            100
        )
      : 0;


  return (
    <div className="reports-page">

      {/* =================================
          PAGE HEADER
      ================================= */}

      <div className="page-actions">

        <div>

          <h2 className="section-title">
            Reports & Analytics
          </h2>

          <p className="section-description">
            View attendance, payroll and
            workforce insights
          </p>

        </div>

      </div>


      {/* =================================
          STATISTICS
      ================================= */}

      <div className="stats-grid">

        <StatCard
          title="Total Employees"
          value={employees.length}
          subtitle="Current workforce"
          icon={faUsers}
        />

        <StatCard
          title="Attendance Rate"
          value={`${attendanceRate}%`}
          subtitle="Current attendance"
          icon={faClock}
        />

        <StatCard
          title="Monthly Payroll"
          value={`₹${totalPayroll.toLocaleString("en-IN")}`}
          subtitle="Total net salary"
          icon={faMoneyBill}
        />

        <StatCard
          title="Present Today"
          value={present}
          subtitle="Employees present"
          icon={faChartColumn}
        />

      </div>


      {/* =================================
          REPORT GRID
      ================================= */}

      <div className="reports-grid">


        {/* ================================
            ATTENDANCE REPORT
        ================================= */}

        <div className="panel">

          <div className="panel-header">

            <div>

              <h3>
                Attendance Report
              </h3>

              <p>
                Current attendance distribution
              </p>

            </div>

            <FontAwesomeIcon
              icon={faChartColumn}
              className="panel-icon"
            />

          </div>


          <div className="chart">


            {/* PRESENT */}

            <div className="chart-bar-container">

              <div
                className="chart-bar present-bar"
                style={{
                  height:
                    `${attendanceRate}%`,
                }}
              />

              <span>
                Present
              </span>

              <small>
                {present}
              </small>

            </div>


            {/* ABSENT */}

            <div className="chart-bar-container">

              <div
                className="chart-bar absent-bar"
                style={{
                  height:
                    totalAttendance > 0
                      ? `${Math.max(
                          (absent /
                            totalAttendance) *
                            100,
                          10
                        )}%`
                      : "10%",
                }}
              />

              <span>
                Absent
              </span>

              <small>
                {absent}
              </small>

            </div>


            {/* LEAVE */}

            <div className="chart-bar-container">

              <div
                className="chart-bar leave-bar"
                style={{
                  height:
                    totalAttendance > 0
                      ? `${Math.max(
                          (leave /
                            totalAttendance) *
                            100,
                          10
                        )}%`
                      : "10%",
                }}
              />

              <span>
                Leave
              </span>

              <small>
                {leave}
              </small>

            </div>

          </div>


          {/* ATTENDANCE SUMMARY */}

          <div className="report-summary">

            <div>

              <span>
                Present
              </span>

              <strong>
                {present}
              </strong>

            </div>

            <div>

              <span>
                Absent
              </span>

              <strong>
                {absent}
              </strong>

            </div>

            <div>

              <span>
                Leave
              </span>

              <strong>
                {leave}
              </strong>

            </div>

          </div>

        </div>


        {/* ================================
            PAYROLL SUMMARY
        ================================= */}

        <div className="panel">

          <div className="panel-header">

            <div>

              <h3>
                Payroll Summary
              </h3>

              <p>
                Employee salary distribution
              </p>

            </div>

            <FontAwesomeIcon
              icon={faMoneyBill}
              className="panel-icon"
            />

          </div>


          <div className="payroll-report">

            {employees.map(
              (employee) => {

                const salary =
                  employee.basicSalary +
                  employee.allowances -
                  employee.deductions;


                return (

                  <div
                    className="payroll-row"
                    key={employee.id}
                  >

                    <div className="employee-cell">

                      <div className="employee-avatar">
                        {employee.name.charAt(0)}
                      </div>

                      <div>

                        <strong>
                          {employee.name}
                        </strong>

                        <small>
                          {employee.position}
                        </small>

                      </div>

                    </div>


                    <strong>
                      ₹{salary.toLocaleString("en-IN")}
                    </strong>

                  </div>

                );

              }
            )}

          </div>


          {/* TOTAL PAYROLL */}

          <div className="payroll-total">

            <span>
              Total Payroll
            </span>

            <strong>
              ₹{totalPayroll.toLocaleString("en-IN")}
            </strong>

          </div>

        </div>

      </div>


      {/* =================================
          WORKFORCE REPORT
      ================================= */}

      <div className="panel workforce-report">

        <div className="panel-header">

          <div>

            <h3>
              Workforce Overview
            </h3>

            <p>
              Current employee distribution
            </p>

          </div>

          <FontAwesomeIcon
            icon={faUsers}
            className="panel-icon"
          />

        </div>


        <div className="workforce-grid">

          <div className="workforce-item">

            <span>
              Total Employees
            </span>

            <strong>
              {employees.length}
            </strong>

          </div>


          <div className="workforce-item">

            <span>
              Present
            </span>

            <strong>
              {present}
            </strong>

          </div>


          <div className="workforce-item">

            <span>
              Absent
            </span>

            <strong>
              {absent}
            </strong>

          </div>


          <div className="workforce-item">

            <span>
              On Leave
            </span>

            <strong>
              {leave}
            </strong>

          </div>

        </div>

      </div>

    </div>
  );
}


export default Reports;