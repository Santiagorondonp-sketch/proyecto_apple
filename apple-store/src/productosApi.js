// Direcciones de la API pública (DummyJSON)
export const API_URL = "https://dummyjson.com/products?limit=200";
export const API_PRODUCTO_URL = "https://dummyjson.com/products/";

// La API trae precios en dólares. Los convertimos a pesos con una tasa fija sencilla
const TASA_COP = 4000;

// Categorías de la API que nos sirven para una tienda tecnológica
const categoriasTech = [
  "smartphones",
  "laptops",
  "tablets",
  "mobile-accessories",
  "mens-watches",
  "womens-watches",
];

// Devuelve true solo si el producto es tecnológico y de marca Apple
export function esProductoApple(p) {
  const esTech = categoriasTech.includes(p.category);
  const titulo = p.title.toLowerCase();
  const esApple =
    p.brand === "Apple" ||
    /\b(apple|iphone|ipad|macbook|imac|airpods)\b/.test(titulo);
  return esTech && esApple;
}

// Según el nombre, asignamos una categoría sencilla
function obtenerCategoria(titulo) {
  const t = titulo.toLowerCase();
  if (t.includes("iphone")) return "iPhone";
  if (t.includes("macbook") || t.includes("imac")) return "Mac";
  if (t.includes("ipad")) return "iPad";
  if (t.includes("watch")) return "Watch";
  if (t.includes("airpods")) return "AirPods";
  return "Accesorios";
}

// Convierte el producto de la API en el objeto que usa nuestra tienda
export function adaptarProducto(p) {
  return {
    id: p.id,
    nombre: p.title,
    precio: Math.round((p.price * TASA_COP) / 1000) * 1000,
    descripcion: p.description,
    categoria: obtenerCategoria(p.title),
    imagen: p.thumbnail,
  };
}

// Muestra el precio con formato: $ 4.400.000 COP
export function formatearPrecio(valor) {
  return "$ " + valor.toLocaleString("es-CO") + " COP";
}
