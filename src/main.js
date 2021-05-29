import Vue from 'vue'
import 'materialize-css/dist/css/materialize.min.css'
import App from './App.vue'
import router from './router'
import firebase from 'firebase/app'
import 'firebase/auth'
import './components/firebaseInit'

Vue.config.productionTip = false

let app;
firebase.auth().onAuthStateChanged(function() {
  if (!app) {
    /* eslint-disable no-new */
    app = new Vue({
      el: '#app',
      router,
      render: h => h(App) 
    });
  }
});