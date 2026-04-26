interface Libro {
  isbn: string;
  titulo: string;
  autor: string;
  precio: number;
  disponible: boolean;
  genero?: string; //opcional
}

let catalogo: Libro[] = [
    { isbn: "001", titulo: "La oscuridad de los colores", autor: "Martin Blasco", precio: 3000, disponible: true },
    { isbn: "002", titulo: "El almacen de las palabras terribles", autor: "Elia barcelo", precio: 15000, disponible: false },
    { isbn: "003", titulo: "Corazon delator", autor: "Alan Poe", precio: 4000, disponible: true },
];

function agregarLibro(libro: Libro): void {
    catalogo.push(libro);
    renderizar(catalogo);
}

function eliminarLibro(isbn: string): void {
    catalogo = catalogo.filter(libro => libro.isbn !== isbn);
    renderizar(catalogo);
}

function validarFormulario(): Libro | null {
    const titulo = (document.getElementById("titulo") as HTMLInputElement).value.trim();
    const autor = (document.getElementById("autor") as HTMLInputElement).value.trim();
    const precio = parseFloat((document.getElementById("precio") as HTMLInputElement).value);
    const disponible = (document.getElementById("disponible") as HTMLInputElement).checked;
    const genero = (document.getElementById("genero") as HTMLInputElement).value.trim();
    const errorForm = document.getElementById("errorForm") as HTMLDivElement;

    if (!titulo || !autor || isNaN(precio) || precio <= 0) {
        errorForm.textContent = "Error: completa los campos, el precio no puede ser nulo.";
        return null;
    }

    errorForm.textContent = "";
    const nuevoLibro: Libro = {
        isbn: "AUTO-" + Date.now(),
        titulo,
        autor,
        precio,
        disponible,
        genero: genero || undefined
    };

    return nuevoLibro;
}
function renderizar(libros: Libro[]): void {
    const listado = document.getElementById("listado") as HTMLUListElement;
    listado.innerHTML = "";

    libros.forEach(libro => {
        const li = document.createElement("li");
        li.textContent = `${libro.titulo} - ${libro.autor} - $${libro.precio}`;

        const btnEliminar = document.createElement("button");
        btnEliminar.textContent = "Eliminar";
        btnEliminar.addEventListener("click", () => eliminarLibro(libro.isbn));

        li.appendChild(btnEliminar);
        listado.appendChild(li);
    });
}
const btnAgregar = document.getElementById("btnAgregar") as HTMLButtonElement;

btnAgregar.addEventListener("click", () => {
    const libro = validarFormulario();
    if (libro) {
        agregarLibro(libro);
        (document.getElementById("formLibros") as HTMLFormElement).reset();
    }
});

// Mostrar catálogo
renderizar(catalogo);
