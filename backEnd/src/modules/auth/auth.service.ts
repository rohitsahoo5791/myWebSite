import prisma from "../../config/db";
import bcrypt from "bcryptjs";
import jwt, { SignOptions } from "jsonwebtoken";

export const loginAdmin = async (email: string, password: string) => {
  const admin = await prisma.admin.findUnique({ where: { email } });
  if (!admin) throw new Error("Invalid credentials");

  const isValid = await bcrypt.compare(password, admin.password);
  if (!isValid) throw new Error("Invalid credentials");

  const payload = { adminId: admin.id, email: admin.email };
  const secret = process.env.JWT_SECRET!;
  const options: SignOptions = { expiresIn: process.env.JWT_EXPIRES_IN || "7d" };

  const token = jwt.sign(payload, secret, options);

  return token;
};