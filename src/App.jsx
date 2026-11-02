import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Productos from './pages/Productos';
import ProductoDetalle from './pages/ProductoDetalle';
import Carrito from './pages/Carrito';
import Login from './pages/Login';
import Admin from './pages/Admin';
import NotFound from './pages/NotFound';
import ProtectedRoute from './components/ProtectedRoute';

export default function App() {
  return <Routes>
    <Route element={<Layout />}>
      <Route path="/" element={<Home />} />
      <Route path="/productos" element={<Productos />} />
      <Route path="/producto/:id" element={<ProductoDetalle />} />
      <Route path="/carrito" element={<Carrito />} />
      <Route path="/login" element={<Login />} />
      <Route path="/admin" element={<ProtectedRoute><Admin /></ProtectedRoute>} />
      <Route path="*" element={<NotFound />} />
    </Route>
  </Routes>;
}
