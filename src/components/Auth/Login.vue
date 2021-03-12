<template>
  <v-container class="height-full">

    <v-row align="center" class="height-full">
      <v-col sm="12">

    <div class="text-center mb-4">
      <h1>Увійти</h1>
    </div>
    <v-row justify="center">
      <v-col sm="4">

          <form>
            <v-text-field
                outlined
                label="E-mail"
                type="text"
                append-icon="mdi-at"
                v-model="email"
                :error-messages="emailErrors"
                @blur="$v.email.$touch()"
            ></v-text-field>
            <v-text-field
                :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="showPass = !showPass"
                :type="showPass ? 'text' : 'password'"
                outlined
                label="Password"
                v-model="password"
                :error-messages="passwordErrors"
                @blur="$v.password.$touch()"
            ></v-text-field>

            <div class="text-right">
              <v-btn
                  dark
                  large
                  :loading="loading"
                  class="mt-0 deep-purple accent-4"
                  :class="{'disbled-button': this.$v.$invalid || loading}"
                  @click="onSubmit()"
              >Увійти</v-btn>
            </div>
          </form>

      </v-col>
    </v-row>

      </v-col>
    </v-row>

  </v-container>
</template>

<script>
import { required, email, minLength } from 'vuelidate/lib/validators'

export default {
  name: "Login",
  data: () => ({
    showPass: true,
    password: '',
    email: ''
  }),
  methods: {
    onSubmit: function(){
      if(!this.$v.$invalid){
        const user = {
          email: this.email,
          password: this.password
        }

        this.$store.dispatch('loginUser', user)
          .then((e) => {
            console.log(e)
            this.$router.push('/')
          })
          .catch((error) => {
            console.error(error.message)
          })

      }
    }
  },
  computed: {
    emailErrors () {
      const errors = []
      if (!this.$v.email.$dirty) return errors
      !this.$v.email.email && errors.push('Має бути дійсний e-mail')
      !this.$v.email.required && errors.push('Потрібна електронна пошта')
      return errors
    },
    passwordErrors () {
      const errors = []
      if (!this.$v.password.$dirty) return errors
      !this.$v.password.required && errors.push('Потрібeн пароль')
      !this.$v.password.minLength && errors.push('Пароль більше 6 символів')
      return errors
    },
    loading(){
      return this.$store.getters.loading
    }
  },
  validations: {
    email: {
      required,
      email
    },
    password: {
      required,
      minLength: minLength(6)
    }
  }

}
</script>

<style scoped>
.disbled-button{
  pointer-events: none;
  opacity: 0.8;
}
.height-full{
  height: 100%;
}
</style>