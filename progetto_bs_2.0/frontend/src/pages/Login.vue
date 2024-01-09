<template>
  <div class="container">
    <div class="form-container">
      <h2>Login</h2>
      <form @submit.prevent="submitForm">
        <div>
          <label for="email">Email: </label>
          <input type="email" id="email" v-model="email" />
        </div>
        <div>
          <label for="password">Password: </label>
          <input type="password" id="password" v-model="password" />
        </div>
        <div>
          <input type="submit" value="Invia" />
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
// Importa la funzione defineComponent da Vue
import { defineComponent } from 'vue';
// Importa Axios per effettuare richieste HTTP
import axios from 'axios';

// Definisce e esporta il componente Vue
export default defineComponent({
  // Dati del componente
  data() {
    return {
      email: '', // Dato per l'email
      password: '', // Dato per la password
    };
  },

  // Metodi del componente
  methods: {
    // Metodo chiamato quando il form viene inviato
    async submitForm() {
      // Previene l'invio del modulo se i campi sono vuoti
      if (!this.email || !this.password) {
        alert('Per favore, inserisci sia l\'email che la password');
        return;
      }

      try {
        // Invia una richiesta POST al server con i dati del modulo
        const response = await axios.post('/api/login', {
          email: this.email,
          password: this.password,
        });

        // Controlla se l'autenticazione è riuscita
        if (response.data.success) {
          // Salva il token di accesso simulato in sessionStorage
          if (this.email !== 'admin@admin.com') {
            sessionStorage.setItem('userToken', 'IsLoggedIn');
          } else {
            sessionStorage.setItem('adminToken', 'Admin');
            sessionStorage.setItem('userToken', 'IsLoggedIn');
          }
          sessionStorage.setItem('emailToken', this.email);
          // Se l'autenticazione ha avuto successo, reindirizza l'utente alla home page

          if (!sessionStorage.getItem('adminToken')) {
            this.$router.push('/').then(() => {
              // Forza la ricarica della pagina
              window.location.reload();
            });
          } else {
            this.$router.push('/admin').then(() => {
              // Forza la ricarica della pagina
              window.location.reload();
            });
          }

        } else {
          // Se l'autenticazione non ha avuto successo, mostra un messaggio di errore
          alert('Email o password non corretti');
        }
      } catch (error) {
        // Gestisci eventuali errori di rete
        console.error('Si è verificato un errore durante l\'autenticazione:', error);
        alert('Si è verificato un errore durante l\'autenticazione. Per favore, riprova più tardi.');
      }
    },
  },
});
</script>