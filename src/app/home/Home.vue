<template>
  <div class="home">
    <div>
      <div v-if="user" class="first">
        <h2>Welcome, {{user.displayName}}!</h2>

        <div class="search-bar">
          <v-text-field @keyup.8="clearSearchedMedias" class="search-input" label="Search for series, movies..." v-model="searchText"></v-text-field>
          <v-btn v-if="searchText.length > 0" @click="clearSearchedMedias(true)" class="search-close" flat icon color="black">
            <v-progress-circular v-if="searching" indeterminate color="primary"></v-progress-circular>
            <v-icon v-else>close</v-icon>
          </v-btn>
        </div>
      </div>
      <v-progress-circular v-else indeterminate color="primary"></v-progress-circular>

      <media-list
        v-if="searchView || noResults"
        listId="searchedMedias"
        :no-results="noResults"
        title="Results..."
        :medias="searchedMedias"
        @selectedList="onSelectedList($event)"
      />

      <media-list
        v-if="!searchView && suggestions && suggestions.length > 0 && !noResults"
        listId="suggestions"
        title="Suggested"
        :medias="suggestions"
        @selectedList="onSelectedList($event)"
      />
      <v-progress-circular v-else-if="suggestionsLoading" indeterminate color="primary"></v-progress-circular>

      <media-list
        v-if="myMedias && myMedias.length > 0"
        listId="myMedias"
        title="My list"
        :medias="myMedias"
        @selectedList="onSelectedList($event)"
      />
      <v-progress-circular v-else-if="myMediasLoading" indeterminate color="primary"></v-progress-circular>

      <media-list
        v-if="rewatchMedias && rewatchMedias.length > 0"
        listId="rewatchMedias"
        title="Watch again"
        :medias="rewatchMedias"
        @selectedList="onSelectedList($event)"
      />

    </div>

  </div>
</template>

<script>
  import MediaList from '../media/MediaList.vue'
  import MediaDetail from '../media/MediaDetail.vue'

  export default {
    components: {
      MediaList,
      MediaDetail
    },
    data: function () {
      return {
        searchText: '',
        time: null
      }
    },
    watch: {
      searchText (newValue, oldValue) {
        console.log('writing')
        if (this.time) clearTimeout(this.time)
        if (newValue < oldValue) return
        if (newValue.length > 3) {
          this.time = setTimeout(() => {
            console.log('waiting')
            this.$store.dispatch('media/search/searchMedias', newValue)
          }, 500)
        }
      }
    },
    computed: {
      noResults () {
        return this.$store.getters['media/search/noResults']
      },
      searchedMedias () {
        return this.$store.getters['media/search/searchedMedias']
      },
      suggestions () {
        return this.$store.getters['media/search/suggestions']
      },
      myMedias () {
        return this.$store.getters['media/myMedias']
      },
      rewatchMedias () {
        return this.$store.getters['media/rewatchMedias']
      },
      user () {
        return this.$store.getters['user/user']
      },
      searchView () {
        return (this.searchedMedias && this.searchedMedias.length > 0)
      },
      selectedMedia () {
        return this.$store.getters['media/selectedMedia']
      },
      searching () {
        return this.$store.getters['media/search/searching']
      },

      suggestionsLoading () {
        return this.$store.getters['media/search/suggestionsLoading']
      },

      myMediasLoading () {
        return this.$store.getters['media/myMediasLoading']
      }
    },
    methods: {
      clearSearchedMedias (clearText) {
        if (clearText === true) {
          this.searchText = ''
        }
        this.$store.dispatch('media/search/clearSearchedMedias')
        this.$store.dispatch('media/search/noResults', false)
      },
      onSelectedList (event) {
        this.go('MediaList', event)
      }
    }
}
</script>

<style scoped>
  .home {
    width: 100%;
  }
  .first {
    margin: auto;
    width: 90%;
  }

  .search-bar {
    position: relative;
  }

  .search-close {
    position: absolute;
    top: 0;
    right: 0;
  }
</style>

