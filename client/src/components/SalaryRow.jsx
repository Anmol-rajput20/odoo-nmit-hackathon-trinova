export default function SalaryRow({
  label,
  value,
  description
}) {
  const money = new Intl.NumberFormat(
    "en-IN",
    {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0
    }
  ).format(value);

  return (
    <div className="salary-row">

      <div>

        <strong>
          {label}
        </strong>

        <small>
          {description}
        </small>

      </div>

      <strong>
        {money}
      </strong>

    </div>
  );
}