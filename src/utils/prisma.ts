import { Pool, neonConfig } from "@neondatabase/serverless";
import { PrismaNeon } from "@prisma/adapter-neon";
import { PrismaClient } from "@prisma/client";
import ws from "ws";
neonConfig.webSocketConstructor = ws;

// todo pool 개수 체크
const pool = new Pool({
  connectionString: process.env.POSTGRES_PRISMA_URL
});
const adapter = process.env.POSTGRES_PRISMA_URL?.includes(".neon.tech")
  // neon db를 사용할 때만 해당 어댑터 사용
  ? new PrismaNeon(pool) : null;

// 로컬 개발 시 singleton 사용
const globalForPrisma = global as unknown as { prisma: PrismaClient };
const prisma
  = globalForPrisma.prisma
  || new PrismaClient({
    adapter,
    // Optional logging for debugging:
    // log: ["query", "info", "warn", "error"],
  });

if (process.env.NODE_ENV !== "production")
  globalForPrisma.prisma = prisma;

export default prisma;