export default function StatCard({ label, value, variant, children }) {
  return (
    <article className={`stat-card stat-${variant}`}>
      <div className={`stat-icon ${variant}`} aria-hidden="true">
        {children}
      </div>
      <div className="stat-body">
        <span>{label}</span>
        <strong>{value}</strong>
      </div>
    </article>
  );
}
