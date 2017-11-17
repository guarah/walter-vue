<template>
  <div class="auth">
    <h2>In Auth</h2>
    <button v-on:click="login">login</button>
  </div>
</template>

<script>
  import firebase from 'firebase'

  export default {
    // Do not forget this little guy
    name: 'auth',
    // share common functionality with component mixins
    mixins: [],
    // compose new components
    extends: {},
    // component properties/variables
    props: {
      bar: {}, // Alphabetized
      foo: {},
      fooBar: {}
    },
    // variables
    data () {
      return {
        msg: 'Welcome to Your Vue.js PWA'
      }
    },
    computed: {},
    // when component uses other components
    components: {},
    // methods
    watch: {},
    methods: {
      login: function () {
        const provider = new firebase.auth.FacebookAuthProvider()
        firebase.auth().signInWithRedirect(provider)
      }
    },
    // component Lifecycle hooks
    beforeCreate () {},
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

<style scoped>
  .auth { /* ... */ }
</style>
