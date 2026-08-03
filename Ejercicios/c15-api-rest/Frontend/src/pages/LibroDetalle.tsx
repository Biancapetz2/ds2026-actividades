import { useParams, Link } from 'react-router-dom'
import type { LibroCardProps } from '../types/Libro';

type LibroDetalleProps = LibroCardProps & {
  descripcion: string;
};

export type { LibroDetalleProps };

const libros : LibroDetalleProps[] = [
    {id: 1, titulo: " El almacén de las palabras terribles", autor: "Elsa Barceló", precio: 5000, imagen: "https://sbslibreria.vtexassets.com/arquivos/ids/5696665-1200-auto?v=639076167185970000&width=1200&height=auto&aspect=true", disponible: true, descripcion: "En el almacén de las palabras terribles se guardan todas las palabras que no se deben decir, que no se deben escribir, que no se deben pensar. Palabras que hieren, que ofenden, que humillan, que discriminan, que excluyen. Palabras que pueden hacer mucho daño. Pero también palabras que pueden salvar vidas. Porque a veces, para curar una herida, hay que nombrarla." },
    {id: 2, titulo: "La oscuridad de los colores", autor: "Martín Blasco", precio: 18000, imagen: "https://www.normainfantilyjuvenil.com/ar/uploads/2019/05/resized/360_9789875456808.jpg", disponible: true, descripcion: "En la oscuridad de los colores, los niños y niñas descubrirán un mundo mágico donde los colores cobran vida y les enseñarán a expresar sus emociones, a superar sus miedos y a encontrar la belleza en la diversidad. Un libro que invita a los pequeños lectores a explorar su creatividad, a desarrollar su inteligencia emocional y a aprender a convivir con las diferencias." },
    {id: 3, titulo: "El principito", autor: " Antoine de Saint-Exupéry", precio: 14000, imagen: "https://image.cdn1.buscalibre.com/5b57fc1690f0b5295a8b4567.__RS360x360__.jpg", disponible: false, descripcion: "El principito es un libro que ha cautivado a millones de lectores en todo el mundo con su historia poética y filosófica sobre la amistad, el amor, la soledad y la búsqueda de sentido en la vida. A través de las aventuras del pequeño príncipe, el autor nos invita a reflexionar sobre lo esencial, lo invisible a los ojos, y a redescubrir la magia de la infancia." },
    {id: 4, titulo: "La llave del Aguila", autor: " Elisa Roldan", precio: 16000, imagen: "https://images.cdn3.buscalibre.com/fit-in/360x360/59/d8/59d8b70cee1af72a66f7ea9fc31e8da0.jpg", disponible: true, descripcion: "La llave del Aguila es un libro que combina elementos de fantasía y aventura, llevando a los lectores a través de un mundo lleno de magia y descubrimientos. Un relato que celebra la valentía, la amistad y la importancia de encontrar uno mismo." },
    {id: 5, titulo: "Un gato callejero llamado BOB", autor: " James Bowen", precio: 4000, imagen: "https://images.cdn3.buscalibre.com/fit-in/360x360/54/9f/549fa25d267d3afb91e95d1b2a6d9c4f.jpg", disponible: false, descripcion: "Un gato callejero llamado BOB es una historia conmovedora sobre la vida de un gato que encuentra refugio en un hogar. A través de sus experiencias, el libro explora temas como la resiliencia, el amor y la importancia de dar y recibir cuidado." },
    {id: 6, titulo: "El demonio y la señorita Prym", autor: " Paulo Coelho", precio: 4000, imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSp5MLf1AE7LMdtaFaifGwQMubbabpojIejFg&s", disponible: true, descripcion: "El demonio y la señorita Prym es una novela que mezcla elementos de romance y fantasía, explorando temas como el amor verdadero, la redención y las decisiones que definen nuestra vida. Un relato que invita a reflexionar sobre lo que realmente importa." }
]

function DetalleLibro() {
  const { id } = useParams()
  const libro = libros.find((l) => l.id === Number(id))

  if (!libro) {
    return (
      <main className="container my-5">
        <h2>Libro no encontrado</h2>
        <Link to="/catalogo" className="btn btn-secondary mt-3">
          Volver al catálogo
        </Link>
      </main>
    )
  }
  return (
    <main className="container my-5">
      <div className="row align-items-center">
        <div className="col-md-5">
          <img src={libro.imagen} className="img-fluid rounded shadow" alt={libro.titulo} />
        </div>
        <div className="col-md-7">
          <h1 className="mb-3">{libro.titulo}</h1>
          <h4 className="text-muted mb-4">{libro.autor}</h4>
          <p>{libro.descripcion}</p>
          <h2 className="text-success my-4">${libro.precio.toFixed(2)}</h2>
          <button className="btn btn-primary btn-lg me-2">Comprar</button>
          <Link to="/catalogo" className="btn btn-secondary btn-lg">Volver al catálogo</Link>
        </div>
      </div>
    </main>
  )
}

export default DetalleLibro