<script>
  import { onMount } from 'svelte';

  let username = "Usuario autenticado"; // Este dato puede ser obtenido del token JWT o desde el backend

  onMount(() => {
    // Si el token JWT no está presente, redirige al login
    const token = document.cookie.split(';').find(cookie => cookie.trim().startsWith('auth_token='));
    if (!token) {
      window.location.href = '/dashboard'; // Cambia la ruta de login según tu aplicación
    } else {
      // Aquí podrías decodificar el token y obtener el nombre de usuario si lo necesitas
      const decodedToken = JSON.parse(atob(token.split('=')[1].split('.')[1])); 
      username = decodedToken.username; // Usar el username del token
    }
  });
</script>

<style>
  .container {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    justify-content: space-between;
    background-color: #f4e8c1; /* Fondo similar al login */
  }

  .dashboard-container {
    background-color: #d2b57d; /* Fondo del contenedor principal */
    padding: 20px;
    max-width: 600px;
    margin: 40px auto;
    border-radius: 8px;
    text-align: center;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }

  h1 {
    font-size: 1.8rem;
    color: #7d5a2f; /* Color principal */
    margin-bottom: 20px;
  }

  p {
    font-size: 1.2rem;
    color: #4a3b27; /* Color complementario */
  }

  .button {
    margin-top: 20px;
    padding: 10px;
    width: 100%;
    background-color: #7d5a2f;
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 1em;
    font-weight: bold;
    cursor: pointer;
  }

  .button:hover {
    background-color: #6b4e29;
  }
</style>

<div class="container">
  <main>
    <div class="dashboard-container">
      <h1>¡Bienvenido al Dashboard!</h1>
      <p>Hola, {username}. Aquí puedes gestionar tus tareas.</p>
      <button class="button" on:click={() => (window.location.href = "/login")}>
        Cerrar sesión
      </button>
    </div>
  </main>
</div>
