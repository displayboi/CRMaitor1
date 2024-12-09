<script lang="ts">
  import { onMount } from 'svelte';

  interface Event {
    fecha: string;
    texto: string;
  }

  let selectedDate: string = '';
  let note: string = '';
  let events: Event[] = [];
  let userId: number = 1;

  // Guardar la nota en el backend
  async function saveNote() {
    if (!selectedDate || !note) {
      alert('Por favor selecciona una fecha y escribe una nota.');
      return;
    }

    try {
      const response = await fetch('api/save-note', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fecha: selectedDate, texto: note, userId: userId })
      });

      if (response.ok) {
        alert('Nota guardada correctamente.');
        note = ''; // Limpiar el campo de texto
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
  const response = await fetch('api/save-note', { method: 'GET' }); // Añadir 'GET' explícitamente
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
      <textarea 
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
        <strong>{event.fecha}</strong>: {event.texto}
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
    border: 1px solid #CCB878; /* Borde color CCB878 */
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    background-color: #f9f4e8; /* Fondo color suave */
  }

  textarea {
    width: 100%;
    margin-bottom: 10px;
  }

  button {
    padding: 10px 20px;
    background-color: #CCB878; /* Fondo color CCB878 */
    color: #322016; /* Color texto */
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }

  button:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }

  button:hover {
    background-color: #65462E; /* Color al pasar el cursor */
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    margin-bottom: 5px;
  }
</style>