import ItemListContainer from "../components/ItemListContainer";
export default function Productos() {
  return (
    <section className="section">
      <div className="container">
        <div className="pageTitle">
          <small className="kicker">CATÁLOGO</small>
          <h1>Productos</h1>
          <p>Explorá nuestra selección de tecnología y accesorios.</p>
        </div>
        <ItemListContainer />
      </div>
    </section>
  );
}
