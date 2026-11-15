import { describe, it, expect } from "vitest";
import {
  loginSchema,
  registroSchema,
} from "./auth.validation";

describe("loginSchema", () => {
  it("normaliza el email: saca espacios y pasa a minúsculas", () => {
    const resultado = loginSchema.safeParse({
      email: "  Admin@Libreria.TEST  ",
      password: "x",
    });

    expect(resultado.success).toBe(true);

    if (resultado.success) {
      expect(resultado.data.email).toBe("admin@libreria.test");
    }
  });
});

describe("registroSchema", () => {
  it("una contraseña débil acumula los tres errores", () => {
    const resultado = registroSchema.safeParse({
      nombre: "Ana",
      email: "ana@libreria.test",
      password: "corta",
    });

    expect(resultado.success).toBe(false);

    if (!resultado.success) {
      expect(resultado.error.issues).toHaveLength(3);
    }
  });
});