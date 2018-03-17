<template>
  <div>
    <h1>{{title}}</h1>
    <v-container fluid style="min-height: 0;" grid-list-lg class="list-style">
      <media
        v-for="media in medias"
        :key="media.id"
        :media="media"
        @click.native="selectMedia(media)"
        style="margin: 1px;"
      />
    </v-container>
  </div>
</template>

<script>
  import Media from '../media/Media.vue'

  export default {
    props: {
      medias: {
        type: Array,
        required: true
      },
      title: {
        type: String,
        required: false,
        default: null
      }
    },
    components: {
      Media
    },
    methods: {
      selectMedia (media) {
        this.$store.dispatch('selectMedia', media)
        this.go('MediaDetail')
      }
    }
  }
</script>

<style scoped>
  .list-style {
    min-height: 0px;
    width: auto;
    overflow-x: scroll;
    overflow-y: hidden;
    display: flex;
  }
</style>
