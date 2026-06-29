import { useState, useEffect } from 'react';
import { Spinner, Alert, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import LibroCard from '../components/LibroCard';
import type { LibroCardProps } from '../types/Libro';
import '../assets/LibrosDestacados.css';
import './Catalogo.css';

function Catalogo() {
  const [libros, setLibros] = useState<LibroCardProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const cargar = async () => {
      try {
        const res = await fetch('/libros.json'); // mock en public/
        if (!res.ok) throw new Error('Error al cargar los libros');
        setLibros(await res.json());
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Error desconocido');
      } finally {
        setLoading(false);
      }
    };
    cargar();
  }, []);

  if (loading) return <Spinner animation="border" />;
  if (error) return <Alert variant="danger">{error}</Alert>;

  if (libros.length === 0) {
    return <p>No hay libros para mostrar.</p>;
  }

  return (
    <section className="libros">
      <div className="boton">
        <Button variant="primary" onClick={() => navigate('/libros/nuevo')}>
          Crear libro
        </Button>
      </div>
      <div className="container">
        <h2 className="titulo">Nuestros libros</h2>
        <div className="grid-libros">
          {libros.map(libro => (
            <LibroCard
              key={libro.id}
              id={libro.id}
              titulo={libro.titulo}
              autor={libro.autor}
              precio={libro.precio}
              imagen={libro.imagen}
              disponible={libro.disponible}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Catalogo;
