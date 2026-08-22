import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserCircle, LogOut, User } from "lucide-react";

function Navbar() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    // Later we'll clear the authentication token here
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <div className="logo">
          Dayflow
        </div>

        <Link to="/employees" className="nav-link">
          Employees
        </Link>

        <Link to="/attendance" className="nav-link">
          Attendance
        </Link>

        <Link to="/time-off" className="nav-link">
          Time Off
        </Link>
      </div>

      <div className="profile-container">
        <button
          className="profile-button"
          onClick={() => setOpen(!open)}
        >
          <UserCircle size={32} />
        </button>

        {open && (
          <div className="profile-dropdown">
            <button onClick={() => navigate("/profile")}>
              <User size={17} />
              My Profile
            </button>

            <button onClick={handleLogout}>
              <LogOut size={17} />
              Log Out
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;