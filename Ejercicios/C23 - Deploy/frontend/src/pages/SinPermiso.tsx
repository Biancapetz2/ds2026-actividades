import { Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function SinPermiso() {
  return (
    <div className="container mt-5">
      <Alert variant="warning">
        <Alert.Heading>Sin permiso</Alert.Heading>

        <p>
          No tenés permisos para acceder a esta página.
        </p>

        <Link to="/catalogo" className="btn btn-primary">
          Volver al catálogo
        </Link>
      </Alert>
    </div>
  );
}