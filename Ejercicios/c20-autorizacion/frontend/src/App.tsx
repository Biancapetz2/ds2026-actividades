import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/layout';
import Home from './pages/Home';
import LibroNuevo from './pages/LibroNuevo';
import Libros from './pages/Catalogo';
import DetalleLibro from './pages/LibroDetalle';
import Login from './pages/Login';
import { BusquedaProvider } from './context/BusquedaContext';

function App() {
  return (
    <BusquedaProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalogo" element={<Libros />} />
          <Route path="/catalogo/:id" element={<DetalleLibro />} />
          <Route path="/libros/nuevo" element={<LibroNuevo />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Layout>
    </BusquedaProvider>
  );
}

export default App;