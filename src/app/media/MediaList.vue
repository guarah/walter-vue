<template>
  <div>
    <app-media v-for="media in medias" :key="media.name" :media="media"></app-media>
  </div>
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
