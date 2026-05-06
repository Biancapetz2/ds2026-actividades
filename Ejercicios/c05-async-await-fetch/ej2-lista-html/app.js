import { obtenerUsuarios } from "./usuariosService.js";
async function main() {
    const loading = document.getElementById("loading");
    const error = document.getElementById("error");
    const lista = document.getElementById("listaUsuarios");
    if (!loading || !error || !lista) {
        throw new Error("No se encontraron elementos en el DOM");
    }
    try {
        const usuarios = await obtenerUsuarios();
        loading.style.display = "none";
        lista.innerHTML = "";
        usuarios.forEach((u) => {
            console.log(`Nombre: ${u.name} | Email: ${u.email}`);
            const li = document.createElement("li");
            li.innerHTML = `
        <div class="nombre">${u.name}</div>
        <div class="email">${u.email}</div>
      `;
            lista.appendChild(li);
        });
    }
    catch (err) {
        console.error("Error al obtener usuarios:", err);
        loading.style.display = "none";
        error.textContent = "Hubo un error al cargar los usuarios";
        error.style.display = "block";
    }
}
main();
