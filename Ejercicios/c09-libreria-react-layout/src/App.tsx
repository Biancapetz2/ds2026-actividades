import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/layout';
import Home from './pages/Home';
import Libros from './pages/Catalogo';
import LibroDetalle from './pages/LibroDetalle';

function App() {
 return (
   <Layout>
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/catalogo" element={<Libros />} />
      <Route path="/catalogo/:id" element={<LibroDetalle />} />
      </Routes>
   </Layout>
 );
}
export default App;







