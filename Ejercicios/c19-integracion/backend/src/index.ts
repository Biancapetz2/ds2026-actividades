import express from "express";
import libroRoutes from "./routes/libro.routes";
import autorRoutes from "./routes/autor.routes";
import { errorHandler } from "./middlewares/error.middleware";
import authRoutes from "./routes/auth.routes";
import cors from "cors";

const app = express();
const PORT = 3000;
const corsOptions = { origin: [process.env.FRONTEND_URL ?? "http://localhost:5173" ]
};
app.use(cors(corsOptions )); // ← ANTES de express.json() y de las rutas
app.use(express.json());

app.get("/", (_req, res) => {
  res.json({ mensaje: "API de la Librería 🐳" });
});
app.use("/api/auth", authRoutes); 
app.use("/api/libros", libroRoutes);

app.use("/api/autores", autorRoutes);

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});

app.use(errorHandler);