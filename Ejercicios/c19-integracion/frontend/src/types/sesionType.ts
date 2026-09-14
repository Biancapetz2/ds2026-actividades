export interface Sesion {
  token: string;
  usuario: {
    id: number;
    email: string;
    nombre: string;
    rol: 'ADMIN' | 'CLIENTE';
  };
}