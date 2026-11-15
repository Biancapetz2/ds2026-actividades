import { useNavigate } from 'react-router-dom';
import { Form, Button, Spinner, Alert } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { z } from 'zod';
import { libroSchema, type LibroValidado } from '../components/schemas/libroSchema';
import { useFetch } from '../hooks/useFetch';
import { apiFetch } from '../services/api';
import type { Autor, LibroCardProps } from '../types/Libro';

type LibroFormulario = z.input<typeof libroSchema>;

function LibroNuevo() {
  const navigate = useNavigate();
  const [errorApi, setErrorApi] = useState<string | null>(null);
  const { data: autores, loading, error } = useFetch<Autor[]>('/autores');

  const { register, handleSubmit, formState: { errors } } = useForm<LibroFormulario, unknown, LibroValidado>({
    resolver: zodResolver(libroSchema)
  });

  const onSubmit = async (data: LibroValidado) => {
    try {
      await apiFetch<LibroCardProps>('/libros', {
        method: 'POST',
        body: JSON.stringify(data),
      });
      navigate('/catalogo');
    } catch (e) {
      setErrorApi(e instanceof Error ? e.message : 'Error desconocido');
    }
  };

  if (loading) return <Spinner animation="border" />;
  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <Form onSubmit={handleSubmit(onSubmit)} className="container py-4" style={{ maxWidth: 480 }}>
      <h2>Nuevo libro</h2>

      {errorApi && <Alert variant="danger">{errorApi}</Alert>}

      <Form.Group className="mb-3">
        <Form.Label>Título</Form.Label>
        <Form.Control
          {...register('titulo')}
          isInvalid={!!errors.titulo}
        />
        <Form.Control.Feedback type="invalid">
          {errors.titulo?.message}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Autor</Form.Label>
        <Form.Select
          {...register('autorId')}
          isInvalid={!!errors.autorId}
        >
          <option value="">Seleccioná un autor…</option>
          {(autores ?? []).map((autor) => (
            <option key={autor.id} value={autor.id}>{autor.nombre}</option>
          ))}
        </Form.Select>
        <Form.Control.Feedback type="invalid">
          {errors.autorId?.message}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Precio</Form.Label>
        <Form.Control
          type="number"
          {...register('precio', { valueAsNumber: true })}
          isInvalid={!!errors.precio}
        />
        <Form.Control.Feedback type="invalid">
          {errors.precio?.message}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Imagen (URL)</Form.Label>
        <Form.Control
          placeholder="https://…"
          {...register('imagen')}
          isInvalid={!!errors.imagen}
        />
        <Form.Control.Feedback type="invalid">
          {errors.imagen?.message}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Check
        className="mb-3"
        label="Disponible"
        {...register('disponible')}
      />

      <Button type="submit">Agregar libro</Button>
    </Form>
  );
}

export default LibroNuevo;