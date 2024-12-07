import { prisma } from '$lib/prisma'; // Para interactuar con la base de datos
import bcrypt from 'bcryptjs';         // Para manejar contraseñas
import jwt from 'jsonwebtoken';        // Para crear el token JWT
import dotenv from 'dotenv';          // Para cargar las variables de entorno

// Cargar las variables de entorno desde el archivo .env
dotenv.config();

// Verificar si la variable JWT_SECRET está definida
if (!process.env.JWT_SECRET) {
  console.error("Error: JWT_SECRET no está configurado correctamente.");
  process.exit(1); // Terminar la ejecución si la clave no está definida
}

// Ruta para manejar las solicitudes POST
export const POST = async ({ request }) => {
  try {
    const { username, password, fecha, texto, userId } = await request.json();

    // Manejo de inicio de sesión
    if (username && password) {
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
        { userId: user.id, username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );

      // Enviar el token al cliente
      return new Response(
        JSON.stringify({ token }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Manejo de creación de citas
    if (fecha && texto && userId) {
      // Crear la cita en la base de datos
      const cita = await prisma.citas.create({
        data: {
          fecha: new Date(fecha), // Asegurarse de que `fecha` esté en formato Date
          texto: texto, // Usar `texto` en lugar de `detalle`
          userId: userId, // Asegurarse de incluir `userId`
        },
      });

      // Responder con la cita creada
      return new Response(
        JSON.stringify({ cita }),
        { status: 201, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Si no se recibieron datos válidos
    return new Response(
      JSON.stringify({ message: 'Faltan datos necesarios' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error en el servidor:', error);
    return new Response(
      JSON.stringify({ message: 'Error interno del servidor' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
