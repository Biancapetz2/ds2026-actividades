// Capturar elementos del DOM
const inputProducto = document.getElementById("producto");
const btnAgregar = document.getElementById("btnAgregar");
const lista = document.getElementById("lista");
const contador = document.getElementById("contador");

// Actualizar contador
function actualizarContador() {
    const cantidad = lista.children.length;
    contador.textContent = `${cantidad} productos en la lista`;
}

// Función para agregar producto
function agregarProducto() {
    const nombre = inputProducto.value.trim();

    if (nombre === "") {
        alert("Error: ingresa un nombre de producto.");
        return;
    }

    // Crear li para el producto
    const li = document.createElement("li");
    li.textContent = nombre;

    // Botón eliminar
    const btnEliminar = document.createElement("button");
    btnEliminar.textContent = "Eliminar";
    btnEliminar.style.marginLeft = "10px";

    // Evento eliminar
    btnEliminar.addEventListener("click", () => {
        lista.removeChild(li);
        actualizarContador();
    });

    // Agregar botón al li
    li.appendChild(btnEliminar);

    // Agregar li a la lista
    lista.appendChild(li);

    // Limpiar input
    inputProducto.value = "";

    // Actualizar contador
    actualizarContador();
}

// Evento click en "Agregar"
btnAgregar.addEventListener("click", agregarProducto);
