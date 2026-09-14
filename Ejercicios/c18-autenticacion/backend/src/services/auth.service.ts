import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { prisma } from "../config/prisma";
import { JWT_SECRET, JWT_EXPIRES_IN, SALT_ROUNDS } from "../config/env";
import type { Registro, Login } from "../validations/auth.validation";
import type { PayloadToken, UsuarioPublico } from "../types/usuario.types";


export async function registrar(datos: Registro): Promise<UsuarioPublico> {
 const hash = await bcrypt.hash(datos.password, SALT_ROUNDS);
 return prisma.usuario.create({
 data: { nombre: datos.nombre, email: datos.email, passwordHash: hash },
 select: { id: true, email: true, nombre: true, rol: true }, // nunca el hash
 });
}