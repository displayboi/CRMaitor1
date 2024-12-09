import { prisma } from '$lib/prisma';

export const POST = async ({ request }: { request: Request }) => {
  try {
    const { fecha, texto, userId } = await request.json();

    if (!fecha || !texto || !userId) {
      return new Response(
        JSON.stringify({ message: 'Faltan datos de la cita' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const cita = await prisma.citas.create({
      data: {
        fecha: new Date(fecha),
        texto: texto,
        userId: userId,
      },
    });

    return new Response(
      JSON.stringify({ cita }),
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
