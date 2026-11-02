import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Item({ producto: p }) {
  const { addItem } = useCart();

  return (
    <article className="product-card catalog-card">
      <div className="product-img catalog-img">
        <img src={p.imagen} alt={p.nombre} />
        <span className="badge">{p.badge || 'Destacado'}</span>
      </div>

      <div className="product-body catalog-body">
        <div className="product-meta">
          <span>{p.categoria}</span>
          <span className="rating">★ {p.rating}</span>
        </div>

        <h3>{p.nombre}</h3>
        <p>{p.descripcion}</p>

        <div className="product-bottom">
          <strong>${Number(p.precio).toLocaleString('es-AR')}</strong>
          <Link to={`/producto/${p.id}`}>Ver detalle →</Link>
        </div>

        <button className="btn primary wide catalog-add" onClick={() => addItem(p)}>
          Agregar al carrito
        </button>
      </div>
    </article>
  );
}
