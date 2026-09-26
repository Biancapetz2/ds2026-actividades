import { Navigate, Outlet } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';

import { useAuth } from '../context/AuthContext';
import type { Rol } from '../types/sesionType';

interface PrivateRouteProps {
  rol?: Rol;
}

export default function PrivateRoute({ rol }: PrivateRouteProps) {
  const { usuario, cargando } = useAuth();

  // 1. Todavía no sabemos quién es el usuario
  if (cargando) {
    return (
      <div className="d-flex justify-content-center mt-5">
        <Spinner animation="border" />
      </div>
    );
  }

  // 2. No está autenticado
  if (!usuario) {
    return <Navigate to="/login" replace />;
  }

  // 3. Está autenticado, pero no tiene el rol necesario
  if (rol && usuario.rol !== rol) {
    return <Navigate to="/sin-permiso" replace />;
  }

  // Puede entrar
  return <Outlet />;
}