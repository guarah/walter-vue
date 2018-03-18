<template>
  <div v-if="selectedMedia" class="media-detail">

    <v-btn dark icon @click="close" class="close-button">
      <v-icon small>close</v-icon>
    </v-btn>

    <media :media="selectedMedia" class="media"/>

    <div class="media-info">

      <div class="info-name">
        <span class="media-name">{{selectedMedia.name}}</span>
        <span class="media-votes" v-if="selectedMedia.vote_average">
          <v-icon class="media-vote-icon">star</v-icon>
          <span>{{selectedMedia.vote_average}}</span>
        </span>
      </div>

      <p class="description">{{selectedMedia.description}}</p>

      <div class="media-buttons">

        <div class="media-button">
          <v-btn flat color="white" @click="updateList(selectedMedia)">
            <v-icon v-if="selectedMedia.added">check</v-icon>
            <v-icon v-else>add</v-icon>
            My list
          </v-btn>
        </div>

        <div class="media-button">
          <v-btn flat color="white">
            <v-icon v-if="selectedMedia.watched">check</v-icon>
            <v-icon v-else>add</v-icon>
            Watched
          </v-btn>
        </div>

      </div>

    </div>

  </div>
</template>

<script>

import Media from '../media/Media.vue'

export default {
  components: {
    Media
  },
  computed: {
    selectedMedia () {
      return this.$store.getters.selectedMedia
    }
  },
  methods: {
    close () {
      this.$store.dispatch('unSelectMedia')
    },
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
  .media {
    margin: auto;
    display: inline-block;
    margin-top: 50px;
  }

  .media-detail {
    position: absolute;
    top: 0;
    width: 100%;
    min-height: 100%;
    background: #212d3af2;
    color: white;
  }

  .close-button {
    position: fixed;
    top: 10px;
    right: 10px;
  }

  .media-info {
    width: 90%;
    margin: auto;
    margin-top: 20px;
  }

  .info-name {
    text-align: left;
  }

  .media-name {
    width: 80%;
    font-size: 22px;
    display: inline-block;
  }

  .media-votes {
    display: inline-bloc
  }

  .media-vote-icon {
    color: #ffffe7 !important;
    margin-top: -7px;
  }

  .media-info .description {
    text-align: justify;
  }

  .media-button {
    width: 45%;
    display: inline-block;
  }
</style>


