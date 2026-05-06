"use strict";
window.addEventListener("DOMContentLoaded", () => {
    const input = document.getElementById("inputBusqueda");
    const boton = document.getElementById("btnBuscar");
    const error = document.getElementById("error");
    const resultados = document.getElementById("resultados");
    boton.addEventListener("click", buscarLibros);
    input.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            buscarLibros();
        }
    });
    async function buscarLibros() {
        const query = input.value.trim();
        if (!query) {
            error.textContent = "Por favor ingresá un texto para buscar";
            error.style.display = "block";
            resultados.innerHTML = "";
            return;
        }
        error.style.display = "none";
        resultados.innerHTML = "<p class='loading'>Cargando...</p>";
        try {
            const response = await fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(query)}`);
            if (!response.ok) {
                throw new Error("Error en la API");
            }
            const data = await response.json();
            const libros = data.docs;
            mostrarResultados(libros.slice(0, 10));
        }
        catch (err) {
            error.textContent = "Error al buscar libros";
            error.style.display = "block";
            resultados.innerHTML = "";
        }
    }
    function mostrarResultados(libros) {
        resultados.innerHTML = "";
        if (libros.length === 0) {
            resultados.innerHTML = "<p class='loading'>No se encontraron resultados</p>";
            return;
        }
        libros.forEach((libro) => {
            const card = document.createElement("div");
            card.className = "card";
            if (libro.cover_i) {
                const img = document.createElement("img");
                img.src = `https://covers.openlibrary.org/b/id/${libro.cover_i}-M.jpg`;
                card.appendChild(img);
            }
            const titulo = document.createElement("h3");
            titulo.textContent = libro.title;
            const autor = document.createElement("p");
            autor.textContent = libro.author_name
                ? `Autor: ${libro.author_name[0]}`
                : "Autor: desconocido";
            const anio = document.createElement("p");
            anio.textContent = libro.first_publish_year
                ? `Año: ${libro.first_publish_year}`
                : "Año: desconocido";
            card.appendChild(titulo);
            card.appendChild(autor);
            card.appendChild(anio);
            resultados.appendChild(card);
        });
    }
});
