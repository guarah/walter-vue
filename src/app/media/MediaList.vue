<template>
  <!-- <div class="media-list">
    
  </div> -->
  <v-container fluid style="min-height: 0;" grid-list-lg>
    <app-media v-for="media in medias" :key="media.name" :media="media"></app-media>
  </v-container>
</template>

<script>
  import Media from '../media/Media.vue'

  export default {
    props: ['medias'],
    components: {
      appMedia: Media
    }
  }
</script>

<style scoped>
  .media-list {
    height: 63vh;
    overflow: auto;
  }
</style>
