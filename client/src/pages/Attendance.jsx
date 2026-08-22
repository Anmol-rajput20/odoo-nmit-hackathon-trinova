import { useState } from "react";

import {
  attendanceData
} from "../data/employees";

import PageHeader from "../components/PageHeader";
import NoteBox from "../components/NoteBox";

export default function Attendance() {

  const [date, setDate] =
    useState("2025-10-22");

  return (
    <section className="page">

      <PageHeader
        eyebrow="ATTENDANCE LIST VIEW"
        title="Attendance"
        description="Day-wise attendance, working time, breaks and extra hours."
      />

      <div className="attendance-toolbar">

        <button
          onClick={() =>
            setDate("2025-10-21")
          }
        >
          ←
        </button>

        <input
          type="date"
          value={date}
          onChange={(e) =>
            setDate(e.target.value)
          }
        />

        <button
          onClick={() =>
            setDate("2025-10-23")
          }
        >
          →
        </button>

        <input
          className="attendance-search"
          placeholder="Searchbar"
        />

        <button>
          Date ↓
        </button>

        <button>
          Day
        </button>

      </div>

      <div className="wire-card table-wrapper">

        <div className="attendance-date">
          22, October 2025
        </div>

        <table>

          <thead>

            <tr>
              <th>Emp</th>
              <th>Check In</th>
              <th>Check Out</th>
              <th>Work Hours</th>
              <th>Extra Hours</th>
            </tr>

          </thead>

          <tbody>

            {attendanceData.map(
              (item) => (

                <tr key={item.employeeId}>

                  <td>
                    <strong>
                      {item.employee}
                    </strong>

                    <small>
                      {item.employeeId}
                    </small>
                  </td>

                  <td>
                    {item.checkIn}
                  </td>

                  <td>
                    {item.checkOut}
                  </td>

                  <td>
                    {item.workHours}
                  </td>

                  <td>
                    {item.extraHours}
                  </td>

                </tr>

              )
            )}

          </tbody>

        </table>

      </div>

      <NoteBox>
        Attendance data serves as the basis for
        payslip generation. Any unpaid leave or
        missing attendance days automatically
        reduces the number of payable days during
        payroll computation.
      </NoteBox>

    </section>
  );
}