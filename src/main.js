import Vue from 'vue/dist/vue'
import Vuex from 'vuex/dist/vuex.common'
import vMediaQuery from 'v-media-query'
import moment from 'vue-moment'

import fontawesome from '@fortawesome/fontawesome'
import {FontAwesomeIcon, FontAwesomeLayers} from '@fortawesome/vue-fontawesome'
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
import faChevronDoubleUp from '@fortawesome/fontawesome-pro-light/faChevronDoubleUp'
import faChevronDoubleDown from '@fortawesome/fontawesome-pro-light/faChevronDoubleDown'
import faTrashAlt from '@fortawesome/fontawesome-pro-light/faTrashAlt'
import faSlidersH from '@fortawesome/fontawesome-pro-light/faSlidersH'
import faSignOut from '@fortawesome/fontawesome-pro-light/faSignOut'
import faHome from '@fortawesome/fontawesome-pro-light/faHome'

fontawesome.library.add(faSearch, faPlus, faUndo, faSave, faTimes, faCircle, faAngleRight, faAngleDoubleRight, faAngleDoubleLeft, faPencil,
    faChevronDoubleUp, faChevronDoubleDown, faTrashAlt, faSlidersH, faSignOut, faHome);
Vue.use(FontAwesomeIcon);
Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.component('font-awesome-layers', FontAwesomeLayers);
Vue.use(Vuex);
Vue.use(vMediaQuery);
Vue.use(moment);

import rainfield from './assets/rainfield.js';
import 'normalize.css';
import './assets/styles.less';

import './db.js'
import App from './App.vue';


Vue.config.productionTip = false;

const store = new Vuex.Store({
    state: {
        current_interface: 'intro_form',
        current_user: {
            name: '',
            pic: '',
            uid: null,
            dataset: null
        }
    },
    actions: {
        change_interface_action: ({commit}, new_id) => {
            commit("change_interface", new_id);
        },
        set_current_user_action: ({commit}, current_user) =>{
            if(current_user.name !== null) {
                commit("set_current_user_name",current_user.name )
            }
            if(current_user.pic !== null) {
                commit("set_current_user_pic",current_user.pic )
            }
            if(current_user.uid !== null) {
                commit("set_current_user_uid",current_user.uid )
            }
            if(current_user.dataset !== null) {
                commit("set_current_user_dataset",current_user.dataset )
            }
        },
        set_user_dataset: ({commit}, dataset) => {
            commit("set_current_user_dataset",dataset )
        },
    },
    mutations: {
        change_interface(state, i_id) {
            state.current_interface = i_id;
        },
        set_current_user_name(state, username) {
            state.current_user.name = username;
        },
        set_current_user_pic(state, pic) {
            state.current_user.pic = pic;
        },
        set_current_user_uid(state, uid) {
            state.current_user.uid = uid;
        },
        set_current_user_dataset(state, dataset) {
            state.current_user.dataset = dataset;
        }
    },
    getters: {
        get_interface: state => {
            return state.current_interface;
        },
        get_current_user_name: state => {
            return state.current_user.name;
        },
        get_current_user_pic: state => {
            return 'url(' + state.current_user.pic + ')';
        },
        get_current_user_uid: state => {
            return state.current_user.uid;
        },
        get_current_user_dataset: state => {
            return state.current_user.dataset ?
                state.current_user.dataset :
                {'folders':[]};
        }
    }
});

new Vue({
    store,
    render: h => h(App)
}).$mount('#app');

rainfield();

