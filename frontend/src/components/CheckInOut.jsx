import { useState } from "react";

function CheckInOut() {
  const [checkedIn, setCheckedIn] = useState(false);

  const handleCheckIn = () => {
    setCheckedIn(true);
  };

  const handleCheckOut = () => {
    setCheckedIn(false);
  };

  return (
    <div className="attendance-box">
      <div className="attendance-status">
        <span
          className={`attendance-indicator ${
            checkedIn ? "status-green" : "status-yellow"
          }`}
        />

        <span>
          {checkedIn ? "Currently Present" : "Not Checked In"}
        </span>
      </div>

      {!checkedIn ? (
        <button
          className="attendance-button"
          onClick={handleCheckIn}
        >
          Check IN →
        </button>
      ) : (
        <button
          className="attendance-button"
          onClick={handleCheckOut}
        >
          Check OUT →
        </button>
      )}
    </div>
  );
}

export default CheckInOut;