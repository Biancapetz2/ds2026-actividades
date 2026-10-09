import { describe, it, expect } from "vitest";
import request from "supertest";
import jwt from "jsonwebtoken";

import app from "../app";
import { JWT_SECRET } from "../config/env";

// IMPORTANTE:
// Estos tests usan la base PostgreSQL de Docker.
// Requieren migraciones aplicadas y el seed ejecutado.

describe("rutas de auth - integración con DB", () => {
  it("POST /api/auth/login con el admin del seed → 200", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({
        email: "admin@libreria.test",
        password: "Admin1234",
      });

    expect(res.status).toBe(200);

    expect(res.body).toHaveProperty("token");

    expect(res.body.usuario).toMatchObject({
      email: "admin@libreria.test",
      nombre: "Admin",
      rol: "ADMIN",
    });

    expect(res.body.usuario).not.toHaveProperty("passwordHash");
  });

  it("POST /api/auth/login con contraseña incorrecta → 401", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({
        email: "admin@libreria.test",
        password: "PasswordIncorrecta123",
      });

    expect(res.status).toBe(401);

    expect(res.body).toEqual({
      error: "Credenciales inválidas",
    });
  });

  it("POST /api/auth/login con email inexistente → mismo 401", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({
        email: "noexiste@libreria.test",
        password: "Password123",
      });

    expect(res.status).toBe(401);

    expect(res.body).toEqual({
      error: "Credenciales inválidas",
    });
  });

  it("GET /api/auth/yo con token del admin → devuelve el usuario", async () => {
    const login = await request(app)
      .post("/api/auth/login")
      .send({
        email: "admin@libreria.test",
        password: "Admin1234",
      });

    expect(login.status).toBe(200);

    const token = login.body.token;

    const res = await request(app)
      .get("/api/auth/yo")
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(200);

    expect(res.body).toMatchObject({
      email: "admin@libreria.test",
      nombre: "Admin",
      rol: "ADMIN",
    });

    expect(res.body).not.toHaveProperty("passwordHash");
  });

  it("GET /api/auth/yo con un id que no existe → 401", async () => {
    const token = jwt.sign(
      {
        id: 999999,
        rol: "CLIENTE",
      },
      JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    const res = await request(app)
      .get("/api/auth/yo")
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(401);

    expect(res.body).toEqual({
      error: "Usuario no encontrado",
    });
  });
});