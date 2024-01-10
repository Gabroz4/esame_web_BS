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
    //metodo chiamato quando il form viene cliccato
    async submitForm() {
      //controllo che i campi obbligatori siano stati inseriti
      if (!this.email || !this.password) {
        alert('Per favore, inserisci sia l\'email che la password');
        return;
      }

      try {
        //invia una richiesta post al server con i dati del modulo
        const response = await axios.post('/api/login', {
          email: this.email,
          password: this.password,
        });

        //controllo se ho avuto dei risultati dalla query nel backend
        if (response.data.success) {
          //salvo il token di accesso in sessionStorage
          if (this.email !== 'admin@admin.com') {
            sessionStorage.setItem('userToken', 'IsLoggedIn');
          } else {
            sessionStorage.setItem('adminToken', 'Admin');
            sessionStorage.setItem('userToken', 'IsLoggedIn');
          }
          sessionStorage.setItem('emailToken', this.email);
          
          //se l'utente non è un admin viene reindirizzato alla home
          if (!sessionStorage.getItem('adminToken')) {
            this.$router.push('/').then(() => {
              //ricarica della pagina
              window.location.reload();
            });
          } else {
            this.$router.push('/admin').then(() => {
              window.location.reload();
            });
          }

        } else {
          //se la query non ha avuto successo mostra un errore
          alert('Email o password non corretti');
        }
      } catch (error) {
        console.error('Si è verificato un errore durante l\'autenticazione:', error);
        alert('Si è verificato un errore durante l\'autenticazione. Per favore, riprova più tardi.');
      }
    },
  },
});
</script>