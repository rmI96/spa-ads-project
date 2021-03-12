<template>
  <v-container>
    <div class="text-center mb-3 mt-2">
      <h1>Замовлення</h1>
    </div>

    <v-row
        justify="center"
    >
      <v-col sm="6">

        <div v-if="orders.length !== 0 && !loading">
          <v-list
              v-for="(order, i) in ordersVal"
              :key="i"
          >

            <v-list-item>
              <template>
                <v-list-item-action>
                  <v-checkbox
                      :input-value="order.done"
                      @change="markDone(order)"
                  ></v-checkbox>
                </v-list-item-action>

                <v-list-item-content>
                  <v-list-item-title class="mb-2">{{order.name}}</v-list-item-title>
                  <v-list-item-subtitle>{{order.phone}}</v-list-item-subtitle>
                </v-list-item-content>

                <v-list-item-action>
                  <v-btn
                      dark
                      class="deep-purple accent-4"
                      :to="'/ad/' + order.adId"
                  >
                    Open
                  </v-btn>
                </v-list-item-action>
              </template>
            </v-list-item>


          </v-list>
        </div>
        <v-alert
            v-else
            color="indigo"
            dark
        >
          У вас поки немає карток
        </v-alert>

      </v-col>
    </v-row>



  </v-container>
</template>

<script>
export default {
  data: () => ({
  }),
  computed: {
    orders() {
      return this.$store.getters.orders
    },
    loading() {
      return this.$store.getters.loading
    }
  },
  methods: {
    markDone: function(){
      // order.done = true
    }
  },
  created() {
    this.$store.dispatch('getOrder')
  }
}
</script>
