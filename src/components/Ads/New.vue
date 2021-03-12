<template>
 <v-container>
   <v-row justify="center">
     <v-col sm="6">
        <div class="text-center mb-4">
          <h1>New ad</h1>
        </div>

       <form>
         <v-text-field
             outlined
             name="title"
             label="Ad title"
             type="text"

             v-model="adTitle"
             :error-messages="adTitleErrors"
             @blur="$v.adTitle.$touch()"
         ></v-text-field>
         <v-textarea
             outlined
             no-resize
             name="description"
             label="Ad description"
             type="text"

             v-model="description"
             :error-messages="descriptionErrors"
             @blur="$v.description.$touch()"
         ></v-textarea>

       </form>

      <v-row>
        <v-col sm="12">

          <v-btn
              large
              @click="triggerUpload"
              color="blue-grey"
              class="white--text"
          >
            Upload
            <v-icon
                right
                dark
            >
              mdi-cloud-upload
            </v-icon>
          </v-btn>
          <input
              @change="changeFile($event)"
              ref="fileInput"
              type="file"
              style="display: none"
              accept="image/*"
          >

<!--          :loading="loading3"-->
<!--          :disabled="loading3"-->
<!--          @click="loader = 'loading3'"-->

        </v-col>
      </v-row>

      <v-row v-if="imageSrc">
         <v-col sm="12">
           <img class="image-upload" :src="imageSrc" alt="">
         </v-col>
       </v-row>

      <v-row>
        <v-col>

          <v-checkbox
              v-model="promo"
              label="Add to promo?"
          ></v-checkbox>

          <v-btn
              block
              dark
              large
              :loading="loading"
              class="mt-2 deep-purple accent-4"
              :class="{'disbled-button': this.$v.$invalid || !imageSrc || loading}"
              @click="adCreate()"
          >Ad create</v-btn>

        </v-col>
      </v-row>


     </v-col>
   </v-row>

 </v-container>
</template>

<script>
import { required } from 'vuelidate/lib/validators'

export default {
  data: () => ({
    description: '',
    adTitle: '',
    promo: false,
    image: null,
    imageSrc: ''
  }),
  methods: {
    adCreate: function(){
      if(!this.$v.$invalid){
      // && this.image

        console.log('Start')

        const ad = {
          adTitle: this.adTitle,
          description: this.description,
          promo: this.promo,
          image: this.image
        }

        this.$store.dispatch('createAd', ad)
          .then(() => {
            this.$router.push('/list')
          })
          .catch(error => {
            console.log(error)
          })

      }
    },
    triggerUpload: function (){
      this.$refs.fileInput.click()
    },
    changeFile: function (event){
      const file = event.target.files[0]
      const reader = new FileReader()

      reader.onload = () => {
        this.imageSrc = reader.result
      }

      reader.readAsDataURL(file)
      this.image = file

    }
  },
  computed: {
    adTitleErrors () {
      const errors = []
      if (!this.$v.adTitle.$dirty) return errors
      !this.$v.adTitle.required && errors.push('Потрібна TITLE')
      return errors
    },
    descriptionErrors () {
      const errors = []
      if (!this.$v.description.$dirty) return errors
      !this.$v.description.required && errors.push('Потрібeн DESCRIPTION')
      return errors
    },
    loading() {
      return this.$store.getters.loading
    }
  },
  validations: {
    adTitle: {
      required
    },
    description: {
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
.image-upload{
  width: 100%;
  max-width: 100%;
}
</style>