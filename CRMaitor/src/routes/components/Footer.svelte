<script>
  import { goto } from '$app/navigation'; // Importar goto desde $app/navigation

  // Función para refrescar la página
  function refreshPage() {
    window.location.reload();
  }

  // Función para redirigir al calendario
  function showCalendar() {
    goto('/calendario'); // Redirige a la ruta /calendario en minúsculas
  }

  // Función para cerrar sesión
  async function logout() {
    try {
      await fetch('/api/logout', { method: 'POST' });
      window.location.href = '/';
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  }
</script>

<footer>
  <button class="icon" on:click={refreshPage} type="button" aria-label="Refrescar la página">⟳</button>
  <button class="icon" on:click={showCalendar} type="button" aria-label="Calendario">✚</button>
  <button class="icon" on:click={logout} type="button" aria-label="Cerrar sesión">✕</button>
</footer>

<style>
  footer {
    background-color: #CCB878;
    color: #333;
    padding: 10px;
    display: flex;
    justify-content: space-between;
  }

  .icon {
    all: unset;
    cursor: pointer;
    font-size: 1.5rem;
    padding: 10px;
    color: #322016;
    background-color: #CCB878;
  }

  .icon:hover {
    color: #65462E;
  }

  @media (max-width: 480px) {
    footer {
      flex-direction: row;
      justify-content: space-around;
      margin-top: 1%;
    }
  }
</style>
