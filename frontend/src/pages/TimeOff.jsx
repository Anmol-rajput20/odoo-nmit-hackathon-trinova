import { useState } from "react";
import Navbar from "../components/Navbar";

const leaveRecords = [
  {
    id: 1,
    type: "Paid Time Off",
    startDate: "2026-05-10",
    endDate: "2026-05-14",
    days: 5,
    status: "Approved",
  },
  {
    id: 2,
    type: "Sick Leave",
    startDate: "2026-06-03",
    endDate: "2026-06-04",
    days: 2,
    status: "Approved",
  },
];

function TimeOff() {
  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState({
    type: "Paid Time Off",
    startDate: "",
    endDate: "",
    reason: "",
    attachment: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Time off request:", formData);

    // Later this will call the FastAPI backend.
    setShowModal(false);

    setFormData({
      type: "Paid Time Off",
      startDate: "",
      endDate: "",
      reason: "",
      attachment: null,
    });
  };

  return (
    <div className="app">
      <Navbar />

      <main className="timeoff-page">
        {/* Header */}
        <div className="timeoff-header">
          <div>
            <h1>Time Off</h1>
            <p>View your time-off records and submit requests</p>
          </div>

          <button
            className="new-button"
            onClick={() => setShowModal(true)}
          >
            + NEW
          </button>
        </div>

        {/* Leave balances */}
        <section className="leave-balance-section">
          <div className="leave-balance-card paid">
            <div>
              <p>Paid Time Off</p>
              <span>24 Days Available</span>
            </div>

            <div className="balance-number">24</div>
          </div>

          <div className="leave-balance-card sick">
            <div>
              <p>Sick Time Off</p>
              <span>07 Days Available</span>
            </div>

            <div className="balance-number">07</div>
          </div>
        </section>

        {/* Calendar */}
        <section className="calendar-card">
          <div className="calendar-header">
            <h2>Time Off Calendar</h2>
            <span>2026</span>
          </div>

          <div className="calendar-grid">
            {[
              "January",
              "February",
              "March",
              "April",
              "May",
              "June",
              "July",
              "August",
              "September",
              "October",
              "November",
              "December",
            ].map((month) => (
              <div className="mini-calendar" key={month}>
                <h3>{month}</h3>

                <div className="calendar-days">
                  <span>M</span>
                  <span>T</span>
                  <span>W</span>
                  <span>T</span>
                  <span>F</span>
                  <span>S</span>
                  <span>S</span>

                  {Array.from({ length: 28 }, (_, index) => (
                    <span
                      key={index}
                      className={
                        month === "May" && index >= 9 && index <= 13
                          ? "leave-day"
                          : ""
                      }
                    >
                      {index + 1}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="calendar-legend">
            <span>
              <i className="legend-dot paid-dot"></i>
              Paid Time Off
            </span>

            <span>
              <i className="legend-dot sick-dot"></i>
              Sick Leave
            </span>

            <span>
              <i className="legend-dot unpaid-dot"></i>
              Unpaid Leave
            </span>
          </div>
        </section>

        {/* Existing requests */}
        <section className="requests-section">
          <div className="section-title">
            <h2>My Time Off Requests</h2>
          </div>

          <div className="requests-table-container">
            <table className="requests-table">
              <thead>
                <tr>
                  <th>Type</th>
                  <th>From</th>
                  <th>To</th>
                  <th>Days</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {leaveRecords.map((record) => (
                  <tr key={record.id}>
                    <td>{record.type}</td>
                    <td>{record.startDate}</td>
                    <td>{record.endDate}</td>
                    <td>{record.days}</td>
                    <td>
                      <span
                        className={`leave-status ${
                          record.status.toLowerCase()
                        }`}
                      >
                        {record.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>

      {/* Request Modal */}
      {showModal && (
        <div
          className="modal-overlay"
          onClick={() => setShowModal(false)}
        >
          <div
            className="timeoff-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <h2>Time Off Type Request</h2>

              <button
                className="modal-close"
                onClick={() => setShowModal(false)}
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              {/* Employee */}
              <div className="form-row">
                <label>Employee</label>

                <input
                  type="text"
                  value="Current Employee"
                  disabled
                />
              </div>

              {/* Type */}
              <div className="form-row">
                <label>Time Off Type</label>

                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                >
                  <option>Paid Time Off</option>
                  <option>Sick Leave</option>
                  <option>Unpaid Leaves</option>
                </select>
              </div>

              {/* Dates */}
              <div className="form-row">
                <label>Validity Period</label>

                <div className="date-inputs">
                  <input
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                    required
                  />

                  <span>to</span>

                  <input
                    type="date"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* Allocation */}
              <div className="form-row">
                <label>Allocation</label>

                <input
                  type="text"
                  value="Calculated from selected dates"
                  disabled
                />
              </div>

              {/* Reason */}
              <div className="form-row">
                <label>Reason</label>

                <textarea
                  name="reason"
                  value={formData.reason}
                  onChange={handleChange}
                  placeholder="Enter reason..."
                  rows="3"
                />
              </div>

              {/* Attachment */}
              <div className="form-row">
                <label>Attachment</label>

                <input
                  type="file"
                  name="attachment"
                  onChange={handleChange}
                />

                <small>
                  Attach supporting documents if required.
                </small>
              </div>

              {/* Buttons */}
              <div className="modal-actions">
                <button
                  type="button"
                  className="discard-button"
                  onClick={() => setShowModal(false)}
                >
                  Discard
                </button>

                <button
                  type="submit"
                  className="submit-button"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default TimeOff;