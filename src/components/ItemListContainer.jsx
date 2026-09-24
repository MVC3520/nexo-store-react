import { useEffect, useState } from "react";
import Item from "./Item";
export default function ItemListContainer({ destacados = false }) {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    fetch("/productos.json")
      .then((r) => {
        if (!r.ok) throw Error("No se pudo cargar el catálogo");
        return r.json();
      })
      .then(setProductos)
      .catch((e) => setError(e.message))
      .finally(() => setCargando(false));
  }, []);
  if (cargando) return <div className="state">Cargando productos...</div>;
  if (error) return <div className="state error">Error: {error}</div>;
  const lista = destacados ? productos.slice(0, 4) : productos;
  return (
    <div className="grid">
      {lista.map((p) => (
        <Item key={p.id} producto={p} />
      ))}
    </div>
  );
}
