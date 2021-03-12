<template>
  <div v-if="!loading">
    <v-container fluid>

      <v-carousel>
        <v-carousel-item
            v-for="(ad,i) in promoAds"
            :key="i"
            :src="ad.imageSrc"
        >

          <div class="carousel-btn-collection">
            <v-btn
                dark
                class="deep-purple accent-4"
                :class="{'mr-3': ad.ownerId !== userId}"
                :to="'/ad/' + ad.id"
            >
              Open
            </v-btn>
            <buy-modal-window
                v-if="ad.ownerId !== userId"
                :ad="ad"
            ></buy-modal-window>
          </div>
        </v-carousel-item>
      </v-carousel>

    </v-container>
    <v-container>
      <v-row>
        <v-col
            sm="4"
            v-for="(ad,i) in ads"
            :key="i"
        >

            <v-card class="mx-auto">
              <v-img
                  :src="ad.imageSrc"
                  height="200px"
              ></v-img>

              <v-card-title>
                {{ad.title}}
              </v-card-title>

              <v-card-subtitle>
                {{ad.description}} <br>
                Author: {{ad.name}}
              </v-card-subtitle>

              <hr class="hr-style-v1">

              <v-card-actions>
                <v-btn
                    dark
                    class="deep-purple accent-4 mr-3 ml-0"
                    :to="'/ad/' + ad.id"
                >
                  Open
                </v-btn>
                <buy-modal-window
                    v-if="ad.ownerId !== userId"
                    :ad="ad"
                ></buy-modal-window>

                <v-spacer></v-spacer>

                <v-chip
                    v-if="ad.comments.length !== 0"
                    color="blue-grey lighten-2 "
                    text-color="white"
                    class="chip-comment"
                >
                  <v-avatar
                      left
                      class="blue-grey darken-1"
                  >
                    {{Object.keys(ad.comments).length}}
                  </v-avatar>
                  Comments
                </v-chip>
              </v-card-actions>

            </v-card>

        </v-col>
      </v-row>
    </v-container>
  </div>
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

  data: () => ({
    show: false,
    model: 0,
  }),
  methods: {
    
  },
  computed:{
    promoAds() {
      return this.$store.getters.promoAds;
    },
    ads() {
      return this.$store.getters.ads;
    },
    loading() {
      return this.$store.getters.loading
    },
    userId() {
      return this.$store.getters.user.id
    }
  },
  created() {
    console.log(this.ads)
  }

}
</script>

<style scoped>
  .hr-style-v1{
    background: rgba(1,1,1,0.1);
    border: none;
    height: 1px;
  }
  .carousel-btn-collection{
    position: absolute;
    left: 50%;
    transform: translate(-50%);
    background: rgba(1,1,1,0.5);
    padding: 10px 20px;
    border-radius: 4px;
    bottom: 80px;
  }
  .chip-comment{
    font-size: 13px!important;
    letter-spacing: 0.8px;
    font-weight: 400;
  }
</style>