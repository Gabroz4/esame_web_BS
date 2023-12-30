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

<script>
import axios from 'axios';

export default {
  data() {
    return {
      username: '',
      password: '',
      message: '',
    };
  },
  methods: {
    login() {
      axios.post('http://localhost:3000/api/login', { username: this.username, password: this.password })
        .then(response => {
          this.message = response.data.message;
        })
        .catch(error => {
          this.message = 'Errore durante il login';
          console.error('Errore durante il login', error);
        });
    },
  },
};
</script>