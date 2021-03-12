<template>
  <v-container v-if="!loading">
    <div class="text-center mb-4"><h1>My ads</h1></div>

    <v-row justify="center">
      <v-col sm="8">

        <v-row v-if="myAds.length !== 0">
          <v-col
              sm="6"
              v-for="(ad, i) in myAds"
              :key="i"
          >
              <v-card class="mx-auto">
                <v-img
                    class="white--text align-end"
                    height="200px"
                    :src="ad.imageSrc"
                >
                  <v-card-title>{{ad.title}}</v-card-title>
                </v-img>

                <v-card-text class="text--primary pb-0">
                  {{ad.description}}
                </v-card-text>

                <v-card-actions class="pa-4">
                  <v-btn
                      dark
                      class="blue-grey darken-2"
                      :to="'/ad/' + ad.id"
                  >
                    Open
                  </v-btn>
                </v-card-actions>
              </v-card>

          </v-col>
        </v-row>
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
  <div v-else  class="height-full">
    <v-row justify="center" align="center" class="height-full">
      <v-progress-circular
          :size="50"
          color="deep-purple accent-4"
          indeterminate
      ></v-progress-circular>
    </v-row>
  </div>
</template>

<script>
export default {
  computed: {
    myAds(){
      return this.$store.getters.myAds
    },
    loading() {
      return this.$store.getters.loading
    }
  }
}
</script>