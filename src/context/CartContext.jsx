import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem('nexo-cart') || '[]'));
  const [notice, setNotice] = useState('');
  useEffect(() => localStorage.setItem('nexo-cart', JSON.stringify(cart)), [cart]);
  useEffect(() => { if (!notice) return; const t = setTimeout(() => setNotice(''), 2200); return () => clearTimeout(t); }, [notice]);

  const addItem = (product, qty = 1) => { setCart(prev => { const found = prev.find(i => i.id === product.id); return found ? prev.map(i => i.id === product.id ? { ...i, qty: i.qty + qty } : i) : [...prev, { ...product, qty }]; }); setNotice(`${product.nombre} agregado al carrito`); };
  const removeItem = id => setCart(prev => prev.filter(i => i.id !== id));
  const changeQty = (id, qty) => setCart(prev => prev.map(i => i.id === id ? { ...i, qty: Math.max(1, qty) } : i));
  const clearCart = () => setCart([]);
  const count = cart.reduce((a, i) => a + i.qty, 0);
  const total = cart.reduce((a, i) => a + i.precio * i.qty, 0);
  const value = useMemo(() => ({ cart, addItem, removeItem, changeQty, clearCart, count, total, notice }), [cart, count, total, notice]);
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
