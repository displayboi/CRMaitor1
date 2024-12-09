<script>
  function refreshPage() {
    window.location.reload();
  }

  function goToNewPage() {
    window.location.href = '/nueva-pagina';
  }

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
    color: #322016; /* Cambia por el color que prefieras */
    background-color: #CCB878;
  }

  .icon:hover {
    color: #65462E; /* Cambia por el color que prefieras */
  }

  /* MOBILE RESPONSIVE FOOTER */
  @media (max-width: 480px) {
  footer {
    position: fixed; /* Fija el footer a la parte inferior */
    bottom: 0;
    left: 0;
    width: 100%; /* Ocupa todo el ancho */
    z-index: 1000; /* Se asegura de estar sobre otros elementos */
    padding: 5px; /* Espaciado interno */
    justify-content: space-around; /* Distribuye los iconos de forma equitativa */
  }


    
  }
</style>
