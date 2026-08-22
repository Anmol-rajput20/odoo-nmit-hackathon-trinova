import {
  leaveRequests
} from "../data/employees";

import PageHeader from "../components/PageHeader";
import StatCard from "../components/StatCard";

export default function TimeOff() {

  const pending =
    leaveRequests.filter(
      (x) => x.status === "Pending"
    ).length;

  const approved =
    leaveRequests.filter(
      (x) => x.status === "Approved"
    ).length;

  return (
    <section className="page">

      <PageHeader
        eyebrow="TIME OFF"
        title="Leave & Time Off"
        description="Review employee leave requests."
        action={
          <button className="primary-button">
            + Request Time Off
          </button>
        }
      />

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
          title="Total"
          value={leaveRequests.length}
          description="Leave requests"
        />

      </div>

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

            {leaveRequests.map(
              (request, index) => (

                <tr key={index}>

                  <td>
                    {request.employee}
                  </td>

                  <td>
                    {request.type}
                  </td>

                  <td>
                    {request.dates}
                  </td>

                  <td>

                    <span
                      className={
                        request.status ===
                        "Approved"
                          ? "status approved"
                          : "status pending"
                      }
                    >
                      {request.status}
                    </span>

                  </td>

                  <td>

                    {request.status ===
                      "Pending" && (

                      <div className="action-buttons">

                        <button>
                          Approve
                        </button>

                        <button>
                          Reject
                        </button>

                      </div>

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