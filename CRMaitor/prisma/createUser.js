import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function createUser() {
  try {
    const username = 'admin';
    const plainPassword = 'admin';

    // Valida los datos de entrada
    if (!username || !plainPassword) {
      throw new Error('El nombre de usuario y la contraseña son obligatorios');
    }

    const hashedPassword = await bcrypt.hash(plainPassword, 10); // Encripta la contraseña

    const user = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
      },
    });

    console.log('Usuario creado:', user);
  } catch (error) {
    if (error.code === 'P2002') {
      console.error('Error: El nombre de usuario ya existe.');
    } else {
      console.error('Error al crear el usuario:', error.message);
    }
  } finally {
    await prisma.$disconnect();
  }
}

createUser();
