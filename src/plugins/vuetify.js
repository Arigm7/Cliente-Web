// src/plugins/vuetify.js

import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import VueSession from 'vue-session'
import '@mdi/font/css/materialdesignicons.css'
import 'vue-toast-notification/dist/theme-bootstrap.css'
import VueToast from 'vue-toast-notification'

Vue.use(Vuetify);
Vue.use(VueSession)
Vue.use(VueToast)

const opts = {};                    //TEMAS DE COLORES - THEME

export default new Vuetify(opts);

