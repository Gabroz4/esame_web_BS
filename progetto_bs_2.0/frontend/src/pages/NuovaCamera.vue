<template>
  <div class="container">
    <div class="form-container">
      <h2>Crea una Nuova Stanza</h2>
      <form @submit.prevent="createRoom">
        <div>
          <label for="nomecamera">Nome Stanza:</label>
          <input type="text" id="nomecamera" v-model="camera.nomecamera" />
        </div>
        <div>
          <label for="postiletto">Numero di Letti:</label>
          <input type="number" id="postiletto" v-model="camera.postiletto" />
        </div>
        <div>
          <label for="prezzonotte">Prezzo Notturno:</label>
          <input type="number" id="prezzonotte" v-model="camera.prezzonotte" />
        </div>
        <div>
          <label for="descrizione">Descrizione:</label>
          <textarea id="descrizione" v-model="camera.descrizione"></textarea>
        </div>
        <div>
          <input type="submit" value="Crea Stanza" :disabled="isLoading" />
        </div>
        <div v-if="error" class="error-message">{{ error }}</div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import axios from 'axios';
import { Camera } from '../types';

export default defineComponent({
  data() {
    return {
      camera: {} as Camera,
      isLoading: false,
      error: '',
    };
  },

  methods: {
    async createRoom() {
      this.error = ''; // Reset error on each submit
      if (!this.camera.nomecamera || !this.camera.postiletto || !this.camera.prezzonotte) {
        this.error = 'Per favore, compila tutti i campi del modulo';
        return;
      }

      this.isLoading = true;

      try {
        const response = await axios.post('/api/admin/nuova-camera', this.camera);

        console.log('Risposta del server:', response);

        if (response.data.success) {
          alert('Stanza creata con successo');
          // Optionally, you can redirect the user or perform other actions
        } else {
          this.error = 'Errore durante la creazione della stanza';
        }
      } catch (error) {
        console.error('Si è verificato un errore durante la creazione della stanza:', error);
        this.error = 'Si è verificato un errore durante la creazione della stanza. Per favore, riprova più tardi.';
      } finally {
        this.isLoading = false;
      }
    },
  },
});
</script>

<style scoped>
/* Add your specific CSS styles for this component, if necessary */
</style>
