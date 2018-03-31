<template>
  <div class="auth text-md-center">
    <h2>Meu nome é Walter</h2>
    <p>Faça seu login</p>
    <v-btn @click="googleLogin" outline color="indigo"><icon name="google"></icon></v-btn>
    <v-btn @click="facebookLogin" outline color="indigo"><icon name="facebook"></icon></v-btn>
  </div>
</template>

<script>
  import firebase from 'firebase'
  // or import all icons if you don't care about bundle size
  import 'vue-awesome/icons'

  import Icon from 'vue-awesome/components/Icon'

  export default {
    components: {
      Icon
    },

    methods: {
      goHome () {
        this.$router.replace('Home')
      },

      facebookLogin () {
        const provider = new firebase.auth.FacebookAuthProvider()
        provider.setCustomParameters({
          'display': 'popup'
        })
        // firebase.auth().signInWithPopup(provider)
        firebase.auth().signInWithRedirect(provider)
      },

      googleLogin () {
        const provider = new firebase.auth.GoogleAuthProvider()
        provider.setCustomParameters({
          prompt: 'select_account'
        })
        provider.addScope('profile')
        provider.addScope('email')
        // firebase.auth().signInWithPopup(provider)
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
