<script>
//Importación de componentes

  import Header from './componentes/Header.svelte';
  import Footer from './componentes/Footer.svelte';
  import Login from './rutas/Login.svelte';

</script>
<style>
    .container {
      display: flex;
      flex-direction: column;
      min-height: 100vh;
      justify-content: space-between;
      background-color: #f4e8c1;
    }
  </style>
<main>
<!-- Codigo HTML del body-->
<div class="container">
    <Header title="Inicio de Sesión" />
    <main>
      <Login />
    </main>
    <Footer />
  </div>








</main>