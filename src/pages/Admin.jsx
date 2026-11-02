
import { useState } from 'react';
import { Modal, Button, Spinner } from 'react-bootstrap';
import { FiEdit2, FiTrash2, FiPlus } from 'react-icons/fi';
import { useProducts } from '../context/ProductContext';
import PageSEO from '../components/PageSEO';

const empty = {
  nombre: '',
  categoria: 'Tecnología',
  precio: '',
  rating: '4.8',
  imagen:
    'https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&w=900&q=80',
  descripcion: '',
  descripcionLarga: '',
  badge: 'Nuevo',
  caracteristicas: [],
};

export default function Admin() {
  const {
    products,
    loading,
    error,
    addProduct,
    updateProduct,
    deleteProduct,
    importInitialProducts,
  } = useProducts();

  const [form, setForm] = useState({ ...empty });
  const [editing, setEditing] = useState(null);
  const [deleting, setDeleting] = useState(null);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');
  const [formError, setFormError] = useState('');

  const change = (e) => {
    const { name, value } = e.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const edit = (product) => {
    setEditing(product.id);
    setForm({ ...product });
    setFormError('');
    setMessage('');

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const cancelEdit = () => {
    setEditing(null);
    setForm({ ...empty });
    setFormError('');
  };

  async function submit(e) {
    e.preventDefault();

    if (busy) return;

    setFormError('');
    setMessage('');

    const precio = Number(form.precio);
    const rating = Number(form.rating);

    if (!form.nombre.trim()) {
      setFormError('Ingresá el nombre del producto.');
      return;
    }

    if (!form.categoria.trim()) {
      setFormError('Ingresá una categoría.');
      return;
    }

    if (!Number.isFinite(precio) || precio <= 0) {
      setFormError('El precio debe ser mayor que cero.');
      return;
    }

    if (
      !Number.isFinite(rating) ||
      rating < 1 ||
      rating > 5
    ) {
      setFormError('La valoración debe estar entre 1 y 5.');
      return;
    }

    if (!form.imagen.trim()) {
      setFormError('Ingresá la URL de la imagen.');
      return;
    }

    if (!form.descripcion.trim()) {
      setFormError('Ingresá una descripción del producto.');
      return;
    }

    setBusy(true);

    try {
      if (editing !== null) {
        await updateProduct({
          ...form,
          id: editing,
        });

        setMessage('Producto actualizado correctamente.');
      } else {
        await addProduct(form);

        setMessage('Producto creado correctamente.');
      }

      setEditing(null);
      setForm({ ...empty });
    } catch (err) {
      console.error('Error al guardar producto:', err);

      setFormError(
        err.code === 'permission-denied'
          ? 'No tenés permisos para modificar productos en Firestore.'
          : err.message || 'No se pudo guardar el producto.'
      );
    } finally {
      setBusy(false);
    }
  }

  async function confirmDelete() {
    if (!deleting || busy) return;

    setBusy(true);
    setFormError('');
    setMessage('');

    try {
      await deleteProduct(deleting.id);

      setMessage('Producto eliminado correctamente.');
      setDeleting(null);
    } catch (err) {
      console.error('Error al eliminar producto:', err);

      setFormError(
        err.code === 'permission-denied'
          ? 'No tenés permisos para eliminar productos.'
          : err.message || 'No se pudo eliminar el producto.'
      );
    } finally {
      setBusy(false);
    }
  }

  async function importCatalog() {
    if (busy || loading || error || products.length > 0) {
      return;
    }

    setBusy(true);
    setFormError('');
    setMessage('');

    try {
      await importInitialProducts();

      setMessage(
        'Catálogo inicial importado correctamente en Firebase Firestore.'
      );
    } catch (err) {
      console.error('Error al importar catálogo:', err);

      setFormError(
        err.code === 'permission-denied'
          ? 'Firestore rechazó la importación. Verificá que hayas iniciado sesión con el usuario administrador autorizado.'
          : err.message || 'No se pudo importar el catálogo.'
      );
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="section container">
      <PageSEO
        title="Administrar productos"
        description="Panel de administración de Nexo Store"
      />

      <div className="section-head">
        <div>
          <span className="kicker">FIRESTORE · CRUD</span>
          <h1>Administrar productos</h1>
        </div>

        {!loading && !error && products.length === 0 && (
          <button
            type="button"
            className="btn primary"
            onClick={importCatalog}
            disabled={busy}
          >
            {busy ? (
              <>
                <Spinner
                  animation="border"
                  size="sm"
                  aria-hidden="true"
                />{' '}
                Importando...
              </>
            ) : (
              'Importar catálogo inicial'
            )}
          </button>
        )}
      </div>

      {loading && (
        <p className="status">
          <Spinner
            animation="border"
            size="sm"
            aria-hidden="true"
          />{' '}
          Cargando productos...
        </p>
      )}

      {error && (
        <p className="form-error" role="alert">
          Error al cargar productos: {error}
        </p>
      )}

      {formError && (
        <p className="form-error" role="alert">
          {formError}
        </p>
      )}

      {message && (
        <p className="success" role="status">
          {message}
        </p>
      )}

      <div className="admin-layout">
        <div className="form-card admin-form">
          <h3>
            {editing !== null
              ? 'Editar producto'
              : 'Nuevo producto'}
          </h3>

          <form onSubmit={submit}>
            <label>
              Nombre
              <input
                name="nombre"
                value={form.nombre}
                onChange={change}
                required
              />
            </label>

            <div className="form-row">
              <label>
                Categoría
                <input
                  name="categoria"
                  value={form.categoria}
                  onChange={change}
                  required
                />
              </label>

              <label>
                Precio
                <input
                  name="precio"
                  type="number"
                  min="0.01"
                  step="0.01"
                  value={form.precio}
                  onChange={change}
                  required
                />
              </label>
            </div>

            <div className="form-row">
              <label>
                Valoración
                <input
                  name="rating"
                  type="number"
                  min="1"
                  max="5"
                  step="0.1"
                  value={form.rating}
                  onChange={change}
                  required
                />
              </label>

              <label>
                Etiqueta
                <input
                  name="badge"
                  value={form.badge || ''}
                  onChange={change}
                />
              </label>
            </div>

            <label>
              URL de imagen
              <input
                name="imagen"
                type="url"
                value={form.imagen}
                onChange={change}
                required
              />
            </label>

            <label>
              Descripción
              <textarea
                name="descripcion"
                value={form.descripcion}
                onChange={change}
                required
              />
            </label>

            <label>
              Descripción larga
              <textarea
                name="descripcionLarga"
                value={form.descripcionLarga || ''}
                onChange={change}
              />
            </label>

            <button
              type="submit"
              className="btn primary wide"
              disabled={busy || loading || Boolean(error)}
            >
              {busy ? (
                'Guardando...'
              ) : (
                <>
                  <FiPlus aria-hidden="true" />{' '}
                  {editing !== null
                    ? 'Guardar cambios'
                    : 'Crear producto'}
                </>
              )}
            </button>

            {editing !== null && (
              <button
                type="button"
                className="btn ghost wide"
                onClick={cancelEdit}
                disabled={busy}
              >
                Cancelar edición
              </button>
            )}
          </form>
        </div>

        <div className="admin-list">
          {products.map((product) => (
            <article
              className="admin-item"
              key={product.id}
            >
              <img
                src={product.imagen}
                alt={product.nombre}
              />

              <div>
                <strong>{product.nombre}</strong>

                <span>
                  {product.categoria} · $
                  {Number(product.precio).toLocaleString(
                    'es-AR'
                  )}
                </span>
              </div>

              <button
                type="button"
                onClick={() => edit(product)}
                disabled={busy}
              >
                <FiEdit2 aria-hidden="true" /> Editar
              </button>

              <button
                type="button"
                className="danger"
                onClick={() => setDeleting(product)}
                disabled={busy}
              >
                <FiTrash2 aria-hidden="true" /> Eliminar
              </button>
            </article>
          ))}
        </div>
      </div>

      <Modal
        show={Boolean(deleting)}
        onHide={() => {
          if (!busy) setDeleting(null);
        }}
        centered
      >
        <Modal.Header closeButton={!busy}>
          <Modal.Title>
            Confirmar eliminación
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          ¿Querés eliminar definitivamente{' '}
          <strong>{deleting?.nombre}</strong>?
          Esta acción no se puede deshacer.
        </Modal.Body>

        <Modal.Footer>
          <Button
            variant="secondary"
            disabled={busy}
            onClick={() => setDeleting(null)}
          >
            Cancelar
          </Button>

          <Button
            variant="danger"
            disabled={busy}
            onClick={confirmDelete}
          >
            {busy
              ? 'Eliminando...'
              : 'Eliminar producto'}
          </Button>
        </Modal.Footer>
      </Modal>
    </section>
  );
}
