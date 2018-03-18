<template>
  <media-list
    v-if="mediasList.length > 0"
    :listId="this.$route.params.listGetter"
    :title="this.$route.params.title"
    :medias="mediasList"
    mode="full"
  />
</template>

<script>
import MediaList from './MediaList.vue'
export default {
  components: {
    MediaList
  },
  computed: {
    mediasList () {
      return this.$store.getters[this.$route.params.listGetter]
    }
  }
}
</script>

