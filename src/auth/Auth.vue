<template>
  <div class="auth">
    <h2>In Auth</h2>
    <button @click="goHome">Home</button>
    <button v-on:click="login">login</button>
  </div>
</template>

<script>
  import firebase from 'firebase'

  export default {
    name: 'auth',
    methods: {
      goHome () {
        this.$router.replace('Home')
      },
      login: function () {
        // const provider = new firebase.auth.FacebookAuthProvider()
        const provider = new firebase.auth.GoogleAuthProvider()
        firebase.auth().signInWithRedirect(provider)
      }
    },
    mounted () {
      firebase.auth().getRedirectResult().then(function (result) {
        if (result.credential) {
          // This gives you a Facebook Access Token. You can use it to access the Facebook API.
          // var token = result.credential.accessToken
          this.$router.replace('Home')
        }
        // The signed-in user info.
        // var user = result.user
      }).catch(function (error) {
        console.log('error', error)
        // Handle Errors here.
        // var errorCode = error.code
        // var errorMessage = error.message
        // The email of the user's account used.
        // var email = error.email
        // The firebase.auth.AuthCredential type that was used.
        // var credential = error.credential
      })
    }
}
</script>
