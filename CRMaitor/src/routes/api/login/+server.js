import { prisma } from '$lib/prisma'; // Para interactuar con la base de datos
import bcrypt from 'bcryptjs'; // Para manejar contraseñas
import jwt from 'jsonwebtoken';         // Para crear el token JWT
import dotenv from 'dotenv';           // Para cargar las variables de entorno

// Cargar las variables de entorno desde el archivo .env
dotenv.config();

// Verificar si la variable JWT_SECRET está definida
if (!process.env.JWT_SECRET) {
  console.error("Error: JWT_SECRET no está configurado correctamente.");
  process.exit(1); // Terminar la ejecución si la clave no está definida
}

export const POST = async ({ request }) => {
  try {
    const { username, password } = await request.json();
    console.log('Datos recibidos:', { username, password });

    // Buscar el usuario en la base de datos
    const user = await prisma.user.findUnique({
      where: { username },
    });

    if (!user) {
      return new Response(
        JSON.stringify({ message: 'Usuario no encontrado' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Comparar la contraseña
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return new Response(
        JSON.stringify({ message: 'Contraseña incorrecta' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Crear el token JWT
    const token = jwt.sign(
      { userId: user.id, username: user.username }, // Payload del token
      process.env.JWT_SECRET, // Clave secreta desde el archivo .env
      { expiresIn: '1h' } // El token expirará en 1 hora
    );

    // Enviar el token al cliente
    return new Response(
      JSON.stringify({ token }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error en el servidor:', error);
    return new Response(
      JSON.stringify({ message: 'Error interno del servidor' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
