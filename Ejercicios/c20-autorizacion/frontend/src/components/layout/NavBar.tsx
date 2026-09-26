import { Navbar as BsNavbar } from 'react-bootstrap';
import { Container } from 'react-bootstrap';
import { Nav } from 'react-bootstrap';
import Navbar from 'react-bootstrap/Navbar';

function NavBar() {
  return (
    <BsNavbar bg="dark" variant="dark" className="navbar-custom">
      <Container>
        <Navbar.Brand href="/">📚 Librería</Navbar.Brand>
        <div className="nav-links">
          <Nav.Link href="/">Inicio</Nav.Link>
          <Nav.Link href="/catalogo">Catálogo</Nav.Link>
          <Nav.Link href="#">Contacto</Nav.Link>
        </div>
      </Container>
    </BsNavbar>
  );
}
export default NavBar;