import { useState } from "react";

import {
  leaveRequests as initialLeaveRequests,
} from "../data/employees";

import PageHeader from "../components/PageHeader";
import StatCard from "../components/StatCard";

export default function TimeOff() {

  const [requests, setRequests] =
    useState(initialLeaveRequests);

  const pending =
    requests.filter(
      (request) =>
        request.status === "Pending"
    ).length;

  const approved =
    requests.filter(
      (request) =>
        request.status === "Approved"
    ).length;

  const rejected =
    requests.filter(
      (request) =>
        request.status === "Rejected"
    ).length;


  /* =========================================
     APPROVE REQUEST
  ========================================= */

  const handleApprove = (index) => {

    const request =
      requests[index];

    const confirmed =
      window.confirm(
        `Approve leave request for ${request.employee}?`
      );

    if (!confirmed) {
      return;
    }

    setRequests((currentRequests) =>
      currentRequests.map(
        (item, itemIndex) =>
          itemIndex === index
            ? {
                ...item,
                status: "Approved",
              }
            : item
      )
    );
  };


  /* =========================================
     REJECT REQUEST
  ========================================= */

  const handleReject = (index) => {

    const request =
      requests[index];

    const confirmed =
      window.confirm(
        `Reject leave request for ${request.employee}?`
      );

    if (!confirmed) {
      return;
    }

    setRequests((currentRequests) =>
      currentRequests.map(
        (item, itemIndex) =>
          itemIndex === index
            ? {
                ...item,
                status: "Rejected",
              }
            : item
      )
    );
  };


  return (
    <section className="page">

      <PageHeader
        eyebrow="TIME OFF"
        title="Leave & Time Off"
        description="Review and manage employee leave requests."
      />


      {/* =========================================
          STATISTICS
      ========================================= */}

      <div className="stats-grid">

        <StatCard
          title="Pending"
          value={pending}
          description="Awaiting approval"
        />

        <StatCard
          title="Approved"
          value={approved}
          description="Approved requests"
        />

        <StatCard
          title="Rejected"
          value={rejected}
          description="Rejected requests"
        />

        <StatCard
          title="Total"
          value={requests.length}
          description="Leave requests"
        />

      </div>


      {/* =========================================
          LEAVE REQUEST TABLE
      ========================================= */}

      <div className="wire-card table-wrapper">

        <table>

          <thead>

            <tr>
              <th>Employee</th>
              <th>Type</th>
              <th>Dates</th>
              <th>Status</th>
              <th>Action</th>
            </tr>

          </thead>


          <tbody>

            {requests.map(
              (request, index) => (

                <tr key={index}>

                  <td>
                    <strong>
                      {request.employee}
                    </strong>
                  </td>


                  <td>
                    {request.type}
                  </td>


                  <td>
                    {request.dates}
                  </td>


                  <td>

                    <span
                      className={`
                        status
                        ${
                          request.status ===
                          "Approved"
                            ? "approved"
                            : request.status ===
                              "Rejected"
                            ? "rejected"
                            : "pending"
                        }
                      `}
                    >
                      {request.status}
                    </span>

                  </td>


                  <td>

                    {request.status ===
                      "Pending" && (

                      <div className="action-buttons">

                        <button
                          className="approve-button"
                          onClick={() =>
                            handleApprove(index)
                          }
                        >
                          ✓ Approve
                        </button>


                        <button
                          className="reject-button"
                          onClick={() =>
                            handleReject(index)
                          }
                        >
                          ✕ Reject
                        </button>

                      </div>

                    )}


                    {request.status ===
                      "Approved" && (

                      <span className="action-completed">
                        Approved
                      </span>

                    )}


                    {request.status ===
                      "Rejected" && (

                      <span className="action-completed rejected-text">
                        Rejected
                      </span>

                    )}

                  </td>

                </tr>

              )
            )}

          </tbody>

        </table>

      </div>

    </section>
  );
}