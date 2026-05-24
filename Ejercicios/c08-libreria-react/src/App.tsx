import React from 'react';
import { Card, Button, Navbar as BsNavbar, Container } from 'react-bootstrap';
import './App.css'; 

function Navbar() {
  return (
    <BsNavbar bg="dark" variant="dark" className="navbar-custom">
      <Container>
        <BsNavbar.Brand href="#">📚 Librería</BsNavbar.Brand>
        <div className="nav-links">
          <a href="#">Inicio</a>
          <a href="#">Catálogo</a>
          <a href="#">Contacto</a>
          <a href="#">Libro</a>
        </div>
      </Container>
    </BsNavbar>
  );
}

function Hero() {
  return (
    <section className="hero">
      <h1>Bienvenidos a Mi Biblioteca</h1>
      <p>Explora nuestro catálogo de libros destacados</p>
      <Button variant="primary" className="hero-btn">Ver Catálogo</Button>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer-custom">
      <p>© 2026 Librería</p>
    </footer>
  );
}

type LibroCardProps = {
  titulo: string;
  autor: string;
  precio: number;
  imagen: string;
};

function LibroCard({ titulo, autor, precio, imagen }: LibroCardProps) {
  const [likes, setLikes] = React.useState<number>(0);

  return (
    <Card className="libro-card">
      <Card.Img variant="top" src={imagen} alt={titulo} className="libro-img" />
      <Card.Body>
        <Card.Title>{titulo}</Card.Title>
        <Card.Text>{autor}</Card.Text>
        <Card.Text>Precio: ${precio}</Card.Text>
        <Button variant="primary" onClick={() => setLikes(likes + 1)}>
          ❤️ {likes} Me gusta
        </Button>
      </Card.Body>
    </Card>
  );
}

function App() {
  return (
    <div>
      <Navbar />
      <Hero />
      <h2 className="titulo-home">Catálogo</h2>
      <div className="contenedor-libros">
        <LibroCard titulo=" El almacén de las palabras terribles" autor="Elsa Barceló" precio={5000} imagen="https://sbslibreria.vtexassets.com/arquivos/ids/5696665-1200-auto?v=639076167185970000&width=1200&height=auto&aspect=true" />
        <LibroCard titulo="La oscuridad de los colores" autor="Martín Blasco" precio={18000} imagen="https://www.normainfantilyjuvenil.com/ar/uploads/2019/05/resized/360_9789875456808.jpg"/>
        <LibroCard titulo="El principito" autor=" Antoine de Saint-Exupéry" precio={14000} imagen="https://image.cdn1.buscalibre.com/5b57fc1690f0b5295a8b4567.__RS360x360__.jpg"/>
        <LibroCard titulo="La llave del Aguila" autor=" Elisa Roldan" precio={16000} imagen="https://images.cdn3.buscalibre.com/fit-in/360x360/59/d8/59d8b70cee1af72a66f7ea9fc31e8da0.jpg"/>
        <LibroCard titulo="Un gato callejero llamado BOB" autor=" James Bowen" precio={4000} imagen="https://images.cdn3.buscalibre.com/fit-in/360x360/54/9f/549fa25d267d3afb91e95d1b2a6d9c4f.jpg" />
        <LibroCard titulo="El demonio y la señorita Prym" autor=" Paulo Coelho" precio={4000} imagen="https://proassetspdlcom.cdnstatics2.com/usuaris/libros/thumbs/7e83a25c-5520-4c02-8aa4-f2ef68082ec4/d_360_620/el-demonio-y-la-senorita-prym_9788408045083.webp" />
      </div>
      <Footer />
    </div>
  );
}

export default App;




