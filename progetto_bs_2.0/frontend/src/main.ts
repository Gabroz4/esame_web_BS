import { createApp } from "vue"
import { createRouter, createWebHistory, Router } from "vue-router"
import "./style.scss"
//import di tutte le pagine vue
import App from "./App.vue"
import Home from "./pages/Home.vue"
import Camere from "./pages/Camere.vue"
import Login from "./pages/Login.vue"
import Registrati from "./pages/Registrati.vue"
import NotFound from "./pages/NotFound.vue"
import Profilo from "./pages/Profilo.vue"
import ProfiloAdmin from "./pages/ProfiloAdmin.vue"
import NuovaCamera from "./pages/NuovaCamera.vue"

//configurazione router pagine vue
const router: Router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: Home },
    { path: "/login", component: Login },
    { path: "/registrati", component: Registrati },
    { path: "/camere/:nomecamera", component: Camere },
    { path: "/profilo", component: Profilo },
    { path: "/admin", component: ProfiloAdmin },
    { path: "/admin/nuova-camera", component: NuovaCamera },
    { path: "/:pathMatch(.*)*", component: NotFound }, //se non trova l'endpoint
  ]
})

createApp(App)
  .use(router)
  .mount("#app")
