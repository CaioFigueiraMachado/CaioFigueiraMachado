function Card({ title, subtitle, children }) {
  return (
    <section className="card">
      {title && <h3>{title}</h3>}
      {subtitle && <p className="muted">{subtitle}</p>}
      {children}
    </section>
  )
}

export default Card
