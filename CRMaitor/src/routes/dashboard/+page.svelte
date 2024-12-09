<script>
  import { onMount } from 'svelte';
  import Footer from '../components/Footer.svelte';

  let username = "Usuario autenticado"; // Este dato puede ser obtenido del token JWT o desde el backend

  onMount(() => {
  const token = document.cookie.split(';').find(cookie => cookie.trim().startsWith('auth_token='));
  if (!token) {
    window.location.href = '../'; // Cambia a la ruta de login
  } else {
    try {
      const decodedToken = JSON.parse(atob(token.split('=')[1].split('.')[1])); 
      username = decodedToken.username; // Decodifica el username del token
    } catch (error) {
      console.error("Error al decodificar el token:", error);
      window.location.href = '../'; // Redirige si el token es inválido
    }
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
      <p>Hola, {username}. ¡Estas logeado y autentificado!.</p>
      <button class="button" on:click={() => (window.location.href = "../")}>
        Cerrar sesión
      </button>
      <button class="button" on:click={() => (window.location.href = "../calendario")}>
        Ir al Calendario
      </button>
      <Footer/>
    </div>
    
  </main>
</div>
