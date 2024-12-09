<script lang="ts">
  import { onMount } from 'svelte';
  import Footer from '../components/Footer.svelte';

  interface Event {
    id: number; // Añadido el id para cada nota
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
  let editingEvent: Event | null = null; // Nuevo estado para manejar la edición

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

  // Eliminar la nota del backend
  async function deleteNote(id: number) {
    try {
      const response = await fetch(`api/delete-note/${id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        alert('Nota eliminada correctamente.');
        await fetchEvents(); // Recargar las notas después de la eliminación
      } else {
        alert('Error al eliminar la nota.');
      }
    } catch (error) {
      console.error('Error al eliminar la nota:', error);
      alert('Hubo un problema al eliminar la nota. Inténtalo nuevamente.');
    }
  }

  // Editar la nota
  function editNote(event: Event) {
    editingEvent = { ...event }; // Copiar la nota para editarla
    selectedDate = event.fecha;
    note = event.texto;
    username = event.username;
    telefono = event.telefono;
  }

  // Guardar los cambios de la nota editada
  async function updateNote() {
    if (!selectedDate || !note || !editingEvent) {
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
      const response = await fetch(`api/update-note/${editingEvent.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          fecha: selectedDate, 
          texto: note, 
          username: username, 
          telefono: telefono 
        })
      });

      if (response.ok) {
        alert('Nota actualizada correctamente.');
        note = ''; // Limpiar el campo de texto
        username = ''; // Limpiar el campo de usuario
        telefono = ''; // Limpiar el campo de teléfono
        editingEvent = null; // Resetear el estado de edición
        await fetchEvents(); // Recargar las notas
      } else {
        alert('Error al actualizar la nota.');
      }
    } catch (error) {
      console.error('Error al actualizar la nota:', error);
      alert('Hubo un problema al actualizar la nota. Inténtalo nuevamente.');
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
      <h2>{editingEvent ? 'Editar nota' : 'Nota para el ' + selectedDate}</h2>

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

      {#if editingEvent}
        <button on:click={updateNote}>Actualizar Nota</button>
      {:else}
        <button on:click={saveNote}>Guardar Nota</button>
      {/if}
    </div>
  {/if}

  <h2>Notas guardadas</h2>
  <ul>
    {#each events as event}
      <li>
        <strong>{event.fecha}</strong> - <strong>{event.username}</strong> - <strong>{event.telefono}</strong>: 
        {event.texto}
        <br>
        <!-- Botón "Editar" para editar la nota -->
        <button class="edit-button" on:click={() => editNote(event)}>
          ✏️ 
        </button>

        <!-- Botón "Solucionado" para eliminar la nota -->
        <button class="delete-button" on:click={() => deleteNote(event.id)}>
          🗑️ 
        </button>
        
      </li>
    {/each}
  </ul>

  <div class="botonAtras">
    <a class="dashboard-button" href="/dashboard">🔙 Volver al Dashboard</a>
  </div>
  
  <br>
  <Footer />
</div>


<style>
  .botonAtras {
    display: flex;
    justify-content: flex-start;
    margin-bottom: 20px;
  }

  .dashboard-button {
    padding: 10px 20px;
    background-color: #CCB878; /* Fondo color CCB878 */
    color: #322016; /* Color texto */
    border: none;
    border-radius: 5px;
    text-decoration: none;
    font-weight: bold;
    cursor: pointer;
  }

  .dashboard-button:hover {
    background-color: #65462E; /* Color al pasar el cursor */
    color: white; /* Color de texto al pasar el cursor */
  }

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

  .delete-button {
    margin-left: 10px;
    background-color: #00bb2d;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }

  .delete-button:hover {
    background-color: #31a84f;
  }

  .edit-button {
    margin-left: 10px;
    background-color: #FFBF00;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }

  .edit-button:hover {
    background-color: #e5a700;
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
