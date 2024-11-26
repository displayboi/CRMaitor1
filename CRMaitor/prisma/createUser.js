import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function createUser() {
  const hashedPassword = await bcrypt.hash('admin', 10); // Encripta la contraseña
  const user = await prisma.user.create({
    data: {
      username: 'admin',
      password: hashedPassword,
    },
  });
  console.log('Usuario creado:', user);
}

createUser()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());
