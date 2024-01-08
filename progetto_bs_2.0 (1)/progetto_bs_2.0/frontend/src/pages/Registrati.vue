<template>
  <div class="container">
    <div class="form-container">
      <h2>Registrazione</h2>
      <form @submit.prevent="submitForm">
        <div>
          <label for="nome">Nome:</label>
          <input type="text" id="nome" v-model="user.nome" />
        </div>
        <div>
          <label for="cognome">Cognome:</label>
          <input type="text" id="cognome" v-model="user.cognome" />
        </div>
        <div>
          <label for="email">Email:</label>
          <input type="email" id="email" v-model="user.email" />
        </div>
        <div>
          <label for="password">Password:</label>
          <input type="password" id="password" v-model="user.password" />
        </div>
        <div>
          <input type="submit" value="Registrati" :disabled="isLoading" />
        </div>
        <div v-if="error" class="error-message">{{ error }}</div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import axios from 'axios';
import { User } from '../types';

export default defineComponent({
  data() {
    return {
      user: {} as User,
      isLoading: false,
      error: '',
    };
  },

  methods: {
    async submitForm() {
      this.error = ''; // Reset error on each submit
      if (!this.user.nome || !this.user.cognome || !this.user.email || !this.user.password) {
        this.error = 'Per favore, compila tutti i campi del modulo';
        return;
      }

      this.isLoading = true;

      try {
        const response = await axios.post('/api/registrati', this.user);

        console.log('Risposta del server:', response);

        if (response.data.success) {
          alert('Registrazione avvenuta con successo');
          this.$router.push('/login');
        } else {
          this.error = 'Errore durante la registrazione';
        }
      } catch (error) {
        console.error('Si è verificato un errore durante la registrazione:', error);
        this.error = 'Si è verificato un errore durante la registrazione. Per favore, riprova più tardi.';
      } finally {
        this.isLoading = false;
      }
    },
  },
});
</script>
