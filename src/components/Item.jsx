import { Link } from "react-router-dom";
const money = (v) =>
  new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  }).format(v);
export default function Item({ producto }) {
  return (
    <article className="card">
      <div className="pic">
        <img src={producto.imagen} alt={producto.nombre} />
        <span>{producto.badge}</span>
      </div>
      <div className="body">
        <small>
          {producto.categoria} · ★ {producto.rating}
        </small>
        <h3>{producto.nombre}</h3>
        <p>{producto.descripcion}</p>
        <div className="bottom">
          <b>{money(producto.precio)}</b>
          <Link to={`/producto/${producto.id}`}>Ver detalle →</Link>
        </div>
      </div>
    </article>
  );
}
