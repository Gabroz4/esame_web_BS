import { createApp } from "vue"
import { createRouter, createWebHistory, Router } from "vue-router"
import "./style.css"
import App from "./App.vue"
import Home from "./pages/Home.vue"
import Camere from "./pages/Camere.vue"
import Login from "./pages/Login.vue"
import Registrati from "./pages/Registrati.vue"
import NotFound from "./pages/NotFound.vue"

const router: Router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: Home },
    { path: "/login", component: Login },
    { path: "/registrati", component: Registrati },
    { path: "/login", component: Login },
    { path: "/camere/:nomecamera", component: Camere },
    { path: "/:pathMatch(.*)*", component: NotFound },
  ]
})

createApp(App)
  .use(router)
  .mount("#app")
