<template>
  <div id="app">
    <header>
      <center><span>App</span></center>
      <button v-on:click="logout">logut</button>
      <img v-if="user" v-bind:src="user.photoURL">
    </header>
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
import firebase from 'firebase'
import * as mediaService from './app/media/MediaService.js'

export default {
  name: 'app',
  computed: {
    user () {
      return this.$store.getters.user
    }
  },
  created () {
    const user = firebase.auth().currentUser
    if (user) {
      this.$store.dispatch('setUser', user)
      mediaService.getAddedMedias(user)
        .then(response => {
          if (response.ok) {
            const addedMedias = response.data.filter(x => x)
            this.$store.dispatch('listAddedMedias', addedMedias)
          }
        })
        .catch(error => {
          alert(error)
          console.log('Error', error)
        })
    }
  },
  methods: {
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

header {
  margin: 0;
  height: 56px;
  padding: 0 16px 0 24px;
  background-color: #35495E;
  color: #ffffff;
}

header span {
  display: block;
  position: relative;
  font-size: 20px;
  line-height: 1;
  letter-spacing: .02em;
  font-weight: 400;
  box-sizing: border-box;
  padding-top: 16px;
}

img {
  height: 40px;
  border-radius: 50px;
  top: 8px;
  right: 10px;
  position: absolute;
}
  
</style>
