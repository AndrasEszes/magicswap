<template>
<p v-if=
<v-layout row wrap>
  <v-flex xs10 offset-xs1>
    <v-app id="inspire">
    <v-form v-model="valid">
      <v-text-field
        v-model="email"
        :rules="emailRules"
        label="E-mail"
        required
      ></v-text-field>
      <v-text-field
        v-model="password"
        :rules="passwordRules"
        label="Password"
        :type="'password'"
        required
      ></v-text-field>
      <v-btn @click="login">Login</v-btn>
    </v-form>
  </v-app>
  </v-flex>
</v-layout>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import firebase from 'firebase/app'

@Component
export default class Login extends Vue {
  @Prop({required: true})
  public email: string = ''

  @Prop({required: true})
  public password: any

  public login(): void {
    firebase.auth().signInWithEmailAndPassword(this.email, this.password).catch((error) => {
      const errorCode = error.code
      const errorMessage = error.message
      if (errorCode === 'auth/wrong-password') {
        alert('Wrong password.')
        } else {
          alert(errorMessage)
        }
    })
  }
}
</script>


