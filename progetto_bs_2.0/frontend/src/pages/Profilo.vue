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
        <li>Totale: {{ prenotazione.prezzotot }}€</li>
      </ul>
    </div>
    <button class="edit-btn" @click="logout">Logout</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import axios from 'axios';
import { User, Prenotazione } from '../types';

export default defineComponent({
  data() {
    return {
      user: {} as User,
      prenotazioni: [] as Prenotazione[],
      emailToken: sessionStorage.getItem('emailToken')
    };
  },
  methods: {
    //funzione per il logout
    logout() {
      sessionStorage.removeItem('userToken');
      sessionStorage.removeItem('emailToken');
      this.$router.push('/').then(() => {
        window.location.reload();
      });
    },
    //funzione per ottenere la prenotazione data l'email
    fetchProfileAndPrenotazioni() {
      //se non esiste l'email
      if (!this.emailToken) {
        console.error('Token dell\'utente non presente');
        return;
      }

      //chiamata al backend per ottenere il profilo e le sue prenotazioni data l'email
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
    //funzione per formattare le date
    formatDates(date: Date) {
      const newdate = new Date(date).toISOString().split('T')[0];
      return newdate;
    },
  },
  mounted() {
    this.fetchProfileAndPrenotazioni();
  },
});
</script>