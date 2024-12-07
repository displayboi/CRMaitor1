import { PrismaClient } from '@prisma/client';

// Crear una instancia de PrismaClient
const prisma = new PrismaClient();

// Exportar la instancia de prisma para su uso en otros archivos
export { prisma };
