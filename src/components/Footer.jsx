const team = [
  ['Lucía Torres', 'Diseño & UX', 'LT'],
  ['Mateo Ríos', 'Frontend', 'MR'],
  ['Sofía Vega', 'Producto', 'SV']
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div>
            <div className="brand footer-brand">NEXO<span>STORE</span></div>
            <p>Tecnología seleccionada para hacer más simple tu día.</p>
            <p className="muted">📍 Buenos Aires, Argentina</p>
            <p className="muted">✉ hola@nexostore.com</p>
          </div>
          <div>
            <h4>Newsletter</h4>
            <p>Ideas, novedades y lanzamientos. Sin spam.</p>
            <form className="newsletter" onSubmit={(e) => e.preventDefault()}>
              <input type="email" placeholder="tu@email.com" aria-label="Email" />
              <button type="submit">Suscribirme</button>
            </form>
          </div>
        </div>

        <div className="team">
          <h4>El equipo detrás de Nexo</h4>
          <div className="team-grid">
            {team.map(([nombre, rol, iniciales]) => (
              <article className="person" key={nombre}>
                <div className="avatar">{iniciales}</div>
                <div><strong>{nombre}</strong><span>{rol}</span></div>
                <div className="social" aria-hidden="true">●</div>
              </article>
            ))}
          </div>
        </div>

        <div className="author-box">
          <span>Proyecto Final Integrador · React JS · Talento Tech 2026-2C</span>
          <strong>Alumno: Miguel Victorio Cabrera</strong>
        </div>

        <div className="legal">
          <span>© 2026 Nexo Store · Todos los derechos reservados.</span>
          <span>Privacidad · Términos · Cambios y devoluciones</span>
        </div>
      </div>
    </footer>
  );
}
