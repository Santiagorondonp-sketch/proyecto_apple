import { Link, NavLink } from "react-router-dom";

// Barra de navegación: usa Link y NavLink (nunca <a>) para no recargar la página
function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar-contenido contenedor">
        <Link to="/" className="logo">
          Apple Store
        </Link>
        <nav className="menu">
          {/* "end" evita que Inicio quede marcado en todas las rutas */}
          <NavLink to="/" end>Inicio</NavLink>
          <NavLink to="/productos">Productos</NavLink>
          <NavLink to="/nosotros">Nosotros</NavLink>
          <NavLink to="/contacto">Contacto</NavLink>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
