<script>
  import { goto } from '$app/navigation'; // Para redireccionar tras login exitoso
  
  let username = "";
  let password = "";
  let errorMessage = ""; // Para mostrar mensajes de error

  async function handleLogin() {
      try {
          const response = await fetch('/api/login', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ username, password }),
          });

          if (response.ok) {
              const data = await response.json();
              console.log("Token recibido:", data.token);

              // Aquí puedes almacenar el token si planeas usarlo para sesiones:
              localStorage.setItem('authToken', data.token);

              // Redirigir a una página protegida o el dashboard
              goto('/dashboard'); 
          } else {
              const errorData = await response.json();
              errorMessage = errorData.message || 'Error desconocido';
              console.error("Error:", errorMessage);
          }
      } catch (error) {
          console.error("Error al iniciar sesión:", error);
          errorMessage = 'Error interno. Por favor, intenta de nuevo.';
      }
  }
</script>


<div class="login-container">
  <label for="username">Nombre de Usuario</label>
  <input id="username" type="text" bind:value={username} />

  <label for="password">Contraseña</label>
  <input id="password" type="password" bind:value={password} />

  <button on:click={handleLogin}>Iniciar Sesión</button>

  {#if errorMessage}
      <p style="color: red;">{errorMessage}</p>
  {/if}
</div>
