import { obtenerUsuarios } from "./usuariosService.js";

async function main() {
   // Obtiene elementos del HTML por su id
  const loading = document.getElementById("loading") as HTMLElement | null;
  const error = document.getElementById("error") as HTMLElement | null;
  const lista = document.getElementById("listaUsuarios") as HTMLUListElement | null;

  // Verifica que los elementos existan en el DOM
  // Si falta alguno, corta la ejecución y lanza un error
  if (!loading || !error || !lista) {
    throw new Error("No se encontraron elementos en el DOM");
  }

  try {
    // Llama a la función que hace fetch a la API y devuelve los usuarios
    const usuarios = await obtenerUsuarios();

    loading.style.display = "none";
    lista.innerHTML = ""; 

    usuarios.forEach((u) => {
      console.log(`Nombre: ${u.name} | Email: ${u.email}`);

      const li = document.createElement("li");
      // Inserta HTML dentro del <li> con nombre y email
      li.innerHTML = `
        <div class="nombre">${u.name}</div>
        <div class="email">${u.email}</div>
      `;

      lista.appendChild(li);
    });

  } catch (err) {
    console.error("Error al obtener usuarios:", err);
    // Muestra mensaje de error en pantalla
    loading.style.display = "none";
    error.textContent = "Hubo un error al cargar los usuarios";
    error.style.display = "block";
  }
}


main();