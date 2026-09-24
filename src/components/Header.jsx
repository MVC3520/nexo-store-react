import { Link, useLocation } from "react-router-dom";
import CartWidget from "./CartWidget";
export default function Header() {
  const { pathname } = useLocation();
  return (
    <header>
      <div className="container navwrap">
        <Link to="/" className="brand">
          <i>N</i>NEXO<span>STORE</span>
        </Link>
        <nav>
          <Link className={pathname === "/" ? "active" : ""} to="/">
            Inicio
          </Link>
          <Link
            className={pathname.startsWith("/producto") ? "active" : ""}
            to="/productos"
          >
            Productos
          </Link>
          <CartWidget />
        </nav>
      </div>
    </header>
  );
}
