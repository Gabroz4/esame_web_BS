<template>
  <div class="admin-profile">
    <h1>Profilo Amministratore</h1>
    <!--<select v-model="selectedUser" @change="fetchPrenotazioni">
        <option disabled value="">Seleziona un utente</option>
        <option v-for="user in users" :key="user.id" :value="user.id">
          {{ user.name }}
        </option>
      </select>-->
    <div v-for="prenotazione in prenotazioni" :key="prenotazione.id" class="prenotazione">
      <p><strong>Nome Utente:</strong> {{ prenotazione.id }}</p>
      <p><strong>Email Utente:</strong> {{ prenotazione.email }}</p>
      <p><strong>Camera:</strong> {{ prenotazione.nomecamera }}</p>
      <p><strong>Data Inizio:</strong> {{ prenotazione.datainizio }}</p>
      <p><strong>Data Fine:</strong> {{ prenotazione.datafine }}</p>
      <p><strong>Giorni:</strong> {{ prenotazione.giornitot }}</p>
      <p><strong>Prezzo:</strong> {{ prenotazione.prezzotot }}</p>
      <button @click="eliminaPrenotazione(prenotazione.id)">Elimina Prenotazione</button>
    </div>
    <button @click="logout">Logout</button>
    <router-link to="/admin/nuova-camera">Inserisci Nuova Camera</router-link>
  </div>
</template>
  
<script lang="ts">
import { defineComponent } from 'vue';
import axios from 'axios';
import { Prenotazione } from '../types'; // Import the Prenotazione interface

export default defineComponent({
  data() {
    return {
      prenotazioni: [] as Prenotazione[]
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
    eliminaPrenotazione(id: number) {
      // Add code to delete the booking with the given id
    },
    fetchPrenotazioni() {
      // Fetch bookings here and assign it to this.prenotazioni
      // This is just a placeholder, replace it with actual data fetching code
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
  