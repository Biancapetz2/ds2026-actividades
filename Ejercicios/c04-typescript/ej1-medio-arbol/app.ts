const inputAltura = document.getElementById("altura") as HTMLInputElement;
const btnGenerar = document.getElementById("btnGenerar") as HTMLButtonElement;
const resultado = document.getElementById("resultado") as HTMLDivElement;

function generarArbol(n: number): string {
    let salida: string = "";
    for (let i = 1; i <= n; i++) {
        salida += "*".repeat(i) + "\n";
    }
    return salida;
}

btnGenerar.addEventListener("click", () => {
    const valor: number = parseInt(inputAltura.value);

    if (isNaN(valor) || valor < 1) {
        resultado.textContent = "Error: ingresa un numero valido mayor o igual a 1.";
    } else {
        resultado.textContent = generarArbol(valor);
    }
});
