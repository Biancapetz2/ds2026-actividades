import { Link } from 'react-router-dom';
import './Hero.css';

function Hero() {
  return (
    <section className="hero">
      <h1>Bienvenidos a Mi Biblioteca</h1>
      <p>Explora nuestro catálogo de libros destacados</p>
          <Link to="/catalogo" className="btn btn-secondary btn-lg" id="ver-catalogo">
            Ver catálogo
          </Link>
    </section>
  );
}

export default Hero;