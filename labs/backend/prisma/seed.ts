import "dotenv/config";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/index";
import { roleSeedData, employeeSeedData } from "./seedData";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Cleaning database...");
  await prisma.employee.deleteMany();
  await prisma.role.deleteMany();

  console.log("Seeding Roles...");
  for (const role of roleSeedData) {
    await prisma.role.create({
      data: {
        title: role.name,
        description: role.description,
      },
    });
  }

  console.log("Seeding Employees...");
  for (const emp of employeeSeedData) {
    const role = await prisma.role.findFirst({
      where: { title: emp.roleName },
    });

    if (role) {
      await prisma.employee.create({
        data: {
          firstName: emp.firstName,
          lastName: emp.lastName,
          roleId: role.id,
          salary: 0,
        },
      });
    }
  }

  console.log("Seeding complete!");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });