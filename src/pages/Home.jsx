import { Link } from "react-router-dom";
import ItemListContainer from "../components/ItemListContainer";
export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="container heroGrid">
          <div>
            <small className="kicker">TECNOLOGÍA · DISEÑO · EXPERIENCIA</small>
            <h1>
              Tu próximo dispositivo empieza en <em>Nexo.</em>
            </h1>
            <p>
              Una selección de tecnología útil, simple y bien diseñada para
              estudiar, trabajar y disfrutar.
            </p>
            <Link className="btn" to="/productos">
              Explorar productos
            </Link>
          </div>
          <div className="heroCard">
            <span>SELECCIÓN NEXO</span>
            <div className="orb">N</div>
            <h2>Tecnología que se integra a tu rutina.</h2>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="title">
            <small className="kicker">DESTACADOS</small>
            <h2>Elegidos para vos</h2>
          </div>
          <ItemListContainer destacados />
        </div>
      </section>
    </>
  );
}
