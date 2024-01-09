<template>
  <div class="profile">
    <h1>Profilo Amministratore</h1>

    <!-- Seleziona Utente -->
    <div class="select-container">
      <label for="utenti-select">Seleziona Prenotazione:</label>
      <select name="utenti" id="utenti-select" v-model="emailSelezionata">
        <option value="" disabled selected>-- Scegli un utente --</option>
        <option v-for="email in univoca()" :key="email" :value="email">{{ email }}</option>
      </select>
    </div>

    <!-- Visualizza Prenotazioni -->
    <div v-for="prenotazione in prenotazioni" :key="prenotazione.id" class="prenotazione">
      <div v-if="prenotazione.email == emailSelezionata" class="prenotazione-details">
        <h3>Prenotazione #{{ prenotazione.id }}</h3>
        <p>E-mail: {{ prenotazione.email }}</p>
        <p>Camera: {{ prenotazione.nomecamera }}</p>
        <p>Data Inizio: {{ prenotazione.datainizio }}</p>
        <p>Data Fine: {{ prenotazione.datafine }}</p>
        <button @click="eliminaPrenotazione(prenotazione.id)" class="delete-btn">Elimina Prenotazione</button>
      </div>
    </div>

    <!-- Seleziona Camera -->
    <div class="select-container">
      <label for="camere-select">Seleziona Camera:</label>
      <select name="camere" id="camere-select" v-model="cameraSelezionata">
        <option value="" disabled selected>-- Scegli una camera --</option>
        <option v-for="camera in cameraUnivoca()" :key="camera" :value="camera">{{ camera }}</option>
      </select>
    </div>

    <!-- Visualizza Dettagli Camera -->
    <div v-for="camera in camere" :key="camera.nomecamera" class="camera-details">
      <div v-if="camera.nomecamera == cameraSelezionata" class="camera-details-inner">
        <h3>Dettagli Camera</h3>
        <p>Camera: {{ camera.nomecamera }}</p>
        <p>Posti Letto: {{ camera.postiletto }}</p>
        <p>Prezzo a Notte: {{ camera.prezzonotte }}</p>
        <p>Descrizione: {{ camera.descrizione }}</p>
        <button @click="eliminaCamera(camera.nomecamera)" class="delete-btn">Elimina Camera</button>
        <button @click="modificaCamera(camera.nomecamera)" class="edit-btn">Modifica Camera</button>
      </div>
    </div>

    <!-- Modulo di Modifica Camera -->
    <div v-if="modificaAttiva" class="edit-form">
      <h2>Modifica Camera</h2>
      <label for="postiletto">Posti Letto:</label>
      <input type="number" v-model="cameraInModifica.postiletto" />

      <label for="prezzonotte">Prezzo a Notte:</label>
      <input type="number" v-model="cameraInModifica.prezzonotte" />

      <label for="descrizione">Descrizione:</label>
      <textarea v-model="cameraInModifica.descrizione"></textarea>

      <button @click="salvaModificheCamera" class="save-btn">Salva Modifiche</button>
    </div>

    <!-- Altri Controlli -->
    <div class="controls">
      <button @click="logout" class="logout-btn">Logout</button>
      <router-link to="/admin/nuova-camera" class="link-btn">Inserisci Nuova Camera</router-link>
    </div>
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
      cameraSelezionata: null as string | null,

      modificaAttiva: false,
      cameraInModifica: {
        nomecamera: '',
        postiletto: 0,
        prezzonotte: 0,
        descrizione: ''
      } as Camera

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
    modificaCamera(nomecamera: string) {
      // Trova la camera da modificare
      const cameraDaModificare = this.camere.find(camera => camera.nomecamera === nomecamera);

      // Se la camera è trovata, abilita la modalità di modifica
      if (cameraDaModificare) {
        this.modificaAttiva = true;
        this.cameraInModifica = { ...cameraDaModificare };
      } else {
        alert('Camera non trovata');
      }
    },
    salvaModificheCamera() {
      axios.put(`/api/camere/${this.cameraInModifica.nomecamera}`, this.cameraInModifica)
        .then(response => {
          if (response.data.success) {
            alert('Camera modificata con successo');
            this.fetchCamere();
            this.modificaAttiva = false; // Disabilita la modalità di modifica
          } else {
            alert('Errore durante la modifica della camera');
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
