import { createContext, useContext, useState } from "react";
const CartContext = createContext();
export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const addToCart = (producto, cantidad = 1) => {
    const q = Math.max(1, Number(cantidad) || 1);
    setCart((prev) => {
      const e = prev.find((i) => i.id === producto.id);
      return e
        ? prev.map((i) =>
            i.id === producto.id ? { ...i, quantity: i.quantity + q } : i,
          )
        : [...prev, { ...producto, quantity: q }];
    });
  };
  const removeFromCart = (id) => setCart((p) => p.filter((i) => i.id !== id));
  const clearCart = () => setCart([]);
  const getCartQuantity = () => cart.reduce((t, i) => t + i.quantity, 0);
  const getCartTotal = () =>
    cart.reduce((t, i) => t + i.precio * i.quantity, 0);
  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        getCartQuantity,
        getCartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
export const useCart = () => useContext(CartContext);
