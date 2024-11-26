<script>
  import Header from '../routes/components/Header.svelte';
  import Footer from '../routes/components/Footer.svelte';

  let username = "";
  let password = "";
  let isLoading = false;
  let errorMessage = "";
  let token = "";

  async function handleLogin() {
    isLoading = true; // Mostrar el estado de carga
    errorMessage = ""; // Reiniciar el mensaje de error

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const responseText = await response.text(); // Leer la respuesta como texto

      if (response.ok) {
        // Parsear el token solo si la respuesta es exitosa
        const data = JSON.parse(responseText);
        token = data.token;
        console.log("Login exitoso, token:", token);

        // Guardar el token en una cookie (Secure y HttpOnly por seguridad)
        document.cookie = `auth_token=${token}; Secure; HttpOnly`;

        // Redirigir al dashboard después del login exitoso
        window.location.href = '/dashboard'; // Cambiar a la ruta deseada
      } else {
        // Parsear el error si la respuesta no es exitosa
        const errorData = JSON.parse(responseText);
        errorMessage = errorData.message || "Error al iniciar sesión.";
      }
    } catch (error) {
      console.error("Error en el login:", error);
      errorMessage = "Ocurrió un error inesperado. Intenta nuevamente.";
    } finally {
      isLoading = false; // Terminar el estado de carga
    }
  }
</script>

<style>
  .container {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
  }

  .login-container {
    text-align: center;
    padding: 20px;
    background-color: #f7f7f7;
    border-radius: 10px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }

  .login-container label {
    display: block;
    margin: 10px 0 5px;
  }

  .login-container input {
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }

  .login-container button {
    width: 100%;
    padding: 10px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }

  .login-container button:disabled {
    background-color: #aaa;
    cursor: not-allowed;
  }

  .error-message {
    color: red;
    margin-top: 10px;
  }
</style>

<div class="container">
  <Header title="Inicio de Sesión" />
  <main>
    <div class="login-container">
      <label for="username">Nombre de Usuario</label>
      <input id="username" type="text" bind:value={username} />

      <label for="password">Contraseña</label>
      <input id="password" type="password" bind:value={password} />

      <button on:click={handleLogin} disabled={isLoading}>
        {#if isLoading} Cargando... {:else} Iniciar Sesión {/if}
      </button>

      {#if errorMessage}
        <p class="error-message">{errorMessage}</p>
      {/if}
    </div>
  </main>
  <Footer />
</div>
