<template>
  <div class="admin-profile">
    <h1>Profilo Amministratore</h1>

    <select name="utenti" id="utenti-select" v-model="emailSelezionata">
      <option value="" disabled selected>--Seleziona prenotazione--</option>
      <option v-for="email in univoca()" :key="email" :value="email">{{ email }}</option>
    </select>

    <div v-for="prenotazione in prenotazioni" :key="prenotazione.id" class="prenotazione">
      <div v-if="prenotazione.email == emailSelezionata">
        <p>ID Prenotazione: {{ prenotazione.id }}</p>
        <p>E-mail: {{ prenotazione.email }}</p>
        <p>Camera: {{ prenotazione.nomecamera }}</p>
        <p>Data Inizio: {{ prenotazione.datainizio }}</p>
        <p>Data Fine: {{ prenotazione.datafine }}</p>
        <button @click="eliminaPrenotazione(prenotazione.id)">Elimina Prenotazione</button>
      </div>
    </div>

    <select name="camere" id="camere-select" v-model="cameraSelezionata">
      <option value="" disabled selected>--Seleziona camera--</option>
      <option v-for="camera in cameraUnivoca()" :key="camera" :value="camera">{{ camera }}</option>
    </select>

    <div v-for="camera in camere" :key="camera.nomecamera" class="prenotazione">
      <div v-if="camera.nomecamera == cameraSelezionata">
        <p>Camera: {{ camera.nomecamera }}</p>
        <p>Posti letto: {{ camera.postiletto }}</p>
        <p>Prezzo a notte: {{ camera.prezzonotte }}</p>
        <p>Descrizione: {{ camera.descrizione }}</p>
        <button @click="eliminaCamera(camera.nomecamera)">Elimina Camera</button>
      </div>
    </div>


    <button @click="logout">Logout</button>
    <router-link to="/admin/nuova-camera">Inserisci Nuova Camera</router-link>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import axios from 'axios';
import { Prenotazione, Camera } from '../types';

export default defineComponent({
  data() {
    return {
      prenotazioni: [] as Prenotazione[],
      camere: [] as Camera[],
      emailSelezionata: null as string | null,
      cameraSelezionata: null as string | null
    };
  },

  methods: {
    logout() {
      sessionStorage.removeItem('userToken');
      sessionStorage.removeItem('emailToken');
      sessionStorage.removeItem('adminToken');
      this.$router.push('/').then(() => {
        // Forza la ricarica della pagina
        window.location.reload();
      });
    },
    univoca(): string[] {
      const insieme = Array.from(new Set(this.prenotazioni.map(p => p.email)));
      console.log(insieme);
      return insieme;
    },
    cameraUnivoca(): string[] {
      const insieme = Array.from(new Set(this.camere.map(p => p.nomecamera)));
      console.log(insieme);
      return insieme;
    },
    eliminaPrenotazione(id: number) {
      axios.delete(`/api/prenotazioni/${id}`)
        .then(response => {
          if (response.data.success) {
            alert('Prenotazione eliminata con successo');
            // Aggiorna la lista delle prenotazioni dopo l'eliminazione
            this.fetchPrenotazioni();
          } else {
            alert('Errore durante l\'eliminazione della prenotazione');
          }
        })
        .catch(error => console.error(error));
    },
    eliminaCamera(nomecamera: string) {
      axios.delete(`/api/camere/${nomecamera}`)
        .then(response => {
          if (response.data.success) {
            alert('Camera eliminata con successo');
            // Aggiorna la lista delle prenotazioni dopo l'eliminazione
            this.fetchCamere();
          } else {
            alert('Errore durante l\'eliminazione della camera');
          }
        })
        .catch(error => console.error(error));
    },
    fetchPrenotazioni() {
      axios.get('/api/prenotazioni')
        .then(response => {
          this.prenotazioni = response.data;
        })
        .catch(error => console.error(error));
    },
    fetchCamere() {
      axios.get('/api/camere')
        .then(response => {
          this.camere = response.data;
        })
        .catch(error => console.error(error));
    }
  },

  mounted() {
    this.fetchPrenotazioni();
    this.fetchCamere();
  }
});
</script>
