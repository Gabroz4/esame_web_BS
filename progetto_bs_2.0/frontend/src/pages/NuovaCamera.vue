<template>
  <div v-if="adminToken" class="nuovacamera">
    <h2>Crea una Nuova Stanza</h2>
    <form @submit.prevent="createRoom" enctype="multipart/form-data">
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
        <div>
          <label for="immagine1">Immagine 1:</label>
          <input type="file" id="immagine1" name="immagine1" ref="immagine1" @change="handleImageChange(1, $event)" />
        </div>

        <div>
          <label for="immagine2">Immagine 2:</label>
          <input type="file" id="immagine2" name="immagine2" ref="immagine2" @change="handleImageChange(2, $event)" />
        </div>
      </div>

      <!-- Show selected images -->
      <div v-for="(immagine, index) in immagini" :key="index">
        <img :src="createObjectURL(immagine)" alt="Immagine"
          style="max-width: 100px; max-height: 100px; margin-right: 10px;" />
      </div>

      <div>
        <input type="submit" value="Crea Stanza" :disabled="isLoading" />
      </div>
      <div v-if="error" class="error-message">{{ error }}</div>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import axios from 'axios';
import { Camera } from '../types';

export default defineComponent({
  data() {
    return {
      adminToken: sessionStorage.getItem('adminToken'),
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

        // Aggiungi le immagini al FormData solo se sono presenti
        if (this.camera.imgcamera1) {
          formData.append('imgcamera1', this.camera.imgcamera1);
        }
        if (this.camera.imgcamera2) {
          formData.append('imgcamera2', this.camera.imgcamera2);
        }

        const response = await axios.post('/api/admin/nuova-camera', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        if (response.data.success) {
          alert('Camera creata con successo');
          // Opzionalmente, puoi reindirizzare l'utente o eseguire altre azioni
        } else {
          this.error = 'Errore durante la creazione della camera';
        }
      } catch (error) {
        console.error('Si è verificato un errore durante la creazione della camera:', error);
        this.error = 'Si è verificato un errore durante la creazione della camera.';
      } finally {
        this.isLoading = false;
      }
    },


    handleImageChange(imageNumber: number, event: any) {
      const image = event.target.files[0];

      // Assegna l'immagine alla variabile corrispondente in base al numero
      if (imageNumber === 1) {
        this.camera.imgcamera1 = image;
      } else if (imageNumber === 2) {
        this.camera.imgcamera2 = image;
      }

      // Puoi anche gestire l'anteprima dell'immagine se necessario
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
