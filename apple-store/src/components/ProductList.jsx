import ProductCard from "./ProductCard.jsx";

// Recibe el arreglo de productos por props (PADRE -> HIJO)
function ProductList({ productos }) {
  return (
    <div className="grid-productos">
      {/* Mostramos cada producto utilizando su id como key */}
      {productos.map((producto) => (
        <ProductCard key={producto.id} producto={producto} />
      ))}
    </div>
  );
}

export default ProductList;
