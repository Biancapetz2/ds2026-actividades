"use strict";
let catalogo = [
    { isbn: "001", titulo: "La oscuridad de los colores", autor: "Martin Blasco", precio: 3000, disponible: true },
    { isbn: "002", titulo: "El almacen de las palabras terribles", autor: "Elia barcelo", precio: 15000, disponible: false },
    { isbn: "003", titulo: "Corazon delator", autor: "Alan Poe", precio: 4000, disponible: true },
];
function agregarLibro(libro) {
    catalogo.push(libro);
    renderizar(catalogo);
}
function eliminarLibro(isbn) {
    catalogo = catalogo.filter(libro => libro.isbn !== isbn);
    renderizar(catalogo);
}
function validarFormulario() {
    const titulo = document.getElementById("titulo").value.trim();
    const autor = document.getElementById("autor").value.trim();
    const precio = parseFloat(document.getElementById("precio").value);
    const disponible = document.getElementById("disponible").checked;
    const genero = document.getElementById("genero").value.trim();
    const errorForm = document.getElementById("errorForm");
    if (!titulo || !autor || isNaN(precio) || precio <= 0) {
        errorForm.textContent = "Error: completa los campos, el precio no puede ser nulo.";
        return null;
    }
    errorForm.textContent = "";
    const nuevoLibro = {
        isbn: "AUTO-" + Date.now(),
        titulo,
        autor,
        precio,
        disponible,
        genero: genero || undefined
    };
    return nuevoLibro;
}
function renderizar(libros) {
    const listado = document.getElementById("listado");
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
const btnAgregar = document.getElementById("btnAgregar");
btnAgregar.addEventListener("click", () => {
    const libro = validarFormulario();
    if (libro) {
        agregarLibro(libro);
        document.getElementById("formLibros").reset();
    }
});
// Mostrar catálogo
renderizar(catalogo);
