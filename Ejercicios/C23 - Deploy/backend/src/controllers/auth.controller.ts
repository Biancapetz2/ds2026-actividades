import { Request, Response } from "express";
import * as authService from "../services/auth.service";
import { prisma } from "../config/prisma";
import { UsuarioPublico } from "../types/usuario.types";

export async function registrar(req: Request, res: Response) {
  const usuario = await authService.registrar(req.body);
  return res.status(201).json(usuario);
}

export async function login(req: Request, res: Response) {
  const resultado = await authService.login(req.body);
  // Mismo mensaje si el mail no existe o si la contraseña está mal.
  if (!resultado) return res.status(401).json({ error: "Credenciales inválidas" });
  return res.json(resultado);
}
export async function yo(req: Request, res: Response) {
  if (!req.usuario) {
    return res.status(401).json({ error: "No autenticado" });
  }

  const usuario = await authService.buscarPorId(req.usuario.id);

  if (!usuario) {
    return res.status(401).json({ error: "Usuario no encontrado" });
  }

  return res.json(usuario);
}
export async function buscarPorId(
  id: number
): Promise<UsuarioPublico | null> {
  return prisma.usuario.findUnique({
    where: { id },
    select: {
      id: true,
      email: true,
      nombre: true,
      rol: true,
    },
  });
}