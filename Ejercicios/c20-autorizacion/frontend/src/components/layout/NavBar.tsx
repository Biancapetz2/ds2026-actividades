import {
  Navbar,
  Container,
  Nav,
  Button,
} from 'react-bootstrap';

import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

function NavBar() {
  const navigate = useNavigate();

  const {
    usuario,
    logout,
  } = useAuth();

  const manejarSesion = () => {
    if (usuario) {
      logout();
      navigate('/');
    } else {
      navigate('/login');
    }
  };

  return (
    <Navbar
      bg="dark"
      variant="dark"
      className="navbar-custom"
    >
      <Container>
        <Navbar.Brand href="/">
          📚 Librería
        </Navbar.Brand>

        <div className="nav-links">
          <Nav.Link href="/">
            Inicio
          </Nav.Link>

          <Nav.Link href="/catalogo">
            Catálogo
          </Nav.Link>

          <Nav.Link href="#">
            Contacto
          </Nav.Link>
        </div>

        <div className="d-flex align-items-center gap-3">
          {usuario && (
            <Navbar.Text>
              Hola, {usuario.nombre}
            </Navbar.Text>
          )}

          <Button
            variant="outline-light"
            onClick={manejarSesion}
          >
            {usuario ? 'Salir' : 'Ingresar'}
          </Button>
        </div>
      </Container>
    </Navbar>
  );
}

export default NavBar;