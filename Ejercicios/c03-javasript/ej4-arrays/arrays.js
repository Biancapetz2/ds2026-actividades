const num = [12, 45, 7, 89, 23, 56, 3, 78];
let suma = 0;
let mayor = num[0];
let menor = num[0];
for (let n of num) {
    suma += n;
    if (n > mayor) {
        mayor = n;
    }
    if (num < menor) {
        menor = num;
    }
}
const promedio = suma / num.length;
// Mostrar resultados
console.log("Suma total:", suma);
console.log("Promedio:", promedio);
console.log("Número mayor:", mayor);
console.log("Número menor:", menor);

function generarAsteriscos(n) {
    let resultado = "";
    for (let i = 0; i < n; i++) {
        resultado += "*";
    }
    return resultado;
}

// Prueba
console.log(generarAsteriscos(5)); // ***** 
console.log(generarAsteriscos(10)); // **********
