<template>
  <header>
    <h1>Blog di Tecnologie Web</h1>
  </header>
  <nav>
    <ul>
      <li><router-link to="/">Home</router-link></li>
      <li><router-link to="/archivio">Archivio</router-link></li>
      <li><router-link to="/contatti">Contatti</router-link></li>
      <li><router-link to="/login">Login</router-link></li>
    </ul>
  </nav>
  <main>
    <router-view />
  </main>
  <aside>
    <section>
      <h2>Post Popolari</h2>
      <ul>
        <li><a href="#">Intro alle Tecnologie Web Client Side</a></li>
        <li><a href="#">Intro alle Tecnologie Web Server Side</a></li>
      </ul>
    </section>
    <section>
      <h2>Categorie</h2>
      <ul>
        <li><a href="#">HTML</a></li>
        <li><a href="#">CSS</a></li>
        <li><a href="#">PHP</a></li>
        <li><a href="#">Javascript</a></li>
        <li><a href="#">jQuery</a></li>
        <li><a href="#">Apache</a></li>
      </ul>
    </section>
  </aside>
  <footer>
    <p>Fondamenti di Sistemi Web - A.A. 2021/2022</p>
  </footer>
</template>

<style scoped>
.router-link-exact-active {
  color: rgb(219, 69, 83);
  background-color: #fff;
}
</style>