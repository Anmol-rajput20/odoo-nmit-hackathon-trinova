import { useState } from "react";
import Navbar from "../components/Navbar";
import { ChevronLeft, ChevronRight, CalendarDays } from "lucide-react";

const attendanceData = [
  {
    date: "28/10/2025",
    checkIn: "10:00",
    checkOut: "19:00",
    workHours: "09:00",
    extraHours: "01:00",
  },
  {
    date: "29/10/2025",
    checkIn: "10:00",
    checkOut: "19:00",
    workHours: "09:00",
    extraHours: "01:00",
  },
  {
    date: "30/10/2025",
    checkIn: "09:45",
    checkOut: "18:30",
    workHours: "08:45",
    extraHours: "00:45",
  },
  {
    date: "31/10/2025",
    checkIn: "10:05",
    checkOut: "19:00",
    workHours: "08:55",
    extraHours: "00:55",
  },
];

function Attendance() {
  const [currentMonth, setCurrentMonth] = useState("October 2025");

  const handlePrevious = () => {
    setCurrentMonth("September 2025");
  };

  const handleNext = () => {
    setCurrentMonth("November 2025");
  };

  return (
    <div className="app">
      <Navbar />

      <main className="attendance-page">
        {/* Header */}
        <div className="attendance-header">
          <div>
            <h1>Attendance</h1>
            <p>View your attendance records and working hours</p>
          </div>
        </div>

        {/* Controls */}
        <div className="attendance-toolbar">
          <div className="date-controls">
            <button
              className="date-arrow"
              onClick={handlePrevious}
            >
              <ChevronLeft size={18} />
            </button>

            <button
              className="date-arrow"
              onClick={handleNext}
            >
              <ChevronRight size={18} />
            </button>

            <button className="month-button">
              <CalendarDays size={16} />
              {currentMonth}
            </button>
          </div>

          {/* Summary */}
          <div className="attendance-summary">
            <div className="summary-item">
              <span className="summary-label">Days Present</span>
              <strong>20</strong>
            </div>

            <div className="summary-item">
              <span className="summary-label">Leaves</span>
              <strong>2</strong>
            </div>

            <div className="summary-item">
              <span className="summary-label">Total Working Days</span>
              <strong>22</strong>
            </div>
          </div>
        </div>

        {/* Attendance Table */}
        <div className="attendance-table-container">
          <table className="attendance-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Check In</th>
                <th>Check Out</th>
                <th>Work Hours</th>
                <th>Extra Hours</th>
              </tr>
            </thead>

            <tbody>
              {attendanceData.map((record, index) => (
                <tr key={index}>
                  <td>{record.date}</td>
                  <td>{record.checkIn}</td>
                  <td>{record.checkOut}</td>
                  <td>{record.workHours}</td>
                  <td>{record.extraHours}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

export default Attendance;