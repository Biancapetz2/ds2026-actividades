import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/layout';
import Home from './pages/Home';
import type { LibroCardProps } from './types/Libro';
import LibroNuevo from './pages/LibroNuevo';
import { useState } from 'react';
import Libros from './pages/Catalogo';
import DetalleLibro from './pages/LibroDetalle';


export const librosIniciales: LibroCardProps= [
    {id: 1, titulo: " El almacén de las palabras terribles", autor: "Elsa Barceló", precio: 5000, imagen: "https://sbslibreria.vtexassets.com/arquivos/ids/5696665-1200-auto?v=639076167185970000&width=1200&height=auto&aspect=true", disponible: true },
    {id: 2, titulo: "La oscuridad de los colores", autor: "Martín Blasco", precio: 18000, imagen: "https://www.normainfantilyjuvenil.com/ar/uploads/2019/05/resized/360_9789875456808.jpg", disponible: true },
    {id: 3, titulo: "El principito", autor: " Antoine de Saint-Exupéry", precio: 14000, imagen: "https://image.cdn1.buscalibre.com/5b57fc1690f0b5295a8b4567.__RS360x360__.jpg", disponible: false },
    {id: 4, titulo: "La llave del Aguila", autor: " Elisa Roldan", precio: 16000, imagen: "https://images.cdn3.buscalibre.com/fit-in/360x360/59/d8/59d8b70cee1af72a66f7ea9fc31e8da0.jpg", disponible: true },
    {id: 5, titulo: "Un gato callejero llamado BOB", autor: " James Bowen", precio: 4000, imagen: "https://images.cdn3.buscalibre.com/fit-in/360x360/54/9f/549fa25d267d3afb91e95d1b2a6d9c4f.jpg", disponible: false },
    {id: 6, titulo: "El demonio y la señorita Prym", autor: " Paulo Coelho", precio: 4000, imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSp5MLf1AE7LMdtaFaifGwQMubbabpojIejFg&s", disponible: true }
]

function App() {
  const [libros, setLibros] = useState<LibroCardProps[]>(librosIniciales);
  const agregarLibro = (nuevo: LibroCardProps) => setLibros([...libros, nuevo]);
  return (
   <Layout>
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/catalogo" element={<Libros libros={libros} />} />
      <Route path="/catalogo/:id" element={<DetalleLibro/>} />
      <Route path="/libros/nuevo" element={<LibroNuevo onAgregar={agregarLibro} />} />
      {/* <Route path="/contacto"    element={<ContactPage />} /> */}
      </Routes>
   </Layout>
 );
}
export default App;







