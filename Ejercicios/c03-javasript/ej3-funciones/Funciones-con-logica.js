const efectivo = 'E';
const debito = 'D';
const credito = 'C';
const calcularPrecioFinal = (monto, medioPago) => {
    let desc = 0;
    if (monto < 200) { 
        desc = 0;
    } else if (monto >=200 && monto<=400) {
        if (medioPago === "E"){ 
            desc = 0.30; //30% off
        } else if (medioPago === "D") { 
            desc = 0.20; //20% off
        } else if (medioPago === "C") { 
            desc = 0.10; //10% off
        }
    } else {
        desc = 0.40;
    }
    const precioFinal = monto - (monto * desc);
    return precioFinal; 
}
console.log(`Monto: $150 | Pago: E | Final: $${calcularPrecioFinal(150, "E")}`);
console.log(`Monto: $250 | Pago: E | Final: $${calcularPrecioFinal(250, "E")}`);
console.log(`Monto: $300 | Pago: D | Final: $${calcularPrecioFinal(300, "D")}`);
console.log(`Monto: $350 | Pago: C | Final: $${calcularPrecioFinal(350, "C")}`);
console.log(`Monto: $500 | Pago: E | Final: $${calcularPrecioFinal(500, "E")}`);
