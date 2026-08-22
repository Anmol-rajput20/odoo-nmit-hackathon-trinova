import Card from "./Card";

export default function StatCard({
  title,
  value,
  description
}) {
  return (
    <Card className="stat-card">

      <span className="stat-title">
        {title}
      </span>

      <strong className="stat-value">
        {value}
      </strong>

      <small>
        {description}
      </small>

    </Card>
  );
}