import { Libro } from "../types/libro.types";

const libros: Libro[] = [
    {id: 1, titulo: " El almacén de las palabras terribles", autor: "Elsa Barceló", precio: 5000, imagen: "https://sbslibreria.vtexassets.com/arquivos/ids/5696665-1200-auto?v=639076167185970000&width=1200&height=auto&aspect=true", disponible: true },
    {id: 2, titulo: "La oscuridad de los colores", autor: "Martín Blasco", precio: 18000, imagen: "https://www.normainfantilyjuvenil.com/ar/uploads/2019/05/resized/360_9789875456808.jpg", disponible: true },
    {id: 3, titulo: "El principito", autor: " Antoine de Saint-Exupéry", precio: 14000, imagen: "https://image.cdn1.buscalibre.com/5b57fc1690f0b5295a8b4567.__RS360x360__.jpg", disponible: false },
    {id: 4, titulo: "La llave del Aguila", autor: " Elisa Roldan", precio: 16000, imagen: "https://images.cdn3.buscalibre.com/fit-in/360x360/59/d8/59d8b70cee1af72a66f7ea9fc31e8da0.jpg", disponible: true },
    {id: 5, titulo: "Un gato callejero llamado BOB", autor: " James Bowen", precio: 4000, imagen: "https://images.cdn3.buscalibre.com/fit-in/360x360/54/9f/549fa25d267d3afb91e95d1b2a6d9c4f.jpg", disponible: false },
    {id: 6, titulo: "El demonio y la señorita Prym", autor: " Paulo Coelho", precio: 4000, imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSp5MLf1AE7LMdtaFaifGwQMubbabpojIejFg&s", disponible: true },
  {
    "id": 7,
    "titulo": "Sapiens: De animales a dioses",
    "autor": "Yuval Noah Harari",
    "precio": 7800,
    "imagen": "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=400&q=80",
    "disponible": false
  },
  {
    "id": 8,
    "titulo": "El código Da Vinci",
    "autor": "Dan Brown",
    "precio": 5100,
    "imagen": "https://images.unsplash.com/photo-1496104679561-38b73d6fcdf0?auto=format&fit=crop&w=400&q=80",
    "disponible": true
  },
  {
    "id": 9,
    "titulo": "Matar a un ruiseñor",
    "autor": "Harper Lee",
    "precio": 4700,
    "imagen": "https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=400&q=80",
    "disponible": true
  },
  {
    "id": 10,
    "titulo": "La sombra del viento",
    "autor": "Carlos Ruiz Zafón",
    "precio": 6900,
    "imagen": "https://images.unsplash.com/photo-1529480821492-a27f2b0b4b79?auto=format&fit=crop&w=400&q=80",
    "disponible": false
  }
];

let proximoId = 11;

export function findAll(disponible?: boolean): Libro[] {
  if (disponible === undefined) return libros;
  return libros.filter(libro => libro.disponible === disponible);
}

export function findById(id: number): Libro | undefined {
  return libros.find(libro => libro.id === id);
}

export function create(datos: Omit<Libro, "id">): Libro {
  const nuevo: Libro = { id: proximoId++, ...datos };
  libros.push(nuevo);
  return nuevo;
}

export function update(id: number, datos: Omit<Libro, "id">): Libro | undefined {
  const i = libros.findIndex(libro => libro.id === id);
  if (i === -1) return undefined;
  libros[i] = { id, ...datos };
  return libros[i];
}

export function remove(id: number): boolean {
  const i = libros.findIndex(libro => libro.id === id);
  if (i === -1) return false;
  libros.splice(i, 1);
  return true;
}