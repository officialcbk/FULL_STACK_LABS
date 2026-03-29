import "dotenv/config";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
// Using the generated path from the demo
import { PrismaClient } from "../src/generated/prisma/client";
import { roleSeedData, employeeSeedData } from "./seedData";

const connectionString = `${process.env.DATABASE_URL}`;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Cleaning database...");
  // Clear tables in reverse order of dependencies to avoid foreign key errors
  await prisma.employee.deleteMany();
  await prisma.role.deleteMany();

  console.log("Seeding Roles...");
  // We use a loop to ensure roles exist before employees link to them
  for (const role of roleSeedData) {
    await prisma.role.create({
      data: {
        title: role.name, // Mapping 'name' to 'title' per your schema
        description: role.description,
      },
    });
  }

  console.log("Seeding Employees...");
  for (const emp of employeeSeedData) {
    // Finding the created role to get its auto-generated ID
    const role = await prisma.role.findFirst({ 
      where: { title: emp.roleName } 
    });

    if (role) {
      await prisma.employee.create({
        data: {
          firstName: emp.firstName,
          lastName: emp.lastName,
          roleId: role.id,
          salary: 0, // Adding required field per your schema
        },
      });
    }
  }

  console.log("Seeding complete!");
}

main()
  .then(async () => {
    await prisma.$disconnect();
    await pool.end();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    await pool.end();
    process.exit(1);
  });