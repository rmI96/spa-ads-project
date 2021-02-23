<template>
  <v-app>

    <v-navigation-drawer
        v-model="drawer"
        absolute
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
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>SPA application</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn plain>link 1</v-btn>
    </v-app-bar>

    <v-main>
        <router-view></router-view>
    </v-main>

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
        title: 'Login',
        icon: 'mdi-lock',
        url: '/login'
      },
      {
        title: 'Registration',
        icon: 'mdi-face',
        url: '/registration'
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

};
</script>
