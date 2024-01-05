<template>
    <div class="profile">
      <h1>Profilo Utente</h1>
      <div class="profile-info">
        <p><strong>Nome:</strong> {{ user.nome }}</p>
        <p><strong>Cognome:</strong> {{ user.cognome }}</p>
        <p><strong>Email:</strong> {{ user.email }}</p>
        <img :src="'/img/' + user.imgutente" alt="User Image" />
      </div>
      <button @click="logout">Logout</button>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  import { User } from '../types';
  import axios from 'axios';
  
  export default defineComponent({
    data() {
      return {
        user: {} as User
      };
    },
    methods: {
      logout() {
        sessionStorage.removeItem('userToken');
        sessionStorage.removeItem('emailToken');
        this.$router.push('/').then(() => {
          // Forza la ricarica della pagina
          window.location.reload();
        });
      },
      fetchUserData() {
        const userToken = sessionStorage.getItem('userToken');
        axios.get('/api/user', {
          headers: {
            Authorization: `Bearer ${userToken}`
          }
        })
        .then(response => {
          this.user = response.data;
        })
        .catch(error => {
          console.error('Error fetching user data:', error);
        });
    },
    mounted() {
      this.fetchUserData();
    }
  }
});
  </script>