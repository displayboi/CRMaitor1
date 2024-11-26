
export async function handle({ event, resolve }) {
  const secretKey = process.env.SECRET_KEY;  // Usado solo en el servidor
  console.log(secretKey); // Solo visible en el servidor

  // Puedes manejar la lógica aquí para el backend
  const response = await resolve(event);
  return response;
}
