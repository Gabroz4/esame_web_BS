<template>
  <header>
    <img class="logo" :src="'/img/' + 'logo.jpg'" alt="" />
    <h1 class="hometitle">CHALET delle Alpi</h1>
  </header>
  <nav class="navbar">
    <ul>
      <li><router-link to="/">Home</router-link></li>
      <li><router-link to="/camere">Camere</router-link></li>
    </ul>
  </nav>
  <main>
    <router-view />
  </main>
 
  <footer>
    <p>Esame di Ingegneria dei sistemi web - Stefani Tommaso e Broccoli Gabriele</p>
  </footer>
</template>

<style scoped>
.router-link-exact-active {
  background-color: transparent;
  color: #f0b31a;
}
</style>