import { useState } from "react";

import Navbar from "../components/Navbar";
import EmployeeCard from "../components/EmployeeCard";
import SearchBar from "../components/SearchBar";
import CheckInOut from "../components/CheckInOut";

const employees = [
  {
    id: 1,
    name: "Anmol Rajput",
    designation: "Software Engineer",
    department: "Engineering",
    status: "Present",
    image: "https://i.pravatar.cc/150?img=12",
  },
  {
    id: 2,
    name: "Priya Sharma",
    designation: "HR Manager",
    department: "Human Resources",
    status: "Leave",
    image: "https://i.pravatar.cc/150?img=47",
  },
  {
    id: 3,
    name: "Rahul Kumar",
    designation: "Frontend Developer",
    department: "Engineering",
    status: "Absent",
    image: "https://i.pravatar.cc/150?img=11",
  },
  {
    id: 4,
    name: "Simran Kaur",
    designation: "UI/UX Designer",
    department: "Design",
    status: "Present",
    image: "https://i.pravatar.cc/150?img=32",
  },
  {
    id: 5,
    name: "Arjun Singh",
    designation: "Backend Developer",
    department: "Engineering",
    status: "Present",
    image: "https://i.pravatar.cc/150?img=13",
  },
  {
    id: 6,
    name: "Neha Verma",
    designation: "Product Manager",
    department: "Product",
    status: "Leave",
    image: "https://i.pravatar.cc/150?img=44",
  },
  {
    id: 7,
    name: "Karan Mehta",
    designation: "QA Engineer",
    department: "Engineering",
    status: "Absent",
    image: "https://i.pravatar.cc/150?img=68",
  },
  {
    id: 8,
    name: "Aisha Khan",
    designation: "Data Analyst",
    department: "Analytics",
    status: "Present",
    image: "https://i.pravatar.cc/150?img=49",
  },
  {
    id: 9,
    name: "Rohit Sharma",
    designation: "DevOps Engineer",
    department: "Engineering",
    status: "Present",
    image: "https://i.pravatar.cc/150?img=53",
  },
];

function Employees() {
  const [search, setSearch] = useState("");

  const filteredEmployees = employees.filter((employee) =>
    employee.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="app">
      <Navbar />

      <main className="employees-page">
        <div className="page-header">
          <div>
            <h1>Employees</h1>
            <p>Manage and view employee information</p>
          </div>

          <button className="new-button">
            + NEW
          </button>
        </div>

        <div className="toolbar">
          <SearchBar
            value={search}
            onChange={setSearch}
          />
        </div>

        <div className="employees-content">
          <div className="employee-grid">
            {filteredEmployees.map((employee) => (
              <EmployeeCard
                key={employee.id}
                employee={employee}
              />
            ))}
          </div>

          <CheckInOut />
        </div>
      </main>
    </div>
  );
}

export default Employees;