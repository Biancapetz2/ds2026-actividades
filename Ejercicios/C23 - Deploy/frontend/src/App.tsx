import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/layout';
import Home from './pages/Home';
import LibroNuevo from './pages/LibroNuevo';
import Libros from './pages/Catalogo';
import DetalleLibro from './pages/LibroDetalle';
import Login from './pages/Login';
import { BusquedaProvider } from './context/BusquedaContext';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import SinPermiso from './pages/SinPermiso';

function App() {
  return (
    <AuthProvider>
    <BusquedaProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalogo" element={<Libros />} />
          <Route path="/catalogo/:id" element={<DetalleLibro />} />
          <Route path="/login" element={<Login />} />
           <Route path="/sin-permiso" element={<SinPermiso />} />
           <Route element={<PrivateRoute rol="ADMIN" />} >
          <Route path="/libros/nuevo" element={<LibroNuevo />} />
          </Route>
        </Routes>
      </Layout>
    </BusquedaProvider>
    </AuthProvider>
  );
}

export default App;