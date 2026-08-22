import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";

function EmployeeInfo() {
  const { id } = useParams();

  return (
    <div className="app">
      <Navbar />

      <main className="page">
        <h1>Employee Information</h1>
        <p>Employee ID: {id}</p>

        <div className="info-card">
          <h2>Employee Details</h2>

          <p>
            This page will display employee information in
            view-only mode.
          </p>
        </div>
      </main>
    </div>
  );
}

export default EmployeeInfo;