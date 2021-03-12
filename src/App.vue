<template>
  <v-app>

    <v-navigation-drawer
        v-if="isUserLogIn"
        v-model="drawer"
        temporary
        app
    >
      <v-list
          nav
          dense
      >
        <v-list-item-group
            v-model="group"
            active-class="deep-purple--text text--accent-4"
        >


          <v-list-item
              v-for="link in links"
              :key="link.title"
              :to="link.url"
          >
            <v-list-item-icon>
              <v-icon>{{link.icon}}</v-icon>
            </v-list-item-icon>
            <v-list-item-title>{{link.title}}</v-list-item-title>
          </v-list-item>

        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
        color="deep-purple accent-4"
        dense
        dark
        app
    >
      <v-app-bar-nav-icon
          v-if="isUserLogIn"
          @click="drawer = !drawer"
      ></v-app-bar-nav-icon>
      <v-toolbar-title v-if="isUserLogIn"> <router-link to="/" class="link-default">SPA application</router-link></v-toolbar-title>
      <v-toolbar-title v-else> <span>SPA application</span></v-toolbar-title>
      <v-spacer></v-spacer>
      <template v-if="isUserLogIn">
        <span>{{userInfo.name}}</span>
        <v-btn plain @click="onLogout" class="ml-4">Logout</v-btn>
      </template>
      <template v-else>
        <v-btn plain to="/login">Login</v-btn>
        <v-btn plain to="registration">Registration</v-btn>
      </template>

    </v-app-bar>

    <v-main>
        <router-view></router-view>
    </v-main>

    <!--Preloader-->
    <template v-if="error">
      <v-snackbar
          @input="closeError"
          :value="true"
      >
        {{ error }}

        <template v-slot:action="{ attrs }">
          <v-btn
              color="pink"
              text
              v-bind="attrs"
              @click="closeError"
          >
            Close
          </v-btn>
        </template>
      </v-snackbar>
    </template>

  </v-app>
</template>

<script>

export default {

  data: () => ({
    drawer: false,
    group: null,
    links: [
      {
        title: 'Home',
        icon: 'mdi-home',
        url: '/'
      },
      {
        title: 'Orders',
        icon: 'mdi-lock-clock',
        url: '/orders'
      },
      {
        title: 'New ad',
        icon: 'mdi-book-plus-multiple',
        url: '/new'
      },
      {
        title: 'My ads',
        icon: 'mdi-bread-slice',
        url: '/list'
      }
    ]
  }),

  computed: {
    error(){
        return this.$store.getters.error ? this.errorEd(this.$store.getters.error.code) : this.$store.getters.error
    },
    isUserLogIn(){
      return this.$store.getters.isUserLogIn
    },
    userInfo(){
      return this.$store.getters.user
    }
  },
  methods: {
    closeError(){
      this.$store.dispatch('clearError')
    },
    errorEd(codeError){
      switch (codeError){
        case 'auth/wrong-password':
          return 'Пароль недійсний або у користувача немає пароля.'
        case 'auth/too-many-requests':
          return 'Доступ до цього облікового запису тимчасово вимкнено через багато невдалих спроб входу.'
        case 'auth/user-not-found':
          return 'Немає запису користувача, що відповідає цьому ідентифікатору. Можливо, користувача видалено.'
        default:
          return 'Error'
      }
    },
    onLogout(){
      this.$store.dispatch('onLogout')
      this.$router.push('/login')
    }

  }

};
</script>

<style>
a.link-default{
  text-decoration: none;
  color: #fff!important;
  transition: 0.24s;
}
.link-default:hover{
  opacity: 0.9;
}
.height-full{
  height: 100%;
}
@media (max-width: 480px) {
  .v-toolbar__title{
    display: none;
  }
}
</style>