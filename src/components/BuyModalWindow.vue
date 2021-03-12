<template>
  <v-dialog
      v-model="dialog"
      width="600"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn
          class="blue-grey darken-2"
          dark
          v-bind="attrs"
          v-on="on"
      >
        Buy
      </v-btn>
    </template>

    <v-card>
      <v-card-title class="headline deep-purple accent-4">
        <span class="white--text">Buy ({{ad.title}})</span>
      </v-card-title>

      <div class="pa-4 pt-8 pb-0">

        <v-text-field
            outlined
            name="name"
            label="Name"
            type="text"

            v-model="name"
            :error-messages="nameErrors"
            @blur="$v.name.$touch()"
        ></v-text-field>

        <v-text-field
            outlined
            name="phone"
            label="Phone"
            type="text"

            v-model="phone"
            :error-messages="phoneErrors"
            @blur="$v.phone.$touch()"
        ></v-text-field>

      </div>

      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
            dark
            class="blue-grey darken-2 mr-1"
            :class="{'disbled-button': localLoading}"
            @click="onCancel"
        >
          Cancel
        </v-btn>
        <v-btn
            dark
            class="deep-purple accent-4"
            :class="{'disbled-button': this.$v.$invalid || localLoading}"
            @click="onBuy"
            :loading="localLoading"
        >
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { required } from 'vuelidate/lib/validators'

export default {
  props: ['ad'],
  data() {
    return {
      dialog: false,
      name: this.$store.getters.user.name,
      phone: '',
      localLoading: false
    };
  },
  methods: {
    onCancel: function(){
      this.name = this.$store.getters.user.name
      this.phone = ''
      this.dialog = false
    },
    onBuy: function(){
      if(!this.$v.$invalid){

        this.localLoading = true

        const ad = {
          phone: this.phone,
          name: this.name,
          id: this.ad.id,
          ownerId: this.ad.ownerId
        }

        this.$store.dispatch('createOrder', ad)
        .finally(() => {
          this.name = this.$store.getters.user.name
          this.phone = ''
          this.localLoading = false
          this.dialog = false
        })

      }
    }
  },
  computed: {
    nameErrors () {
      const errors = []
      if (!this.$v.name.$dirty) return errors
      !this.$v.name.required && errors.push('Потрібна NAME')
      return errors
    },
    phoneErrors () {
      const errors = []
      if (!this.$v.phone.$dirty) return errors
      !this.$v.phone.required && errors.push('Потрібна PHONE')
      return errors
    },
    loading() {
      return this.$store.getters.loading
    }
  },
  validations: {
    name: {
      required
    },
    phone: {
      required
    }
  }
}
</script>

<style scoped>
.disbled-button{
  pointer-events: none;
  opacity: 0.8;
}
</style>