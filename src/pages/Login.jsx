import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import PageSEO from '../components/PageSEO';

export default function Login() {
  const [mode, setMode] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const { login, register, firebaseConfigured } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  async function submit(event) {
    event.preventDefault(); setError(''); setBusy(true);
    try {
      if (mode === 'register') await register(email, password);
      else await login(email, password);
      navigate(location.state?.from?.pathname || '/admin', { replace: true });
    } catch (e) {
      const messages = {
        'auth/email-already-in-use': 'Ese correo ya está registrado.',
        'auth/invalid-credential': 'Correo o contraseña incorrectos.',
        'auth/weak-password': 'La contraseña debe tener al menos 6 caracteres.',
        'auth/invalid-email': 'Ingresá un correo válido.',
        'auth/operation-not-allowed': 'Activá el proveedor Email/Password en Firebase Authentication.',
      };
      setError(messages[e.code] || `No se pudo completar la operación: ${e.message}`);
    } finally { setBusy(false); }
  }

  return <section className="section container">
    <PageSEO title="Ingresar o registrarse" description="Acceso a Nexo Store con Firebase Authentication" />
    <div className="form-card">
      <span className="kicker">CUENTA</span>
      <h1>{mode === 'login' ? 'Iniciar sesión' : 'Crear cuenta'}</h1>
      <p>Accedé con tu correo y contraseña mediante Firebase Authentication.</p>
      {!firebaseConfigured && <p className="form-error">Firebase aún no está configurado. Completá el archivo .env siguiendo el README.</p>}
      <form onSubmit={submit}>
        <label>Correo electrónico<input type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} required /></label>
        <label>Contraseña<input type="password" autoComplete={mode === 'login' ? 'current-password' : 'new-password'} minLength="6" value={password} onChange={(e) => setPassword(e.target.value)} required /></label>
        {error && <p className="form-error" role="alert">{error}</p>}
        <button className="btn primary wide" disabled={busy || !firebaseConfigured}>{busy ? 'Procesando…' : mode === 'login' ? 'Ingresar' : 'Registrarme'}</button>
      </form>
      <button type="button" className="nav-button auth-switch" onClick={() => { setMode(mode === 'login' ? 'register' : 'login'); setError(''); }}>
        {mode === 'login' ? '¿No tenés cuenta? Registrate' : '¿Ya tenés cuenta? Ingresá'}
      </button>
    </div>
  </section>;
}
