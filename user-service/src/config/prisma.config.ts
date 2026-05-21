import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../../node_modules/@prisma/client";
import config from "./server.config";

// const globalForPrisma = globalThis as unknown as {
//   prisma: PrismaClient | undefined; 
// };

// export const prisma =
//   globalForPrisma.prisma ??
//   new PrismaClient({
//     log: config.NODE_ENV === "development" ? ["query"] : [],
//   });

// if (config.NODE_ENV !== "production") {
//   globalForPrisma.prisma = prisma;
// }

// export default prisma;
const adapter = new PrismaPg({
  connectionString: config.DATABASE_URL,
});

const prisma = new PrismaClient({ adapter });

export default prisma;




