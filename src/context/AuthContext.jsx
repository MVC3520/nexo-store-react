
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react';

import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut
} from 'firebase/auth';

import { auth, firebaseConfigured } from '../firebase';

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(firebaseConfigured);

  useEffect(() => {
    if (!auth) {
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(
      auth,
      (nextUser) => {
        setUser(nextUser);
        setLoading(false);
      },
      (error) => {
        console.error('Error de autenticación:', error);
        setLoading(false);
      }
    );

    return unsubscribe;
  }, []);

  const login = (email, password) =>
    signInWithEmailAndPassword(auth, email, password);

  const register = (email, password) =>
    createUserWithEmailAndPassword(auth, email, password);

  const logout = () =>
    auth ? signOut(auth) : Promise.resolve();

  const value = useMemo(
    () => ({
      user,
      loading,
      login,
      register,
      logout,
      firebaseConfigured
    }),
    [user, loading]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
