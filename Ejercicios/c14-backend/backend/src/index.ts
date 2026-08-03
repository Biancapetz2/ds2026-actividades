import express from "express";

const app = express();
const PORT = 3000;

app.get("/", (_req, res) => {
  res.json({ mensaje: "API de la Librería 🐳" });
});

interface Libro {
  id: number;
  titulo: string;
  autor: string;
  precio: number;
  imagen: string;
  disponible: boolean;
}

const libros: Libro[] = [
  { id: 1, titulo: "El principito", autor: "Antoine de Saint-Exupery", precio: 4500, imagen: "https://...", disponible: true },
  { id: 2, titulo: "Cien años de soledad", autor: "Gabriel García Márquez", precio: 6000, imagen: "https://...", disponible: true },
  { id: 3, titulo: "Rayuela", autor: "Julio Cortázar", precio: 5200, imagen: "https://...", disponible: false }
];

app.get("/libros", (req, res) => {
  res.json(libros);
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
