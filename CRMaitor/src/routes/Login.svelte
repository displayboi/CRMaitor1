<script>
    let username = "";
    let password = "";
    
    function handleLogin() {
      // Aquí puedes agregar la lógica de autenticación
      console.log("Intentando iniciar sesión con:", username, password);
    }
  </script>
  
  <style>
    .login-container {
      background-color: #d2b57d;
      padding: 20px;
      max-width: 300px;
      margin: 0 auto;
      border-radius: 8px;
      text-align: center;
    }
  
    label {
      display: block;
      margin-top: 15px;
      font-weight: bold;
    }
  
    input {
      width: 100%;
      padding: 8px;
      margin-top: 5px;
      border: none;
      border-radius: 8px;
      background-color: #d3d3d3;
    }
  
    button {
      margin-top: 20px;
      padding: 10px;
      width: 100%;
      background-color: #7d5a2f;
      color: white;
      border: none;
      border-radius: 8px;
      font-size: 1em;
      font-weight: bold;
    }
  
    button:hover {
      background-color: #6b4e29;
    }
  </style>
  
  <div class="login-container">
    <label for="username">Nombre De Usuario</label>
    <input id="username" type="text" bind:value={username} />
  
    <label for="password">Contraseña</label>
    <input id="password" type="password" bind:value={password} />
  
    <button on:click={handleLogin}>Iniciar Sesión</button>
  </div>
  