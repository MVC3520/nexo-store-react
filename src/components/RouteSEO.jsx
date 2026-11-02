import { useLocation } from 'react-router-dom';
import PageSEO from './PageSEO';
export default function RouteSEO() {
  const { pathname } = useLocation();
  const title = pathname === '/' ? 'Inicio' : pathname === '/productos' ? 'Productos' :
    pathname.startsWith('/producto/') ? 'Detalle de producto' :
    pathname === '/carrito' ? 'Carrito' : pathname === '/login' ? 'Ingresar' :
    pathname === '/admin' ? 'Administración' : 'Página no encontrada';
  return <PageSEO title={title} />;
}
