<template>
  <div class="admin-profile">
    <h1>Profilo Amministratore</h1>

    <select name="utenti" id="utenti-select" v-model="emailSelezionata">
      <option disabled value="">--Seleziona utente--</option>
      <option v-for="email in univoca()" :key="email" :value="email">{{ email }}</option>
    </select>

    <div v-for="prenotazione in prenotazioni" :key="prenotazione.id" class="prenotazione">
      <div v-if="prenotazione.email == emailSelezionata">
        <p><strong>Nome Utente:</strong> {{ prenotazione.id }}</p>
        <p><strong>Email Utente:</strong> {{ prenotazione.email }}</p>
        <p><strong>Camera:</strong> {{ prenotazione.nomecamera }}</p>
        <p><strong>Data Inizio:</strong> {{ prenotazione.datainizio }}</p>
        <p><strong>Data Fine:</strong> {{ prenotazione.datafine }}</p>
        <button @click="eliminaPrenotazione(prenotazione.id)">Elimina Prenotazione</button>
      </div>
    </div>

    <button @click="logout">Logout</button>
    <router-link to="/admin/nuova-camera">Inserisci Nuova Camera</router-link>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import axios from 'axios';
import { Prenotazione } from '../types';

export default defineComponent({
  data() {
    return {
      prenotazioni: [] as Prenotazione[],
      emailSelezionata: null as string | null
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
    fetchPrenotazioni() {
      axios.get('/api/prenotazioni')
        .then(response => {
          this.prenotazioni = response.data;
        })
        .catch(error => console.error(error));
    }
  },

  mounted() {
    this.fetchPrenotazioni();
  }
});
</script>
