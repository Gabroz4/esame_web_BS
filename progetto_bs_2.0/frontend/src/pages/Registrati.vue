<template>
  <div>
    <h2>Registrazione</h2>
    <form @submit.prevent="submitForm">
      <div>
        <label for="nome">Nome:</label>
        <input type="text" id="nome" v-model="nome" />
      </div>
      <div>
        <label for="cognome">Cognome:</label>
        <input type="text" id="cognome" v-model="cognome" />
      </div>
      <div>
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="email" />
      </div>
      <div>
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password" />
      </div>
      <div>
        <input type="submit" value="Registrati" />
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
      nome: '',
      cognome: '',
      email: '',
      password: '',
    };
  },

  methods: {
    async submitForm() {
      if (!this.nome || !this.cognome || !this.email || !this.password) {
        alert('Per favore, compila tutti i campi del modulo');
        return;
      }

      console.log('Dati del modulo:', {
        nome: this.nome,
        cognome: this.cognome,
        email: this.email,
        password: this.password,
      });

      try {
        const response = await axios.post('/api/registrati', {
          nome: this.nome,
          cognome: this.cognome,
          email: this.email,
          password: this.password,
        });

        console.log('Risposta del server:', response);

        if (response.data.success) {
          alert('Registrazione avvenuta con successo');
          // Puoi anche reindirizzare l'utente a una pagina di login o a qualsiasi altra pagina dopo la registrazione
        } else {
          alert('Errore durante la registrazione');
        }
      } catch (error) {
        console.error('Si è verificato un errore durante la registrazione:', error);
        alert('Si è verificato un errore durante la registrazione. Per favore, riprova più tardi.');
      }
    },
  },
});
</script>
