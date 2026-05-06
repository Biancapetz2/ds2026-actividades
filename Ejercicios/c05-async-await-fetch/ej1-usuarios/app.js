import { obtenerUsuarios } from "./usuariosService.js";
async function main() {
    // Obtiene elementos del HTML por su id
    const loading = document.getElementById("loading");
    const error = document.getElementById("error");
    const lista = document.getElementById("listaUsuarios");
    // Verifica que los elementos existan en el DOM
    // Si falta alguno, corta la ejecución y lanza un error
    if (!loading || !error || !lista) {
        throw new Error("No se encontraron elementos en el DOM");
    }
    try {
        // Llama a la función que hace fetch a la API y devuelve los usuarios
        const usuarios = await obtenerUsuarios();
        usuarios.forEach((u) => {
            console.log(`Nombre: ${u.name} | Email: ${u.email}`);
        });
    }
    catch (err) {
        console.error("Error al obtener usuarios:", err);
        // Muestra mensaje de error en pantalla
        loading.style.display = "none";
        error.textContent = "Hubo un error al cargar los usuarios";
        error.style.display = "block";
    }
}
main();
