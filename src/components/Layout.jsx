import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Toast from './Toast';
import ScrollTop from './ScrollTop';
import RouteSEO from './RouteSEO';

export default function Layout() {
  return <>
    <RouteSEO />
    <div className="app-shell">
      <Header />
      <main><Outlet /></main>
      <Footer />
      <Toast />
      <ScrollTop />
    </div>
  </>;
}
