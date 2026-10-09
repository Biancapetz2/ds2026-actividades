import { describe, it, expect, vi } from "vitest";
import type {
  Request,
  Response,
  NextFunction,
} from "express";

import jwt from "jsonwebtoken";
import { authenticate, authorize } from "./auth.middleware";
import { JWT_SECRET } from "../config/env";

function mocks(req: Partial<Request> = {}) {
  const res = {
    status: vi.fn().mockReturnThis(),
    json: vi.fn().mockReturnThis(),
  } as unknown as Response;

  const next = vi.fn() as unknown as NextFunction;

  return {
    req: req as Request,
    res,
    next,
  };
}

describe("authorize", () => {
  it("responde 403 a un CLIENTE cuando la ruta pide ADMIN", () => {
    const { req, res, next } = mocks({
      usuario: {
        id: 2,
        rol: "CLIENTE",
      },
    });

    authorize("ADMIN")(req, res, next);

    expect(res.status).toHaveBeenCalledWith(403);

    expect(res.json).toHaveBeenCalledWith({
      error: "No tenés permiso para esta operación",
    });

    expect(next).not.toHaveBeenCalled();
  });

  it("deja pasar a un ADMIN cuando la ruta pide ADMIN", () => {
    const { req, res, next } = mocks({
      usuario: {
        id: 1,
        rol: "ADMIN",
      },
    });

    authorize("ADMIN")(req, res, next);

    expect(next).toHaveBeenCalledTimes(1);
    expect(res.status).not.toHaveBeenCalled();
  });

  it("responde 401 si no hay usuario autenticado", () => {
    const { req, res, next } = mocks();

    authorize("ADMIN")(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);

    expect(res.json).toHaveBeenCalledWith({
      error: "No autenticado",
    });

    expect(next).not.toHaveBeenCalled();
  });

  it("acepta CLIENTE cuando cualquiera de los dos roles está permitido", () => {
    const { req, res, next } = mocks({
      usuario: {
        id: 2,
        rol: "CLIENTE",
      },
    });

    authorize("ADMIN", "CLIENTE")(req, res, next);

    expect(next).toHaveBeenCalledTimes(1);
    expect(res.status).not.toHaveBeenCalled();
  });
});

describe("authenticate", () => {
  it("con un token válido llena req.usuario y llama a next", () => {
    const token = jwt.sign(
      {
        id: 7,
        rol: "CLIENTE",
      },
      JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    const { req, res, next } = mocks({
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    authenticate(req, res, next);

    expect(next).toHaveBeenCalledTimes(1);

    expect(req.usuario).toEqual({
      id: 7,
      rol: "CLIENTE",
    });

    expect(res.status).not.toHaveBeenCalled();
  });

  it("responde 401 'Token expirado' con un token vencido", () => {
    const token = jwt.sign(
      {
        id: 7,
        rol: "CLIENTE",
      },
      JWT_SECRET,
      {
        expiresIn: "-1s",
      }
    );

    const { req, res, next } = mocks({
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    authenticate(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);

    expect(res.json).toHaveBeenCalledWith({
      error: "Token expirado",
    });

    expect(next).not.toHaveBeenCalled();
  });

  it("responde 401 'Token inválido' si está firmado con otro secret", () => {
    const token = jwt.sign(
      {
        id: 7,
        rol: "CLIENTE",
      },
      "otro-secret",
      {
        expiresIn: "1h",
      }
    );

    const { req, res, next } = mocks({
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    authenticate(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);

    expect(res.json).toHaveBeenCalledWith({
      error: "Token inválido",
    });

    expect(next).not.toHaveBeenCalled();
  });
});