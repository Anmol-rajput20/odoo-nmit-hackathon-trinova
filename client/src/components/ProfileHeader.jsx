export default function ProfileHeader({
  employee
}) {
  return (
    <div className="wire-card profile-header">

      <div className="profile-avatar">
        ✎
      </div>

      <div className="profile-header-content">

        <h2>
          {employee.name}
        </h2>

        <span className="profile-position">
          {employee.position}
        </span>

        <div className="profile-info-grid">

          <Info
            label="Login ID"
            value={employee.id}
          />

          <Info
            label="Email"
            value={employee.email}
          />

          <Info
            label="Mobile"
            value={employee.mobile}
          />

          <Info
            label="Company"
            value={employee.company}
          />

          <Info
            label="Department"
            value={employee.department}
          />

          <Info
            label="Manager"
            value={employee.manager}
          />

          <Info
            label="Location"
            value={employee.location}
          />

        </div>

      </div>

    </div>
  );
}

function Info({
  label,
  value
}) {
  return (
    <div className="profile-info">

      <span>{label}</span>

      <strong>{value}</strong>

    </div>
  );
}