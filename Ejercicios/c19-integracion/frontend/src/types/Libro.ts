export interface LibroCardProps {
  id: number;
  titulo: string;
  autorId: number;
  autor: Autor;
  precio: number;
  imagen: string;
  disponible: boolean;
}
export interface Autor { 
  id: number; 
  nombre: string; 
  nacionalidad: string 
}