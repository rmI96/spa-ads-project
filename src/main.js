import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import Vuelidate from 'vuelidate'
import store from './store'
import firebase from "firebase/app"
import "firebase/auth";

import BuyModalWindow from "@/components/BuyModalWindow";

Vue.use(Vuelidate)

Vue.config.productionTip = false

Vue.component('buy-modal-window', BuyModalWindow)

new Vue({
  // el: '#app',
  vuetify,
  router,
  store,
  render: h => h(App),
  created() {

    firebase.initializeApp({
      apiKey: "AIzaSyCFig9KFxVb52xRLVntfbv8M_DN4Df3G-o",
      authDomain: "ads-project-e88fc.firebaseapp.com",
      projectId: "ads-project-e88fc",
      storageBucket: "ads-project-e88fc.appspot.com",
      messagingSenderId: "660731656322",
      appId: "1:660731656322:web:5a6112a38fa734be365c9b",
      measurementId: "G-7JZ7Q5YTNH"
    });

    firebase.auth().onAuthStateChanged(user => {
      if(user){

        this.$store.dispatch('autoLoginUser', user)

      }
    })

    this.$store.dispatch('fetchAds')


  }
}).$mount('#app')
