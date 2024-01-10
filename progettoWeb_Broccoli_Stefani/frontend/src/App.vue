<template>
  <header>
    <img class="logo" :src="'/img/' + 'logo.jpg'" alt="">
    <h1 class="hometitle">CHALET delle Alpi</h1>
  </header>
  <nav class="navbar">
    <ul>
      <li><router-link to="/">Home</router-link></li>
      <!-- se l'utente non è loggato mostra "accedi" e "registrati" -->
      <li v-if="!isLoggedIn"><router-link to="/login">Accedi</router-link></li>
      <li v-if="!isLoggedIn"><router-link to="/registrati">Registrati</router-link></li>

      <!-- se l'utente è loggato e non è admin mostra "profilo" -->
      <li v-if="isLoggedIn && !isAdmin"><router-link to="/profilo">Profilo</router-link></li>

      <!-- se l'utente è admin mostra "admin" -->
      <li v-if="isAdmin"><router-link to="/admin">Admin</router-link></li>
    </ul>
  </nav>
  <main>
    <router-view :key="$route.fullPath" />
  </main>
  <footer>
    <p>Esame di Ingegneria dei sistemi web - Stefani Tommaso e Broccoli Gabriele</p>
  </footer>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  computed: {
    //chiede se esiste lo userToken
    isLoggedIn() {
      return sessionStorage.getItem('userToken') === 'IsLoggedIn';
    },
    //chiede se esiste l'adminToken
    isAdmin() {
      return sessionStorage.getItem('adminToken') === 'Admin';
    }
  },
});
</script>


