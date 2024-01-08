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
          <label for="immagini">Immagini:</label>
          <input type="file" id="immagini" name="immagini" ref="immagini" multiple @change="handleImageChange" />
        </div>

        <!-- Show selected images -->
        <div v-for="(immagine, index) in camera.immagini" :key="index">
          <img :src="createObjectURL(immagine)" alt="Immagine" style="max-width: 100px; max-height: 100px; margin-right: 10px;" />
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
      immagini: [] as File[],
    };
  },

  methods: {
    async createRoom() {
      this.error = '';
      if (!this.camera.nomecamera || !this.camera.postiletto || !this.camera.prezzonotte) {
        this.error = 'Per favore, compila tutti i campi del modulo';
        return;
      }

      this.isLoading = true;

      try {
        const formData = new FormData();
        formData.append('nomecamera', this.camera.nomecamera);
        formData.append('postiletto', String(this.camera.postiletto));
        formData.append('prezzonotte', String(this.camera.prezzonotte));
        formData.append('descrizione', this.camera.descrizione);

        // Aggiungi tutte le immagini al FormData
        for (const immagine of this.immagini) {
          formData.append('immagini', immagine);
        }

        const response = await axios.post('/api/admin/nuova-camera', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        if (response.data.success) {
          alert('Stanza creata con successo');
          // Opzionalmente, puoi reindirizzare l'utente o eseguire altre azioni
        } else {
          this.error = 'Errore durante la creazione della stanza - frontend';
        }
      } catch (error) {
        console.error('Si è verificato un errore durante la creazione della stanza:', error);
        this.error = 'Si è verificato un errore durante la creazione della stanza. Per favore, riprova più tardi.';
      } finally {
        this.isLoading = false;
      }
    },


    handleImageChange(event: any) {
      this.immagini = event.target.files;
    },

    createObjectURL(file: File): string {
      if ('URL' in window) {
        return URL.createObjectURL(file);
      } else {
        const reader = new FileReader();
        const dataURL = ref<string | null>(null);

        reader.onload = () => {
          dataURL.value = reader.result as string;
        };

        reader.readAsDataURL(file);

        return dataURL.value || '';
      }
    },
  },
});
</script>
