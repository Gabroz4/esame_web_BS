<template>
  <div>
    <h2>Login</h2>
    <form @submit.prevent="submitForm">
      <div>
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="email" />
      </div>
      <div>
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password" />
      </div>
      <div>
        <input type="submit" value="Invia" />
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import axios from 'axios';

export default defineComponent({
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    async submitForm() {
      // Prevenire l'invio del modulo se i campi sono vuoti
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
          // Se l'autenticazione ha avuto successo, reindirizza l'utente alla home page
          this.$router.push('/');
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