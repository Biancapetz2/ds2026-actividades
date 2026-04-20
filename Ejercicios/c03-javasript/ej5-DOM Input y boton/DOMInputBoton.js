// Capturar elementos del DOM
const inputAltura = document.getElementById("altura");
const btnGenerar = document.getElementById("btnGenerar");
const resultado = document.getElementById("resultado");

//Medio-árbol
function generarArbol(n) {
    let salida = "";
    for (let i = 1; i <= n; i++) {
        salida += "*".repeat(i) + "\n";
    }
    return salida;
}

// Click en el botón
btnGenerar.addEventListener("click", () => {
    const valor = parseInt(inputAltura.value);

    if (isNaN(valor) || valor < 1) {
        resultado.textContent = "Error: ingresa un número válido mayor o igual a 1.";
    } else {
        resultado.textContent = generarArbol(valor);
    }
});
