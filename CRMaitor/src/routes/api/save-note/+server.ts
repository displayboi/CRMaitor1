import { prisma } from '$lib/prisma';

export const POST = async ({ request }: { request: Request }) => {
  try {
    // ✅ Extraer todos los campos necesarios del cuerpo de la solicitud
    const { fecha, texto, userId, username, telefono } = await request.json();

    // ✅ Validar que todos los campos estén presentes
    if (!fecha || !texto || !userId || !username || !telefono) {
      return new Response(
        JSON.stringify({ message: 'Faltan datos obligatorios (fecha, texto, userId, username, telefono)' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // ✅ Crear la nueva cita en la base de datos
    const cita = await prisma.citas.create({
      data: {
        fecha: new Date(fecha), // Convertir la fecha al formato Date si es necesario
        texto: texto,
        userId: userId,
        username: username,
        telefono: telefono
      },
    });

    // ✅ Devolver la cita creada con el estado 201 (Created)
    return new Response(
      JSON.stringify({ message: 'Cita creada con éxito', cita }),
      { status: 201, headers: { 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error al guardar la cita:', error);
    return new Response(
      JSON.stringify({ message: 'Error al guardar la cita' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};

export const GET = async () => {
  try {
    // ✅ Obtener todas las citas de la base de datos
    const citas = await prisma.citas.findMany();

    // ✅ Devolver las citas con el estado 200 (OK)
    return new Response(
      JSON.stringify({ citas }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error al obtener las citas:', error);
    return new Response(
      JSON.stringify({ message: 'Error al obtener las citas' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
