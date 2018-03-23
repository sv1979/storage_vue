import Vue from 'vue/dist/vue'
import Firebase from 'firebase'

const config = {
    apiKey: "AIzaSyDWb_v3KfeRGroRhqnWAHGAP6VWNWo5Nt8",
    authDomain: "storagevue.firebaseapp.com",
    databaseURL: "https://storagevue.firebaseio.com",
    projectId: "storagevue",
    storageBucket: "storagevue.appspot.com",
    messagingSenderId: "528192414824"
};
const firebaseApp = Firebase.initializeApp(config);

Vue.prototype.$FireBaseDb = firebaseApp.database()
// Vue.prototype.$FireStorage = firebaseApp.storage()
Vue.prototype.$FireAuth = firebaseApp.auth()
