function MetricCard({ label, value, accent = false }) {
  return (
    <div className={`metric-card ${accent ? 'accent' : ''}`}>
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  )
}

export default MetricCard
