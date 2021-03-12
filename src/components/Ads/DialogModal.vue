<template>
  <v-dialog
        v-model="dialog"
        width="600"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
            class="blue-grey darken-2 mr-3"
            dark
            v-bind="attrs"
            v-on="on"
        >
          Edit
        </v-btn>
      </template>

      <v-card>
        <v-card-title class="headline deep-purple accent-4">
          <span class="white--text">Edit Ad</span>
        </v-card-title>

        <div class="pa-4 pt-8 pb-0">

          <v-text-field
              outlined
              name="title"
              label="Ad title"
              type="text"

              v-model="editTitle"
              :error-messages="adTitleErrors"
              @blur="$v.editTitle.$touch()"
          ></v-text-field>

          <v-textarea
              outlined
              no-resize
              name="description"
              label="Ad description"
              type="text"

              v-model="editDescription"
              :error-messages="descriptionErrors"
              @blur="$v.editDescription.$touch()"
          ></v-textarea>

        </div>

        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
              dark
              class="blue-grey darken-2 mr-1"
              @click="onCancel"
          >
            Cancel
          </v-btn>
          <v-btn
              dark
              class="deep-purple accent-4"
              :class="{'disbled-button': this.$v.$invalid}"
              @click="onSave"
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
      editDescription: this.ad.description,
      editTitle: this.ad.title
    };
  },
  methods: {
    onCancel: function() {
      this.editDescription = this.ad.description
      this.editTitle = this.ad.title
      this.dialog = false
    },
    onSave: function() {
      if(!this.$v.$invalid){

        const editAd = {
          title: this.editTitle,
          description: this.editDescription,
          id: this.ad.id
        }

        this.$store.dispatch('updateAd', editAd)

        this.dialog = false
      }
    }
  },
  computed: {
    adTitleErrors () {
      const errors = []
      if (!this.$v.editTitle.$dirty) return errors
      !this.$v.editTitle.required && errors.push('Потрібна TITLE')
      return errors
    },
    descriptionErrors () {
      const errors = []
      if (!this.$v.editDescription.$dirty) return errors
      !this.$v.editDescription.required && errors.push('Потрібeн DESCRIPTION')
      return errors
    },
    loading() {
      return this.$store.getters.loading
    }
  },
  validations: {
    editTitle: {
      required
    },
    editDescription: {
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