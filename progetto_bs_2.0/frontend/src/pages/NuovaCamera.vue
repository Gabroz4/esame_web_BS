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
        <div class="input-container">
          <label for="immagine1">Immagine 1:</label>
          <input type="file" id="immagine1" name="immagine1" ref="immagine1" @change="imagePreview(1, $event)" />
          <div class="image-preview" v-if="immagini[0]">
            <img :src="immagini[0]" alt="Immagine 1" />
          </div>
        </div>

        <div class="input-container" >
          <label for="immagine2">Immagine 2:</label>
          <input type="file" id="immagine2" name="immagine2" ref="immagine2" @change="imagePreview(2, $event)" />
          <div class="image-preview" v-if="immagini[1]">
            <img :src="immagini[1]" alt="Immagine 2" />
          </div>
        </div>
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
      immagini: [] as string[],
    };
  },

  methods: {
    //funzione per la creazione di una camera
    async createRoom() {
      this.error = '';//debugging
      //se i campi obbligatori non sono stati inseriti
      if (!this.camera.nomecamera || !this.camera.postiletto || !this.camera.prezzonotte) {
        this.error = 'Per favore, compila tutti i campi del modulo';
        return;
      }

      this.isLoading = true;

      try {
        //creo un form data, impostando il suo corpo
        const formData = new FormData();
        formData.append('nomecamera', this.camera.nomecamera);
        formData.append('postiletto', String(this.camera.postiletto));//con l'append posso aggiugnere solo stringhe, e non numeri
        formData.append('prezzonotte', String(this.camera.prezzonotte));
        formData.append('descrizione', this.camera.descrizione);

        //aggiungo le immagini al FormData solo se sono state inserite
        if (this.camera.imgcamera1) {
          formData.append('imgcamera1', this.camera.imgcamera1);
        }
        if (this.camera.imgcamera2) {
          formData.append('imgcamera2', this.camera.imgcamera2);
        }

        //invio al backend il mio form data per la creazione di una nuova camera
        const response = await axios.post('/api/admin/nuova-camera', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        //se la query ha avuto successo
        if (response.data.success) {
          alert('Camera creata con successo');
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

    //funziome per gestire le anteprime delle imamgini
    imagePreview(imageNumber: number, event: any) {
      const image = event.target.files[0];

      //assegno l'immagine alla variabile corrispondente in base al numero
      if (imageNumber === 1) {
        this.camera.imgcamera1 = image;
      } else if (imageNumber === 2) {
        this.camera.imgcamera2 = image;
      }

      //chiamo la funzione per la creazione dell'anteprima dell'immagine
      this.createImagePreview(image, imageNumber);
    },

    //funzione per creare le anteprime delle immagini
    createImagePreview(file: File, imageNumber: number) {
      const reader = new FileReader();

      reader.onload = () => {
        //aggiorno l'array di immagini per vedere l'anteprima caricata
        this.$data.immagini[imageNumber - 1] = reader.result as string;
      };

      reader.readAsDataURL(file);
    },
  },
});
</script>