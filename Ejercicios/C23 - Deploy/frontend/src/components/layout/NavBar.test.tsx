import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import NavBar from "./NavBar";
import { AuthContext } from "../../context/AuthContext";

import type {
  Credenciales,
  Rol,
  Usuario,
} from "../../types/sesionType";

function renderNavBar(usuario: Usuario | null) {
  const auth = {
    usuario,
    cargando: false,
    estaAutenticado: usuario !== null,

    tieneRol: (rol: Rol) => {
      return usuario?.rol === rol;
    },

    login: vi.fn(async (_credenciales: Credenciales) => {}),
    logout: vi.fn(),
  };

  return render(
    <MemoryRouter>
      <AuthContext.Provider value={auth}>
        <NavBar />
      </AuthContext.Provider>
    </MemoryRouter>
  );
}

describe("NavBar según la sesión y el rol", () => {
  it('sin sesión muestra "Ingresar" y no muestra "Nuevo libro"', () => {
    renderNavBar(null);

    expect(
      screen.getByRole("button", { name: "Ingresar" })
    ).toBeInTheDocument();

    expect(
      screen.queryByText("Nuevo libro")
    ).not.toBeInTheDocument();
  });

  it('CLIENTE saluda por nombre, muestra "Salir" y no ve "Nuevo libro"', () => {
    renderNavBar({
      id: 2,
      email: "cliente@libreria.test",
      nombre: "Cliente",
      rol: "CLIENTE",
    });

    expect(
      screen.getByText("Hola, Cliente")
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: "Salir" })
    ).toBeInTheDocument();

    expect(
      screen.queryByText("Nuevo libro")
    ).not.toBeInTheDocument();
  });

  it('ADMIN saluda por nombre, muestra "Salir" y ve "Nuevo libro"', () => {
    renderNavBar({
      id: 1,
      email: "admin@libreria.test",
      nombre: "Admin",
      rol: "ADMIN",
    });

    expect(
      screen.getByText("Hola, Admin")
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: "Salir" })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("link", { name: "Nuevo libro" })
    ).toBeInTheDocument();
  });
});