import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  employees,
  attendanceData,
  leaveRequests,
} from "../data/employees";

import PageHeader from "../components/PageHeader";
import StatCard from "../components/StatCard";
import EmployeeTable from "../components/EmployeeTable";

export default function Dashboard() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");

  const filteredEmployees = useMemo(() => {
    return employees.filter((employee) =>
      `${employee.name} ${employee.id} ${employee.department}`
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [search]);

  const pendingLeaves = leaveRequests.filter(
    (leave) => leave.status === "Pending"
  ).length;

  return (
    <section className="page">

      <PageHeader
        eyebrow="FOR ADMIN"
        title="Employees"
        description="Manage employee records, profiles and salary configuration."
        action={
          <button
            className="primary-button"
            onClick={() => navigate("/employees/add")}
          >
            + Add Employee
          </button>
        }
      />

      <div className="search-bar">

        <input
          type="text"
          placeholder="Search employee, department or ID"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

      </div>

      <EmployeeTable
        employees={filteredEmployees}
      />

      <div className="stats-grid">

        <StatCard
          title="Total Employees"
          value={employees.length}
          description="Active workforce"
        />

        <StatCard
          title="Today's Attendance"
          value={attendanceData.length}
          description="Employees checked in"
        />

        <StatCard
          title="Pending Time Off"
          value={pendingLeaves}
          description="Requests awaiting action"
        />

      </div>

    </section>
  );
}