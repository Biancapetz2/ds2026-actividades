// Define cómo es un libro que viene de la API
interface LibroOl {
  title: string;
  author_name?: string[]; 
  first_publish_year?: number; 
  cover_i?: number; 
  key?: string;
}

// Espera a que el HTML esté completamente cargado antes de ejecutar el código
window.addEventListener("DOMContentLoaded", () => {

  // Conecta con elementos del HTML
  const input = document.getElementById("inputBusqueda") as HTMLInputElement;
  const boton = document.getElementById("btnBuscar") as HTMLButtonElement;
  const error = document.getElementById("error") as HTMLElement;
  const resultados = document.getElementById("resultados") as HTMLElement;

 
  boton.addEventListener("click", buscarLibros);

  //  busca presionando Enter
  input.addEventListener("keydown", (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      buscarLibros();
    }
  });

  
  async function buscarLibros() {
    const query = input.value.trim(); // obtiene el texto del input

    
    if (!query) {
      error.textContent = "Por favor ingresá un texto para buscar";
      error.style.display = "block";
      resultados.innerHTML = "";
      return;
    }

    // Limpia error y muestra loading
    error.style.display = "none";
    resultados.innerHTML = "<p class='loading'>Cargando...</p>";

    try {
      // Hace la petición a la API con el texto ingresado
      const response = await fetch(
        `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}`
      );

      // Si la respuesta falla, lanza error
      if (!response.ok) {
        throw new Error("Error en la API");
      }


      const data = await response.json();

 
      const libros: LibroOl[] = data.docs;

      // Limita para que se muestren solo 10 libros
      mostrarResultados(libros.slice(0, 10));

    } catch (err) {
      // Manejo de errores
      error.textContent = "Error al buscar libros";
      error.style.display = "block";
      resultados.innerHTML = "";
    }
  }

  //  Función que renderiza los resultados en pantalla
  function mostrarResultados(libros: LibroOl[]) {
    resultados.innerHTML = ""; // limpia resultados anteriores

    // Si no hay resultados
    if (libros.length === 0) {
      resultados.innerHTML = "<p class='loading'>No se encontraron resultados</p>";
      return;
    }

   
    libros.forEach((libro) => {
      const card = document.createElement("div");
      card.className = "card";

      //datos de los libros

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

      // Agrega los elementos a la tarjeta
      card.appendChild(titulo);
      card.appendChild(autor);
      card.appendChild(anio);

      // Agrega la tarjeta al contenedor
      resultados.appendChild(card);
    });
  }
});