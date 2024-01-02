import { createApp} from 'vue'
import App from './App.vue'
import router from './router'
import 'bulma/css/bulma.css';

//App.config.productionTip = false;

createApp(App).use(router).mount('#app')
