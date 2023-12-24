<template>
  <header>
    <h1>CHALET delle Alpi</h1>
  </header>
  <nav>
    <ul>
      <li><router-link to="/">Home</router-link></li>
      <li><router-link to="/camere">Camere</router-link></li>
    </ul>
  </nav>
  <main>
    <router-view />
  </main>
  <aside>
    <section>
      <h2>Post Popolari</h2>
      <ul>

      </ul>
    </section>
    <section>
      <h2>Categorie</h2>
      <ul>

      </ul>
    </section>
  </aside>
  <footer>
    <p>Esame di Ingegneria dei sistemi web - Stefani Tommaso e Broccoli Gabriele</p>
  </footer>
</template>

<style scoped>
.router-link-exact-active {
  color: rgb(219, 69, 83);
  background-color: #fff;
}
</style>