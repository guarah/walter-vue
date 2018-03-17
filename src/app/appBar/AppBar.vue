<template>
  <v-toolbar class="toolbar">
    <v-btn v-if="user" icon @click="logout">
      <v-icon>power_settings_new</v-icon>
    </v-btn>
    <v-toolbar-title class="white--text">Walter</v-toolbar-title>
    <v-avatar v-if="user" :tile="false" :size="'40px'" class="grey lighten-4 avatar">
      <img v-bind:src="user.photoURL" alt="avatar">
    </v-avatar>
  </v-toolbar>
</template>

<script>
import firebase from 'firebase'
export default {
  props: {
    user: {
      type: Object,
      required: false,
      default: null
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

<style scoped>
.toolbar {
  background-color: black;
  color: red;
}

.avatar {
  top: 8px;
  right: 10px;
  position: absolute;
}
</style>

