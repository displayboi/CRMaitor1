<script>
  import Header from '../routes/components/Header.svelte';
  import Footer from '../routes/components/Footer.svelte';

  let username = "";
  let password = "";
  let isLoading = false;
  let errorMessage = "";
  let token = "";

  async function handleLogin() {
    isLoading = true;
    errorMessage = "";

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const responseText = await response.text();

      if (response.ok) {
        const data = JSON.parse(responseText);
        token = data.token;
        document.cookie = `auth_token=${token}; Secure`;
        window.location.href = '/dashboard';
      } else {
        const errorData = JSON.parse(responseText);
        errorMessage = errorData.message || "Error al iniciar sesión.";
      }
    } catch (error) {
      errorMessage = "Ocurrió un error inesperado. Intenta nuevamente.";
    } finally {
      isLoading = false;
    }
  }
</script>



<main>
  
  <div class="login-container">
    <Header title="Inicio de Sesión" />
    <div class="fields-container">
      <label for="username">Nombre de Usuario</label>
      <input id="username" type="text" bind:value={username} />

      <label for="password">Contraseña</label>
      <input id="password" type="password" bind:value={password} />
    </div>

    <button on:click={handleLogin} disabled={isLoading}>
      {#if isLoading} Cargando... {:else} Iniciar Sesión {/if}
    </button>

    {#if errorMessage}
      <p class="error-message">{errorMessage}</p>
    {/if}
    <Footer />
  </div>
  
</main>



<style>
  main{
    margin: 5%;
    
  }
  .login-container {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    background-color: #EDE8D0;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
  }

  .fields-container {
    padding: 8%;
    background-color: #EDE8D0;
    border-radius: 8px;
  }

  label {
    display: block;
    margin-bottom: 5px;
  }

  input {
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #D9D9D9;
    border-radius: 5px;
  }

  button {
    width: 100%;
    padding: 10px;
    margin-bottom: 10%;
    background-color: #956F39;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    
  }
  
  .error-message {
    color: red;
    margin-top: 20px;
  }

  /* RESPONSIVE ADJUSTMENTS */
  @media (max-width: 768px) {
    .login-container {
      padding: 15px;
    }

    .fields-container {
      padding: 5%;
    }

    input, button {
      font-size: 1rem;
    }
  }

  @media (max-width: 480px) {
    .login-container {
      padding: 10px;
    }

    input, button {
      font-size: 0.9rem;
      padding: 8px;
    }

    label {
      font-size: 0.9rem;
    }
  }
</style>

