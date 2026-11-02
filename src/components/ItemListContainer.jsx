import { useEffect, useMemo, useState } from 'react';
import { Row, Col, Spinner } from 'react-bootstrap';
import { FiSearch, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import styled from 'styled-components';
import Item from './Item';
import { useProducts } from '../context/ProductContext';

const SearchField = styled.div`
  position: relative;
  input { padding-left: 2.6rem !important; }
  svg { position: absolute; top: 50%; left: 0.9rem; transform: translateY(-50%); pointer-events: none; }
`;
const PAGE_SIZE = 6;

export default function ItemListContainer({ limite }) {
  const { products, loading, error } = useProducts();
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('Todas');
  const [page, setPage] = useState(1);
  const categories = useMemo(() => ['Todas', ...new Set(products.map((p) => p.categoria))], [products]);
  const filtered = useMemo(() => products.filter((p) =>
    `${p.nombre} ${p.categoria}`.toLowerCase().includes(query.toLowerCase()) &&
    (category === 'Todas' || p.categoria === category)
  ), [products, query, category]);
  useEffect(() => setPage(1), [query, category]);
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const visible = limite ? filtered.slice(0, limite) : filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  if (loading) return <div className="status" role="status"><Spinner animation="border" size="sm" /> Cargando productos…</div>;
  if (error) return <div className="status error" role="alert">{error}</div>;
  return <>
    <div className="catalog-tools">
      <div className="filters">
        <SearchField><FiSearch aria-hidden="true" /><input aria-label="Buscar productos" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Buscar productos…" /></SearchField>
        <select aria-label="Filtrar por categoría" value={category} onChange={(e) => setCategory(e.target.value)}>
          {categories.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>
      <span>{filtered.length} productos</span>
    </div>
    <Row className="g-4 catalog-bootstrap-grid">
      {visible.map((p) => <Col xs={12} sm={6} lg={4} key={p.id}><Item producto={p} /></Col>)}
    </Row>
    {visible.length === 0 && <div className="no-results">No encontramos productos con esos filtros.</div>}
    {!limite && totalPages > 1 && <nav className="catalog-pagination" aria-label="Paginación de productos">
      <button className="btn ghost" disabled={page === 1} onClick={() => setPage((n) => n - 1)}><FiChevronLeft aria-hidden="true" /> Anterior</button>
      <span>Página {page} de {totalPages}</span>
      <button className="btn ghost" disabled={page === totalPages} onClick={() => setPage((n) => n + 1)}>Siguiente <FiChevronRight aria-hidden="true" /></button>
    </nav>}
  </>;
}
