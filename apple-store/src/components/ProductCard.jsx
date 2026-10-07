import { Link } from "react-router-dom";
import { formatearPrecio } from "../productosApi.js";

// Recibe UN producto por props (PADRE -> HIJO) y lo muestra
function ProductCard({ producto }) {
  return (
    <article className="card">
      <div className="card-imagen">
        <img src={producto.imagen} alt={producto.nombre} />
      </div>
      <span className="etiqueta">{producto.categoria}</span>
      <h3>{producto.nombre}</h3>
      <p className="card-precio">{formatearPrecio(producto.precio)}</p>
      <p className="card-descripcion">{producto.descripcion}</p>
      {/* El id del producto viaja en la URL: /productos/1 */}
      <Link to={`/productos/${producto.id}`} className="boton boton-completo">
        Ver producto
      </Link>
    </article>
  );
}

export default ProductCard;
