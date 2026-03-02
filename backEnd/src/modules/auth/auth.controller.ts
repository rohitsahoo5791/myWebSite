import { Request, Response } from "express";
import { loginAdmin } from "./auth.service";

export const loginHandler = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const token = await loginAdmin(email, password);

    res.json({ token });
  } catch (error) {
    res.status(401).json({ error: "Invalid email or password" });
  }
};