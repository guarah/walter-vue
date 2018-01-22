<template>
  <div class="media-card">
      <h2 class="title">Title: {{media.name}}</h2>
      <img :src="media.image" alt="">
      <p class="genre">Genre: {{media.genre}}</p>
      <p class="description">{{media.description}}</p>
      <p class="media_type">{{media.media_type}}</p>
      <p>In my list: </p> {{media.added ? 'Yes' : 'No'}}
      <button @click="updateList(media)">{{media.added ? 'Remove from list' : 'Add to list'}}</button>
  </div>
</template>

<script>
  export default {
    props: ['media'],
    methods: {
      updateList (media) {
        if (media.added) {
          this.$store.dispatch('removeFromList', media)
        } else {
          this.$store.dispatch('addToList', media)
        }
      }
    }
  }
</script>

<style scoped>
  .media-card {
    background: whitesmoke;
    border: solid 1px brown;
    margin: 5px;
  }

</style>

