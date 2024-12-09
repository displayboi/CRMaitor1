// src/routes/api/update-note/[id]/+server.ts
import { prisma } from '$lib/prisma'; // Asegúrate de tener la configuración de Prisma correctamente
import { json, error } from '@sveltejs/kit';

export const PUT = async ({ request, params }: { request: Request, params: { id: string } }) => {
  const { id } = params;  // Capturamos el id de la URL (el parámetro dinámico)
  const { fecha, texto, username, telefono } = await request.json(); // Extraemos los datos del cuerpo de la solicitud

  // Verificamos que no falten datos
  if (!fecha || !texto || !username || !telefono) {
    throw error(400, 'Faltan datos para la actualización');
  }

  try {
    // Actualizamos la nota en la base de datos usando Prisma
    const updatedNote = await prisma.citas.update({
      where: { id: parseInt(id) },  // Buscamos la cita por su ID (el ID recibido desde la URL)
      data: {
        fecha: new Date(fecha),  // Actualizamos la fecha
        texto,
        username,
        telefono
      }
    });

    // Si la actualización es exitosa, devolvemos la nota actualizada
    return json({ updatedNote });
  } catch (err) {
    console.error('Error al actualizar la nota:', err);
    throw error(500, 'Error al actualizar la nota');
  }
};
