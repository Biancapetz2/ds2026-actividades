export const formatearPrecio = (precio: number): string => {
  return `$ ${new Intl.NumberFormat("es-AR").format(precio)}`;
};