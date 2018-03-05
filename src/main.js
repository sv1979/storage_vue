
import Vue from 'vue/dist/vue'
import Vuex from 'vuex/dist/vuex.common'
import vMediaQuery from 'v-media-query'
import moment from 'vue-moment'
import fontawesome from '@fortawesome/fontawesome'
import { FontAwesomeIcon, FontAwesomeLayers } from '@fortawesome/vue-fontawesome'
import faSearch from '@fortawesome/fontawesome-pro-light/faSearch'
import faPlus from '@fortawesome/fontawesome-pro-light/faPlus'
import faTimes from '@fortawesome/fontawesome-pro-light/faTimes'
import faUndo from '@fortawesome/fontawesome-pro-light/faUndo'
import faSave from '@fortawesome/fontawesome-pro-light/faSave'
import faCircle from '@fortawesome/fontawesome-pro-light/faCircle'
import faPencil from '@fortawesome/fontawesome-pro-light/faPencil'
import faAngleRight from '@fortawesome/fontawesome-pro-light/faAngleRight'
import faAngleDoubleRight from '@fortawesome/fontawesome-pro-light/faAngleDoubleRight'
import faAngleDoubleLeft from '@fortawesome/fontawesome-pro-light/faAngleDoubleLeft'

fontawesome.library.add(faSearch,faPlus,faUndo,faSave,faTimes, faCircle,faAngleRight,faAngleDoubleRight,faAngleDoubleLeft,faPencil);
Vue.use(FontAwesomeIcon);
Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.component('font-awesome-layers', FontAwesomeLayers);
Vue.use(Vuex);
Vue.use(vMediaQuery);
Vue.use(moment);

import rainfield from './assets/rainfield.js';
import 'normalize.css';
import './assets/styles.less';

import App from './App.vue';
Vue.config.productionTip = false;


const store = new Vuex.Store({
    state: {
        current_interface: 'intro_form',
        // current_interface: 'main_view',
        username: 'Guest'
    },
    actions: {
        change_interface_action: ({commit}, new_id)=>{
            commit("change_interface", new_id);
        },
        set_username_action: ({commit}, username)=>{
            commit("set_username", username);
        }
    },
    mutations: {
        change_interface (state, i_id) {
            state.current_interface = i_id;
        },
        set_username (state, username) {
            state.username = username;
        }
    },
    getters: {
        get_interface: state => {
            return state.current_interface;
        },
        get_username: state => {
            return state.username;
        }
    }
});

new Vue({
  store,
  render: h => h(App)
}).$mount('#app');

rainfield();

