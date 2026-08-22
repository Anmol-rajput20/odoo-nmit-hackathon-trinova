import Navbar from "../components/Navbar";

function TimeOff() {
  return (
    <div className="app">
      <Navbar />

      <main className="page">
        <h1>Time Off</h1>

        <div className="info-card">
          <p>Your leave requests will appear here.</p>
        </div>
      </main>
    </div>
  );
}

export default TimeOff;