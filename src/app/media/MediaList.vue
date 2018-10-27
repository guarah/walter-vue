<template>
  <div>
    <v-btn v-if="mode === 'full'" dark @click="close" class="search-close list-close" flat icon color="black">
      <v-icon>close</v-icon>
    </v-btn>
    <h1 v-if="noResults">No results</h1>
    <h1 v-else @click="selectList">{{title}}</h1>
    <div :class="{'list-style-mini': this.mode === 'mini'}">
      <media
        v-for="media in medias"
        :key="media.id"
        :media="media"
        @click.native="selectMedia(media)"
        :class="mediaStyle"
        style="margin: 1px;"
      />
    </div>
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
      },
      mode: {
        type: String,
        required: false,
        default: 'mini'
      },
      noResults: {
        type: Boolean,
        required: false,
        default: false
      }
    },
    components: {
      Media
    },
    methods: {
      selectMedia (media) {
        this.$store.dispatch('media/selectMedia', media)
      },
      selectList () { // ONLY for mini mode - open the full mode
        this.$emit('selectedList', {
          mode: 'full',
          title: this.title,
          medias: this.medias
        })
      },
      close () { // ONLY for full mode - close the view
        this.$router.go(-1)
      }
    },
    computed: {
      mediaStyle () {
        return this.mode === 'full' ? 'list-style-full' : ''
      }
    }
  }
</script>

<style scoped>
  .list-style-full {
    display: inline-block;
  }

  .list-style-mini {
    overflow-x: scroll;
    overflow-y: hidden;
    display: flex;
    padding: 5px;
    width: 98%;
    margin: auto;
  }

  .list-close {
    position: absolute;
    top: 70px;
    right: 0;
  }
</style>
