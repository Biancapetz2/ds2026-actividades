import { useParams, Link } from 'react-router-dom'

const libros = [
    {id: "1", titulo: " El almacén de las palabras terribles", autor: "Elsa Barceló", precio: 5000, imagen: "https://sbslibreria.vtexassets.com/arquivos/ids/5696665-1200-auto?v=639076167185970000&width=1200&height=auto&aspect=true", descripcion: "En un mundo donde las palabras tienen poder, un joven llamado Leo descubre un antiguo almacén lleno de palabras terribles. A medida que explora el lugar, se da cuenta de que estas palabras pueden causar estragos en la sociedad. Con la ayuda de sus amigos, Leo se embarca en una aventura para proteger el almacén y evitar que las palabras caigan en las manos equivocadas."},
    {id: "2", titulo: "La oscuridad de los colores", autor: "Martín Blasco", precio: 18000, imagen: "https://www.normainfantilyjuvenil.com/ar/uploads/2019/05/resized/360_9789875456808.jpg", descripcion: "Una historia fascinante sobre el poder de los colores en la vida de un niño." },
    {id: "3", titulo: "El principito", autor: " Antoine de Saint-Exupéry", precio: 14000, imagen: "https://image.cdn1.buscalibre.com/5b57fc1690f0b5295a8b4567.__RS360x360__.jpg", descripcion: "Un cuento clásico sobre la amistad y la importancia de lo esencial." },
    {id: "4", titulo: "La llave del Aguila", autor: " Elisa Roldan", precio: 16000, imagen: "https://images.cdn3.buscalibre.com/fit-in/360x360/59/d8/59d8b70cee1af72a66f7ea9fc31e8da0.jpg", descripcion: "Una aventura épica en un mundo mágico donde los animales tienen vidas propias." },
    {id: "5", titulo: "Un gato callejero llamado BOB", autor: " James Bowen", precio: 4000, imagen: "https://images.cdn3.buscalibre.com/fit-in/360x360/54/9f/549fa25d267d3afb91e95d1b2a6d9c4f.jpg", descripcion: "La historia conmovedora de un gato callejero que encuentra un nuevo hogar." },
    {id: "6", titulo: "El demonio y la señorita Prym", autor: " Paulo Coelho", precio: 4000, imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSp5MLf1AE7LMdtaFaifGwQMubbabpojIejFg&s", descripcion: "Una novela que explora temas profundos sobre el amor y la redención."}
]

function LibroDetalle() {
  const { id } = useParams()

  const libro = libros.find((libro) => libro.id === id)

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
          <img
            src={libro.imagen}
            className="img-fluid rounded shadow"
            alt={libro.titulo}
          />
        </div>

        <div className="col-md-7">
            <h1 className="mb-3">{libro.titulo}</h1>

            <h4 className="text-muted mb-4">{libro.autor}</h4>

            <p>{libro.descripcion}</p>


            <h2 className="text-success my-4">
                ${libro.precio.toFixed(2)}
            </h2>

            <button className="btn btn-primary btn-lg me-2">
                Comprar
            </button>

            <Link to="/catalogo" className="btn btn-secondary btn-lg">
                Volver al catálogo
            </Link>
        </div>
      </div>
    </main>
  )
}

export default LibroDetalle