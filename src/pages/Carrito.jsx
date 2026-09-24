import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const money = v =>
  new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    maximumFractionDigits: 0
  }).format(v);

export default function Carrito() {

  const {
    cart,
    removeFromCart,
    clearCart,
    getCartQuantity,
    getCartTotal
  } = useCart();

  return (
    <section className="section">
      <div className="container">

        <div className="pageTitle">
          <small className="kicker">TU SELECCIÓN</small>
          <h1>Carrito</h1>
          <p>{getCartQuantity()} producto(s) agregado(s).</p>
        </div>

        {!cart.length ? (

          <div className="empty">
            <h2>🛒 Tu carrito está vacío</h2>
            <p>Agregá productos desde la vista de detalle.</p>

            <Link className="btn" to="/productos">
              Ver productos
            </Link>
          </div>

        ) : (

          <>
            <div className="cartLayout">

              <div>
                {cart.map(i => (
                  <article className="cartItem" key={i.id}>

                    <img
                      src={i.imagen}
                      alt={i.nombre}
                    />

                    <div>
                      <small>{i.categoria}</small>
                      <h3>{i.nombre}</h3>
                      <p>Cantidad: {i.quantity}</p>
                    </div>

                    <div>
                      <b>{money(i.precio * i.quantity)}</b>

                      <button
                        onClick={() => removeFromCart(i.id)}
                      >
                        Eliminar
                      </button>
                    </div>

                  </article>
                ))}
              </div>

              <aside>
                <h3>Resumen</h3>

                <p>
                  Unidades <b>{getCartQuantity()}</b>
                </p>

                <p className="total">
                  Total <b>{money(getCartTotal())}</b>
                </p>

                <button
                  className="ghost"
                  onClick={clearCart}
                >
                  Vaciar carrito
                </button>
              </aside>

            </div>

            <Link
              to="/productos"
              className="seguirComprando"
            >
              ← Seguir comprando
            </Link>
          </>

        )}

      </div>
    </section>
  );
}