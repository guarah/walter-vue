<template>
  <div id="app">
    <v-app>
      <app-bar :user="user" :class="{'blur-style': selectedMedia}"/>
      <v-content>
        <router-view :class="{'blur-style': selectedMedia}"></router-view>
        <router-view v-if="selectedMedia" name="modal"></router-view>
      </v-content>
    </v-app>
  </div>
</template>

<script>
import * as appService from './appService'
import AppBar from './app/appBar/AppBar'

export default {
  components: {
    AppBar
  },
  computed: {
    user () {
      return this.$store.getters.user
    },
    selectedMedia () {
      return this.$store.getters.selectedMedia
    }
  },
  created () {
    appService.loadInicialMedias()
  }
}
</script>

<style>
  body {
    margin: 0;
  }
</style>


<style>

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

.blur-style {
  position: fixed;
  filter: progid:DXImageTransform.Microsoft.Blur(PixelRadius='3');
  -webkit-filter: url(#blur-filter);
  filter: url(#blur-filter);
  -webkit-filter: blur(3px);
  filter: blur(3px);
}

</style>
