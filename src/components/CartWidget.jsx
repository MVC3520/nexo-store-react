import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
export default function CartWidget() {
  const { getCartQuantity } = useCart();
  return (
    <Link className="cart" to="/carrito">
      🛒 Carrito <b>{getCartQuantity()}</b>
    </Link>
  );
}
