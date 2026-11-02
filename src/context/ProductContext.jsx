import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { addDoc, collection, deleteDoc, doc, onSnapshot, updateDoc, writeBatch } from 'firebase/firestore';
import { db, firebaseConfigured } from '../firebase';

const ProductContext = createContext(null);
export const useProducts = () => useContext(ProductContext);
const normalize = (p) => ({
  nombre: p.nombre.trim(), categoria: p.categoria.trim() || 'Otros',
  precio: Number(p.precio), rating: Number(p.rating) || 4.5,
  imagen: p.imagen.trim(), descripcion: p.descripcion.trim(),
  descripcionLarga: (p.descripcionLarga || '').trim(), badge: (p.badge || '').trim(),
  caracteristicas: Array.isArray(p.caracteristicas) ? p.caracteristicas : [],
});

export function ProductProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!db) {
      fetch('/productos.json').then((r) => {
        if (!r.ok) throw new Error('No se pudo cargar el catálogo de ejemplo');
        return r.json();
      }).then(setProducts).catch((e) => setError(e.message)).finally(() => setLoading(false));
      return;
    }
    const unsubscribe = onSnapshot(collection(db, 'productos'), (snapshot) => {
      setProducts(snapshot.docs.map((item) => ({ ...item.data(), id: item.id })));
      setError(''); setLoading(false);
    }, (e) => { setError(`Error de Firestore: ${e.message}`); setLoading(false); });
    return unsubscribe;
  }, []);

  const requireDb = () => { if (!db) throw new Error('Primero configurá Firebase en .env'); };
  const addProduct = async (p) => { requireDb(); return addDoc(collection(db, 'productos'), normalize(p)); };
  const updateProduct = async (p) => { requireDb(); return updateDoc(doc(db, 'productos', String(p.id)), normalize(p)); };
  const deleteProduct = async (id) => { requireDb(); return deleteDoc(doc(db, 'productos', String(id))); };
  const importInitialProducts = async () => {
    requireDb();
    if (products.length) throw new Error('La importación inicial solo está disponible con el catálogo vacío.');
    const response = await fetch('/productos.json');
    if (!response.ok) throw new Error('No se pudo leer productos.json');
    const samples = await response.json();
    const batch = writeBatch(db);
    for (const product of samples) {
      const ref = doc(collection(db, 'productos'));
      batch.set(ref, normalize(product));
    }
    await batch.commit();
  };
  const value = useMemo(() => ({ products, loading, error, addProduct, updateProduct, deleteProduct, importInitialProducts, firebaseConfigured }), [products, loading, error]);
  return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>;
}
