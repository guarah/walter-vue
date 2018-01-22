<template>
  <div class="movies">
    <h2>In Others</h2>

    <h2>Lista</h2>
    <app-media-list :medias="others"></app-media-list>

    <v-bottom-nav absolute :value="true" :active.sync="e1" color="transparent">
      <v-btn flat color="teal" value="home" @click="go('Home')">
        <span>Home</span>
        <v-icon>home</v-icon>
      </v-btn>
      <v-btn flat color="teal" value="movie" @click="go('Movie')">
        <span>Movies</span>
        <v-icon>favorite</v-icon>
      </v-btn>
      <v-btn flat color="teal" value="serie" @click="go('Serie')">
        <span>Series</span>
        <v-icon>place</v-icon>
      </v-btn>
      <v-btn flat color="teal" value="other" @click="go('Other')">
        <span>Others</span>
        <v-icon>place</v-icon>
      </v-btn>
    </v-bottom-nav>
  </div>
</template>

<script>
  import MediaList from '../media/MediaList.vue'
  export default {
    name: 'others',
    data: function () {
      return {
        e1: 'other'
      }
    },
    computed: {
      others () {
        return this.$store.getters.addedOthers
      }
    },
    components: {
      appMediaList: MediaList
    },
    methods: {
      go (where) {
        this.$router.push({name: where})
      }
    }
}
</script>
