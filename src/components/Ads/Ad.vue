<template>
  <div v-if="!loading">
    <v-container>
      <v-row justify="center">
        <v-col sm="10">

          <template>
            <v-card class="mx-auto">
              <v-img
                  class="white--text align-end"
                  height="250px"
                  :src="ad.imageSrc"
              >
                <v-card-title>{{ad.title}}</v-card-title>
              </v-img>

              <v-card-text class="text--primary">
                {{ad.description}}
              </v-card-text>

              <v-card-actions class="pa-4">
                <dialog-modal v-if="isEdit" :ad="ad"></dialog-modal>
                <buy-modal-window
                    v-if="!isEdit"
                    :ad="ad"
                ></buy-modal-window>
                <v-btn
                    v-if="isEdit"
                    dark
                    class="deep-purple accent-4 mr-3"
                    @click="deleteAd"
                >
                  Delete
                </v-btn>
              </v-card-actions>
            </v-card>
          </template>

          <div class="mb-6"></div>
          <h2 class="mb-4">Comments</h2>


          <v-textarea
              outlined
              auto-grow
              label="Your comment"
              rows="2"
              row-height="30"
              v-model="comment"
              @blur="$v.comment.$touch()"
          ></v-textarea>

          <div class="text-right">
            <v-btn
                color="deep-purple accent-4"
                dark
                large
                class="mt-n4"
                :class="{'disbled-button': this.$v.$invalid || localLoading}"
                :loading="localLoading"
                @click="createComment"
            >
              Send
              <v-icon
                  right
                  dark
              >
                mdi-send
              </v-icon>
            </v-btn>
          </div>

          <div v-if="true">
            <div
                v-for="(item, key) in ad.comments"
                :key="key"
            >
              <v-list-item

                  class="mt-4 pr-0 pl-0">
                <v-list-item-avatar class="item-avatar">
                  <v-icon
                      class="blue-grey darken-2"
                      dark
                  >mdi-account-circle</v-icon>
                </v-list-item-avatar>
                <v-sheet
                    color="white"
                    elevation="1"
                    width="100%"
                    :rounded="true"
                >
                  <v-list-item-content class="pa-4">
                    <v-list-item-title class="mb-2"><b>{{item.name}}</b></v-list-item-title>
                    <div>
                      {{item.comment}}
                    </div>
                  </v-list-item-content>
                </v-sheet>
              </v-list-item>
            </div>
          </div>

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
import {required, minLength} from 'vuelidate/lib/validators'
import DialogModal from './DialogModal'


export default {
  props: ['id'],
  data() {
    return{
      comment: '',
      localLoading: false
    }
  },
  methods: {
    deleteAd: function(){
      const id = this.ad.id
      if(id){
        this.$store.dispatch('deleteAd', {id})
        .finally((e) => {
          console.log(e)
          this.$router.push('/list')
        })
      }
    },
    createComment: function(){

      if(!this.$v.$invalid){
        this.localLoading = true

        const comment = {
          nameUser: this.$store.getters.user.name,
          comment: this.comment,
          id: this.id
        }

        this.$store.dispatch('createComment', comment)
            .finally(() => {
              this.comment = ''
              this.localLoading = false
            })

      }

    }
  },
  computed: {
    ad() {
      return this.$store.getters.idGetAds(this.id)
    },
    loading() {
      return this.$store.getters.loading
    },
    isEdit() {
      return this.ad.ownerId === this.$store.getters.user.id
    }
  },
  validations: {
    comment: {
      required,
      minLength: minLength(6)
    }
  },
  components: {
    DialogModal
  }
}
</script>

<style scoped>
.disbled-button{
  pointer-events: none;
  opacity: 0.8;
}
  .item-avatar{
    align-self: self-start;
    margin-top: 0;
  }
</style>