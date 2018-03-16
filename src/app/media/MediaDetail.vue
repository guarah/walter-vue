<template>
  <div>
    <h2>Media detail</h2>
    <button @click="close">x</button>
    <media :media="selectedMedia" style="margin: 1px;"/>
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
      this.$router.go(-1)
    }
  }
}
</script>

