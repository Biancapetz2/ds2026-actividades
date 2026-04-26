interface Libro {
  isbn: string;
  titulo: string;
  autor: string;
  precio: number;
  disponible: boolean;
  genero?: string; //opcional
}

const catalogo: Libro[] = [
    { isbn: "001", titulo: "La oscuridad de los colores", autor: "Martin Blasco", precio: 3000, disponible: true },
    { isbn: "002", titulo: "El almacen de las palabras terribles", autor: "Elia barcelo", precio: 15000, disponible: false },
    { isbn: "003", titulo: "Corazon delator", autor: "Alan Poe", precio: 4000, disponible: true },
    { isbn: "004", titulo: "El retrato de Dorian Gray", autor: "Oscar Wilde", precio: 5000, disponible: true },
    { isbn: "005", titulo: "El principito", autor: "Antoine de Saint-Exupery", precio: 2000, disponible: false }
];

function buscarPorAutor(autor: string): Libro[] {
    return catalogo.filter(libro => libro.autor.toLowerCase().includes(autor.toLowerCase()));
}

function librosDisponibles(): Libro[] {
    return catalogo.filter(libro => libro.disponible);
}

function precioPromedio(libros: Libro[]): number {
    if (libros.length === 0) return 0;
    const total = libros.reduce((acc, libro) => acc + libro.precio, 0);
    return total / libros.length;
}

function renderizar(libros: Libro[]): void {
    const listado = document.getElementById("listado") as HTMLUListElement;
    const stats = document.getElementById("stats") as HTMLParagraphElement;

    listado.innerHTML = "";
    libros.forEach(libro => {
        const li = document.createElement("li");
        li.textContent = `${libro.titulo} - ${libro.autor} - $${libro.precio}`;
        listado.appendChild(li);
    });

    stats.textContent = `Cantidad: ${libros.length} | Precio promedio: $${precioPromedio(libros).toFixed(2)}`;
}
const btnFiltrar = document.getElementById("filtrar") as HTMLButtonElement;
const btnDisponibles = document.getElementById("mostrarDisponibles") as HTMLButtonElement;
const btnTodos = document.getElementById("mostrarTodos") as HTMLButtonElement;
const inputAutor = document.getElementById("filtroAutor") as HTMLInputElement;

btnFiltrar.addEventListener("click", () => {
    renderizar(buscarPorAutor(inputAutor.value));
});

btnDisponibles.addEventListener("click", () => {
    renderizar(librosDisponibles());
});

btnTodos.addEventListener("click", () => {
    renderizar(catalogo);
});

// Mostrar todos los libros al cargar la página
renderizar(catalogo);
