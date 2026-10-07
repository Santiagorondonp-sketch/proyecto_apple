import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Loading from "../components/Loading.jsx";
import ErrorMessage from "../components/ErrorMessage.jsx";
import {
  API_PRODUCTO_URL,
  esProductoApple,
  adaptarProducto,
  formatearPrecio,
} from "../productosApi.js";

function ProductDetail() {
  // useParams lee el :id de la URL (por ejemplo /productos/5 -> id = "5")
  const { id } = useParams();

  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Pedimos el producto cada vez que cambia el id de la URL
  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError(false);

    fetch(API_PRODUCTO_URL + id, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error("Producto no encontrado");
        return res.json();
      })
      .then((data) => {
        // Si el producto no es de la tienda (no es Apple), lo tratamos como error
        if (!esProductoApple(data)) throw new Error("Producto no disponible");
        setProducto(adaptarProducto(data));
        setLoading(false);
      })
      .catch((err) => {
        if (err.name === "AbortError") return;
        setError(true);
        setLoading(false);
      });

    // Cancelamos la petición si salimos de la página o cambia el id
    return () => {
      controller.abort();
    };
  }, [id]);

  return (
    <section className="contenedor seccion">
      <Link to="/productos" className="enlace-volver">← Volver a productos</Link>

      {loading && <Loading />}
      {error && <ErrorMessage mensaje="No encontramos este producto." />}

      {!loading && !error && producto && (
        <div className="detalle">
          <div className="detalle-imagen">
            <img src={producto.imagen} alt={producto.nombre} />
          </div>
          <div className="detalle-info">
            <span className="etiqueta">{producto.categoria}</span>
            <h1>{producto.nombre}</h1>
            <p className="detalle-precio">{formatearPrecio(producto.precio)}</p>
            <p className="detalle-descripcion">{producto.descripcion}</p>
            <Link to="/productos" className="boton">Regresar a productos</Link>
          </div>
        </div>
      )}
    </section>
  );
}

export default ProductDetail;
