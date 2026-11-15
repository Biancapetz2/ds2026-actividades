const CLAVE = 'token';
export const guardarToken = (t: string) => localStorage.setItem(CLAVE, t);
export const obtenerToken = () => localStorage.getItem(CLAVE);
export const borrarToken  = () => localStorage.removeItem(CLAVE);