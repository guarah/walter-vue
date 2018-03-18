<template>
  <v-layout>
    <v-flex xs12 sm6 offset-sm3>
      <v-card class="card" height="200px" width="130px">
        <v-card-media v-if="media.image" :src="media.image" class="card-image" height="200px">
          <v-layout column class="media">
            <v-card-title class="info-list-added" v-if="media.added">
              <v-btn dark icon>
                <v-icon>check</v-icon>
              </v-btn>
            </v-card-title>
          </v-layout>
        </v-card-media>
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
  .card .card-image .info-list-added {
    padding: 0px;
    background: #00000061;
    width: 35px;
    height: 35px;
    border-radius: 3px;
    position: absolute;
    right: 0;
  }
</style>

