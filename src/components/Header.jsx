
import { NavLink } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

export default function Header() {
  const { count } = useCart();
  const { user, logout } = useAuth();

  // UID del administrador configurado en .env
  const adminUid = import.meta.env.VITE_ADMIN_UID;

  // Solo la cuenta autorizada puede ver Administrar
  const isAdmin = Boolean(
    user && adminUid && user.uid === adminUid
  );

  return (
    <header className="header">
      <div className="container nav-wrap">
        <NavLink className="brand" to="/">
          NEXO<span>STORE</span>
        </NavLink>

        <nav>
          <NavLink to="/">Inicio</NavLink>

          <NavLink to="/productos">
            Productos
          </NavLink>

          <NavLink to="/carrito">
            🛒 Carrito{' '}
            <b className="badge-count">{count}</b>
          </NavLink>

          {user ? (
            <>
              {isAdmin && (
                <NavLink to="/admin">
                  Administrar
                </NavLink>
              )}

              <button
                type="button"
                className="nav-button"
                onClick={logout}
              >
                Salir
              </button>
            </>
          ) : (
            <NavLink to="/login">
              Ingresar
            </NavLink>
          )}
        </nav>
      </div>
    </header>
  );
}
