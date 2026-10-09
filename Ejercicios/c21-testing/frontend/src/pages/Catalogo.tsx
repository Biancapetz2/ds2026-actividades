import LibroCard from '../components/LibroCard';
import type { LibroCardProps } from '../types/Libro';
import '../assets/LibrosDestacados.css';
import { useFetch } from '../hooks/useFetch';
import { useBusqueda } from '../context/BusquedaContext'; 
import { Spinner, Alert } from 'react-bootstrap';

function Libros() {
  
  const { data: libros, loading, error } = useFetch<LibroCardProps[]>(`/libros`);
  
  const { filtro } = useBusqueda(); 

  if (loading) return <Spinner animation="border" />;
  if (error)   return <Alert variant="danger">{error}</Alert>;

  const term = filtro.trim().toLowerCase();
  const librosFiltrados = (libros ?? []).filter(
    (l) => l.titulo.toLowerCase().includes(term) || l.autor.nombre.toLowerCase().includes(term)
  );

  return (
    <>
      
      <p className="text-muted">
        Mostrando {librosFiltrados.length} de {(libros ?? []).length} libros
      </p>
      {librosFiltrados.length === 0 && (
        <Alert variant="secondary">Sin resultados para "{filtro}"</Alert>
      )}
      <div className="grid-libros">
        {librosFiltrados.map((libro) => <LibroCard key={libro.id} {...libro} />)}
      </div>
    </>
  );
}

export default Libros;