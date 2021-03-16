import { createApp } from 'vue'
import App from './App.vue'
import router from './router';
import {store} from '@/store';
import { IonicVue } from '@ionic/vue';

/* Core CSS required for Ionic components to work properly */
import '@ionic/vue/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/vue/css/normalize.css';
import '@ionic/vue/css/structure.css';
import '@ionic/vue/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/vue/css/padding.css';
import '@ionic/vue/css/float-elements.css';
import '@ionic/vue/css/text-alignment.css';
import '@ionic/vue/css/text-transformation.css';
import '@ionic/vue/css/flex-utils.css';
import '@ionic/vue/css/display.css';

/* Theme variables */
import './theme/variables.css';
import ApiService from "@/services/api.service";
import {TokenService} from "@/services/token.service";
import { defineCustomElements } from '@ionic/pwa-elements/loader';
defineCustomElements(window);
const isDev = process.env.NODE_ENV === 'development'
const app = createApp(App)
    .use(IonicVue)
    .use(router)
    .use(store);

ApiService.init(isDev ? 'http://172.20.10.4:10000' : 'http://139.196.102.55:10000');

if (TokenService.getToken()) {
  ApiService.setHeader();
  ApiService.mountRequestInterceptor();
  ApiService.mount401Interceptor();
}

router.isReady().then(() => {
  app.mount('#app');
});
