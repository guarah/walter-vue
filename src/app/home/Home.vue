<template>
  <div class="home">

    <div>
      <div class="first">
        <h2>Welcome, {{user.displayName}}!</h2>

        <div class="search-bar">
          <v-text-field class="search-input" label="Search for series, movies..." v-model="searchText"></v-text-field>
          <v-btn v-if="searchedMedias.length > 0" @click="clearSearchedMedias" class="search-close" flat icon color="black">
            <v-icon>close</v-icon>
          </v-btn>
        </div>

      </div>

      <media-list
        v-if="searchView"
        listId="searchedMedias"
        title="Results..."
        :medias="searchedMedias"
        @selectedList="onSelectedList($event)"
      />

      <media-list
        v-if="!searchView && suggestions.length > 0"
        listId="suggestions"
        title="Suggested"
        :medias="suggestions"
        @selectedList="onSelectedList($event)"
      />

      <media-list
        v-if="myMedias.length > 0"
        listId="myMedias"
        title="My list"
        :medias="myMedias"
        @selectedList="onSelectedList($event)"
      />

      <media-list
        v-if="rewatchMedias.length > 0"
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
      searchText (value) {
        console.log('writing')
        if (this.time) clearTimeout(this.time)
        if (value.length > 3) {
          this.time = setTimeout(() => {
            console.log('waiting')
            this.$store.dispatch('searchMedias', value)
          }, 1000)
        }
      }
    },
    computed: {
      searchedMedias () {
        return this.$store.getters.searchedMedias
      },
      suggestions () {
        return this.$store.getters.suggestions
      },
      myMedias () {
        return this.$store.getters.myMedias
      },
      rewatchMedias () {
        return this.$store.getters.rewatchMedias
      },
      user () {
        return this.$store.getters.user
      },
      searchView () {
        return this.searchedMedias.length > 0
      },
      selectedMedia () {
        return this.$store.getters.selectedMedia
      }
    },
    methods: {
      clearSearchedMedias () {
        this.searchText = ''
        this.$store.dispatch('clearSearchedMedias')
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

