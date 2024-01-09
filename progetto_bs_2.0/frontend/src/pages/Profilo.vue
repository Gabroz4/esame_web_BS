<template>
  <div class="adminprofile">
    <h1>Profilo Utente</h1>
    <div class="profile-info">
      <p>Nome: {{ user.nome }}</p>
      <p>Cognome: {{ user.cognome }}</p>
      <p>Email:{{ user.email }}</p>
    </div>

    <h2>Prenotazioni</h2>
    <div v-for="prenotazione in prenotazioni" :key="prenotazione.id" class="prenotazione">
      <ul>
        <li>Id prenotazione: {{ prenotazione.id }}</li>
        <li>Camera: {{ prenotazione.nomecamera }}</li>
        <li>Periodo: {{ formatDates(prenotazione.datainizio) }} - {{ formatDates(prenotazione.datafine) }}</li>
        <li>Totale: {{ prenotazione.prezzo }}€</li>
      </ul>
    </div>
    <button class="edit-btn" @click="logout">Logout</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import axios from 'axios';

export default defineComponent({
  data() {
    return {
      user: {} as any,
      prenotazioni: [] as any[],
      emailToken: sessionStorage.getItem('emailToken')
    };
  },
  methods: {
    logout() {
      sessionStorage.removeItem('userToken');
      sessionStorage.removeItem('emailToken');
      this.$router.push('/').then(() => {
        window.location.reload();
      });
    },
    fetchProfileAndPrenotazioni() {
      if (!this.emailToken) {
        console.error('Token dell\'utente non presente');
        return;
      }

      axios.get(`/api/user/${this.emailToken}`)
        .then(response => {
          this.user = response.data.profile;
          this.prenotazioni = response.data.prenotazioni;
        })
        .catch(error => {
          console.error('Errore durante il recupero del profilo e delle prenotazioni:', error);
          alert('Si è verificato un errore durante il recupero del profilo e delle prenotazioni. Riprova più tardi.');
        });
    },
    formatDates(dateString: string) {
      //formatta la data
      const date = new Date(dateString);
      return date.toISOString().split('T')[0];
    },
  },
  mounted() {
    this.fetchProfileAndPrenotazioni();
  },
});
</script>