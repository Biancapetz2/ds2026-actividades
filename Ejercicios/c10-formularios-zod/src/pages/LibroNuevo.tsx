import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { libroSchema } from "../components/schemas/libroSchema";
import { z } from "zod";

const IMG_PLACEHOLDER = "https://placehold.co/300x400?text=Libro";

interface Props {
  onAgregar: (libro: z.infer<typeof libroSchema> & { id: number; imagen: string }) => void;
}

function LibroNuevo({ onAgregar }: Props) {
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm<z.infer<typeof libroSchema>>({
    resolver: zodResolver(libroSchema),
  });

  const onSubmit = (data: z.infer<typeof libroSchema>) => {
    onAgregar({
      ...data,
      id: Date.now(),
      imagen: IMG_PLACEHOLDER,
    });
    navigate("/catalogo");
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)} className="container py-4" style={{ maxWidth: 480 }}>
      <h2>Nuevo libro</h2>

      <Form.Group className="mb-3">
        <Form.Label>Título</Form.Label>
        <Form.Control {...register("titulo")} isInvalid={!!errors.titulo} />
        <Form.Control.Feedback type="invalid">{errors.titulo?.message}</Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Autor</Form.Label>
        <Form.Control {...register("autor")} isInvalid={!!errors.autor} />
        <Form.Control.Feedback type="invalid">{errors.autor?.message}</Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Precio</Form.Label>
        <Form.Control
          type="number"
          {...register("precio", { valueAsNumber: true })}
          isInvalid={!!errors.precio}
        />
        <Form.Control.Feedback type="invalid">{errors.precio?.message}</Form.Control.Feedback>
      </Form.Group>

      <Form.Check className="mb-3" label="Disponible" {...register("disponible")} />

      <Button type="submit">Agregar libro</Button>
    </Form>
  );
}

export default LibroNuevo;
