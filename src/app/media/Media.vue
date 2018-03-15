<template>
  <v-layout>
    <v-flex xs12 sm6 offset-sm3>
      <v-card height="360px">
        <v-card-media v-if="media.image" :src="media.image" height="200px">
        </v-card-media>
        <v-card-title primary-title>
          <div>
            <h3 class="headline mb-0">{{media.name}}</h3>
          </div>
        </v-card-title>
        <v-card-actions>
          <v-btn flat color="orange" @click="updateList(media)">{{media.added ? 'Remove from list' : 'Add to list'}}</v-btn>
          <v-btn flat color="orange">Info</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
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

