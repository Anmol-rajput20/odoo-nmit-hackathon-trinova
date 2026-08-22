import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();

  const links = [
    {
      path: "/",
      label: "Employees",
    },
    {
      path: "/attendance",
      label: "Attendance",
    },
    {
      path: "/time-off",
      label: "Time Off",
    },
    {
      path: "/reports",
      label: "Reports",
    },
    {
      path: "/notifications",
      label: "Notifications",
    },
  ];

  return (
    <header className="navbar">

      {/* Brand */}

      <Link
        to="/"
        className="navbar-brand"
      >
        <div className="brand-logo">
          D
        </div>

        <div>
          <div className="brand-name">
            Dayflow
          </div>

          <div className="brand-subtitle">
            HRMS
          </div>
        </div>
      </Link>

      {/* Navigation */}

      <nav className="nav-links">

        {links.map((link) => {

          const isActive =
            link.path === "/"
              ? location.pathname === "/"
              : location.pathname.startsWith(
                  link.path
                );

          return (
            <Link
              key={link.path}
              to={link.path}
              className={
                isActive
                  ? "nav-link active"
                  : "nav-link"
              }
            >
              {link.label}
            </Link>
          );

        })}

      </nav>

      {/* Right side */}

      <div className="navbar-right">

        <span className="admin-label">
          For Admin/HR Officer
        </span>

        <Link to="/profile" className="avatar">A</Link>
      </div>

    </header>
  );
}