import { Link } from "react-router-dom";
export default function NotFound() {
  return (
    <section className="section">
      <div className="container empty">
        <h1>404</h1>
        <p>Página no encontrada.</p>
        <Link className="btn" to="/">
          Volver al inicio
        </Link>
      </div>
    </section>
  );
}
