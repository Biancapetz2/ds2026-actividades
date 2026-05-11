
const inputBuscar = document.getElementById("inputBuscar");
const btnBuscar = document.getElementById("btnBuscar");
const resultados = document.getElementById("resultados");

btnBuscar.addEventListener("click", async () => {
  const query = inputBuscar.value.trim();
  if (!query) return;

  resultados.innerHTML = "<p class='text-center mt-4'>Buscando libros...</p>";

  try {
    const res = await fetch(`https://openlibrary.org/search.json?q=${query}`);
    const data = await res.json();

    resultados.innerHTML = "";

    data.docs.slice(0, 6).forEach(libro => {
      const portada = libro.cover_i
        ? `https://covers.openlibrary.org/b/id/${libro.cover_i}-L.jpg`
        : "img/sin-portada.jpg";

      resultados.innerHTML += `
        <div class="col-md-4 mb-4">
          <div class="card h-100 shadow-sm">
            <img src="${portada}" class="card-img-top" alt="${libro.title}">
            <div class="card-body">
              <h5 class="card-title">${libro.title}</h5>
              <p class="card-text">${libro.author_name ? libro.author_name[0] : "Autor desconocido"}</p>
              <a href="libro.html" class="btn btn-outline-primary">Ver más</a>
            </div>
          </div>
        </div>
      `;
    });
  } catch (error) {
    resultados.innerHTML = "<p class='text-danger text-center mt-4'>Error al buscar libros.</p>";
  }
});
