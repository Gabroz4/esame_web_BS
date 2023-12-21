import { createApp } from "vue"
import { createRouter, createWebHistory, Router } from "vue-router"
import "./style.css"
import App from "./App.vue"
import Home from "./pages/Home.vue"
import Camera from "./pages/Camere.vue"
/*import Contatti from "./pages/Contatti.vue"
import Login from "./pages/Login.vue"
import NotFound from "./pages/NotFound.vue"
import ArticoloVue from "./pages/Articolo.vue"*/

const router: Router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: Home },
    { path: "/camere", component: Camera },
   /* { path: "/contatti", component: Contatti },
    { path: "/login", component: Login },
    { path: "/:pathMatch(.*)*", component: NotFound },
    { path: "/articolo/:idArticolo", component: ArticoloVue }*/
  ]
})

createApp(App)
  .use(router)
  .mount("#app")
