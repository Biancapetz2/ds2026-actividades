import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import type {LibroCardProps} from '../types/Libro';

const IMG_PLACEHOLDER = 'https://placehold.co/300x400?text=Libro' ;
interface Props { onAgregar: (libro: LibroCardProps) => void; }
function LibroNuevo({ onAgregar }: Props) {
  const navigate = useNavigate();
  const [form, setForm] = useState({ titulo: '', autor: '', precio: 
 '', disponible: true });
  const [errores, setErrores] = useState<Record<string, 
 string>>({});
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
  };
  const validar = () => {
    const err: Record<string, string> = {};
    if (!form.titulo.trim()) err.titulo = 'El título es obligatorio';
    if (!form.autor.trim())  err.autor  = 'El autor es obligatorio';
    if (form.precio === '' || Number(form.precio) <= 0) err.precio = 
    'El precio debe ser mayor a 0';
    return err;
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const err = validar();
    if (Object.keys(err).length > 0) { setErrores(err); return; }
    onAgregar({
      id: Date.now(), 
      titulo: form.titulo, autor: form.autor,
      precio: Number(form.precio), imagen: IMG_PLACEHOLDER, 
     disponible: form.disponible,
    });
    navigate('/catalogo');
 };
 return (
    <Form onSubmit={handleSubmit} className="container py-4" 
    style={{ maxWidth: 480 }}>
      <h2>Nuevo libro</h2>
      <Form.Group className="mb-3">
        <Form.Label>Título</Form.Label>
        <Form.Control name="titulo" value={form.titulo} 
    onChange={handleChange} isInvalid={!!errores.titulo} />
        <Form.Control.Feedback 
    type="invalid">{errores.titulo}</Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Autor</Form.Label>
        <Form.Control name="autor" value={form.autor} 
    onChange={handleChange} isInvalid={!!errores.autor} />
        <Form.Control.Feedback 
    type="invalid">{errores.autor}</Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Precio</Form.Label>
        <Form.Control type="number" name="precio" 
    value={form.precio} onChange={handleChange} 
    isInvalid={!!errores.precio} />
        <Form.Control.Feedback 
    type="invalid">{errores.precio}</Form.Control.Feedback>
      </Form.Group>
      <Form.Check className="mb-3" label="Disponible" 
    name="disponible" checked={form.disponible} onChange={handleChange} 
    />
      <Button type="submit">Agregar libro</Button>
    </Form>
  );
}
export default LibroNuevo;
