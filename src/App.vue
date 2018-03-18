<template>
  <div id="app">
    <v-app>
      <app-bar :user="user"/>
      <v-content>

          <router-view></router-view>

      </v-content>
    </v-app>
  </div>
</template>

<script>
import firebase from 'firebase'
import * as mediaService from './app/media/MediaService.js'
import AppBar from './app/appBar/AppBar'

export default {
  components: {
    AppBar
  },
  computed: {
    user () {
      return this.$store.getters.user
    }
  },
  created () {
    this.loadInicialMedias()
  },
  methods: {
    loadInicialMedias () {
      const user = firebase.auth().currentUser
      if (user) {
        this.$store.dispatch('setUser', user)
        mediaService.getMyMedias(user)
          .then(response => {
            if (response.ok) {
              let myMedias = []
              for (var i in response.data) {
                myMedias.push(response.data[i])
              }
              this.$store.dispatch('listMyMedias', myMedias)
              this.$store.dispatch('defineSuggestions')
            }
          })
          .catch(error => {
            alert(error)
            console.log('Error', error)
          })
      }
    }
  }
}
</script>

<style>
  body {
    margin: 0;
  }
</style>


<style scoped>

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

main {
  text-align: center;
  margin-top: 40px;
}

</style>
