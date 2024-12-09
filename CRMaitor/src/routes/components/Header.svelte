<script>
  export let title = "Inicio de Sesión";
</script>

<header>
  {title}
</header>

<style>
  header {
    background-color: #CCB878;
    color: #322016;
    padding: 15px;
    text-align: center;
    font-size: 1.5rem;
    font-weight: bold;
  }
  @media (max-width: 480px) {
  header {
    position: fixed; /* Fija el header a la parte superior */
    top: 0;
    left: 0;
    width: 100%; /* Ocupa todo el ancho */
    z-index: 1000; /* Se asegura de estar sobre otros elementos */
    padding: 10px; /* Mantiene algo de padding */
  }
}

  @media (max-width: 768px) {
    header {
      font-size: 1.2rem;
    }
  }
</style>
