<template>
  <div id="app">
    <v-app>

      <v-toolbar class="toolbar">
        <v-btn icon @click="logout">
          <v-icon>power_settings_new</v-icon>
        </v-btn>
        <v-toolbar-title class="white--text">Walter</v-toolbar-title>
        <v-avatar v-if="user" :tile="false" :size="'40px'" class="grey lighten-4 avatar">
          <img v-bind:src="user.photoURL" alt="avatar">
        </v-avatar>
      </v-toolbar>

      <v-content>
        <v-container fluid>
          <router-view></router-view>
        </v-container>
      </v-content>

    </v-app>
  </div>
</template>

<script>
import firebase from 'firebase'
import * as mediaService from './app/media/MediaService.js'

export default {
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
    },
    logout () {
      firebase.auth().signOut().then(() => {
        this.$store.dispatch('unsetUser')
        this.$router.replace('Auth')
      }, (error) => {
        console.log(error)
      })
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

.toolbar {
  background-color: black;
  color: red;
}

main {
  text-align: center;
  margin-top: 40px;
}

.avatar {
  top: 8px;
  right: 10px;
  position: absolute;
}

</style>
