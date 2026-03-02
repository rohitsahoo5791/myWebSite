import prisma from "../config/db";
import bcrypt from "bcryptjs";

async function main() {
  const hashedPassword = await bcrypt.hash("Rohit123+098", 10);

  const admin = await prisma.admin.create({
    data: {
      email: "sahookumarrohit982@gmail.com",
      password: hashedPassword,
    },
  });

  console.log("Admin created:", admin);
}

main().finally(() => prisma.$disconnect());