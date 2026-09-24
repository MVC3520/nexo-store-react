const team = [
  ["Lucía Torres", "Diseño & UX", "LT"],
  ["Mateo Ríos", "Frontend", "MR"],
  ["Sofía Vega", "Producto", "SV"],
];
export default function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="footTop">
          <div>
            <div className="brand">
              <i>N</i>NEXO<span>STORE</span>
            </div>
            <p>Tecnología seleccionada para hacer más simple tu día.</p>
            <small>Buenos Aires, Argentina · hola@nexostore.com</small>
          </div>
          <div>
            <h3>Proyecto académico</h3>
            <p>Pre-Entrega React JS · Talento Tech 2026-2C</p>
            <small>Miguel Victorio Cabrera</small>
          </div>
        </div>
        <h3>El equipo detrás de Nexo</h3>
        <div className="team">
          {team.map(([n, r, i]) => (
            <article key={n}>
              <b>{i}</b>
              <div>
                <strong>{n}</strong>
                <small>{r}</small>
              </div>
            </article>
          ))}
        </div>
        <div className="legal">
          © 2026 Nexo Store · Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}
