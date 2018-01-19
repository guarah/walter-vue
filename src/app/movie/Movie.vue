<template>
  <div class="movies">
    <h2>In Movies</h2>
    <router-link to="/Home">Home</router-link>
    <router-link to="/Movie">Movies</router-link>
    <router-link to="/Serie">Series</router-link>
    <router-link to="/Other">Other</router-link>

    <h2>Lista</h2>
    <app-media-list :medias="movies"></app-media-list>
  </div>
</template>

<script>
  import MediaList from '../media/MediaList.vue'
  export default {
    name: 'movies',
    computed: {
      movies () {
        return this.$store.getters.addedMovies
      }
    },
    components: {
      appMediaList: MediaList
    }
}
</script>
