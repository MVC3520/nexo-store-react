import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
const money = (v) =>
  new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  }).format(v);
export default function ProductoDetalle() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [p, setP] = useState(null);
  const [q, setQ] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [ok, setOk] = useState(false);
  useEffect(() => {
    fetch("/productos.json")
      .then((r) => r.json())
      .then((d) => {
        const x = d.find((p) => String(p.id) === String(id));
        if (!x) throw Error("Producto no encontrado");
        setP(x);
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [id]);
  if (loading)
    return (
      <section className="section">
        <div className="container state">Cargando producto...</div>
      </section>
    );
  if (error)
    return (
      <section className="section">
        <div className="container state error">{error}</div>
      </section>
    );
  const agregar = () => {
    addToCart(p, q);
    setOk(true);
    setTimeout(() => setOk(false), 1600);
  };
  return (
    <section className="section">
      <div className="container">
        <Link className="back" to="/productos">
          ← Volver a productos
        </Link>
        <div className="detail">
          <div className="detailPic">
            <img src={p.imagen} alt={p.nombre} />
          </div>
          <div>
            <small className="kicker">
              {p.categoria} · ★ {p.rating}
            </small>
            <h1>{p.nombre}</h1>
            <p>{p.descripcionLarga}</p>
            <div className="price">{money(p.precio)}</div>
            <ul>
              {p.caracteristicas.map((c) => (
                <li key={c}>✓ {c}</li>
              ))}
            </ul>
            <div className="buy">
              <input
                type="number"
                min="1"
                value={q}
                onChange={(e) => setQ(Math.max(1, Number(e.target.value) || 1))}
              />
              <button className="btn" onClick={agregar}>
                Agregar al carrito
              </button>
            </div>
            {ok && (
              <div className="success">✓ Producto agregado al carrito</div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
