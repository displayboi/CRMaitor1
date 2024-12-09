<script lang="ts">
  import { onMount } from 'svelte';

  interface Event {
    fecha: string;
    texto: string;
    username: string;
    telefono: string;
  }

  let selectedDate: string = '';
  let note: string = '';
  let username: string = '';
  let telefono: string = '';
  let events: Event[] = [];
  let userId: number = 1;

  // Regex para validar los campos
  const usernameRegex = /^[a-zA-Z0-9_]{3,}$/; // Mínimo 3 caracteres, letras, números y guiones bajos
  const telefonoRegex = /^[0-9]{9,15}$/; // De 9 a 15 dígitos numéricos

  // Guardar la nota en el backend
  async function saveNote() {
    if (!selectedDate || !note) {
      alert('Por favor selecciona una fecha y escribe una nota.');
      return;
    }

    if (!usernameRegex.test(username)) {
      alert('El nombre de usuario debe tener al menos 3 caracteres y solo puede contener letras, números y guiones bajos (_).');
      return;
    }

    if (!telefonoRegex.test(telefono)) {
      alert('El número de teléfono debe contener entre 9 y 15 dígitos.');
      return;
    }

    try {
      const response = await fetch('api/save-note', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          fecha: selectedDate, 
          texto: note, 
          userId: userId, 
          username: username, 
          telefono: telefono 
        })
      });

      if (response.ok) {
        alert('Nota guardada correctamente.');
        note = ''; // Limpiar el campo de texto
        username = ''; // Limpiar el campo de usuario
        telefono = ''; // Limpiar el campo de teléfono
        await fetchEvents(); // Recargar las notas
      } else {
        alert('Error al guardar la nota.');
      }
    } catch (error) {
      console.error('Error al guardar la nota:', error);
      alert('Hubo un problema al guardar la nota. Inténtalo nuevamente.');
    }
  }

  // Obtener las notas desde el backend
  async function fetchEvents() {
    const response = await fetch('api/save-note', { method: 'GET' });
    if (response.ok) {
      const data = await response.json();
      events = data.citas.map((event: Event) => ({
        ...event,
        fecha: new Date(event.fecha).toLocaleDateString() // Formatea la fecha sin la hora
      }));
    } else {
      console.error('No se pudieron cargar los eventos.');
    }
  }

  onMount(() => {
    fetchEvents(); // Cargar eventos al iniciar
  });
</script>

<div class="calendar-container">
  <h1>Calendario</h1>

  <label for="fecha">Selecciona una fecha:</label>
  <input id="fecha" type="date" bind:value={selectedDate} />

  {#if selectedDate}
    <div>
      <h2>Nota para el {selectedDate}</h2>

      <label for="username">Nombre de usuario:</label>
      <input 
        id="username" 
        type="text" 
        bind:value={username} 
        placeholder="Introduce tu nombre de usuario" 
      />

      <label for="telefono">Teléfono móvil:</label>
      <input 
        id="telefono" 
        type="text" 
        bind:value={telefono} 
        placeholder="Introduce tu teléfono móvil" 
      />

      <label for="nota">Nota:</label>
      <textarea 
        id="nota" 
        bind:value={note} 
        placeholder="Escribe tu nota aquí"
        rows="4" 
        cols="30"
      ></textarea>

      <button on:click={saveNote}>Guardar Nota</button>
    </div>
  {/if}

  <h2>Notas guardadas</h2>
  <ul>
    {#each events as event}
      <li>
        <strong>{event.fecha}</strong> - <strong>{event.username}</strong> - <strong>{event.telefono}</strong>: {event.texto}
      </li>
    {/each}
  </ul>
</div>

<style>
  .calendar-container {
    font-family: Arial, sans-serif;
    max-width: 600px;
    margin: auto;
    padding: 20px;
    border: 1px solid #CCB878;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    background-color: #f9f4e8;
  }

  label {
    display: block;
    margin-top: 10px;
  }

  input, textarea {
    width: 100%;
    margin-bottom: 10px;
    padding: 8px;
    border-radius: 4px;
    border: 1px solid #ccc;
  }

  button {
    padding: 10px 20px;
    background-color: #CCB878;
    color: #322016;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }

  button:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }

  button:hover {
    background-color: #65462E;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    margin-bottom: 10px;
    padding: 10px;
    background-color: #f3f3f3;
    border-radius: 5px;
  }
</style>
