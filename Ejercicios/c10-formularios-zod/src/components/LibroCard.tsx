import React, { useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import type { LibroCardProps } from '../types/Libro';
import {Link} from 'react-router-dom';
import './LibroCard.css';

function LibroCard({ id, titulo, autor, precio, imagen, disponible }: LibroCardProps) {
  const [disponibilidad, setDisponibilidad] = useState<boolean>(disponible);
  const [likes, setLikes] = React.useState<number>(0);
  return (
    <Card className="libro-card">
      <Card.Img variant="top" src={imagen} alt={titulo} className="libro-img" />
      {!disponibilidad ? <p className="false">Alquilado</p> : <p className="true">Disponible</p>}
      <Card.Body>
        <Card.Title>{titulo}</Card.Title>
        <Card.Text>{autor}</Card.Text>
        <Card.Text>Precio: ${precio}</Card.Text>
        <Button 
          variant="primary"
          className="cambiar-estado"
            onClick={() => setDisponibilidad(!disponibilidad)}
          >
            {disponibilidad ? 'Alquilar' : 'Devolver'}
        </Button>
        <Button variant="primary" onClick={() => setLikes(likes + 1)}>
          ❤️ {likes} Me gusta
        </Button>
       <Button
          as={Link as any}
          to={`/catalogo/${id}`}
          variant="outline-primary"
        >
          Ver más
        </Button>
      </Card.Body>
    </Card>
  );
}

export default LibroCard;