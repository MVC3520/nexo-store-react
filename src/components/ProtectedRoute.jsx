
import { Navigate, useLocation } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  const adminUid = import.meta.env.VITE_ADMIN_UID;

  if (loading) {
    return (
      <div className="status">
        <Spinner animation="border" size="sm" />
        Verificando sesión...
      </div>
    );
  }

  if (!user) {
    return (
      <Navigate
        to="/login"
        state={{ from: location }}
        replace
      />
    );
  }

  if (!adminUid || user.uid !== adminUid) {
    return (
      <div className="status">
        No tenés permisos para acceder al panel de administración.
      </div>
    );
  }

  return children;
}
