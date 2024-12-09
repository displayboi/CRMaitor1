import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function DELETE({ params }) {
  const { id } = params;
  
  try {
    await prisma.citas.delete({
      where: { id: parseInt(id) }
    });
    return new Response('Nota eliminada correctamente.', { status: 200 });
  } catch (error) {
    console.error('Error al eliminar la nota:', error);
    return new Response('Error al eliminar la nota.', { status: 500 });
  }
}
